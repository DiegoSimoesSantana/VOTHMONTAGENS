import Link from "next/link";
import { commercialEmail, whatsappHref } from "@/lib/site-content";

const footerLinks = [
  { href: "/#especialidades", label: "Especialidades" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/#contato", label: "Contato" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#173349]/15 bg-[#0b2538] text-[#f3f0e8]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <p className="font-display text-3xl uppercase tracking-[0.16em]">VOTH</p>
          <p className="max-w-xl text-sm leading-7 text-slate-300">
            Apresentação técnica de obras, testes, comissionamento e montagem industrial com foco
            em autoridade de engenharia, segurança operacional e leitura clara de campo.
          </p>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-[#f2b705] transition hover:text-white">
            WhatsApp técnico
          </a>
          <a href={`mailto:${commercialEmail}`} className="block text-sm text-slate-300 transition hover:text-white">
            {commercialEmail}
          </a>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#f2b705]">Mapa do site</p>
          <div className="space-y-3 text-sm text-slate-300">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#f2b705]">Frentes</p>
          <div className="space-y-3 text-sm text-slate-300">
            <p>Teste hidrostático e comissionamento</p>
            <p>Adutoras, aquedutos e redes industriais</p>
            <p>NR-13, manutenção e montagem em campo</p>
          </div>
        </div>
      </div>
    </footer>
  );
}