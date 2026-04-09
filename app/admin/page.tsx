import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Activity, ClipboardCheck, FileImage, FlaskConical, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 md:py-14">
      <section className="section-shell rounded-[2rem] p-8 md:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Painel Admin VOTH</span>
            <h1 className="mt-5 font-display text-6xl uppercase leading-[0.9] text-[#0b2538] md:text-8xl">
              Publicação rápida com foco em teste e entrega.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Use este painel para transformar uma execução de campo em peça comercial: descreva a
              frente, organize as fotos e publique a leitura técnica do serviço.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin/novo-projeto">
              <Button variant="accent" className="rounded-full">Adicionar Projeto</Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" className="rounded-full">Ver Timeline Pública</Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            { title: "Teste", icon: FlaskConical, text: "Abrir a apresentação pelo serviço mais estratégico." },
            { title: "Comissão", icon: ClipboardCheck, text: "Explique a liberação operacional e o resultado esperado." },
            { title: "Fotos", icon: FileImage, text: "Suba imagens que mostrem etapas, janelas internas e acabamento." },
            { title: "Campo", icon: Wrench, text: "Registre adequações, manutenção, montagem e intervenção técnica." },
          ].map(({ title, icon: Icon, text }) => (
            <article key={title} className="rounded-[1.5rem] border border-[#173349]/10 bg-white/80 p-5">
              <Icon className="h-7 w-7 text-[#0b2538]" />
              <p className="mt-4 font-display text-3xl uppercase leading-none text-[#0b2538]">{title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-[#173349]/10 bg-[#0b2538] p-6 text-[#f3f0e8]">
          <div className="flex items-start gap-4">
            <Activity className="mt-1 h-6 w-6 text-[#f2b705]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2b705]">Orientação editorial</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Sempre que possível, publique primeiro projetos de teste hidrostático e comissionamento.
                Eles explicam melhor a capacidade da empresa de construir, validar e liberar o sistema.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
