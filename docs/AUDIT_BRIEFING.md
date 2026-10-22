# Briefing de auditoria — BioFlow

**Para:** Bruna
**De:** Melissa (a pedido do Junior)
**Data:** 21/10/2026
**Repo:** `github.com/jrpasolini/bioflow` · branch `main` = `12bc507`
**Produção:** `https://jrpasolini.tech/bioflow/` · API `https://bioflow-api.antonio-pasolini.workers.dev`

---

## 1. O que é isso

Demo pública do BioFlow: um histórico laboratorial longitudinal com identidade fictícia (Walter White). Um visitante entra com um código público, baixa três PDFs sintéticos, sobe um deles, e o Google Gemma 4 extrai as leituras. O visitante revisa e confirma; o laudo entra no histórico da sessão e **expira em 60 minutos**.

Não é produto médico. Não diagnostica. Nenhum dado real pode entrar.

---

## 2. O que auditar (em ordem de risco)

### 🔴 Prioridade 1 — Correção dos dados extraídos

É o coração da demo e onde estavam os defeitos reais.

**Invariante:** *nenhuma leitura pode ser registrada se o documento não foi lido por inteiro.*

Pontos de atenção, todos em `apps/api/src/demo-gemma.ts`:

| Risco | O que verificar |
|---|---|
| Truncamento silencioso | `chunkDocument()` não pode descartar texto. Já houve um teto de 10 chunks que cortava 41% e 49% de dois laudos — e a resposta ainda dizia "sucesso". Hoje documento grande é **recusado** (`document_too_large`), nunca cortado. |
| Chunk que falha | Um chunk com erro é retentado uma vez; se falhar de novo, aborta com `incomplete_extraction`. **Nunca** devolver laudo parcial como completo. |
| Legenda virando exame | `isLegendReading()` em `packages/fixtures/src/analytes.ts`. Laudos imprimem escalas de graduação ("Bacteriúria ausente: < 58/uL; Raras: 59 a 1500/uL"). O modelo lia cada limite como medição. |
| Decimal ambíguo | `toNumber()` aceita vírgula brasileira (`5,170`) e nunca adivinha forma ambígua. |
| Unidade relabelada | `canonicalUnit()` só normaliza grafias conhecidas. **`g/L` não pode virar `g/dL`** — isso inventaria valor 10× menor. |

**Amostras atuais (22/10/2026):** baixe novamente o ZIP reduzido. Os PDFs têm uma página cada e 23, 21 e 24 resultados, respectivamente (15/05, 01/10 e 02/10). Os números de extração do restante deste registro são históricos, da edição maior. Aguarde a recuperação da cota antes de chamar a Gemma; respeite o rate limit. A correspondência da extração deve ser conferida contra o PDF enviado, não contra contagens históricas.

### 🔴 Prioridade 2 — Caminho de erro (o que ninguém clica)

Foi aqui que moraram os bugs graves. Auditar cada ramo:

- Sessão expira durante o upload
- Gemma falha no meio da extração
- PDF grande demais
- Arquivo que não é um dos três permitidos (`sample_not_allowed`)
- Limite de 3 exames (`demo_limit_reached` — deve ser **429**, não 503)
- Prova HMAC adulterada ou laudo alterado depois da extração (`report_changed`)

Cada erro tem código próprio e a UI traduz. Verificar que **nenhum** erro genérico esconde a causa.

### 🟠 Prioridade 3 — Isolamento do banco

- `bioflow_demo` (permanente): 26 laudos, usuário `bioflow_runtime` = **só read**
- `bioflow_sessions` (temporário): escritas da demo, TTL 60 min, usuário `bioflow_sessions_rw` com `readWrite` **só aqui**

**Verificar:** o usuário de escrita da demo **não consegue ler** `bioflow_demo`. Já testado, mas merece confirmação independente.

**Verificar também:** um visitante não vê os dados temporários de outro. O `sessionId` vem do token HMAC, não do corpo da requisição.

### 🟠 Prioridade 4 — Design (o que a Bruna vai mexer)

Três armadilhas de build:

1. **O build é subpath.** O comando é `npm run build:subpath` (`--base=/bioflow/`). `vite build` puro **quebra os assets** em produção — o site não fica na raiz.
2. **O service worker** é gerado por `scripts/build-sw.mjs`, que faz parte do `build:subpath`. Mexer em cache sem rodar isso deixa a PWA servindo bundle velho.
3. **Os testes fixam números do acervo:** `604 leituras`, `26 laudos`, `71 analitos` em três asserções (`apps/api/tests/security.test.mjs`, `packages/fixtures/tests/synthetic.test.mjs`). Se alterar dados sintéticos, os testes vão falhar — e é bom que falhem. Atualize os números **com** a mudança, nunca para "fazer passar".

**Acessibilidade:** o design de referência tinha pontos de gráfico inacessíveis por teclado. O BioFlow tem seleção explícita, foco visível, rótulos de texto e modo de movimento reduzido. Não perder isso.

### 🟡 Prioridade 5 — Segurança

Ver `docs/SECURITY.md` (12 itens). Destaques:

- Código público `110526` abre **só** dado fictício já público. Não é fator de autenticação.
- Rotas privadas de PDF estão **desligadas** (`ENABLE_PDF_ENDPOINTS=false`) e falham fechado.
- Nenhum segredo no frontend, no GitHub ou em log.

---

## 3. Invariantes que não podem mudar

1. **Só os três PDFs auditados entram no caminho pago de IA.** Hash verificado antes de qualquer chamada ao modelo (`demo-samples.ts`).
2. **Nada de dado real.** O acervo é 100% sintético e declarado.
3. **Expiração ancorada na sessão**, não no momento do commit. Quem confirma aos 59 minutos ainda recebe um laudo que morre com a sessão.
4. **A demo nunca escreve no acervo permanente.** `realDbRunner` é fixo em `bioflow_sessions`.
5. **Nenhuma leitura é inventada.** Se o documento não tem valor numérico, a lista fica vazia — e isso é válido.
6. **Proveniência:** toda leitura tem `sourcePage` apontando para a página do **laudo original** (não do PDF republicado).

---

## 4. Como rodar

```bash
npm ci
npm test          # 56 testes
npm run typecheck
npm run build:subpath   # NÃO use `vite build` puro
```

Deploy do Worker (manual):
```bash
npx wrangler deploy -c apps/api/wrangler.jsonc
```

---

## 5. Estado atual (verificado em 21/10, 19:20)

| Item | Valor |
|---|---|
| Acervo em produção | 26 laudos · **604 leituras** · 71 analitos |
| Testes | 56/56 verdes |
| Typecheck | limpo |
| Worker | `94a8342e` |
| Extração 2026-10-02 | 56 leituras → **55 entram no histórico** |
| Órfã legítima | 1 (`estimatedAverageGlucose` — derivada do HbA1c, não é medição) |

---

## 6. O que eu já sei que está frágil

Sendo honesta, para você não gastar tempo descobrindo:

- **Latência:** 30–70 s por extração. Chunks rodam em paralelo, mas o Gemma é o gargalo. Se a banca tiver pressa, isso aparece.
- **Custo:** ~US$ 0,003 por extração, sem teto global configurado em Workers AI.
- **Atlas ingress:** `0.0.0.0/0` até 29/10 (limite de 7 dias do Atlas). Decisão de 22/10: tornar permanente.
- **Usuário redundante:** `bioflow_demo_writer` tem o mesmo papel do `bioflow_sessions_rw`. Pode ser removido.
- **`MONGODB_URI` ausente no Worker:** sem ela, `/api/demo/overview` cai nos fixtures sintéticos em vez do Atlas. Hoje o site serve fixtures — funciona, mas o Atlas não está sendo exercitado na vitrine.
- **Sem teste visual automatizado:** validei tudo por API e por código. O print da tela com o laudo importado é o único elo sem prova.

---

## 7. O que eu não fiz e você pode querer fazer

- Teste end-to-end automatizado (hoje é manual)
- Verificação de acessibilidade com leitor de tela real
- Auditoria de dependências (`npm audit`)
- Revisão de LGPD — mesmo sintético, o produto se apresenta como histórico de saúde

---

*Qualquer dúvida sobre uma decisão específica, o histórico de commits conta a história: `git log --oneline -6` mostra os cinco consertos de hoje, cada um com o motivo no corpo da mensagem.*
