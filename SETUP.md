# Guia de Configuração e Primeiro Acesso - VOTH

Este documento te ajuda a rodar o sistema pela primeira vez após clonar ou baixar o código.

---

## 1. Instalar dependências

```bash
npm install
```

---

## 2. Configurar variáveis de ambiente

Crie o arquivo `.env.local` na raiz (copie `.env.example`):

```bash
DATABASE_URL=postgres://user:pass@ep-xxxx.us-east-2.aws.neon.tech/voth?sslmode=require
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=gere_um_valor_aleatorio_seguro
BLOB_READ_WRITE_TOKEN=vercel_blob_token_aqui
```

### Como obter cada valor

| Variável               | Como conseguir                                                                                                  |
|------------------------|-----------------------------------------------------------------------------------------------------------------|
| `DATABASE_URL`         | [Neon Console](https://console.neon.tech/) → Criar projeto → copiar Connection String (Postgres)               |
| `NEXTAUTH_SECRET`      | `openssl rand -base64 32` ou qualquer string aleatória segura                                                   |
| `BLOB_READ_WRITE_TOKEN`| [Vercel Dashboard](https://vercel.com) → Storage → Blob → Generate token com permissões de leitura/escrita     |

---

## 3. Criar as tabelas no Neon

```bash
npm run db:push
```

Isso cria as tabelas `projetos`, `usuarios` e `configuracoes` automaticamente.

---

## 4. Criar o primeiro usuário admin

Rode este script Node.js **uma única vez**:

```bash
node -e "
const bcrypt = require('bcryptjs');
console.log('INSERT INTO usuarios (nome, email, senha_hash) VALUES');
console.log('\(', "'Admin'", ',', \"'gilberto@vothmontagens.com.br'\", ',', \"'\" + bcrypt.hashSync('MONTAGEM', 10) + \"'\", '\);');
"
```

Copie o resultado (`INSERT INTO ...`) e execute no **SQL Editor do Neon**.

> **Importante:** A senha inicial documentada para acesso ficou `MONTAGEM`. Troque depois se quiser endurecer o acesso.

---

## 5. Rodar o projeto

```bash
npm run dev
```

Acesse `http://localhost:3000` e faça login em `/admin/login` com:

- E-mail: `gilberto@vothmontagens.com.br`
- Senha: a que você definiu no passo 4

---

## 6. Publicar primeiro projeto

1. Entre em `/admin/novo-projeto`
2. Preencha título, local, data
3. Selecione múltiplas fotos (Ctrl + clique)
4. Ao salvar, o sistema te redireciona para a visualização pública em `/portfolio/[slug]`

---

## 7. Deploy na Vercel

```bash
npm install -g vercel
vercel
```

Configure as mesmas variáveis no painel da Vercel:
- Dashboard → Settings → Environment Variables

### Variáveis obrigatórias na Vercel

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `BLOB_READ_WRITE_TOKEN`

> Em produção, use em `NEXTAUTH_URL` a URL publicada do projeto, por exemplo: `https://seu-projeto.vercel.app`

---

## 8. Publicar no GitHub

Se a pasta ainda não for um repositório Git, rode:

```bash
git init
git add .
git commit -m "Initial VOTH portfolio"
git branch -M main
git remote add origin <URL_DO_REPOSITORIO>
git push -u origin main
```

---

## Dúvidas ou problemas?

Consulte `README.md` para detalhes técnicos do projeto ou entre em contato com o desenvolvedor.
