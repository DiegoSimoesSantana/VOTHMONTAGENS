import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const filtros = [
  { label: "Todos", value: "" },
  { label: "Teste Hidrostático", value: "teste-hidrostatico" },
  { label: "Montagem", value: "montagem" },
  { label: "Manutenção", value: "manutencao" },
  { label: "Inspeção", value: "inspecao" },
  { label: "SPDA", value: "spda" },
];

export function TimelineFilters({ categoriaAtual }: { categoriaAtual?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filtros.map((filtro) => {
        const ativo = (categoriaAtual || "") === filtro.value;
        const href = filtro.value ? `/portfolio?categoria=${filtro.value}` : "/portfolio";

        return (
          <Link
            key={filtro.label}
            href={href}
            className={cn(
              buttonVariants({ variant: ativo ? "accent" : "outline", size: "sm" }),
              ativo
                ? "rounded-full border-[#f2b705] bg-[#f2b705] px-4 text-slate-900"
                : "rounded-full border-white/20 bg-white/5 px-4 text-white hover:border-white/100 hover:bg-white hover:text-[#0b2538]"
            )}
          >
            {filtro.label}
          </Link>
        );
      })}
    </div>
  );
}
