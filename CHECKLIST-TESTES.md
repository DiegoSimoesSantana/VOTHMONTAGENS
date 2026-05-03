# 🧪 CHECKLIST DE TESTES - VOTH MONTAGENS
## Testes Funcionais, Segurança, Performance e Aceitação

**Data:** Maio 2026  
**Status:** Pré-Deploy antes da Fase 1.1  
**Responsável:** QA / Dev Lead

---

## ✅ TESTES FUNCIONAIS - FRONTEND

### Landing Page (/)
- [ ] Hero section carrega sem erros
- [ ] CTAs funcionam (WhatsApp, Portfólio links)
- [ ] Responsivo em mobile (320px), tablet (768px), desktop (1920px)
- [ ] Vídeos carregam (WhatsApp Videos)
- [ ] Imagens carregam (fallbackGallery)
- [ ] Seção de serviços mostra 4 cards
- [ ] Social proof stats aparecem correammente
- [ ] Footer links funcionam (WhatsApp, email)
- [ ] SEO: Title, description, canonical URL corretos

### Portfolio Page (/portfolio)
- [ ] Lista de projetos carrega sem erro
- [ ] Timeline vertical renderiza corretamente
- [ ] 5 filtros funcionam (Todos, Montagem, Teste Hidr, Inspeção, SPDA)
- [ ] Alternar categoria muda URL query param (`?categoria=montagem`)
- [ ] Sem projetos: mensagem padrão aparece
- [ ] Imagens principal carregam no carrossel
- [ ] Hover efeito em cards funciona
- [ ] Clique em projeto redireciona para `/portfolio/[slug]`

### Página Individual (/portfolio/[slug])
- [ ] Slug correto na URL
- [ ] Dados do projeto carregam (título, local, data, cliente, categoria)
- [ ] Badge de categoria exibe label correto
- [ ] Carrossel de fotos funciona:
  - [ ] Navegação "Anterior/Próxima"
  - [ ] Thumbnails clicáveis
  - [ ] Indicador de foto (3/10)
  - [ ] Zoom comportamento bom
- [ ] "Voltar ao portfólio" redireciona para `/portfolio`
- [ ] Descrição completa renderiza (se preenchida)
- [ ] 3 "janelas internas" (Antes, Durante, Resultado) aparecem
- [ ] Responsivo mobile

### Admin Login (/admin/login)
- [ ] Página carrega sem erro
- [ ] Form com 2 campos (email, senha)
- [ ] Submit com email inválido = erro "Credenciais inválidas"
- [ ] Submit com email correto, senha errada = erro
- [ ] Submit com credenciais CORRETAS = redireciona para `/admin/novo-projeto`
- [ ] Session mantida ao navegar
- [ ] Teste 2FA (se implementado): Código enviado por SMS/email

### Admin Dashboard (/admin)
- [ ] Carrega (protegido)
- [ ] Mostra "Publicação rápida com foco..."
- [ ] Link para "Novo Projeto" funciona
- [ ] Se não autenticado: redireciona para `/admin/login`

### Admin Novo Projeto (/admin/novo-projeto)
- [ ] Form carrega
- [ ] Submit SEM preencher obrigatórios = erro "Preencha..."
- [ ] Submit com título: OK
- [ ] Submit com local: OK
- [ ] Submit com data (date picker): OK
- [ ] Upload múltiplo: Permite Ctrl+Click
- [ ] Upload com 0 fotos = erro "Adicione ao menos uma foto"
- [ ] Upload com 10+ fotos funciona
- [ ] Campos opcionais (<details>) expandem/colapsam
- [ ] Select de categoria mostra 5 opções
- [ ] Submit COM dados = Redirecionamento para `/portfolio/[novo-slug]`
- [ ] Novo projeto aparece em `/portfolio` em tempo real

---

## 🔐 TESTES DE SEGURANÇA

### Validação de Input
- [ ] **XSS - Título:** Injetar `<script>alert('XSS')</script>` no título
  - Esperado: Escapado, não executa
  - Status: [ ] PASS [ ] FAIL
- [ ] **XSS - Descrição:** `<img src=x onerror="alert('XSS')">`
  - Esperado: Não renderiza, texto literalmente
  - Status: [ ] PASS [ ] FAIL
- [ ] **SQL Injection - Cliente:** Injetar `' OR '1'='1`
  - Esperado: Tratado como string literal
  - Status: [ ] PASS [ ] FAIL
- [ ] **Validação de Data:** Submeter `notadate` no field data_execucao
  - Esperado: Erro de validação ou rejeição
  - Status: [ ] PASS [ ] FAIL
- [ ] **Tamanho máximo de descrição:** Copiar 10MB de texto
  - Esperado: Truncado ou erro
  - Status: [ ] PASS [ ] FAIL

### Autenticação & Autorização
- [ ] **Bypass de login:** Acessar `/admin/novo-projeto` sem autenticação
  - Esperado: Redireciona para `/admin/login`
  - Status: [ ] PASS [ ] FAIL
- [ ] **JWT tampering:** Modificar token no cookie
  - Esperado: Session inválida, logout
  - Status: [ ] PASS [ ] FAIL
- [ ] **Múltiplos logins simultâneos:** Login em 2 abas diferentes
  - Esperado: Ambos funcionam (JWT stateless)
  - Status: [ ] PASS [ ] FAIL

### Upload de Arquivos
- [ ] **Arquivo não-imagem:** Tentar upload de `.exe`, `.pdf`, `.txt`
  - Esperado: Rejeitado ou aceito? (spec: `accept="image/*"`)
  - Status: [ ] PASS [ ] FAIL
- [ ] **Arquivo muito grande:** Upload de 500MB
  - Esperado: Erro ou timeout
  - Status: [ ] PASS [ ] FAIL
- [ ] **Duplo upload:** Enviar mesmo arquivo 2x
  - Esperado: Duplica na galeria ou deduplica?
  - Status: [ ] PASS [ ] FAIL

### CORS & Remote Patterns
- [ ] **Origem diferente:** Fazer fetch de outro domínio para `/api`
  - Esperado: [VERIFICAR] se CORS está configurado
  - Status: [ ] PASS [ ] FAIL
- [ ] **Image loading:** Carregues imagens de domínio malicioso
  - Esperado: Bloqueado (não "**" aberto)
  - Status: [ ] PASS [ ] FAIL

### Data Exposed
- [ ] **WhatsApp URL público:** Número telefônico não deve ser coletável por bot
  - Esperado: Está visível (ok, é intencional), validar spam risk
  - Status: [ ] OK [ ] ALERTA
- [ ] **Credentials em código:** Verificar `/SETUP.md` se contém senhas
  - Esperado: Senha exemplo documentada (MONTAGEM), avisar para mudar
  - Status: [ ] ⚠️ RISCO

---

## ⚡ TESTES DE PERFORMANCE

### Core Web Vitals
- [ ] **LCP (Largest Contentful Paint):** < 2.5s na homepage
  - Ferramentas: [PageSpeed Insights](https://pagespeed.web.dev), Lighthouse
  - Status: [ ] PASS (< 2.5s) [ ] WARN (2.5-4s) [ ] FAIL (> 4s)
- [ ] **FID (First Input Delay):** < 100ms
  - Status: [ ] PASS [ ] WARN [ ] FAIL
- [ ] **CLS (Cumulative Layout Shift):** < 0.1
  - Status: [ ] PASS [ ] WARN [ ] FAIL

### Imagem Performance
- [ ] **Image Optimization:** Carrossel de imagens usa `Image` component
  - Esperado: Redimensiona automaticamente
  - Status: [ ] PASS [ ] Não otimizado
- [ ] **Lazy loading:** Imagens abaixo da dobra não carregam até scroll
  - Status: [ ] Implementado [ ] Faltando
- [ ] **WebP with fallback:** Browser suporta?
  - Status: [ ] Implementado [ ] Faltando

### Database Query Performance
- [ ] **N+1 Query Problem:** Listar projetos não faz N queries
  - Usar: DevTools React Query, ou `console.log()` em `projetos.ts`
  - Status: [ ] PASS (1 query) [ ] FAIL (N queries)
- [ ] **Sem filter:** Carregar `/portfolio?categoria=invalid` = erro 500 ou graceful?
  - Status: [ ] Tratado [ ] Erro

### Caching
- [ ] **ISR Revalidation:** Criar projeto, refresh em 5 min = novo projeto aparece
  - Status: [ ] Funciona [ ] Cacheia 1h+
- [ ] **Browser Cache:** Visitar mesma página 2x = mais rápida?
  - Status: [ ] Sim [ ] Não (sempre fresh)

---

## 🎨 TESTES DE UX/USABILIDADE

### Responsividade
- [ ] **Mobile (320px):** Todas páginas legíveis, sem scroll horizontal
  - Testar em: iPhone SE (375px), Pixel 4 (412px)
  - Status: [ ] PASS [ ] FAIL
- [ ] **Tablet (768px):** Layout multi-coluna funciona
  - Status: [ ] PASS [ ] FAIL
- [ ] **Desktop (1920px):** Sem espaço vazio demais
  - Status: [ ] PASS [ ] FAIL

### Touch Targets
- [ ] **Botões:** Minimum 44x44px em mobile
  - Status: [ ] OK [ ] Muito pequeno
- [ ] **Links:** Clicáveis e com espaço entre eles
  - Status: [ ] OK [ ] Muito próximos

### Legibilidade
- [ ] **Contraste:** Texto claro vs fundo (WCAG AA)
  - Tool: [WebAIM](https://webaim.org/resources/contrastchecker/)
  - Status: [ ] PASS [ ] FAIL
- [ ] **Font size:** Mínimo 14px em corpo de texto
  - Status: [ ] OK [ ] Muito pequeno

### Acessibilidade (Bônus)
- [ ] **Alt text:** Todas imagens têm `alt` descritivo
- [ ] **Keyboard navigation:** Tab funciona entre links/botões
- [ ] **Color blindness:** Site é usável sem cores (grayscale)

---

## 🚀 TESTES DE PRODUÇÃO

### Deploy
- [ ] **Build sem erro:** `npm run build` passa
- [ ] **Start sem erro:** `npm start` levanta server
- [ ] **Variáveis de ambiente:** DATABASE_URL, NEXTAUTH_SECRET, etc
- [ ] **SSL certificado válido:** HTTPS funciona em vothmontagem.com.br

### Monitoring
- [ ] **Error tracking:** Erros capturados em serviço externo (Sentry, etc)?
  - Status: [ ] Configurado [ ] Não

### Uptime
- [ ] **Teste de carga:** Simular 100 usuários simultâneos
  - Tool: [k6](https://k6.io/), [Load Testing Vercel](https://vercel.com)
  - Esperado: Sem timeouts
  - Status: [ ] PASS [ ] FAIL

---

## 📊 TESTES DE REGRESSÃO

### Após implementar Fase 1.1 (Segurança)

- [ ] **Validação Zod:** Mensagens de erro aparecem inline no form? 
- [ ] **2FA:** SMS/Email chega? Code expira após 5 min?
- [ ] **Rate limit:** 5o login falho = bloqueado por 5 min?
- [ ] **CORS:** Remote patterns só permite `*.vercel-blob.com`?
- [ ] **Hashes bcrypt:** Novas senhas usam cost 10?

---

## 👥 TESTES DE ACEITAÇÃO (UAT)

### Com o Cliente
- [ ] Admin consegue publicar 3 projetos sem problema
- [ ] Projetos aparecem no portfólio publicado em < 5 min
- [ ] Imagens carregam rápido
- [ ] Filtros funcionam como esperado
- [ ] Mobile-friendly (testou no iPhone/Android?)
- [ ] "Parece melhor que o PDF?"

### Feedback Esperado
- [ ] Cliente satisfeito: ✅ Seguir para Fase 2
- [ ] Problemas encontrados: 🔴 Voltar para correção

---

## 📋 CHECKLIST DE DEPLOY

Antes de ir para produção:

- [ ] Todos testes PASS (ou documentados como known issues)
- [ ] Code review finalizado
- [ ] `.env.local` seguro (sem credenciais em git)
- [ ] Build otimizado (sem console.log em prod)
- [ ] Analytics ativo (GA4, Vercel Analytics)
- [ ] Backup BD antes de deploy
- [ ] Rollback plan em caso de erro
- [ ] Cliente notificado sobre nova versão
- [ ] Documentação atualizada (README, SETUP.md)

---

## 🎯 RESULTADO FINAL

**Total de Testes:** 60+  
**Target:** 100% PASS  
**Tempo Estimado:** 8 horas (1 dia de QA)

**Assinado em:** _______________  
**Por:** _______________  
**Data:** _______________

---

### Observações & Issues Encontrados

```
[ ] Nenhum issue crítico encontrado
[ ] Issues encontrados:
   1. _______________________________
   2. _______________________________
   3. _______________________________
```

---

**Conclusão:** Se todos os testes passarem, plataforma está **PRONTA PARA PRODUÇÃO** e pode receber Fase 2 com confiança.

