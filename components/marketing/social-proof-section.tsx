import { proofPillars, proofStats, socialLogos } from "@/lib/site-content";

export function SocialProofSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="section-shell rounded-[2rem] p-8 md:p-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Prova social e autoridade</span>
            <h2 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.92] text-[#0b2538] md:text-6xl">
              O comprador industrial converte por segurança, histórico e evidência técnica.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Esta seção fecha a lógica do funil B2B: reforça experiência, mostra diferenciais e deixa claro que a VOTH atua com rigor técnico em ambientes que não toleram improviso.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {proofStats.map((item) => (
            <article key={item.value} className="rounded-[1.5rem] border border-[#173349]/10 bg-[#0b2538] p-6 text-[#f3f0e8]">
              <p className="font-display text-5xl uppercase leading-none text-[#f2b705] md:text-6xl">{item.value}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.label}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {proofPillars.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-[#173349]/10 bg-white/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Pilar</p>
              <h3 className="mt-4 font-display text-4xl uppercase leading-none text-[#0b2538]">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {socialLogos.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#173349]/10 bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0b2538] shadow-[0_10px_25px_rgba(11,37,56,0.08)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}