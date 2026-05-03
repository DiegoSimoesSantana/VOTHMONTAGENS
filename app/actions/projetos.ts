"use server";

import { and, desc, eq, ne } from "drizzle-orm";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isProjectCategory } from "@/constants/categories";
import { getDb, hasDatabaseConfig } from "@/lib/db";
import { projetos, type Projeto } from "@/lib/db/schema";
import { logError, logWarn } from "@/lib/logger";
import { limitProjectUpload } from "@/lib/rate-limit";
import {
  criarProjetoSchema,
  filtroCategoriaSchema,
  slugProjetoSchema,
} from "@/lib/schemas/projetos";
import { gerarSlug } from "@/lib/utils";

type Categoria = Projeto["categoria"];

function normalizarCategoria(categoria?: string | null): Categoria | undefined {
  if (!isProjectCategory(categoria)) return undefined;
  return categoria;
}

async function slugUnico(titulo: string) {
  const base = gerarSlug(titulo);
  const candidato = `${base}-${Date.now().toString().slice(-6)}`;
  return candidato;
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function uploadComRetry(file: File, caminhoBase: string, tentativas = 3) {
  let ultimaFalha: unknown;

  for (let tentativa = 1; tentativa <= tentativas; tentativa += 1) {
    try {
      const blob = await put(caminhoBase, file, {
        access: "public",
        addRandomSuffix: true,
      });
      return blob.url;
    } catch (error) {
      ultimaFalha = error;
      if (tentativa < tentativas) {
        await delay(300 * tentativa);
      }
    }
  }

  throw ultimaFalha;
}

export async function criarProjeto(data: FormData) {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for") || "unknown";
  const clientIp = forwardedFor.split(",")[0]?.trim() || "unknown";

  const rateLimitResult = await limitProjectUpload(clientIp);
  if (!rateLimitResult.success) {
    throw new Error("Muitas publicações em sequência. Aguarde alguns minutos e tente novamente.");
  }

  const titulo = String(data.get("titulo") || "").trim();
  const local = String(data.get("local") || "").trim();
  const dataExecucaoRaw = String(data.get("data_execucao") || "").trim();
  const cliente = String(data.get("cliente") || "Não informado").trim() || "Não informado";
  const descricaoCurta = String(data.get("descricao_curta") || "").trim();
  const descricaoCompletaRaw = String(data.get("descricao_completa") || "").trim();
  const categoria = normalizarCategoria(String(data.get("categoria") || "").trim()) || "montagem";
  const arquivos = data
    .getAll("fotos")
    .filter((item): item is File => item instanceof File)
    .filter((file) => file.size > 0);

  const parsed = criarProjetoSchema.safeParse({
    titulo,
    local,
    dataExecucaoRaw,
    cliente,
    descricaoCurta,
    descricaoCompleta: descricaoCompletaRaw || null,
    categoria,
    arquivos,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Dados inválidos para publicação do projeto.");
  }

  const payload = parsed.data;
  const db = getDb();

  const slug = await slugUnico(payload.titulo);

  const uploads = await Promise.all(
    payload.arquivos.map(async (file) => {
      const safeFileName = sanitizeFileName(file.name);
      const caminho = `projetos/${slug}/${safeFileName}`;

      try {
        return await uploadComRetry(file, caminho);
      } catch (error) {
        logError({
          event: "project_upload_failed",
          message: "Falha no upload para Vercel Blob após tentativas de retry.",
          context: {
            fileName: file.name,
            clientIp,
            slug,
          },
          error,
        });
        throw new Error("Não foi possível concluir o upload de uma ou mais imagens. Tente novamente.");
      }
    })
  );

  let novoProjeto: { slug: string } | undefined;

  try {
    [novoProjeto] = await db
      .insert(projetos)
      .values({
        titulo: payload.titulo,
        slug,
        local: payload.local,
        cliente: payload.cliente,
        dataExecucao: new Date(payload.dataExecucaoRaw),
        descricaoCurta: payload.descricaoCurta,
        descricaoCompleta: payload.descricaoCompleta,
        fotos: uploads,
        categoria: payload.categoria,
      })
      .returning({ slug: projetos.slug });
  } catch (error) {
    logError({
      event: "project_insert_failed",
      message: "Falha ao persistir projeto no banco de dados.",
      context: {
        slug,
        titulo: payload.titulo,
        clientIp,
      },
      error,
    });
    throw new Error("Não foi possível salvar o projeto no momento. Tente novamente em instantes.");
  }

  if (!novoProjeto?.slug) {
    throw new Error("Projeto criado sem slug válido. Tente novamente.");
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin/novo-projeto");
  redirect(`/portfolio/${novoProjeto.slug}`);
}

export async function listarProjetos(filtroCategoria?: string) {
  if (!hasDatabaseConfig) {
    return [];
  }

  const db = getDb();
  const parsedCategoria = filtroCategoriaSchema.safeParse(filtroCategoria || undefined);
  const categoria = parsedCategoria.success ? parsedCategoria.data : undefined;

  if (!parsedCategoria.success && filtroCategoria) {
    logWarn({
      event: "invalid_category_filter",
      message: "Filtro de categoria inválido recebido; retornando listagem geral.",
      context: { filtroCategoria },
    });
  }

  if (categoria) {
    return db
      .select()
      .from(projetos)
      .where(and(eq(projetos.categoria, categoria)))
      .orderBy(desc(projetos.dataExecucao), desc(projetos.createdAt));
  }

  return db.select().from(projetos).orderBy(desc(projetos.dataExecucao), desc(projetos.createdAt));
}

export async function listarClientesUnicos(limite = 12) {
  if (!hasDatabaseConfig) {
    return [];
  }

  const db = getDb();
  const clientes = await db
    .selectDistinct({ cliente: projetos.cliente })
    .from(projetos)
    .where(and(ne(projetos.cliente, ""), ne(projetos.cliente, "Não informado")))
    .orderBy(projetos.cliente)
    .limit(limite);

  return clientes.map((item) => item.cliente).filter(Boolean);
}

export async function buscarProjetoPorSlug(slug: string) {
  if (!hasDatabaseConfig) {
    return null;
  }

  const parsedSlug = slugProjetoSchema.safeParse(slug);
  if (!parsedSlug.success) {
    return null;
  }

  const db = getDb();
  const [projeto] = await db.select().from(projetos).where(eq(projetos.slug, parsedSlug.data)).limit(1);
  return projeto ?? null;
}
