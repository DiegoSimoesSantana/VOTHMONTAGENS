import { z } from "zod";
import { PROJECT_CATEGORIES } from "../../constants/categories";

const MIN_TITLE_LENGTH = 5;
const MAX_TITLE_LENGTH = 200;
const MIN_LOCATION_LENGTH = 3;
const MAX_LOCATION_LENGTH = 150;
const MAX_CLIENT_LENGTH = 120;
const MAX_SHORT_DESCRIPTION_LENGTH = 300;
const MAX_LONG_DESCRIPTION_LENGTH = 2000;
const MAX_IMAGES = 20;
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

const textoSemTags = z
  .string()
  .trim()
  .refine((value) => !/[<>]/.test(value), "Remova tags HTML do conteúdo informado.");

const imagemSchema = z
  .custom<File>((value) => value instanceof File, "Arquivo inválido.")
  .refine((file) => file.size > 0, "Arquivo vazio não é permitido.")
  .refine((file) => file.type.startsWith("image/"), "Apenas imagens são permitidas.")
  .refine((file) => file.size <= MAX_IMAGE_SIZE_BYTES, "Cada imagem pode ter no máximo 10MB.");

export const criarProjetoSchema = z.object({
  titulo: textoSemTags
    .min(MIN_TITLE_LENGTH, `Título deve ter ao menos ${MIN_TITLE_LENGTH} caracteres.`)
    .max(MAX_TITLE_LENGTH, `Título deve ter no máximo ${MAX_TITLE_LENGTH} caracteres.`),
  local: textoSemTags
    .min(MIN_LOCATION_LENGTH, `Local deve ter ao menos ${MIN_LOCATION_LENGTH} caracteres.`)
    .max(MAX_LOCATION_LENGTH, `Local deve ter no máximo ${MAX_LOCATION_LENGTH} caracteres.`),
  dataExecucaoRaw: z.iso.date("Data de execução inválida."),
  cliente: textoSemTags
    .max(MAX_CLIENT_LENGTH, `Cliente deve ter no máximo ${MAX_CLIENT_LENGTH} caracteres.`)
    .default("Não informado"),
  descricaoCurta: textoSemTags
    .max(
      MAX_SHORT_DESCRIPTION_LENGTH,
      `Descrição curta deve ter no máximo ${MAX_SHORT_DESCRIPTION_LENGTH} caracteres.`
    )
    .default(""),
  descricaoCompleta: textoSemTags
    .max(
      MAX_LONG_DESCRIPTION_LENGTH,
      `Descrição completa deve ter no máximo ${MAX_LONG_DESCRIPTION_LENGTH} caracteres.`
    )
    .nullable()
    .default(null),
  categoria: z.enum(PROJECT_CATEGORIES).default("montagem"),
  arquivos: z
    .array(imagemSchema)
    .min(1, "Adicione ao menos uma foto do projeto.")
    .max(MAX_IMAGES, `É permitido enviar no máximo ${MAX_IMAGES} imagens por projeto.`),
});

export const filtroCategoriaSchema = z.enum(PROJECT_CATEGORIES).optional();

export const slugProjetoSchema = z
  .string()
  .trim()
  .min(3, "Slug inválido.")
  .max(220, "Slug inválido.")
  .regex(/^[a-z0-9-]+$/, "Slug inválido.");
