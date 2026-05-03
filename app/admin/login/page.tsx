"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErro("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const otp = String(formData.get("otp") || "").trim();

    const result = await signIn("credentials", {
      email,
      password,
      otp,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setErro("Credenciais inválidas.");
      return;
    }

    router.push("/admin/novo-projeto");
  }

  return (
    <main className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1.05fr_0.95fr] md:px-6 md:py-12">
      <section className="section-shell rounded-[2rem] p-8 md:p-12">
        <span className="eyebrow">Acesso restrito</span>
        <h1 className="mt-6 font-display text-6xl uppercase leading-[0.9] text-[#0b2538] md:text-8xl">
          Gestão técnica do portfólio e das entregas.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
          Área pensada para registrar obras, testes hidrostáticos, comissionamentos, manutenção,
          adequações de adutoras, aquedutos, caixas d&apos;água e sistemas sujeitos a NR-13.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Teste",
              text: "Registre preparação, pressurização, estabilização e resultado.",
              icon: ShieldCheck,
            },
            {
              title: "Comissionamento",
              text: "Documente a entrega e a liberação operacional do sistema.",
              icon: LockKeyhole,
            },
            {
              title: "Manutenção",
              text: "Mantenha histórico visual de ajuste, intervenção e acabamento.",
              icon: Wrench,
            },
          ].map(({ title, text, icon: Icon }) => (
            <div key={title} className="rounded-[1.5rem] border border-[#173349]/10 bg-white/80 p-5">
              <Icon className="h-7 w-7 text-[#0b2538]" />
              <p className="mt-4 font-display text-3xl uppercase leading-none text-[#0b2538]">{title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-center">
        <Card className="w-full max-w-lg rounded-[2rem] border-[#173349]/10 bg-[rgba(251,250,246,0.96)] shadow-[0_24px_64px_rgba(11,37,56,0.12)]">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="font-display text-4xl uppercase leading-none">Login Admin</CardTitle>
            <CardDescription className="text-sm leading-7 text-slate-600">
              Acesso restrito para gestão da VOTH. Senha inicial configurada no setup: MONTAGEM.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-2">
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" required className="h-12 rounded-xl border-[#173349]/15 bg-white/80" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" required className="h-12 rounded-xl border-[#173349]/15 bg-white/80" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otp">Código 2FA</Label>
                <Input
                  id="otp"
                  name="otp"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  placeholder="000000"
                  required
                  className="h-12 rounded-xl border-[#173349]/15 bg-white/80"
                />
              </div>
              {erro ? <p className="text-sm text-red-600">{erro}</p> : null}
              <Button type="submit" className="h-12 w-full rounded-full" variant="accent" disabled={loading}>
                {loading ? "Entrando..." : "Entrar no painel"}
                {!loading ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
