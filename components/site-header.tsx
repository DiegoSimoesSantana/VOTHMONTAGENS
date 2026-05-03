"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { whatsappHref } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#especialidades", label: "Especialidades" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/#contato", label: "Contato" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-[#f3f0e8]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={handleCloseMenu}>
          <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#0b2538] font-display text-xl font-semibold text-[#f3f0e8] shadow-[0_12px_30px_rgba(11,37,56,0.25)]">
            VO
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-xl uppercase leading-none tracking-[0.14em] text-[#0b2538] sm:text-2xl sm:tracking-[0.18em]">
              VOTH
            </p>
            <p className="hidden text-[10px] uppercase tracking-[0.22em] text-slate-500 sm:block md:text-xs md:tracking-[0.28em]">
              Montagem e Manutenção Industrial
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
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
          className={cn(buttonVariants({ variant: "accent", size: "sm" }), "hidden rounded-full px-5 sm:inline-flex lg:inline-flex")}
        >
          Falar com um engenheiro
        </a>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#173349]/10 bg-white/80 text-[#0b2538] shadow-[0_10px_24px_rgba(11,37,56,0.08)] transition hover:bg-white lg:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div id="mobile-navigation" className="border-t border-[#173349]/10 bg-[#fbfaf6]/98 px-4 py-4 shadow-[0_20px_50px_rgba(11,37,56,0.08)] lg:hidden sm:px-6">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleCloseMenu}
                className="rounded-2xl border border-[#173349]/10 bg-white/80 px-4 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b2538] transition hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "accent", size: "default" }), "mt-4 flex w-full rounded-full")}
          >
            Falar com um engenheiro
          </a>
        </div>
      ) : null}
    </header>
  );
}