# 📌 ACTION PLAN - 30 DIAS
## Roadmap Tático para Próximo Mês

---

## 🎯 Objetivo
Tornar a plataforma **pronta para produção segura** + Apresentar Fase 2 para aprovação do cliente.

---

## SEMANA 1: Segurança Crítica (40h)

### Seg-Ter: Validação com Zod

**O que fazer:**
```bash
npm install zod
```

**Arquivo novo:** `lib/schemas/projetos.ts`
```typescript
import { z } from "zod";

export const criarProjetoSchema = z.object({
  titulo: z.string()
    .min(5, "Mínimo 5 caracteres")
    .max(200, "Máximo 200 caracteres")
    .regex(/^[a-zA-Z0-9\s,.\-()]+$/, "Caracteres especiais não permitidos"),
  
  local: z.string()
    .min(3, "Mínimo 3 caracteres")
    .max(150, "Máximo 150 caracteres"),
  
  data_execucao: z.string()
    .refine(date => !isNaN(new Date(date).getTime()), "Data inválida"),
  
  cliente: z.string().max(100).optional().default("Não informado"),
  descricao_curta: z.string().max(300).optional().default(""),
  descricao_completa: z.string().max(2000).optional(),
  
  categoria: z.enum(["montagem", "manutencao", "inspecao", "teste-hidrostatico", "spda"]),
  
  fotos: z.array(z.instanceof(File))
    .min(1, "Mínimo 1 foto")
    .max(20, "Máximo 20 fotos")
    .refine(
      files => files.every(f => f.type.startsWith('image/')),
      "Apenas imagens permitidas"
    )
    .refine(
      files => files.every(f => f.size <= 10 * 1024 * 1024),
      "Máximo 10MB por arquivo"
    ),
});
```

**Editar:** `app/actions/projetos.ts`
```typescript
// ANTES:
if (!titulo || !local || !dataExecucaoRaw) {
  throw new Error("Preencha título, local e data de execução.");
}

// DEPOIS:
try {
  const validated = criarProjetoSchema.parse({
    titulo,
    local,
    data_execucao: dataExecucaoRaw,
    cliente,
    descricao_curta: descricaoCurta,
    descricao_completa: descricaoCompleta,
    categoria,
    fotos: arquivos,
  });
} catch (error) {
  if (error instanceof z.ZodError) {
    throw new Error(error.errors[0].message);
  }
  throw error;
}
```

**Tempo:** 4h | **Teste:** Submeter strings maliciosas

---

### Ter-Qua: Rate Limiting

**O que fazer:** Instalar middleware de rate limit

```bash
npm install ratelimit
```

**Criar:** `lib/rate-limit.ts`
```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const loginRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "15m"), // 5 tentativas per 15 min
});

export const uploadRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1h"), // 10 uploads per hour
});
```

**Editar:** `lib/auth.ts` (no authorize callback)
```typescript
const ip = request?.ip || "unknown";
const identifier = `login:${parsed.data.email}:${ip}`;
const limit = await loginRateLimit.limit(identifier);

if (!limit.success) {
  return null; // Bloquear
}
```

**Tempo:** 4h | **Teste:** 5 logins falhos = bloqueado

---

### Qua-Qui: CORS Restrictivo

**Editar:** `next.config.ts`
```typescript
// ANTES:
remotePatterns: [
  { protocol: "https", hostname: "**" }
]

// DEPOIS:
remotePatterns: [
  {
    protocol: "https",
    hostname: "blob.vercelusercontent.com",
    pathname: "/**"
  }
]
```

**Tempo:** 1h | **Teste:** Tentar carregar imagem de `example.com` = bloqueada

---

### Qui-Sex: 2FA para Admin

**O que fazer:** Implementar TOTP (Google Authenticator)

```bash
npm install speakeasy qrcode
```

**Novo endpoint:** `app/api/auth/2fa/setup`
- Gera secret TOTP
- Retorna QR code
- Admin escaneia em app de autenticação

**Editar:** `lib/auth.ts`
- Verificar TOTP antes de issuer JWT

**Tempo:** 6h | **Teste:** Usar Google Authenticator

---

## SEMANA 2: Erro Handling & Testing (36h)

### Seg-Ter: Try-Catch em Uploads

**Editar:** `app/actions/projetos.ts`
```typescript
const uploads = await Promise.allSettled(
  arquivos.map(async (file) => {
    try {
      const blob = await put(caminho, file, { /* ... */ });
      return { success: true, url: blob.url };
    } catch (error) {
      // Log do erro
      console.error(`Upload failed for ${file.name}:`, error);
      // Retry logic
      return { success: false, file: file.name };
    }
  })
);

const falhados = uploads.filter(r => r.status === 'rejected' || !r.value.success);
if (falhados.length > 0) {
  throw new Error(
    `${falhados.length} arquivo(s) falharam. Tente novamente.`
  );
}
```

**Tempo:** 4h | **Teste:** Desligar internet, fazer upload = erro claro

---

### Ter-Qua: Logging Estruturado

**O que fazer:** Integrar Sentry ou Axiom

```bash
npm install @sentry/nextjs
```

**Editar:** `next.config.ts`
```typescript
import { withSentryConfig } from "@sentry/nextjs";

export default withSentryConfig(nextConfig, {
  org: "sua-org",
  project: "voth",
  authToken: process.env.SENTRY_AUTH_TOKEN,
});
```

**Usar em:** `app/actions/projetos.ts`
```typescript
import * as Sentry from "@sentry/nextjs";

try {
  // ...
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
```

**Tempo:** 4h | **Teste:** Erro é capturado no dashboard Sentry

---

### Qua-Qui: Image Optimization

**Editar:** `components/portfolio/project-carousel.tsx`
```tsx
// ANTES:
<Image src={url} alt={...} fill className="object-cover" />

// DEPOIS:
<Image
  src={url}
  alt={`${titulo} ${index + 1}`}
  fill
  className="object-cover"
  priority={index === 0}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
/>
```

**Tempo:** 4h | **Teste:** Lighthouse CWV melhora

---

### Qui-Sex: Testes Unitários

**Criar:** `__tests__/validacao.test.ts`
```typescript
import { criarProjetoSchema } from "@/lib/schemas/projetos";

describe("Validação de Projetos", () => {
  it("deve rejeitar XSS", () => {
    expect(() => criarProjetoSchema.parse({
      titulo: "<script>alert('XSS')</script>",
      // ...
    })).toThrow();
  });

  it("deve aceitar título válido", () => {
    expect(criarProjetoSchema.parse({
      titulo: "Teste Hidrostático de Reservatórios",
      // ...
    })).toBeDefined();
  });
});
```

**Comando:** `npm test`  
**Tempo:** 4h | **Teste:** 100% de cobertura em `schemas/`

---

## SEMANA 3: Deploy & Validação (20h)

### Seg-Ter: Build & Deploy

```bash
npm run build
npm run lint
# Sem erros? Deploy:
npm install -g vercel
vercel --prod
```

**Checklist:**
- [ ] Build passes
- [ ] ESLint clean
- [ ] Localhost funciona sem erro
- [ ] Deploy em staging (vercel preview)
- [ ] Todos testes PASS (CHECKLIST-TESTES.md)

**Tempo:** 4h

---

### Ter-Qua: UAT com Cliente

**O que testar com cliente:**
1. Publicar projeto novo (3x, diferentes categorias)
2. Aparece na timeline em tempo real
3. Filtros funcionam
4. Imagens carregam rápido
5. Mobile-friendly?
6. "Melhor que PDF?"

**Documento:** `CHECKLIST-TESTES.md` - Seção "Testes de Aceitação"

**Tempo:** 4h

---

### Qua-Sex: Documentação & Knowledge Transfer

**Update:**
- [ ] README.md - nova seção de segurança
- [ ] SETUP.md - instruções de 2FA
- [ ] ARQUITETURA.md - adicionar diagrama de segurança

**Criar:** `SEGURANCA.md`
```markdown
# Guia de Segurança VOTH

## Checklist de Segurança
- [ ] Rate limit ativo
- [ ] Validação Zod em todas ações
- [ ] 2FA habilitado para admin
- [ ] Logs no Sentry
- [ ] CORS restritivo
```

**Tempo:** 4h

---

## SEMANA 4: Proposta Fase 2 (8h)

### Seg: Preparar Apresentação

**Usando:**
- [RELATORIO-ANALISE-VOTH.md](RELATORIO-ANALISE-VOTH.md)
- [SUMARIO-EXECUTIVO.md](SUMARIO-EXECUTIVO.md)

**Criar:** Slide deck com:
1. Status atual (segurança 100%, performance OK)
2. Risk matrix (resolvidos? ✅)
3. 5 oportunidades de Fase 2
4. 3 pacotes de preço
5. Timeline (8, 16, 24 semanas)

**Tempo:** 4h

---

### Ter-Qua: Reunião com Cliente

**Agenda:** 1h30
1. Demonstração de correções (15 min)
2. Apresentação Fase 2 opcões (30 min)
3. Q&A + decision (45 min)

**Material:**
- [ ] Link para staging (Vercel preview)
- [ ] Slide deck
- [ ] Documento de preços
- [ ] Timeline visual

**Resultado Esperado:**
- ✅ Aprovação de segurança (Fase 1.1) → Deploy produção
- ✅ Seleção de 1 pacote Phase 2
- ✅ Assinatura de contrato

---

## 📊 Métricas de Sucesso

| Métrica | Target | Atual | Semana 4 |
|---------|--------|-------|---------|
| **Validação Zod** | 100% ações | 0% | ✅ 100% |
| **Tests PASS** | 95%+ | ❌ 0% | ✅ 100% |
| **Core Web Vitals** | Green | 🟡 Partial | ✅ Green |
| **Rate limit** | Ativo | ❌ Não | ✅ Sim |
| **2FA** | Configurado | ❌ Não | ✅ Sim |
| **Cliente Feedback** | Satisfeito | N/A | ✅ 5/5 |

---

## 💰 Investimento

**Desenvolvimento:** 40 + 36 + 20 + 8 = **104 horas**  
**Custo:** 104h @ R$ 150/h = **R$ 15.6k** (ou Incluso em bugfix/maintenance)

**Resultado:**
- Plataforma segura
- Cliente feliz
- Pronto para Fase 2
- Fundação para SaaS escalável

---

## ✅ Checklist Final

- [ ] Semana 1: Segurança (Zod, Rate limit, CORS, 2FA) ✅
- [ ] Semana 2: Erro handling (Try-catch, Logging, Images, Testes) ✅
- [ ] Semana 3: Deploy (Build, UAT, Docs) ✅
- [ ] Semana 4: Fase 2 (Pitch, Reunião, Contrato) ✅
- [ ] **Status:** PRONTO PARA FASE 2! 🚀

---

**Assinado por:** _______________  
**Data:** _______________  
**Aprovação Cliente:** _______________

