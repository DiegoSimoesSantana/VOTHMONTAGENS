"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectCarousel({ fotos, titulo }: { fotos: string[]; titulo: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    sync();
    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);

    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi]);

  const prev = () => emblaApi?.scrollPrev();
  const next = () => emblaApi?.scrollNext();

  if (!fotos.length) {
    return (
      <div className="section-shell rounded-[1.75rem] p-10 text-center">
        <p className="text-sm leading-7 text-slate-600">Este projeto ainda nao possui imagens publicadas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[1.75rem] border border-[#173349]/10 bg-[#dbe2e7]" ref={emblaRef}>
        <div className="flex">
          {fotos.map((url, index) => (
            <div key={`${url}-${index}`} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative h-[360px] w-full bg-slate-100 md:h-[560px]">
                <Image src={url} alt={`${titulo} ${index + 1}`} fill className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent px-5 py-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em]">Registro {String(index + 1).padStart(2, "0")}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em]">{fotos.length} imagens</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {fotos.length > 1 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {fotos.map((url, index) => (
            <button
              key={`${url}-thumb-${index}`}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={`relative overflow-hidden rounded-2xl border transition ${
                index === selectedIndex
                  ? "border-[#f2b705] shadow-[0_12px_24px_rgba(242,183,5,0.18)]"
                  : "border-[#173349]/10 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="relative h-24 w-full bg-slate-100">
                <Image src={url} alt={`${titulo} miniatura ${index + 1}`} fill className="object-cover" />
              </div>
            </button>
          ))}
        </div>
      ) : null}

      {fotos.length > 1 ? (
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={prev} className="rounded-full">
            <ChevronLeft className="mr-1 h-4 w-4" /> Anterior
          </Button>
          <Button type="button" variant="outline" onClick={next} className="rounded-full">
            Próxima <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
