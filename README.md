# VOTH Montagens - Plataforma Next.js + Neon

Base inicial para portfólio industrial com timeline pública e painel admin de cadastro rápido.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS + componentes estilo shadcn/ui
- Neon PostgreSQL + Drizzle ORM
- Upload de imagens com Vercel Blob
- NextAuth Credentials (1 admin)

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
DATABASE_URL=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
BLOB_READ_WRITE_TOKEN=
```

## Banco de dados (Drizzle)

```bash
npm run db:generate
npm run db:push
```

Tabelas criadas em `lib/db/schema.ts`:

- `projetos`
- `usuarios`
- `configuracoes`

## Rodar projeto

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

## Rotas principais

- `/portfolio` timeline vertical com filtros por categoria
- `/portfolio/[slug]` página individual com galeria em carrossel
- `/admin/login` autenticação de admin
- `/admin/novo-projeto` ação rápida com 4 campos essenciais + upload múltiplo

## Server Actions

Em `app/actions/projetos.ts`:

- `criarProjeto(data: FormData)`
- `listarProjetos(filtroCategoria?: string)`
- `buscarProjetoPorSlug(slug: string)`

## Fluxo rápido (anti-PDF)

1. Admin publica projeto em `/admin/novo-projeto`
2. Upload das fotos vai para Vercel Blob
3. Sistema salva no Neon
4. Redireciona automaticamente para `/portfolio/[slug]`

## Deploy

### GitHub

```bash
git init
git add .
git commit -m "Initial VOTH portfolio"
git branch -M main
git remote add origin <URL_DO_REPOSITORIO>
git push -u origin main
```

### Vercel

1. Importe o repositório no painel da Vercel.
2. Configure as variáveis de ambiente abaixo:
	- `DATABASE_URL`
	- `NEXTAUTH_URL`
	- `NEXTAUTH_SECRET`
	- `BLOB_READ_WRITE_TOKEN`
3. Faça o deploy.

Observação:

- Em produção, `NEXTAUTH_URL` deve ser a URL final do projeto publicado na Vercel.

