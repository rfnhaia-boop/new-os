import { Pattern } from "./types";

export const patternsData: Pattern[] = [
  {
    id: "pat-new-002",
    slug: "reutilizacao-de-padroes",
    title: "Reutilização de Padrões (Knowledge Core)",
    description: "Todo problema resolvido em um projeto deve ser extraído e documentado como um Padrão (Pattern) no Knowledge Core para reuso.",
    category: "architecture",
    content: `
# O Paradigma do Knowledge Core

A NEW não desenvolve produtos isolados. Ela desenvolve **Padrões de Engenharia, UX e Estratégia** que, quando combinados, formam produtos (NEX, FLOW, ERP, CRM).

Toda vez que um problema for resolvido, a solução não deve ficar restrita ao repositório do projeto. Ela deve ser mapeada, limpa de regras de negócios específicas e salva como um Pattern na biblioteca do NEW OS.

A escalabilidade da holding não está em programar mais rápido, está em não ter que programar o que já foi resolvido.
    `,
    relatedProjects: ["proj_new"],
    createdAt: "2026-07-26T03:00:00Z",
    updatedAt: "2026-07-26T03:00:00Z",
    author: "System"
  },
  {
    id: "pat-flow-014",
    slug: "database-concurrency-validation",
    title: "Validação Transacional e Prevenção de Concorrência",
    description: "Toda validação crítica deve ocorrer utilizando o banco de dados oficial do ambiente de produção (PostgreSQL) usando ferramentas como Testcontainers.",
    category: "database",
    content: `
# Validação Transacional

Para evitar problemas catastróficos como o *Double Booking*, os testes de integração e a arquitetura do sistema não devem depender de mocks ou bancos de dados em memória (como SQLite).

A regra oficial para sistemas que lidam com estado persistido e agendamentos concorrentes é utilizar isolamento transacional real.

## Padrão de Implementação
1. Identificação de fluxo de alta concorrência.
2. Criação de Lock Otimista ou Pessimista em nível de linha no banco.
3. Criação de testes de integração rodando concorrência artificial contra um \`Testcontainer\` PostgreSQL.
4. Homologação da falha por serialização (SQLSTATE 40001) para confirmar que o banco impediu o conflito.
    `,
    relatedProjects: ["proj_flow", "proj_erp"],
    createdAt: "2026-07-26T03:00:00Z",
    updatedAt: "2026-07-26T03:00:00Z",
    author: "System"
  },
  {
    id: "pat-erp-001",
    slug: "cognitive-load-reduction",
    title: "Redução de Carga Cognitiva",
    description: "O sistema não tenta adicionar módulos ou formulários; tenta eliminar atritos da operação.",
    category: "ux",
    content: `
# UX Orientada a Tarefas (Task-Driven Interface)

Sistemas corporativos tradicionais são orientados a tabelas de banco de dados (Telas CRUD). A experiência da NEW inverte esse modelo.

O usuário não precisa entender a estrutura de dados. Ele precisa executar uma tarefa.

## Como Aplicar
Em vez de exibir um formulário longo de "Cadastro de Cliente" com 50 campos:
- Pergunte qual é a intenção do usuário.
- Capture apenas o mínimo necessário para a tarefa atual.
- O sistema proativamente completa o resto ou pede em momentos oportunos.
- A interface deve parecer um assistente guiando a operação, não uma prancheta de preenchimento de dados.
    `,
    relatedProjects: ["proj_erp", "proj_nex", "proj_flow"],
    createdAt: "2026-07-26T03:00:00Z",
    updatedAt: "2026-07-26T03:00:00Z",
    author: "System"
  },
  {
    id: "pat-nex-011",
    slug: "sales-through-evolution",
    title: "Venda Através da Evolução (Não Software)",
    description: "A venda acontece através da implantação da infraestrutura, demonstrando evolução constante.",
    category: "sales",
    content: `
# Plataforma de Infraestrutura Digital

A NEW (através da NEX) não comercializa "um site", "um aplicativo" ou "um serviço".
Nós comercializamos a **Evolução da Infraestrutura Digital da Empresa**.

## Narrativa Comercial
A demonstração do sistema para o cliente deve seguir o princípio: *"A sua dor é essa. A NEW pensou nisso."*

A interface que o cliente consome não é um dashboard estático, é uma jornada proativa. O sistema deve sugerir melhorias e mostrar o retorno de investimento automaticamente.
    `,
    relatedProjects: ["proj_nex", "proj_erp", "proj_crm"],
    createdAt: "2026-07-26T03:00:00Z",
    updatedAt: "2026-07-26T03:00:00Z",
    author: "System"
  }
];
