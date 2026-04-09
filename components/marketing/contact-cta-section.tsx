import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { commercialEmail, segmentItems, trustItems, whatsappHref } from "@/lib/site-content";

export function ContactCtaSection() {
  return (
    <section id="contato" className="mx-auto max-w-7xl px-6 pb-20">
      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="section-shell rounded-[2rem] p-8 md:p-10">
          <span className="eyebrow">Contato técnico</span>
          <h2 className="mt-5 font-display text-5xl uppercase leading-[0.92] text-[#0b2538] md:text-6xl">
            Fale com um engenheiro e apresente a demanda para análise técnica.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
            Este fechamento reúne especialidade, histórico de obras, normas atendidas e um canal direto
            para continuar a conversa com contexto técnico.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "accent", size: "lg" }), "rounded-full px-7")}
            >
              Falar com um engenheiro <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <Link
              href="/portfolio"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7")}
            >
              Ver portfólio completo
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {segmentItems.map((item) => (
              <div key={item} className="rounded-2xl border border-[#173349]/10 bg-white/70 px-4 py-4 text-sm leading-7 text-slate-700">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#173349]/10 bg-white/70 px-5 py-4 text-sm leading-7 text-slate-700">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Contato técnico</p>
            <a href={`mailto:${commercialEmail}`} className="mt-2 inline-flex font-semibold text-[#0b2538] transition hover:text-[#7b5b00]">
              {commercialEmail}
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#0b2538] p-8 text-[#f3f0e8] shadow-[0_24px_80px_rgba(11,37,56,0.22)] md:p-10">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-6 w-6 text-[#f2b705]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2b705]">Segurança e conformidade</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                A apresentação se encerra reforçando disciplina operacional, inspeção,
                integridade, documentação e foco na liberação segura do sistema.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {trustItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/6 p-6 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <FileText className="mt-1 h-5 w-5 text-[#f2b705]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2b705]">Síntese técnica</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Atuamos com integridade, montagem, teste e comissionamento para indústrias que não
                  podem operar com improviso. A página precisa comunicar isso com clareza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}