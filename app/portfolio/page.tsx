import { Suspense } from "react";
import { FolderKanban, ImageIcon, ShieldCheck } from "lucide-react";
import { listarProjetos } from "@/app/actions/projetos";
import { TimelineFilters } from "@/components/portfolio/timeline-filters";
import { TimelineList } from "@/components/portfolio/timeline-list";
import { trustItems } from "@/lib/site-content";

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
              Esta timeline organiza a atuação da VOTH a partir do que mais importa para o cliente:
              preparação do sistema, janelas internas da execução, teste, comissionamento e liberação
              operacional. O foco vale para redes industriais, adutoras, aquedutos, caixas d&apos;água e
              ativos sujeitos a requisitos técnicos críticos.
            </p>
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
                Navegue por categoria para destacar a especialidade mais relevante para a proposta
                ou para a apresentação técnica em andamento.
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
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Leitura do comprador técnico</p>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
            O portfólio funciona melhor quando responde com clareza o que foi montado ou ajustado,
            como o sistema foi testado e de que forma a entrega foi liberada para operar.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {trustItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#173349]/10 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0b2538]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="mt-8">
        <Suspense fallback={<p className="text-slate-600">Carregando projetos...</p>}>
          <TimelineData categoria={categoria} />
        </Suspense>
      </section>
    </main>
  );
}
