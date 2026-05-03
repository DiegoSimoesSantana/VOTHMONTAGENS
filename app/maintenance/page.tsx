import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ACCESS_COOKIE = "voth_maintenance_access";

async function liberarAcesso(formData: FormData) {
  "use server";

  const senhaInformada = String(formData.get("password") ?? "").trim();
  const nextPath = String(formData.get("next") ?? "/");
  const senhaCorreta = (process.env.MAINTENANCE_PASSWORD ?? "voth@123").trim();

  if (senhaInformada !== senhaCorreta) {
    redirect(`/maintenance?erro=1&next=${encodeURIComponent(nextPath)}`);
  }

  const cookieStore = await cookies();

  cookieStore.set(ACCESS_COOKIE, senhaCorreta, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect(nextPath.startsWith("/") ? nextPath : "/");
}

export default async function MaintenancePage({
  searchParams,
}: {
  searchParams?: Promise<{ erro?: string; next?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const nextPath = typeof params.next === "string" ? params.next : "/";
  const hasError = params.erro === "1";
  const senhaCorreta = (process.env.MAINTENANCE_PASSWORD ?? "voth@123").trim();
  const cookieStore = await cookies();

  if (cookieStore.get(ACCESS_COOKIE)?.value === senhaCorreta) {
    redirect(nextPath);
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-100 px-4 py-16">
      <Card className="w-full max-w-lg border-slate-300 shadow-lg">
        <CardHeader>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Modo de manutenção</p>
          <CardTitle className="text-3xl">Site temporariamente restrito</CardTitle>
          <CardDescription>
            O site está em manutenção no momento. Informe a senha de acesso para continuar navegando.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={liberarAcesso} className="space-y-4">
            <input type="hidden" name="next" value={nextPath} />
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Senha de acesso
              </label>
              <Input id="password" name="password" type="password" placeholder="Digite a senha" required />
            </div>

            {hasError ? <p className="text-sm text-red-600">Senha incorreta. Tente novamente.</p> : null}

            <Button type="submit" className="w-full">
              Entrar no site
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
