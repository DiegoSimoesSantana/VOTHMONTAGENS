import { sql } from "drizzle-orm";
import { date, jsonb, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { PROJECT_CATEGORIES } from "@/constants/categories";

export const categoriaProjetoEnum = pgEnum("categoria_projeto", PROJECT_CATEGORIES);

export const projetos = pgTable("projetos", {
  id: serial("id").primaryKey(),
  titulo: text("titulo").notNull(),
  slug: text("slug").notNull().unique(),
  dataExecucao: date("data_execucao", { mode: "date" }).notNull(),
  local: text("local").notNull(),
  cliente: text("cliente").notNull().default("Não informado"),
  descricaoCurta: text("descricao_curta").notNull().default(""),
  descricaoCompleta: text("descricao_completa"),
  fotos: jsonb("fotos")
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  categoria: categoriaProjetoEnum("categoria").notNull().default("montagem"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const usuarios = pgTable("usuarios", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  email: text("email").notNull().unique(),
  senhaHash: text("senha_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const configuracoes = pgTable("configuracoes", {
  id: serial("id").primaryKey(),
  chave: text("chave").notNull().unique(),
  valor: text("valor").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Projeto = typeof projetos.$inferSelect;
export type NovoProjeto = typeof projetos.$inferInsert;
