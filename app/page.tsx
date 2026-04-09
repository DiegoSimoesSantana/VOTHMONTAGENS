import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, ShieldCheck, Wrench, Workflow } from "lucide-react";
import { listarProjetos } from "@/app/actions/projetos";
import { ContactCtaSection } from "@/components/marketing/contact-cta-section";
import { ServicesSection } from "@/components/marketing/services-section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { fallbackGallery, whatsappHref } from "@/lib/site-content";
import { cn, mesAno } from "@/lib/utils";

const capabilityCards = [
  {
    title: "Teste hidrostático e comissionamento",
    text: "Preparação do sistema, pressurização controlada, validação operacional e liberação final para entrada em serviço.",
    icon: ShieldCheck,
  },
  {
    title: "Adutoras, aquedutos e redes técnicas",
    text: "Atuação em linhas de utilidades, sistemas de transporte, interligações industriais e adequações de campo.",
    icon: Workflow,
  },
  {
    title: "NR-13, manutenção e montagem",
    text: "Intervenções em vasos, linhas, suportes e conjuntos industriais com leitura técnica e evidência fotográfica.",
    icon: Factory,
  },
];

const processSteps = [
  "Abertura técnica da frente e leitura das janelas internas do sistema.",
  "Montagem, adequações e preparação para teste hidrostático ou partida assistida.",
  "Pressurização, estabilização, checagem de integridade e acompanhamento operacional.",
  "Comissionamento e entrega com sistema liberado para o resultado esperado pelo cliente.",
];

const resultPillars = [
  {
    title: "Integridade validada",
    text: "O sistema sai testado, observado e apresentado com clareza para aprovação técnica.",
  },
  {
    title: "Liberação operacional",
    text: "O comissionamento fecha o ciclo da obra e prepara a operação para entrar em serviço.",
  },
  {
    title: "Evidência comercial",
    text: "As imagens e o texto técnico viram argumento real para proposta, visita e negociação.",
  },
];

export default async function Home() {
  const projetos = await listarProjetos();
  const destaques = projetos.slice(0, 3);

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.2fr_0.8fr] md:py-20">
        <div className="section-shell rounded-[2rem] p-8 md:p-12">
          <span className="eyebrow">Apresentação técnica da empresa</span>
          <div className="mt-6 space-y-6">
            <Badge variant="accent" className="rounded-full px-4 py-1 text-[11px] uppercase tracking-[0.24em]">
              Empresa de teste hidrostático, comissionamento e manutenção industrial
            </Badge>
            <h1 className="max-w-4xl font-display text-6xl uppercase leading-[0.9] tracking-[0.04em] text-[#0b2538] md:text-8xl">
              Teste, liberação e entrega operacional com leitura real de campo.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              A VOTH se posiciona como empresa de teste hidrostático e comissionamento, atuando em
              sistemas industriais, adutoras, aquedutos, caixas d&apos;água, linhas de utilidades,
              vasos sob requisitos de NR-13 e frentes que exigem liberação segura para operação.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "accent", size: "lg" }), "rounded-full px-7")}
            >
              Falar com um engenheiro <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <Link href="/portfolio" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7")}>
              Ver portfólio
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[#173349]/10 bg-[#0b2538] p-5 text-[#f3f0e8]">
              <p className="text-xs uppercase tracking-[0.26em] text-[#f2b705]">Especialidade</p>
              <p className="mt-3 font-display text-5xl uppercase">Teste</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Pressurização, integridade, inspeção e entrega assistida para entrada em operação.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[#173349]/10 bg-white/85 p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Segmentos</p>
              <p className="mt-3 font-display text-5xl uppercase text-[#0b2538]">NR13</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Caldeiras, vasos, linhas pressurizadas, caixas d&apos;água e ativos que pedem critério técnico de liberação.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[#173349]/10 bg-white/85 p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Entrega</p>
              <p className="mt-3 font-display text-5xl uppercase text-[#0b2538]">Start</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Comissionamento para liberar a atuação do sistema conforme o resultado esperado pelo cliente.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {[
            "Teste hidrostático em sistemas industriais e linhas críticas",
            "Comissionamento assistido para entrega e liberação operacional",
            "Atuação em adutoras, aquedutos, caixas d'água e redes técnicas",
            "NR-13, manutenção, montagem e adequações de campo",
          ].map((item, index) => (
            <div key={item} className="section-shell rounded-[1.75rem] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Frente {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-display text-3xl uppercase leading-none text-[#0b2538]">
                    {item}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-[#f2b705]/15" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-6">
        <div className="grid gap-5 md:grid-cols-3">
          {capabilityCards.map(({ title, text, icon: Icon }) => (
            <article key={title} className="section-shell rounded-[1.75rem] p-7">
              <Icon className="h-8 w-8 text-[#0b2538]" />
              <h2 className="mt-6 font-display text-4xl uppercase leading-none text-[#0b2538]">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <ServicesSection />

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-5 md:grid-cols-3">
          {resultPillars.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-[#173349]/10 bg-[#0b2538] p-6 text-[#f3f0e8] shadow-[0_18px_48px_rgba(11,37,56,0.14)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2b705]">Resultado</p>
              <h2 className="mt-4 font-display text-4xl uppercase leading-none">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Leitura de campo</span>
            <h2 className="mt-4 font-display text-5xl uppercase leading-none text-[#0b2538] md:text-6xl">
              Portfólio pensado para vender competência.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            O conjunto de imagens agora sustenta uma mensagem mais precisa: a empresa executa,
            testa, comissiona e entrega sistemas industriais com leitura técnica, segurança e prova
            visual da frente em andamento, inclusive em reservatórios e caixas d&apos;água.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {destaques.length
            ? destaques.map((projeto) => (
                <Link
                  key={projeto.id}
                  href={`/portfolio/${projeto.slug}`}
                  className="group section-shell rounded-[1.75rem] p-4"
                >
                  <div className="relative h-72 overflow-hidden rounded-[1.25rem] bg-[#dbe2e7]">
                    {projeto.fotos[0] ? (
                      <Image
                        src={projeto.fotos[0]}
                        alt={projeto.titulo}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : null}
                  </div>
                  <div className="mt-4 space-y-3 p-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {mesAno(projeto.dataExecucao)}
                    </p>
                    <h3 className="font-display text-4xl uppercase leading-none text-[#0b2538]">
                      {projeto.titulo}
                    </h3>
                    <p className="text-sm leading-7 text-slate-600">
                      {projeto.descricaoCurta || `${projeto.local} · ${projeto.cliente}`}
                    </p>
                  </div>
                </Link>
              ))
            : fallbackGallery.map((item) => (
                <article key={item.title} className="section-shell rounded-[1.75rem] p-5">
                  <div className="relative h-72 overflow-hidden rounded-[1.25rem] bg-[#dbe2e7]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#07131d] via-[#07131d]/20 to-transparent p-6 text-[#f3f0e8]">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2b705]">
                          {item.label}
                        </p>
                        <p className="mt-3 font-display text-4xl uppercase leading-none">{item.title}</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 px-2 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <div className="section-shell rounded-[2rem] p-8 md:p-10">
            <span className="eyebrow">Método VOTH</span>
            <h2 className="mt-5 font-display text-5xl uppercase leading-none text-[#0b2538] md:text-6xl">
              Janelas internas da entrega, do teste à liberação.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
              A abertura da apresentação agora explica melhor como a empresa lê o sistema, atua nas
              etapas internas da execução e entrega o ativo em condição de operação.
            </p>
          </div>

          <div className="grid gap-4">
            {processSteps.map((step, index) => (
              <div key={step} className="section-shell flex items-start gap-5 rounded-[1.5rem] p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0b2538] font-display text-2xl text-[#f3f0e8]">
                  {index + 1}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Etapa {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-base leading-7 text-slate-700">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] bg-[#0b2538] px-8 py-10 text-[#f3f0e8] shadow-[0_24px_80px_rgba(11,37,56,0.26)] md:px-12 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow text-slate-300 before:bg-slate-500">Próximo passo</span>
              <h2 className="mt-4 font-display text-5xl uppercase leading-none md:text-6xl">
                Transformar teste e comissionamento em argumento comercial.
              </h2>
            </div>
            <div className="max-w-xl space-y-5 text-sm leading-7 text-slate-300">
              <p>
                A base pública passa a abrir com a mensagem certa: empresa preparada para testar,
                comissionar, ajustar e liberar sistemas industriais com rastreabilidade visual.
              </p>
              <Link
                href="/portfolio"
                className={cn(buttonVariants({ variant: "accent", size: "lg" }), "rounded-full px-7")}
              >
                Abrir portfólio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactCtaSection />
    </main>
  );
}
