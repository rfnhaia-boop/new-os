# PLANO — NEW OS vira Agentic OS

## 👁️ O pivot

Até aqui o NEW OS era uma inteligência passiva: mostrava dado, documentava processo, mas quem fazia o trabalho era o Rafael. A partir daqui ele vira uma agência de verdade — um núcleo de agentes de IA que trabalha para o Rafael, cada um dono de um domínio do negócio, todos coordenados por um orquestrador central.

Duas referências trazidas por ele definem a forma:
- **Sureflow Agentic OS** — o núcleo: um agente orquestrador (CEO) comandando agentes especialistas, cada um com papel, modelo e status próprios.
- **Optimal Engine (bennettx.ai)** — as ramificações: cada domínio de negócio vira um cluster de conhecimento vivo (grafo de nós conectados), não uma lista estática. O funil de clientes, por exemplo, é um desses grafos.

O núcleo decide e roteia. As ramificações são onde o conhecimento de cada área vive e cresce.

---

## 🧠 Núcleo — os agentes

| Agente | Domínio | Módulo NEW OS existente que ele herda |
|---|---|---|
| **CEO** — Orquestrador | Interpreta pedidos, roteia, decide | `/ia` (hoje simulado) + `/evolution/governance` |
| **COO** — Operação | Projetos, tarefas, entregas | `/projects`, `/tasks` |
| **CRO** — Comercial | Funil, propostas, clientes | `/clients` |
| **CMO** — Growth | Conteúdo, campanhas, aquisição | (não existe ainda) |
| **Head of Research** — Conhecimento | Padrões, decisões, benchmarks | `/evolution/knowledge`, `/patterns`, `/books` |
| **CDO** — Dados | Métricas, impacto real | `/evolution/impact` (hoje só o tipo existe, sem dado real) |

Nenhum agente nasce do zero — cada um assume um módulo que o NEW OS já tem construído e passivo.

---

## 🔄 O motor que qualifica o dado (o que mais importa)

Isso não é um dashboard que só exibe informação. É um loop fechado:

```
Evento (conversa, sessão, decisão)
   → Ingestão (captura bruta)
   → Curadoria por IA (extrai, classifica, decide o que é relevante)
   → Memória / Sugestão (fica registrado no Core, vira patrimônio institucional)
   → Aprovação (o Rafael decide o que aplica)
   → Aplicado → Impacto medido (funcionou ou não, com métrica real)
```

O formato desse loop já existe modelado em `src/data/evolution/` (`OperationalIngestion`, `MemoryEntry`, `ImprovementProposal`, `ImpactAssessment`) e já tem UI de aprovação pronta (`approval-workflow-viewer.tsx`). Hoje é tudo mock e manual (o arquivo `handoff_malta.md`). O trabalho é automatizar e persistir isso, não reinventar.

---

## 🏗️ Arquitetura técnica

- **Banco**: Supabase (Postgres), projeto `newos's Org` (`jnsyqdafhsysgdqwdyrf`)
- **Camada de dados**: `src/data/*` deixa de ser arquivo estático e vira client Supabase — mesmas interfaces TypeScript já definidas, só troca a fonte
- **Orquestração**: LLM real (Claude) no papel do CEO, decidindo e acionando os outros agentes via function calling
- **Visual em grafo** (estilo Optimal Engine): construído com o Gemini depois que os dados reais existirem — é UI complexa demais pra eu desenhar sozinho, meu papel é deixar a estrutura de dados certa por baixo

---

## 🗺️ Fases (uma de cada vez, com aprovação entre elas)

### Fase 1 — Fundação de dados
Criar as tabelas no Supabase (`actors`, `operational_ingestions`, `memory_entries`, `improvement_proposals`, `impact_assessments`, `approval_flows`, `audit_logs`, mais `clients`, `projects`, `tasks`, `documents`, `users` migrados do mock). Trocar a leitura do `src/data` pra vir do banco.
**Pronto quando**: o dashboard carrega dado real do Supabase, não mais do arquivo mock.

### Fase 2 — Command Center navegável (versão rústica)
Uma tela nova com os 6 agentes (status, modelo, domínio) ligada na tabela `actors` real — sem capricho visual ainda, só pra você navegar, apontar o que muda e eu ajustar rápido.

### Fase 3 — Pipeline de curadoria automática
Uma entrada onde uma conversa real vira `operational_ingestion` sozinha, passa pela curadoria e cai na fila de aprovação — sem handoff manual em markdown.

### Fase 4 — Agentes vivos
O CEO chama LLM de verdade pra rotear. Cada especialista ganha ação real no domínio dele (CRO mexe em clientes, COO mexe em projetos). O `/ia` deixa de ser simulado.

Detalhado em 2026-08-01 pelo Rafael, três camadas dentro dessa fase:
- **Voz**: o orquestrador (núcleo) precisa ter voz — conversa falada, não só chat de texto. Camada de TTS/STT por cima do LLM.
- **Execução real (não só decisão)**: o agente não pode só sugerir, precisa agir — entrar na máquina do Rafael, abrir uma plataforma, usar um token que já existe, fazer uma tarefa concreta (ex: gerar imagem numa plataforma que ele não sabe gerar sozinho, mas sabe operar). Tecnicamente isso é automação tipo computer-use / browser-use — o Rafael já tem esse tipo de ferramenta disponível pra mim nesta própria sessão (`computer-use` e `Claude Browser`), então não é hipotético, é extensão direta do que já existe.
- **Integrações de negócio ligadas ao agente certo**: ex. Meta Ads — o CMO (Growth) resolvendo a conta de Meta/tráfego diretamente. Ele citou também uma ferramenta de infraestrutura de agente pronta que quer usar de base (nome não capturado direito por erro de transcrição de voz — confirmar com ele antes de desenhar essa parte).

### Fase 5 — Grafo de conhecimento visual
Com dado real das fases anteriores, gero o prompt pro Gemini construir a visualização em grafo por domínio.

---

## ✅ Status agora (atualizado 2026-08-01)

- **Fase 1 — concluída**: 17 tabelas criadas no Supabase (via SQL Editor), schema batendo com `prisma/schema.prisma`. Client real em `src/lib/supabase/admin.ts` (secret key, uso interno confiável — ainda sem auth de usuário real).
- **Fase 2 — concluída**: Central de Comando em `/command-center`, núcleo + 6 agentes vindo do banco (`actors`), visual em grafo orbital.
- **Fase 3 — concluída**: pipeline de ingestão real em `/evolution/ingestions` — criar (`new/actions.ts`, Server Action), listar e ver detalhe, tudo lendo/gravando no Supabase de verdade (`src/lib/supabase/ingestions.ts`). Testado ponta a ponta.
  - **Limite conhecido e intencional**: a curadoria automática (extrair `operational_changes` estruturados do texto bruto via IA) ainda não existe — toda ingestão nova entra com status "Recebido" e zero alterações. Isso é proposital: fica pra Fase 4, quando a IA de verdade (CEO orquestrador) entra em cena.
  - **Gotcha técnico pra lembrar**: os `id` das tabelas usam `cuid()` do Prisma, que só é gerado pelo *client* do Prisma. Como o app não usa o Prisma Client em runtime (só `supabase-js`), todo `insert` novo precisa gerar o `id` manualmente com `crypto.randomUUID()` — senão quebra por `NOT NULL`.
- **Fase 4a — curadoria automática: concluída e testada**. `src/lib/ai/curate-ingestion.ts` chama o Gemini (`gemini-3.5-flash`, mesma chave do `.mcp.json`) com `responseSchema` estruturado, extrai as `operational_changes` e sobe o status da ingestão pra "under_review" sozinho. Fallback gracioso se `GEMINI_API_KEY` não estiver setada (loga aviso, ingestão continua "received").
- **Fase 4b — motor de execução: Hermes instalado e rodando na VPS**. `72.62.107.199` (Hostinger, mesma VPS do n8n/Chatwoot/OpenWA). Configurado com a chave do Gemini (`gemini-3.5-flash`, Google AI Studio) — sem conta no Nous Portal, sem custo. Roda como serviço systemd de usuário (`hermes-gateway.service`), ~90MB de memória, testado com prompt real e respondeu corretamente.
  - CLI útil: `hermes -z "prompt"` pra rodar um comando único (não interativo), `hermes status` pra ver o estado, `hermes whatsapp` pra integrar WhatsApp nativo, `hermes cron` pra jobs agendados, `hermes webhook` pra assinar webhooks dinâmicos.
  - **Nota de segurança**: evitar a flag `--yolo` do Hermes (desliga as travas de segurança do agente) — não usar em produção sem necessidade clara.
- **NEW OS implantado na VPS** (2026-08-01): repo em `/root/new-os` (`git@github.com:rfnhaia-boop/new-os`), rodando via PM2 (`pm2 start npm --name new-os -- start -- -p 3030`), nginx configurado em `/etc/nginx/sites-available/new-os` apontando pra `new-os.newflowsys.cloud`. `HERMES_MODE=local` no `.env.local` da VPS — o Hermes agora é chamado como processo local (`bash -c 'hermes -z "$PROMPT" --continue newos-command-center'`), sem SSH, testado e funcionando.
  - **Falta**: registro DNS `new-os.newflowsys.cloud → 72.62.107.199` (painel Hostinger — fora do alcance via SSH) e depois `certbot --nginx -d new-os.newflowsys.cloud` pra HTTPS (mesmo padrão do trader/lari/etc).
  - `.env.local` da VPS tem as mesmas chaves do dev local (Supabase + Gemini) — não versionado, só nesse arquivo na própria VPS.
- **Fase 4c — voz**: ainda não iniciada, mas o próprio Hermes já tem voz embutida (TTS/STT) — pode não precisar de serviço externo separado, só habilitar.
