import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Projeto } from "@/lib/db/schema";
import { mesAno } from "@/lib/utils";

function categoriaLabel(categoria: Projeto["categoria"]) {
  const mapa: Record<Projeto["categoria"], string> = {
    montagem: "Montagem",
    manutencao: "Manutenção",
    inspecao: "Inspeção",
    "teste-hidrostatico": "Teste Hidrostático",
    spda: "SPDA",
  };

  return mapa[categoria];
}

export function TimelineList({ projetos }: { projetos: Projeto[] }) {
  if (!projetos.length) {
    return (
      <div className="section-shell rounded-[1.75rem] p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Portfólio em preparação</p>
        <h2 className="mt-5 font-display text-5xl uppercase leading-none text-[#0b2538]">
          Nenhum projeto encontrado para este filtro.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          Quando as obras forem cadastradas com fotos, datas e descrição curta, esta timeline passa a
          funcionar como apresentação comercial contínua da empresa.
        </p>
      </div>
    );
  }

  return (
    <div className="relative space-y-6 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-px before:bg-[#173349]/15 before:content-[''] md:before:left-[11.25rem] xl:before:left-1/2">
      {projetos.map((projeto, index) => {
        const fotoPrincipal = projeto.fotos[0];
        const invertOnDesktop = index % 2 === 1;

        return (
          <Link
            key={projeto.id}
            href={`/portfolio/${projeto.slug}`}
            className={`group relative grid gap-4 rounded-[1.75rem] border border-[#173349]/10 bg-[rgba(251,250,246,0.96)] p-4 shadow-[0_18px_48px_rgba(11,37,56,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(11,37,56,0.16)] md:grid-cols-[180px_220px_1fr] md:p-5 ${invertOnDesktop ? "xl:grid-cols-[1fr_220px_180px]" : "xl:grid-cols-[180px_220px_1fr]"}`}
          >
            <div className={`absolute left-[0.95rem] top-10 h-4 w-4 rounded-full border-4 border-[#f3f0e8] bg-[#f2b705] md:left-[10.8rem] ${invertOnDesktop ? "xl:left-[calc(100%-10.8rem)]" : "xl:left-[calc(50%-0.5rem)]"}`} />

            <div className={`flex flex-col justify-center gap-3 pl-6 md:pl-0 ${invertOnDesktop ? "xl:order-3" : ""}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Registro técnico</p>
              <p className="font-display text-4xl uppercase leading-none text-[#0b2538] md:text-5xl">
                {mesAno(projeto.dataExecucao)}
              </p>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#0b2538]" />
                  <span>{projeto.local}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#0b2538]" />
                  <span>{projeto.cliente}</span>
                </div>
              </div>
            </div>

            <div className={`relative min-h-[230px] overflow-hidden rounded-[1.25rem] bg-[#dbe2e7] ${invertOnDesktop ? "xl:order-2" : ""}`}>
              {fotoPrincipal ? (
                <Image src={fotoPrincipal} alt={projeto.titulo} fill className="object-cover transition duration-500 group-hover:scale-[1.04]" />
              ) : (
                <div className="flex h-full items-end bg-[linear-gradient(160deg,#0b2538_0%,#24445d_55%,#f2b705_185%)] p-5 text-[#f3f0e8]">
                  <p className="font-display text-3xl uppercase leading-none">Evidência fotográfica em atualização</p>
                </div>
              )}
            </div>

            <div className={`flex flex-col justify-between gap-5 p-2 ${invertOnDesktop ? "xl:order-1" : ""}`}>
              <div className="space-y-3">
                <Badge variant="accent" className="w-fit rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.24em]">
                  {categoriaLabel(projeto.categoria)}
                </Badge>
                <h3 className="font-display text-5xl uppercase leading-[0.9] tracking-[0.02em] text-[#0b2538]">
                  {projeto.titulo}
                </h3>
                <p className="max-w-2xl text-sm leading-7 text-slate-600">
                  {projeto.descricaoCurta || "Projeto registrado com foco em contexto operacional e frente de execução."}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#173349]/10 pt-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#0b2538]">
                <span>Abrir projeto</span>
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
