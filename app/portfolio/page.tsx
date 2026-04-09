import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, FileCheck2, FolderKanban, ImageIcon, ShieldCheck } from "lucide-react";
import { listarProjetos } from "@/app/actions/projetos";
import { TimelineFilters } from "@/components/portfolio/timeline-filters";
import { TimelineList } from "@/components/portfolio/timeline-list";
import { buttonVariants } from "@/components/ui/button";
import { segmentItems, trustItems, whatsappHref } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function TimelineData({ categoria }: { categoria?: string }) {
  const projetos = await listarProjetos(categoria);
  return <TimelineList projetos={projetos} />;
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 md:py-14">
      <header className="section-shell rounded-[2rem] p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <span className="eyebrow">Portfólio técnico VOTH</span>
            <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-[0.04em] text-[#0b2538] md:text-8xl">
              Teste hidrostático, comissionamento e execução apresentados por evidência.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Esta timeline organiza a atuação da VOTH a partir daquilo que mais importa para o
              cliente: preparação do sistema, janelas internas da execução, teste, comissionamento
              e liberação operacional com histórico visual. O foco vale para redes industriais,
              adutoras, aquedutos, caixas d&apos;água e ativos sujeitos a requisitos técnicos críticos.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "accent", size: "lg" }), "rounded-full px-7")}
              >
                Falar com um engenheiro <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7")}>
                Voltar para empresa
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Teste primeiro",
                text: "O portfólio agora prioriza o serviço de teste hidrostático e a lógica de liberação do sistema.",
                icon: FolderKanban,
              },
              {
                title: "Janelas internas",
                text: "Cada projeto pode explicar preparação, interligações, pressurização, estabilização e entrega.",
                icon: ImageIcon,
              },
              {
                title: "Entrega com rastreabilidade",
                text: "A leitura visual reforça segurança operacional, conformidade técnica e comissionamento assistido.",
                icon: ShieldCheck,
              },
            ].map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-[1.5rem] border border-[#173349]/10 bg-white/80 p-5">
                <Icon className="h-7 w-7 text-[#0b2538]" />
                <p className="mt-4 font-display text-3xl uppercase leading-none text-[#0b2538]">{title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-[#173349]/10 bg-[#0b2538] p-5 text-[#f3f0e8] md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2b705]">Filtros de atuação</p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
                Navegue por categoria para destacar a especialidade mais relevante para a proposta ou
                para a visita comercial em andamento.
              </p>
            </div>
            <TimelineFilters categoriaAtual={categoria} />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Construção e ajuste",
              text: "Mostre o que foi montado, preparado ou corrigido antes do teste e da partida.",
            },
            {
              title: "Teste e validação",
              text: "Deixe clara a etapa de integridade, pressurização, observação e estabilização do sistema.",
            },
            {
              title: "Entrega e resultado",
              text: "Feche a história explicando como o ativo foi liberado para operar conforme o objetivo do cliente.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-[#173349]/10 bg-white/75 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Janela interna</p>
              <p className="mt-3 font-display text-3xl uppercase leading-none text-[#0b2538]">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-[#173349]/10 bg-white/70 p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Leitura do comprador técnico</p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                Esta página deve responder três perguntas: o que a VOTH construiu ou ajustou, como o sistema foi testado e de que forma a entrega foi liberada para operar.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#173349]/10 bg-[#0b2538] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3f0e8]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="mt-8 grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] bg-[#0b2538] p-8 text-[#f3f0e8] shadow-[0_24px_80px_rgba(11,37,56,0.18)]">
          <span className="eyebrow text-slate-300 before:bg-slate-500">Como esse portfólio vende</span>
          <h2 className="mt-5 font-display text-5xl uppercase leading-[0.92] md:text-6xl">
            Cada obra precisa provar engenharia, disciplina e liberação segura.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Autoridade",
                text: "A obra precisa mostrar método, organização e aderência a processos industriais críticos.",
              },
              {
                title: "Prova visual",
                text: "Fotos de execução substituem discurso genérico e deixam claro o porte real da frente de serviço.",
              },
              {
                title: "Fechamento",
                text: "O CTA final direciona a conversa para uma análise técnica, não para marketing raso.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2b705]">Sinal</p>
                <p className="mt-3 font-display text-3xl uppercase leading-none">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="section-shell rounded-[1.75rem] p-6 md:p-7">
            <div className="flex items-start gap-3">
              <FileCheck2 className="mt-1 h-6 w-6 text-[#0b2538]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Segmentos atendidos</p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                  {segmentItems.map((item) => (
                    <p key={item} className="rounded-2xl border border-[#173349]/10 bg-white/80 px-4 py-3">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="section-shell rounded-[1.75rem] p-6 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Uso comercial</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-none text-[#0b2538] md:text-5xl">
              Envie esta página como apresentação técnica, não como PDF estático.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              A timeline funciona melhor quando a pessoa interessada abre as obras, vê o contexto, entende a etapa de teste e percebe o nível de execução sem depender de anexo desatualizado.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <Suspense fallback={<p className="text-slate-600">Carregando projetos...</p>}>
          <TimelineData categoria={categoria} />
        </Suspense>
      </section>

      <section className="mt-10 pb-8">
        <div className="rounded-[2rem] bg-[#0b2538] px-8 py-10 text-[#f3f0e8] shadow-[0_24px_80px_rgba(11,37,56,0.2)] md:px-12 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow text-slate-300 before:bg-slate-500">Próxima conversa</span>
              <h2 className="mt-4 font-display text-5xl uppercase leading-none md:text-6xl">
                Se a demanda exige integridade, montagem ou comissionamento, o próximo passo é técnico.
              </h2>
            </div>

            <div className="max-w-xl space-y-5 text-sm leading-7 text-slate-300">
              <p>
                Use esta página para levar o cliente até a conversa com engenharia. O objetivo é transformar prova visual e histórico de campo em oportunidade comercial qualificada.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "accent", size: "lg" }), "rounded-full px-7")}
              >
                Falar com um engenheiro <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
