import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { whatsappHref } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#especialidades", label: "Especialidades" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/#contato", label: "Contato" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-[#f3f0e8]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#0b2538] font-display text-xl font-semibold text-[#f3f0e8] shadow-[0_12px_30px_rgba(11,37,56,0.25)]">
            VO
          </div>
          <div>
            <p className="font-display text-2xl uppercase leading-none tracking-[0.18em] text-[#0b2538]">
              VOTH
            </p>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Montagem e Manutenção Industrial
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:text-[#0b2538]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "accent", size: "sm" }), "rounded-full px-5")}
        >
          Falar com um engenheiro
        </a>
      </div>
    </header>
  );
}