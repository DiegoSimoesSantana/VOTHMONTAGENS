import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { clsx, type ClassValue } from "clsx";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function gerarSlug(titulo: string) {
  return slugify(titulo, { lower: true, strict: true, trim: true });
}

export function mesAno(data: Date) {
  return format(data, "MMM yyyy", { locale: ptBR }).toUpperCase();
}
