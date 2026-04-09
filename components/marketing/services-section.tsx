import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site-content";

export function ServicesSection() {
  return (
    <section id="especialidades" className="mx-auto max-w-7xl px-6 py-18">
      <div className="rounded-[2rem] bg-[#0b2538] px-8 py-10 text-white shadow-[0_24px_80px_rgba(11,37,56,0.22)] md:px-12 md:py-14">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-slate-300 before:bg-slate-500">Nossas especialidades</span>
            <h2 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.92] md:text-6xl">
              Autoridade técnica para quem compra segurança, execução e entrega.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            A VOTH precisa converter como uma empresa de engenharia: com prova visual, rigor de
            processo e serviços organizados de forma que o gestor técnico identifique rapidamente a
            capacidade operacional da equipe.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/6 backdrop-blur-md transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:border-[#f2b705] hover:shadow-[0_22px_60px_rgba(0,0,0,0.22)]"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover brightness-75 transition-all duration-300 group-hover:scale-[1.03] group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07131d] via-[#07131d]/25 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-[#f2b705]/40 bg-[#f2b705]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f6cd45]">
                  {service.badge}
                </span>
              </div>

              <div className="space-y-4 p-6">
                <h3 className="font-display text-4xl uppercase leading-[0.9] text-white">{service.title}</h3>
                <p className="text-sm leading-7 text-slate-300">{service.description}</p>
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#f6cd45]">
                  <span>Saiba mais</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}