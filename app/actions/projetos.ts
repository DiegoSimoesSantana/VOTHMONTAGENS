"use server";

import { and, desc, eq } from "drizzle-orm";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb, hasDatabaseConfig } from "@/lib/db";
import { projetos, type Projeto } from "@/lib/db/schema";
import { gerarSlug } from "@/lib/utils";

type Categoria = Projeto["categoria"];

function normalizarCategoria(categoria?: string | null): Categoria | undefined {
  if (!categoria) return undefined;
  const categoriasValidas: Categoria[] = [
    "montagem",
    "manutencao",
    "inspecao",
    "teste-hidrostatico",
    "spda",
  ];
  if (categoriasValidas.includes(categoria as Categoria)) return categoria as Categoria;
  return undefined;
}

async function slugUnico(titulo: string) {
  const base = gerarSlug(titulo);
  const candidato = `${base}-${Date.now().toString().slice(-6)}`;
  return candidato;
}

export async function criarProjeto(data: FormData) {
  const db = getDb();
  const titulo = String(data.get("titulo") || "").trim();
  const local = String(data.get("local") || "").trim();
  const dataExecucaoRaw = String(data.get("data_execucao") || "");
  const cliente = String(data.get("cliente") || "Não informado").trim() || "Não informado";
  const descricaoCurta = String(data.get("descricao_curta") || "").trim();
  const descricaoCompleta = String(data.get("descricao_completa") || "").trim();
  const categoria = normalizarCategoria(String(data.get("categoria") || "")) || "montagem";
  const arquivos = data.getAll("fotos").filter((item): item is File => item instanceof File);

  if (!titulo || !local || !dataExecucaoRaw) {
    throw new Error("Preencha título, local e data de execução.");
  }

  if (!arquivos.length || arquivos.every((file) => file.size === 0)) {
    throw new Error("Adicione ao menos uma foto do projeto.");
  }

  const slug = await slugUnico(titulo);

  const uploads = await Promise.all(
    arquivos
      .filter((file) => file.size > 0)
      .map(async (file) => {
        const caminho = `projetos/${slug}/${file.name}`;
        const blob = await put(caminho, file, {
          access: "public",
          addRandomSuffix: true,
        });
        return blob.url;
      })
  );

  const [novoProjeto] = await db
    .insert(projetos)
    .values({
      titulo,
      slug,
      local,
      cliente,
      dataExecucao: new Date(dataExecucaoRaw),
      descricaoCurta,
      descricaoCompleta: descricaoCompleta || null,
      fotos: uploads,
      categoria,
    })
    .returning({ slug: projetos.slug });

  revalidatePath("/portfolio");
  revalidatePath("/admin/novo-projeto");
  redirect(`/portfolio/${novoProjeto.slug}`);
}

export async function listarProjetos(filtroCategoria?: string) {
  if (!hasDatabaseConfig) {
    return [];
  }

  const db = getDb();
  const categoria = normalizarCategoria(filtroCategoria || undefined);

  if (categoria) {
    return db
      .select()
      .from(projetos)
      .where(and(eq(projetos.categoria, categoria)))
      .orderBy(desc(projetos.dataExecucao), desc(projetos.createdAt));
  }

  return db.select().from(projetos).orderBy(desc(projetos.dataExecucao), desc(projetos.createdAt));
}

export async function buscarProjetoPorSlug(slug: string) {
  if (!hasDatabaseConfig) {
    return null;
  }

  const db = getDb();
  const [projeto] = await db.select().from(projetos).where(eq(projetos.slug, slug)).limit(1);
  return projeto ?? null;
}
