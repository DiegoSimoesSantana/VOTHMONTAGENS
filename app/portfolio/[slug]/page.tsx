import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, CalendarDays, Images, MapPin } from "lucide-react";
import { buscarProjetoPorSlug } from "@/app/actions/projetos";
import { ProjectCarousel } from "@/components/portfolio/project-carousel";
import { Badge } from "@/components/ui/badge";
import { getDb, hasDatabaseConfig } from "@/lib/db";
import { projetos } from "@/lib/db/schema";
import { processImageMap, trustItems } from "@/lib/site-content";
import { mesAno } from "@/lib/utils";

function categoriaLabel(categoria: string) {
  const mapa: Record<string, string> = {
    montagem: "Montagem",
    manutencao: "Manutenção",
    inspecao: "Inspeção",
    "teste-hidrostatico": "Teste Hidrostático",
    spda: "SPDA",
  };

  return mapa[categoria] || categoria;
}

function frentesDoProjeto(categoria: string) {
  const mapa: Record<string, string[]> = {
    montagem: [
      "Montagem de equipamentos, suportes e linhas auxiliares.",
      "Ajustes dimensionais e preparação para operação assistida.",
      "Organização visual do conjunto para inspeção e entrega.",
    ],
    manutencao: [
      "Intervenções corretivas e preventivas em área operacional.",
      "Troca, reaperto, adequação e recomposição de trechos críticos.",
      "Retorno controlado da frente com registro de execução.",
    ],
    inspecao: [
      "Levantamento visual da condição do ativo.",
      "Mapeamento de pontos de atenção e acessos.",
      "Registro técnico para tomada de decisão e planejamento.",
    ],
    "teste-hidrostatico": [
      "Preparação da linha, isolamento de trechos e leitura das janelas internas do sistema.",
      "Pressurização controlada, estabilização e acompanhamento técnico do comportamento da rede.",
      "Comissionamento e registro da condição final para liberação operacional.",
    ],
    spda: [
      "Adequação da malha e pontos de captação.",
      "Verificação de continuidade e aterramento.",
      "Organização do sistema para inspeção e conformidade.",
    ],
  };

  return mapa[categoria] || mapa.montagem;
}

export async function generateStaticParams() {
  if (!hasDatabaseConfig) {
    return [];
  }

  const db = getDb();
  const todos = await db.select({ slug: projetos.slug }).from(projetos);
  return todos.map((item) => ({ slug: item.slug }));
}

export default async function ProjetoDetalhePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projeto = await buscarProjetoPorSlug(slug);

  if (!projeto) notFound();

  const supportImages = processImageMap[projeto.categoria] || processImageMap.montagem;

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl space-y-8 px-6 py-10 md:py-14">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:text-[#0b2538]"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao portfólio
      </Link>

      <header className="section-shell rounded-[2rem] p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent" className="rounded-full px-4 py-1 text-[11px] uppercase tracking-[0.24em]">
                {categoriaLabel(projeto.categoria)}
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-1 text-[11px] uppercase tracking-[0.24em]">
                {projeto.cliente}
              </Badge>
            </div>
            <h1 className="title-balance max-w-[13ch] font-display text-6xl uppercase leading-[0.88] tracking-[0.03em] text-[#0b2538] md:text-8xl">
              {projeto.titulo}
            </h1>
            <p className="copy-measure max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              {projeto.descricaoCurta ||
                "Projeto apresentado com foco em contexto operacional, teste, comissionamento, sequência de execução e evidência visual."}
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-[#173349]/10 bg-[#0b2538] p-6 text-[#f3f0e8]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2b705]">Resumo operacional</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#f2b705]" />
                  <span>{projeto.local}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 text-[#f2b705]" />
                  <span>{mesAno(projeto.dataExecucao)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Images className="h-4 w-4 text-[#f2b705]" />
                  <span>{projeto.fotos.length} registros fotográficos</span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#173349]/10 bg-white/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Leitura técnica</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Esta página funciona melhor como estudo técnico curto: contexto, resumo operacional
                e suporte visual suficiente para uma proposta ou visita técnica.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {trustItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#173349]/10 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0b2538]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <ProjectCarousel fotos={projeto.fotos} titulo={projeto.titulo} />

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Etapas internas registradas</p>
            <h2 className="title-balance mt-2 max-w-3xl font-display text-4xl uppercase leading-[0.94] text-[#0b2538] md:text-5xl">
              Evidências visuais organizadas conforme a lógica da frente executada.
            </h2>
          </div>
          <p className="copy-measure max-w-2xl text-sm leading-7 text-slate-600">
            As imagens abaixo funcionam como apoio de leitura para preparação, validação e entrega do processo relacionado a este tipo de serviço.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
        {supportImages.map((item, index) => (
          <article key={`${item.image}-${index}`} className="section-shell rounded-[1.75rem] p-4">
            <div className="relative h-64 overflow-hidden rounded-[1.25rem] bg-[#dbe2e7] md:h-80">
              <Image
                src={item.image}
                alt={`${categoriaLabel(projeto.categoria)} ${item.title}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07131d]/75 via-[#07131d]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-[#f3f0e8]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2b705]">{item.label}</p>
                <p className="title-balance mt-2 font-display text-3xl uppercase leading-[0.94]">{item.title}</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-200">{item.text}</p>
              </div>
            </div>
          </article>
        ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
        <article className="section-shell rounded-[1.75rem] p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Descrição técnica</p>
          <h2 className="title-balance mt-4 font-display text-4xl uppercase leading-[0.94] text-[#0b2538] md:text-5xl">
            Contexto e execução
          </h2>
          <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-700">
            {projeto.descricaoCompleta ||
              "Detalhamento técnico ainda nao informado. A estrutura desta página já está pronta para receber escopo, janelas internas do sistema, critérios de teste hidrostático, comissionamento e conclusão operacional."}
          </p>
        </article>

        <article className="section-shell rounded-[1.75rem] p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Linha técnica do serviço</p>
          <h2 className="title-balance mt-4 font-display text-4xl uppercase leading-[0.94] text-[#0b2538] md:text-5xl">
            Frentes observadas
          </h2>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
            {frentesDoProjeto(projeto.categoria).map((item) => (
              <li key={item} className="rounded-2xl border border-[#173349]/10 bg-white/70 px-4 py-4">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Antes do teste",
            text: "Organize aqui o que foi construído, ajustado, soldado ou preparado para a etapa de validação.",
          },
          {
            title: "Durante o comissionamento",
            text: "Explique o comportamento do sistema, a observação técnica e os critérios usados para avançar a entrega.",
          },
          {
            title: "Resultado liberado",
            text: "Deixe explícito o que o cliente passou a ter como condição operacional após a intervenção.",
          },
        ].map((item) => (
          <article key={item.title} className="section-shell rounded-[1.5rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Leitura técnica</p>
            <h3 className="title-balance mt-4 font-display text-3xl uppercase leading-[0.94] text-[#0b2538]">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
