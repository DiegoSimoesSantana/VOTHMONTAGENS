# Arquitetura e Estratégia de UX - VOTH Montagens

Este documento detalha as decisões técnicas e de experiência do usuário que sustentam a plataforma VOTH.

---

## 🎯 Objetivo estratégico

Criar uma **ferramenta de trabalho prática**, não apenas um site institucional.

O problema que estamos resolvendo: **substituir o PDF como ferramenta de apresentação**, transformando o portfólio em um ativo digital vivo e atualizado 24/7.

---

## 🧩 Stack técnica escolhida

| Tecnologia          | Por quê?                                                                      |
|---------------------|-------------------------------------------------------------------------------|
| **Next.js App Router** | SSR/SSG nativo, rotas dinâmicas rápidas, SEO ideal para B2B                |
| **TypeScript**      | Reduz bugs, acelera refatoração, documentação inline                          |
| **Tailwind CSS**    | Velocidade de UI/UX, componentes consistentes sem CSS manual                  |
| **Neon (PostgreSQL)** | Serverless, escala automaticamente, integração oficial Vercel               |
| **Drizzle ORM**     | Type-safe, leve, migração automática com `db:push`                            |
| **Vercel Blob**     | CDN global para imagens de drone com URLs permanentes                         |
| **NextAuth**        | Autenticação confiável, apenas 1 credential provider (admin único)            |

---

## 📐 Estrutura de rotas e fluxos

### Rotas públicas (SEO otimizado)

- `/` → Hero com CTA para portfólio e admin
- `/portfolio` → Timeline vertical infinita com filtros (Montagem, Inspeção, SPDA, etc.)
- `/portfolio/[slug]` → Página individual com galeria, descrição técnica e linha do tempo

### Rotas privadas (admin apenas)

- `/admin/login` → Credentials (e-mail + senha)
- `/admin` → Dashboard rápido
- `/admin/novo-projeto` → Formulário de **4 campos essenciais** + campos opcionais colapsados

---

## 🧠 Decisões de UX estratégicas

### 1. Facilidade extrema de cadastro (anti-PDF)

**Problema:** No PDF, adicionar um novo projeto envolve abrir InDesign/Photoshop, editar, salvar, enviar.

**Solução:** Painel admin com **4 campos apenas**:
- Título
- Local
- Data
- Upload de múltiplas fotos (Ctrl + clique)

**Tempo estimado de cadastro:** < 1 minuto.

> Campos adicionais (cliente, categoria, descrição longa) ficam **colapsados** em `<details>` para não intimidar.

---

### 2. Visualização imediata (gatilho de satisfação)

**Psicologia aplicada:** Após salvar um projeto, o admin é **redirecionado automaticamente** para `/portfolio/[slug]`.

**Resultado esperado:** O dono da empresa vê sua obra "no ar" instantaneamente, gerando **dopamina** e criando um **hábito de uso**.

> "Eu publiquei, ficou lindo, quero publicar mais."

---

### 3. Timeline infinita vertical (máquina de credibilidade)

**Estética industrial:** Estrutura em **grid lado a lado**:
- **Esquerda:** Data destacada (FEV 2026) + Local
- **Direita:** Miniatura + Título + Badge de categoria

**Filtros por categoria:** Query params (`/portfolio?categoria=inspecao`) para SEO.

**Objetivo:** Cliente que entra no site vê **imediatamente** o histórico técnico da VOTH, organizado como uma linha do tempo corporativa (viés de empresa estabelecida).

---

### 4. Paleta de cores industriais (psicologia visual)

| Cor                 | Hexadecimal | Uso                                           |
|---------------------|-------------|-----------------------------------------------|
| **Azul Marinho**    | `#0A2A44`   | Texto principal, títulos, botões CTA principais |
| **Amarelo Segurança** | `#FFC107`  | CTAs de ação (publicar, adicionar), badges de destaque |
| **Cinza Claro**     | `#F8FAFC`   | Background geral (clean, rápido de renderizar) |

**Referência:** Equipamentos de proteção (capacetes amarelos, uniformes de alta visibilidade). Cliente industrial **reconhece inconscientemente** o padrão.

---

### 5. Upload múltiplo otimizado (Vercel Blob + CDN)

**Problema:** Imagens de drone da caldeiraria facilmente passam de 5MB cada.

**Solução:**
1. Upload para Vercel Blob com sufixo aleatório (evita conflito de nomes)
2. URL pública retornada instantaneamente
3. CDN global entrega imagem em <200ms de qualquer lugar do Brasil

**Path pattern:** `projetos/{slug}/{arquivo.jpg}` para organização futura.

---

## 📊 Schema do banco de dados

### Tabela `projetos`

| Campo                | Tipo        | Descrição                                |
|----------------------|-------------|------------------------------------------|
| `id`                 | serial PK   | Identificador único                      |
| `titulo`             | text        | Nome da obra                             |
| `slug`               | text unique | gerado com `slugify` + timestamp         |
| `data_execucao`      | date        | Data principal (ordena timeline)         |
| `local`              | text        | Ex: Serra/ES                             |
| `cliente`            | text        | Ex: Vale                                 |
| `descricao_curta`    | text        | Para timeline                            |
| `descricao_completa` | text        | Para página individual (opcional)        |
| `fotos`              | jsonb       | Array de URLs (Vercel Blob)              |
| `categoria`          | enum        | montagem, inspecao, spda, etc.           |
| `created_at`         | timestamp   | Auditoria                                |

**Estratégia de slug:** `titulo` + `-` + últimos 6 dígitos de `Date.now()` = único.

---

### Tabela `usuarios`

| Campo         | Tipo        | Descrição                    |
|---------------|-------------|------------------------------|
| `id`          | serial PK   |                              |
| `nome`        | text        |                              |
| `email`       | text unique | Login admin                  |
| `senha_hash`  | text        | bcrypt (cost 10)             |

**Autenticação:** NextAuth Credentials Provider. Session JWT (sem DB session).

---

### Tabela `configuracoes`

| Campo     | Tipo        | Uso futuro                                      |
|-----------|--------------|-------------------------------------------------|
| `chave`   | text unique  | Ex: `home_titulo`, `sobre_texto`                |
| `valor`   | text         | Conteúdo editável sem precisar de desenvolvedor |

**Exemplo de uso futuro:** Admin publica novo texto institucional direto pelo painel.

---

## 🚀 Server Actions (Next.js 14+)

### `criarProjeto(data: FormData)`

**Fluxo:**
1. Valida campos obrigatórios (titulo, local, data, fotos)
2. Gera slug único com `slugify` + timestamp
3. Faz upload de **cada imagem** para Vercel Blob em paralelo (`Promise.all`)
4. Insere no banco com `db.insert()` do Drizzle
5. Revalida `/portfolio` (cache)
6. **Redireciona** para `/portfolio/[slug]` (satisfação imediata)

**Segurança:** Validação de tipos com FormData nativa (nenhum campo pode ser injetado como array/objeto).

---

### `listarProjetos(filtroCategoria?: string)`

**Fluxo:**
1. Se `filtroCategoria` for válido, faz `WHERE categoria = ?`
2. Ordena por `dataExecucao DESC` + `createdAt DESC` (mais novo primeiro)
3. Retorna array de `Projeto[]`

**Performance:** Drizzle gera query PostgreSQL otimizada. Sem N+1.

---

### `buscarProjetoPorSlug(slug: string)`

**Fluxo:**
1. `SELECT * FROM projetos WHERE slug = ? LIMIT 1`
2. Retorna `Projeto | null`

**ISR (Incremental Static Regeneration):** Página gerada estaticamente com `generateStaticParams()`.

---

## 🔐 Autenticação e autorização

### NextAuth flow

1. Admin entra em `/admin/login`
2. Envia `{ email, password }` via Credentials Provider
3. `authorize()` busca usuário no banco, valida senha com bcrypt
4. Gera session JWT (sem tocar no banco novamente)
5. Middleware protege rotas `/admin/*` (exceto `/admin/login`)

**Session storage:** JWT cookie (`next-auth.session-token`).

**Proteção de rotas:** `getServerSession()` + redirect.

---

## 🎨 Componentes UI (shadcn-style)

Todos os componentes usam `cn()` (Tailwind Merge + clsx) para composição segura.

| Componente    | Uso                                                      |
|---------------|----------------------------------------------------------|
| `Button`      | Variants: default, accent, outline, ghost                |
| `Input`       | Ring focus em `#0A2A44`                                  |
| `Textarea`    | Min height 24 (6rem)                                     |
| `Label`       | Font-medium, slate-700                                   |
| `Card`        | Border sutil, shadow-sm, usado em forms e timeline items |
| `Badge`       | Categoria pills (montagem, inspeção, etc.)               |

---

## 📱 Responsividade

**Mobile-first:** Tailwind breakpoints `md:` e `lg:`.

**Grid adaptativo:** Timeline muda de `1 coluna` (mobile) para `2 colunas` (desktop).

**Carrossel de fotos:** Embla Carousel (React hooks), touch-friendly.

---

## 📈 SEO e performance

### SEO técnico

- Meta tags em `layout.tsx`
- `lang="pt-BR"` no HTML
- URLs semânticas (`/portfolio/manutencao-de-dutos-2026`)
- Imagens com `alt` preenchido automaticamente

### Performance

- **SSG** para projetos individuais (`generateStaticParams`)
- **ISR** para timeline (rebuild a cada visita nova)
- Imagens servidas via Vercel Blob CDN (global)
- Tailwind purge automático reduz CSS para <10KB

---

## 🚢 Deploy na Vercel

```bash
vercel
```

**Variáveis obrigatórias no dashboard:**
- `DATABASE_URL`
- `NEXTAUTH_URL` (https://vothmontagens.com.br)
- `NEXTAUTH_SECRET`
- `BLOB_READ_WRITE_TOKEN`

**Integração Neon:** Via marketplace Vercel, injeta `DATABASE_URL` automaticamente.

---

## 🔮 Roadmap futuro (escopo fora do MVP)

1. **Sistema de notificação por e-mail**
   - Tabela `contatos` (nome, e-mail)
   - Server Action `notificarNovosProjetos()`
   - Pixel de rastreamento (saber quem abriu)
   - Dashboard de visualizações

2. **Filtro avançado de timeline**
   - Por cliente (Petrobras, Vale, etc.)
   - Por ano (2024, 2025, 2026)

3. **Área de cliente (restrita)**
   - Cliente faz login e vê apenas projetos dele
   - Download de laudos técnicos em PDF

4. **Editor WYSIWYG no admin**
   - Descrição completa com formatação rica
   - Upload inline de imagens complementares

---

## 🏆 Por que esta stack vence o PDF

| Critério              | PDF       | Site VOTH       |
|-----------------------|-----------|-----------------|
| Velocidade de publicação | 15 min+ | < 1 minuto      |
| Atualização constante    | Manual  | Automática      |
| SEO                      | Zero    | Total           |
| Compartilhamento         | Anexo   | Link curto      |
| Rastreamento de quem viu | Não     | Sim (futuro)    |
| Device-friendly          | Não     | Sim (responsive)|

---

## 📞 Contato técnico

Para dúvidas sobre arquitetura ou fluxos de código, consulte:
- `README.md` → Instruções básicas
- `SETUP.md` → Guia de primeiro acesso
- `lib/db/schema.ts` → Estrutura completa do banco
- `app/actions/projetos.ts` → Lógica de negócio principal

---

**Diego Santana**  
DSS APOIO ADMINISTRATIVO LTDA  
CNPJ: 09.509.739/0001-09  
📱 71 98806-8222
