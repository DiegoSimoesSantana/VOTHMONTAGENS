import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticator } from "otplib";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { usuarios } from "@/lib/db/schema";
import { logWarn } from "@/lib/logger";
import { limitLogin } from "@/lib/rate-limit";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  otp: z.string().regex(/^\d{6}$/, "Código 2FA inválido."),
});

authenticator.options = {
  step: 30,
  window: 1,
};

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
        otp: { label: "Código 2FA", type: "text" },
      },
      async authorize(credentials, req) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const headerValue = req?.headers?.["x-forwarded-for"];
        const ip = Array.isArray(headerValue)
          ? String(headerValue[0] || "unknown")
          : String(headerValue || "unknown");
        const loginIdentifier = `${parsed.data.email}:${ip.split(",")[0]?.trim() || "unknown"}`;

        const rateLimitResult = await limitLogin(loginIdentifier);
        if (!rateLimitResult.success) {
          logWarn({
            event: "login_rate_limited",
            message: "Tentativas excessivas de login bloqueadas por rate limiting.",
            context: {
              email: parsed.data.email,
              ip,
            },
          });
          return null;
        }

        const db = getDb();
        const [user] = await db
          .select()
          .from(usuarios)
          .where(eq(usuarios.email, parsed.data.email))
          .limit(1);

        if (!user) return null;

        const senhaOk = await bcrypt.compare(parsed.data.password, user.senhaHash);
        if (!senhaOk) return null;

        const totpSecret = (process.env.ADMIN_TOTP_SECRET ?? "").trim();
        if (!totpSecret) {
          logWarn({
            event: "missing_admin_totp_secret",
            message: "ADMIN_TOTP_SECRET não definido; login negado para forçar autenticação reforçada.",
            context: {
              email: parsed.data.email,
            },
          });
          return null;
        }

        const isOtpValid = authenticator.check(parsed.data.otp, totpSecret);
        if (!isOtpValid) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.nome,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
