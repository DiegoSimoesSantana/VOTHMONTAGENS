import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CalendarDays, ClipboardCheck, Images, MapPin, ShieldCheck } from "lucide-react";
import { buscarProjetoPorSlug } from "@/app/actions/projetos";
import { ProjectCarousel } from "@/components/portfolio/project-carousel";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDb, hasDatabaseConfig } from "@/lib/db";
import { projetos } from "@/lib/db/schema";
import { processImageMap, trustItems, whatsappHref } from "@/lib/site-content";
import { cn } from "@/lib/utils";
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

function narrativaDeCompra(categoria: string) {
  const mapa: Record<string, { title: string; text: string }> = {
    montagem: {
      title: "Montagem com controle de interface",
      text: "A página precisa mostrar como a frente foi montada, alinhada e preparada para integrar o sistema com segurança e previsibilidade.",
    },
    manutencao: {
      title: "Manutenção com retorno operacional",
      text: "O valor comercial está em provar que a intervenção reduziu risco, corrigiu desvios e devolveu o ativo à condição de operação.",
    },
    inspecao: {
      title: "Inspeção que orienta decisão",
      text: "O comprador técnico precisa enxergar método, leitura de integridade e clareza na recomendação gerada a partir da inspeção.",
    },
    "teste-hidrostatico": {
      title: "Teste que valida e libera",
      text: "A narrativa comercial deve deixar claro que houve preparação, pressurização, estabilização e critério técnico para liberar o sistema.",
    },
    spda: {
      title: "Proteção documentada",
      text: "O diferencial está em comprovar organização da malha, continuidade e disciplina na execução do aterramento e da proteção.",
    },
  };

  return mapa[categoria] || mapa.montagem;
}

function sinaisDeConfianca(categoria: string) {
  const base = [
    "Leitura técnica da frente de serviço",
    "Registro fotográfico como prova de execução",
    "Apresentação pronta para proposta ou visita técnica",
  ];

  if (categoria === "teste-hidrostatico") {
    return [
      "Preparação, pressurização e estabilização descritas com clareza",
      "Critério técnico de liberação operacional",
      "Registro visual orientado à integridade do sistema",
    ];
  }

  return base;
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
  const buyerNarrative = narrativaDeCompra(projeto.categoria);
  const confidenceSignals = sinaisDeConfianca(projeto.categoria);

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
            <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-[0.04em] text-[#0b2538] md:text-8xl">
              {projeto.titulo}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              {projeto.descricaoCurta ||
                "Projeto apresentado com foco em contexto operacional, teste, comissionamento, sequência de execução e evidência visual."}
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
              <Link href="/portfolio" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7")}>
                Voltar ao histórico
              </Link>
            </div>
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
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Leitura comercial</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Esta página foi redesenhada para funcionar como peça de apresentação: leitura rápida,
                foco em teste hidrostático, comissionamento e suporte visual para proposta ou visita técnica.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] bg-[#0b2538] p-8 text-[#f3f0e8] shadow-[0_24px_80px_rgba(11,37,56,0.18)]">
          <span className="eyebrow text-slate-300 before:bg-slate-500">Narrativa do projeto</span>
          <h2 className="mt-5 font-display text-5xl uppercase leading-[0.92] md:text-6xl">{buyerNarrative.title}</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">{buyerNarrative.text}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {confidenceSignals.map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2b705]">Sinal de confiança</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-shell rounded-[1.75rem] p-7 md:p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-6 w-6 text-[#0b2538]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Sinais de autoridade</p>
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
              <p className="mt-5 text-sm leading-7 text-slate-600">
                Use esta página para apresentar o caso ao comprador técnico, reforçando método, integridade e a qualidade da entrega sem depender de um PDF separado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProjectCarousel fotos={projeto.fotos} titulo={projeto.titulo} />

      <section className="grid gap-5 md:grid-cols-2">
        {supportImages.map((image, index) => (
          <article key={`${image}-${index}`} className="section-shell rounded-[1.75rem] p-4">
            <div className="relative h-64 overflow-hidden rounded-[1.25rem] bg-[#dbe2e7] md:h-80">
              <Image
                src={image}
                alt={`${categoriaLabel(projeto.categoria)} apoio ${index + 1}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07131d]/75 via-[#07131d]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-[#f3f0e8]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2b705]">Referência visual do processo</p>
                <p className="mt-2 font-display text-3xl uppercase leading-none">{categoriaLabel(projeto.categoria)}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
        <article className="section-shell rounded-[1.75rem] p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Descrição técnica</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none text-[#0b2538] md:text-5xl">
            Contexto e execução
          </h2>
          <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-700">
            {projeto.descricaoCompleta ||
              "Detalhamento técnico ainda nao informado. A estrutura desta página já está pronta para receber escopo, janelas internas do sistema, critérios de teste hidrostático, comissionamento e conclusão operacional."}
          </p>
        </article>

        <article className="section-shell rounded-[1.75rem] p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Linha técnica do serviço</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none text-[#0b2538] md:text-5xl">
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
            text: "Organize aqui o que foi construído, ajustado, soldado ou preparado para receber a etapa de validação.",
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Leitura comercial</p>
            <h3 className="mt-4 font-display text-3xl uppercase leading-none text-[#0b2538]">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="pb-8">
        <div className="rounded-[2rem] bg-[#0b2538] px-8 py-10 text-[#f3f0e8] shadow-[0_24px_80px_rgba(11,37,56,0.2)] md:px-12 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow text-slate-300 before:bg-slate-500">Fechamento comercial</span>
              <h2 className="mt-4 font-display text-5xl uppercase leading-none md:text-6xl">
                Se este projeto conversa com a sua operação, o próximo passo é uma avaliação técnica.
              </h2>
            </div>
            <div className="max-w-xl space-y-5 text-sm leading-7 text-slate-300">
              <p>
                A página individual agora funciona como miniestudo de caso. O objetivo é transformar contexto, prova visual e método em uma conversa comercial qualificada.
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
