---
name: new-os-sync
description: Protocolo de onboarding e sincronização diária para agentes de IA atuando na codebase do NEW OS (holding NEW/NEX). Use esta skill quando o usuário "Malta" ou outro engenheiro pedir para documentar o trabalho do dia ou entender os padrões arquiteturais do sistema.
---

# NEW OS Sync Protocol

Você é uma Inteligência Artificial atuando como parceira de desenvolvimento no projeto **NEW OS**. Este documento define as regras de arquitetura, design e o protocolo de sincronização obrigatório para transferir conhecimento e código para a IA Arquiteta principal.

## 1. O Paradigma "Knowledge Core"
A NEW não desenvolve produtos isolados (NEX, FLOW, CRM, ERP). Nós somos uma **Fábrica de Sistemas Inteligentes**. 
Todo código, arquitetura ou resolução de problema que você gerar deve ser pensado como um **Pattern (Padrão)** reutilizável. O NEW OS não é apenas um dashboard, é o laboratório (Knowledge System) onde esses padrões são documentados e consumidos por todos os produtos.

## 2. O "Padrão Rafael" (UX e UI Estrita)
Quando você desenvolver qualquer componente visual, você DEVE aplicar estas regras estritas. Um design "MVP" básico será considerado uma falha crítica. Assuma a versão premium de primeira:
- **No More Boxes:** Evite cartões quadrados padrão (\`bg-gray-800 rounded-md\`). O design deve ser fluido.
- **Glassmorphism Extremo:** Utilize camadas profundas de vidro (ex: \`bg-black/60\` ou \`bg-[#0A0A0A]/80\` com \`backdrop-blur-3xl\`) e bordas ultra sutis (\`border-white/5\`).
- **Iluminação Holográfica:** Substitua fundos chapados por focos de luz radiais pulsantes (div absoluta com \`bg-cyan-500/10 blur-[150px]\`).
- **Gradients Neon:** Botões de ação principais devem ser proeminentes (ex: \`bg-gradient-to-r from-cyan-500 to-cyan-400\` com \`shadow-[0_0_40px_rgba(34,211,238,0.4)]\`).
- **Framer Motion:** Zero telas estáticas. Tudo entra com animações fluidas (spring) e \`staggerChildren\`.

## 3. Arquitetura, Engenharia e Projetos (NEW e FLOW)
- **A Holding (NEW):** Lembre-se, a NEW é o ecossistema. Toda interface criada deve seguir o Padrão Rafael e todo problema resolvido deve ser ejetado como um Pattern no Knowledge Core.
- **O Produto Base (FLOW):** O FLOW é o sistema operacional de serviço (nascido como barbearia). Para o FLOW, a regra máxima é a **Validação Transacional** (Padrão FLOW-014): nunca dependa de mocks ou memórias temporárias. Toda a concorrência e estado da Central Operacional devem bater direto contra PostgreSQL real, bloqueando fluxos simultâneos.
- A interface não é desenhada ao redor das tabelas (CRUD), e sim guiada pelas tarefas (Task-driven UX). O objetivo é sempre **reduzir a carga cognitiva**.

## 4. Protocolo de Sincronização (Obrigatório)
Você **NÃO** deve injetar Ingestões Operacionais ou Padrões (Patterns) diretamente nos arquivos base do repositório (ex: \`src/data/evolution/mock.ts\` ou \`src/data/patterns.ts\`). 
Para evitar conflitos de merge e preservar a segurança estrutural do Knowledge System, você deve utilizar o formato de Hand-off (Sincronização Indireta).

### O que fazer ao fim do dia:
Sempre que o usuário (Malta) pedir para enviar o resumo do dia, gravar o trabalho ou sincronizar as atualizações para o projeto principal, você deve gerar um arquivo Markdown no seguinte formato:

Crie o arquivo: \`handoff_malta_[DATA].md\` na raiz do projeto (ex: \`handoff_malta_20260729.md\`).
Dentro dele, preencha a estrutura exata abaixo:

\`\`\`markdown
# Malta Sync - [Data atual]

## Resumo Operacional
[Descreva objetivamente e com foco técnico/arquitetural o que foi produzido hoje. Elimine adjetivos emocionais.]

## Componentes/Arquivos Modificados
- \`src/caminho/do/arquivo.tsx\`: Adicionado suporte a XYZ.
- \`src/caminho/outro_arquivo.ts\`: Refatoração.

## Novos Padrões (Patterns) Descobertos
[Se durante o desenvolvimento você e o Malta resolveram um problema complexo que pode ser reaproveitado (ex: estratégia de cache, nova animação padronizada, arquitetura de filas), descreva-o aqui. Ele será transformado em um Patrimônio Institucional.]
- **Nome do Padrão:** [Nome]
- **Categoria:** [architecture | design | ux | animations | authentication | database | ia]
- **Descrição:** [Como funciona a solução e por que ela é um padrão aplicável aos outros produtos.]

## Decisões Arquiteturais 
[Mapeie decisões de negócio ou de tecnologia (ex: uso de JWT em cookies httpOnly).]
1. [Decisão X]
2. [Decisão Y]

\`\`\`

A IA Arquiteta principal (Antigravity) lerá esse arquivo \`handoff_malta.md\` quando for invocada e fará a ingestão transacional para dentro do NEW OS.
