import { Client } from "./types";

export const clientsData: Client[] = [
  {
    id: "cli_1",
    name: "TechForza Soluções",
    status: "active",
    domain: "techforza.com.br",
    industry: "Tecnologia",
    revenue: "R$ 12M/ano",
    pipelineStage: "won",
    notes: "Cliente em expansão. Fechou contrato de suporte anual para o NEW OS no Q2.",
    contacts: [
      {
        name: "Carlos Almeida",
        email: "carlos@techforza.com.br",
        phone: "(11) 98765-4321",
        role: "Diretor de TI",
      },
    ],
    proposals: [
      {
        id: "prop_1_1",
        title: "Implementação NEW OS Premium",
        value: 120000,
        status: "accepted",
        sentAt: "2026-05-10",
        documentSlug: "oferta-estrategica",
      },
    ],
  },
  {
    id: "cli_2",
    name: "Aliança Alimentos",
    status: "lead",
    domain: "alianca.ind.br",
    industry: "Manufatura",
    revenue: "R$ 45M/ano",
    pipelineStage: "proposal",
    notes: "Apresentamos a proposta em 18 de Julho. Aguardando retorno da diretoria.",
    contacts: [
      {
        name: "Mariana Costa",
        email: "mariana.costa@alianca.ind.br",
        phone: "(19) 99812-3456",
        role: "Gerente de Operações",
      },
    ],
    proposals: [
      {
        id: "prop_2_1",
        title: "Auditoria e Processo Comercial NEX",
        value: 45000,
        status: "sent",
        sentAt: "2026-07-18",
        documentSlug: "processo-comercial",
      },
    ],
  },
  {
    id: "cli_3",
    name: "Ponto Seguro Corretora",
    status: "lead",
    domain: "pontoseguro.com",
    industry: "Seguros / Serviços",
    revenue: "R$ 8M/ano",
    pipelineStage: "contact",
    notes: "Primeiro contato produtivo. Agendada reunião de diagnóstico comercial para próxima terça.",
    contacts: [
      {
        name: "Rodrigo Diniz",
        email: "rodrigo.diniz@pontoseguro.com",
        phone: "(21) 97112-9988",
        role: "Diretor Comercial",
      },
    ],
    proposals: [],
  },
  {
    id: "cli_4",
    name: "Vanguarda Construtora",
    status: "lead",
    domain: "vanguardaind.com.br",
    industry: "Construção Civil",
    revenue: "R$ 60M/ano",
    pipelineStage: "closing",
    notes: "Fase de fechamento de contrato. Jurídico revisando os termos da proposta aceita preliminarmente.",
    contacts: [
      {
        name: "Alberto Souza",
        email: "alberto@vanguardaind.com.br",
        phone: "(11) 98111-2233",
        role: "Diretor Executivo",
      },
    ],
    proposals: [
      {
        id: "prop_4_1",
        title: "Modelagem Operacional NEW OS",
        value: 85000,
        status: "sent",
        sentAt: "2026-07-02",
        documentSlug: "new-os",
      },
    ],
  },
  {
    id: "cli_5",
    name: "Horto Distribuidores",
    status: "inactive",
    domain: "hortodistr.com",
    industry: "Logística",
    revenue: "R$ 15M/ano",
    pipelineStage: "lost",
    notes: "Perdemos a concorrência por desalinhamento no prazo de onboarding pretendido pelo cliente.",
    contacts: [
      {
        name: "Regina Ramos",
        email: "regina@hortodistr.com",
        phone: "(31) 99122-3344",
        role: "Gerente Geral",
      },
    ],
    proposals: [
      {
        id: "prop_5_1",
        title: "Playbook e Treinamento Comercial",
        value: 30000,
        status: "declined",
        sentAt: "2026-06-12",
        documentSlug: "playbook",
      },
    ],
  },
];
