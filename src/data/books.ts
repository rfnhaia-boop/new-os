import { Book } from "./types";

export const booksData: Book[] = [
  {
    id: "bk_001",
    title: "Playbook Operacional NEX",
    slug: "playbook-operacional-nex",
    description: "Guia completo de operação, vendas e arquitetura do ecossistema NEX.",
    chapter: "Capítulo 1: Fundações",
    volume: "Vol 1",
    version: "v2.4.0",
    readTime: "45 min",
    tags: ["operações", "playbook", "vendas"],
    products: ["NEX", "NEW OS"],
    agents: ["Comercial", "Suporte"],
    createdAt: "2026-07-01T10:00:00Z",
    updatedAt: "2026-07-21T10:00:00Z",
    sections: [
      {
        id: "sec_1",
        type: "chapter_header",
        title: "1. Introdução ao Ecossistema",
        content: "Entendendo o propósito e a visão unificada da empresa."
      },
      {
        id: "sec_2",
        type: "text",
        content: "O ecossistema NEX foi desenhado para consolidar todas as vertentes operacionais em um fluxo único. Através do uso de dados centralizados, garantimos que todos os agentes tenham a mesma visão do cliente."
      },
      {
        id: "sec_3",
        type: "quote",
        content: "A verdadeira inovação não está nas ferramentas que usamos, mas em como elas transformam nosso processo de ponta a ponta.",
        metadata: { author: "Diretoria de Inovação" }
      },
      {
        id: "sec_4",
        type: "objective",
        title: "Objetivos do Q3",
        content: "Reduzir o tempo de onboard de novos clientes em 30% através de automações de playbooks."
      },
      {
        id: "sec_5",
        type: "architecture",
        title: "Arquitetura de Dados",
        content: "Representação do fluxo de informações do CRM até o faturamento."
      },
      {
        id: "sec_6",
        type: "warning",
        title: "Atenção Crítica",
        content: "Nunca alterar o slug de um produto no banco sem rodar os scripts de migração correspondentes nas dependências."
      },
      {
        id: "sec_7",
        type: "best_practice",
        title: "Padrão de Comunicação",
        content: "Sempre logar interações com clientes diretamente na Timeline do CRM. Não manter histórico isolado em ferramentas não oficiais."
      },
      {
        id: "sec_8",
        type: "metric",
        title: "SLA de Resposta",
        content: "4 Horas",
        metadata: { subtext: "Meta global para tickets de suporte N1." }
      },
      {
        id: "sec_9",
        type: "decision",
        title: "Migração para Supabase",
        content: "Decidimos migrar de um backend próprio para Supabase para acelerar o desenvolvimento de features em tempo real."
      },
      {
        id: "sec_10",
        type: "related",
        title: "Documentação Relacionada",
        metadata: {
          links: [
            { title: "Manual de Vendas", url: "/documents/manual-vendas" },
            { title: "Política de Privacidade", url: "/documents/politica-privacidade" }
          ]
        }
      }
    ]
  },
  {
    id: "bk_002",
    title: "Guia de Arquitetura Front-end",
    slug: "guia-arquitetura-frontend",
    description: "Padrões de design, componentes e convenções de código (React/Next.js) do NEW OS.",
    chapter: "Componentes UI",
    volume: "Vol 2",
    version: "v1.1.0",
    readTime: "20 min",
    tags: ["desenvolvimento", "frontend", "react"],
    products: ["NEW OS"],
    agents: ["Engenharia", "Design"],
    createdAt: "2026-07-10T10:00:00Z",
    updatedAt: "2026-07-15T10:00:00Z",
    sections: [
      {
        id: "sec_2_1",
        type: "chapter_header",
        title: "Organização de Pastas",
        content: "Como estruturamos nossos componentes."
      },
      {
        id: "sec_2_2",
        type: "text",
        content: "Utilizamos um modelo feature-sliced ou agrupado por domínio. Em `src/components/`, separamos por contextos de negócio (ex: `clients`, `documents`, `projects`) e temos uma pasta genérica `ui`."
      },
      {
        id: "sec_2_3",
        type: "best_practice",
        title: "Uso de Ícones",
        content: "Utilizamos lucide-react. Mantenha os tamanhos padronizados (ex: w-4 h-4 para botões normais)."
      }
    ]
  }
];
