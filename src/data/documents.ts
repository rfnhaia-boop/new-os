import { DocumentData } from "./types";

export const documentsData: DocumentData[] = [
  {
    id: "1",
    slug: "contexto-base",
    titulo: "Contexto Base",
    descricao: "Diretrizes e fundamentação institucional da empresa.",
    categoria: "Empresa",
    currentVersion: "v1.2",
    status: "Validado",
    atualizadoEm: "Hoje",
    tempoLeitura: "8 minutos",
    publico: ["Geral", "Novos Membros"],
    conteudo: {
      secoes: [
        {
          titulo: "Introdução",
          texto: "Este documento descreve os pilares fundamentais da nossa organização, nossa missão de simplificar processos complexos e a visão de longo prazo."
        },
        {
          titulo: "História e Valores",
          texto: "Nascemos com o propósito de redefinir o gerenciamento corporativo. Nossos valores centrais guiam cada decisão técnica e de negócios."
        }
      ]
    },
    relacionados: ["icp", "posicionamento-da-nex"],
    tags: ["institucional", "cultura", "fundacao"],
    keywords: ["empresa", "identidade", "valores", "new"],
    versions: [
      {
        id: "contexto-base-v1-0",
        version: "v1.0",
        createdAt: "2026-06-01",
        author: "Rafael",
        summary: "Criação inicial das diretrizes institucionais.",
        changes: ["Redação da missão e visão", "Definição dos 3 pilares iniciais"],
        status: "published"
      },
      {
        id: "contexto-base-v1-2",
        version: "v1.2",
        createdAt: "2026-07-19",
        author: "Rafael",
        summary: "Revisão de valores institucionais e cultura.",
        changes: ["Ajuste no valor de transparência", "Inclusão da política de comunicação assíncrona"],
        status: "published"
      }
    ]
  },
  {
    id: "2",
    slug: "posicionamento-da-nex",
    titulo: "Posicionamento da NEX",
    categoria: "NEX",
    descricao: "Posicionamento estratégico e proposta de valor do núcleo NEX.",
    currentVersion: "v2.0",
    status: "Validado",
    atualizadoEm: "Ontem",
    tempoLeitura: "10 minutos",
    publico: ["Diretoria", "Equipe de Produto", "Comercial"],
    conteudo: {
      secoes: [
        {
          titulo: "A Missão do NEX",
          texto: "NEX atua como a inteligência central integradora de dados e automações. Ele dita o fluxo e o compasso de execução das demandas internas."
        },
        {
          titulo: "Pilares de Posicionamento",
          texto: "Foco total na automação inteligente, eliminação de gargalos processuais e governança por meio de dados transparentes."
        }
      ]
    },
    relacionados: ["new-os", "oferta-estrategica"],
    tags: ["posicionamento", "estrategia", "nex"],
    keywords: ["valor", "mercado", "execucao", "marca"],
    versions: [
      {
        id: "posicionamento-da-nex-v1-0",
        version: "v1.0",
        createdAt: "2026-05-10",
        author: "Camila",
        summary: "Draft estratégico inicial.",
        changes: ["Esboço inicial de posicionamento"],
        status: "published"
      },
      {
        id: "posicionamento-da-nex-v2-0",
        version: "v2.0",
        createdAt: "2026-07-18",
        author: "Camila",
        summary: "Reformulação do núcleo central e automações.",
        changes: ["Mapeamento de integrações nativas", "Redefinição dos pilares de governança de dados"],
        status: "published"
      }
    ]
  },
  {
    id: "3",
    slug: "oferta-estrategica",
    titulo: "Oferta Estratégica",
    categoria: "Produtos",
    descricao: "Estruturação das linhas de produtos e modelos de oferta comercial.",
    currentVersion: "v1.0",
    status: "Validado",
    atualizadoEm: "Há 3 dias",
    tempoLeitura: "15 minutos",
    publico: ["Comercial", "Sócios"],
    conteudo: {
      secoes: [
        {
          titulo: "Portfólio de Soluções",
          texto: "Nossa oferta se divide em módulos adaptáveis de acordo com a maturidade digital do cliente, facilitando o onboarding gradual."
        },
        {
          titulo: "Modelo de Pricing",
          texto: "Estrutura transparente de assinatura anual aliada a taxas de sucesso na opimização operacional comprovada."
        }
      ]
    },
    relacionados: ["processo-comercial", "icp"],
    tags: ["produtos", "comercial", "pricing"],
    keywords: ["venda", "valores", "mensalidade", "planos"],
    versions: [
      {
        id: "oferta-estrategica-v1-0",
        version: "v1.0",
        createdAt: "2026-07-16",
        author: "Matheus",
        summary: "Lançamento oficial da tabela de preços.",
        changes: ["Definição de pacotes e faixas de preço", "Adicionada política de descontos para contratos anuais"],
        status: "published"
      }
    ]
  },
  {
    id: "4",
    slug: "icp",
    titulo: "ICP",
    descricao: "Perfil de Cliente Ideal (Ideal Customer Profile) detalhado.",
    categoria: "Empresa",
    currentVersion: "v1.5",
    status: "Validado",
    atualizadoEm: "Há 10 min",
    tempoLeitura: "5 minutos",
    publico: ["Marketing", "Comercial", "Gestão"],
    conteudo: {
      secoes: [
        {
          titulo: "Definição do Perfil",
          texto: "Nosso foco está em empresas de tecnologia de médio porte que faturam acima de R$ 5M/ano e que possuem problemas crônicos de centralização de dados."
        },
        {
          titulo: "Critérios de Qualificação",
          texto: "Mapeamento de maturidade técnica, alinhamento cultural e prontidão orçamentária imediata ou no trimestre vigente."
        }
      ]
    },
    relacionados: ["marketing", "processo-comercial"],
    tags: ["vendas", "marketing", "icp"],
    keywords: ["comercial", "perfil", "cliente", "ideal", "empresa"],
    versions: [
      {
        id: "icp-v1-0",
        version: "v1.0",
        createdAt: "2026-04-20",
        author: "Fernanda",
        summary: "Primeiro mapeamento de clientes.",
        changes: ["Critérios básicos de faturamento e setor"],
        status: "published"
      },
      {
        id: "icp-v1-5",
        version: "v1.5",
        createdAt: "2026-07-19",
        author: "Fernanda",
        summary: "Refinamento do ICP tecnológico.",
        changes: ["Exclusão de empresas sem time de TI estruturado", "Mapeamento de problemas de centralização de dados"],
        status: "published"
      }
    ]
  },
  {
    id: "5",
    slug: "processo-comercial",
    titulo: "Processo Comercial",
    descricao: "Definir como a NEX conduz uma venda.",
    categoria: "Operação",
    currentVersion: "v1.0",
    status: "Validado",
    atualizadoEm: "Há 2 horas",
    tempoLeitura: "12 minutos",
    publico: ["Comercial", "Sócios", "IA Comercial"],
    conteudo: {
      secoes: [
        {
          titulo: "Introdução",
          texto: "Este documento visa padronizar o pipeline de vendas da NEX, desde a prospecção inicial até a assinatura do contrato, definindo critérios claros de transição de etapas."
        },
        {
          titulo: "Processo",
          texto: "O fluxo de vendas é composto por 4 etapas principais: Prospecção, Diagnóstico, Proposta e Fechamento. O tempo médio ideal de ciclo é de 21 dias."
        },
        {
          titulo: "Diagnóstico",
          texto: "A reunião de diagnóstico deve focar nas dores do cliente em relação a silos de informação e atrasos nas tomadas de decisão. Devemos mapear pelo menos 3 gargalos principais."
        },
        {
          titulo: "Proposta",
          texto: "A proposta comercial apresenta o cronograma de implementação do NEW OS dividido em fases e a precificação customizada baseada no ROI projetado."
        }
      ]
    },
    relacionados: ["oferta-estrategica", "icp", "marketing", "playbook"],
    tags: ["vendas", "crm", "processo"],
    keywords: ["comercial", "proposta", "fechamento", "leads"],
    versions: [
      {
        id: "processo-comercial-v1-0",
        version: "v1.0",
        createdAt: "2026-07-19",
        author: "Rafael",
        summary: "Lançamento do processo oficial de vendas.",
        changes: [
          "Estrutura de 4 fases consolidada",
          "Script de reunião de diagnóstico incluído",
          "Critérios de qualificação alinhados com ICP"
        ],
        status: "published"
      }
    ]
  },
  {
    id: "6",
    slug: "marketing",
    titulo: "Marketing",
    descricao: "Estratégia de canais e posicionamento de marca.",
    categoria: "Empresa",
    currentVersion: "v1.1",
    status: "Validado",
    atualizadoEm: "Ontem",
    tempoLeitura: "9 minutos",
    publico: ["Marketing", "Sócios"],
    conteudo: {
      secoes: [
        {
          titulo: "Canais de Aquisição",
          texto: "Foco em inbound marketing via conteúdos técnicos aprofundados sobre arquiteturas corporativas modernas e SEO de cauda longa."
        },
        {
          titulo: "Tom de Voz",
          texto: "Profissional, autoritativo, objetivo e direto ao ponto, eliminando excessos corporativos comuns e jargões vagos."
        }
      ]
    },
    relacionados: ["icp", "playbook"],
    tags: ["marketing", "inbound", "seo"],
    keywords: ["marca", "canais", "comunicacao", "leads"],
    versions: [
      {
        id: "marketing-v1-0",
        version: "v1.0",
        createdAt: "2026-06-15",
        author: "Fernanda",
        summary: "Criação do guia de canais de marketing.",
        changes: ["Definição do foco em SEO", "Esboço inicial de tom de voz da marca"],
        status: "published"
      },
      {
        id: "marketing-v1-1",
        version: "v1.1",
        createdAt: "2026-07-18",
        author: "Fernanda",
        summary: "Ajuste na política de inbound e tom de voz.",
        changes: ["Eliminação de jargões técnicos excessivos do tom de voz", "Inclusão de canais de newsletter setorial"],
        status: "published"
      }
    ]
  },
  {
    id: "7",
    slug: "playbook",
    titulo: "Playbook",
    descricao: "Playbook de execução de operações e atendimento.",
    categoria: "Operação",
    currentVersion: "v2.4",
    status: "Validado",
    atualizadoEm: "Há 5 dias",
    tempoLeitura: "18 minutos",
    publico: ["Operações", "Suporte", "Customer Success"],
    conteudo: {
      secoes: [
        {
          titulo: "Cultura de Atendimento",
          texto: "Nosso foco é a resolução proativa de problemas. Nós antecipamos as falhas do sistema informando o cliente com soluções prontas."
        },
        {
          titulo: "Metodologia de Suporte",
          texto: "Utilização do framework de fila única prioritária. Nível de serviço (SLA) de resposta de até 30 minutos para casos críticos."
        }
      ]
    },
    relacionados: ["processo-comercial", "marketing"],
    tags: ["suporte", "operacoes", "atendimento"],
    keywords: ["suporte", "playbook", "atendimento", "resolucao"],
    versions: [
      {
        id: "playbook-v1-0",
        version: "v1.0",
        createdAt: "2026-03-01",
        author: "Eduardo",
        summary: "Manual inicial de suporte.",
        changes: ["Primeiro fluxograma de suporte", "SLAs básicos de 24h"],
        status: "published"
      },
      {
        id: "playbook-v2-4",
        version: "v2.4",
        createdAt: "2026-07-14",
        author: "Eduardo",
        summary: "Versão otimizada de suporte e SLAs críticos.",
        changes: ["Novo SLA de 30 minutos para chamados críticos", "Introdução do framework de fila única prioritária", "Guia de comunicação proativa com o cliente"],
        status: "published"
      }
    ]
  },
  {
    id: "8",
    slug: "new-os",
    titulo: "NEW OS",
    descricao: "Guia conceitual do sistema operacional da New.",
    categoria: "Framework",
    currentVersion: "v1.0",
    status: "Validado",
    atualizadoEm: "Há 1 semana",
    tempoLeitura: "20 minutos",
    publico: ["Toda a Empresa", "Desenvolvedores"],
    conteudo: {
      secoes: [
        {
          titulo: "Conceito do NEW OS",
          texto: "O NEW OS é o ecossistema integrado que unifica documentação, automações e decisões da empresa em uma única inteligência acionável."
        },
        {
          titulo: "Componentes Principais",
          texto: "Ele é composto pelo Core de Processamento, Biblioteca Dinâmica de Documentos, Painéis de Operações e o Hub de Integração de Agentes."
        }
      ]
    },
    relacionados: ["posicionamento-da-nex", "contexto-base"],
    tags: ["framework", "tecnico", "concept"],
    keywords: ["sistema", "arquitetura", "operacional", "tecnologia"],
    versions: [
      {
        id: "new-os-v1-0",
        version: "v1.0",
        createdAt: "2026-07-12",
        author: "Rafael",
        summary: "Lançamento inicial do guia conceitual.",
        changes: ["Definição da arquitetura técnica básica", "Diagramação de módulos de IA e visualizadores"],
        status: "published"
      }
    ]
  },
  {
    id: "9",
    slug: "missao",
    titulo: "Missão",
    descricao: "Propósito fundamental e razão de existir da New.",
    categoria: "Empresa",
    currentVersion: "v1.0",
    status: "Validado",
    atualizadoEm: "Hoje",
    tempoLeitura: "3 minutos",
    publico: ["Toda a Empresa", "Clientes"],
    conteudo: {
      secoes: [
        {
          titulo: "Nossa Missão",
          texto: "Simplificar a gestão e operação das empresas através de inteligência integrada, tornando processos complexos em fluxos de trabalho transparentes e eficientes."
        }
      ]
    },
    relacionados: ["visao", "valores"],
    tags: ["institucional", "proposito"],
    keywords: ["missao", "diretrizes", "empresa", "valores"],
    versions: [
      {
        id: "missao-v1-0",
        version: "v1.0",
        createdAt: "2026-07-19",
        author: "Rafael",
        summary: "Criação do documento oficial de Missão.",
        changes: ["Redação inicial homologada pela diretoria"],
        status: "published"
      }
    ]
  },
  {
    id: "10",
    slug: "visao",
    titulo: "Visão",
    descricao: "Onde queremos chegar e o impacto que desejamos criar.",
    categoria: "Empresa",
    currentVersion: "v1.0",
    status: "Validado",
    atualizadoEm: "Hoje",
    tempoLeitura: "4 minutos",
    publico: ["Toda a Empresa", "Sócios"],
    conteudo: {
      secoes: [
        {
          titulo: "Nossa Visão",
          texto: "Ser a plataforma de inteligência operacional mais utilizada por empresas em crescimento até 2028, eliminando silos e definindo o novo padrão do mercado."
        }
      ]
    },
    relacionados: ["missao", "valores"],
    tags: ["institucional", "metas"],
    keywords: ["visao", "futuro", "direcao", "crescimento"],
    versions: [
      {
        id: "visao-v1-0",
        version: "v1.0",
        createdAt: "2026-07-19",
        author: "Rafael",
        summary: "Criação do documento oficial de Visão.",
        changes: ["Metas estabelecidas para 2028 e homologadas"],
        status: "published"
      }
    ]
  },
  {
    id: "11",
    slug: "valores",
    titulo: "Valores",
    descricao: "Os princípios inegociáveis que guiam nossa conduta e decisões.",
    categoria: "Empresa",
    currentVersion: "v1.0",
    status: "Validado",
    atualizadoEm: "Hoje",
    tempoLeitura: "5 minutos",
    publico: ["Toda a Empresa"],
    conteudo: {
      secoes: [
        {
          titulo: "Nossos Valores",
          texto: "1. Transparência Radical: Toda informação necessária deve estar disponível para todos.\n2. Simplicidade Prática: Menos burocracia, mais entrega.\n3. Excelência Técnica: Código limpo, processos claros e alta confiabilidade."
        }
      ]
    },
    relacionados: ["missao", "visao"],
    tags: ["institucional", "cultura"],
    keywords: ["valores", "principios", "transparencia", "excelencia"],
    versions: [
      {
        id: "valores-v1-0",
        version: "v1.0",
        createdAt: "2026-07-19",
        author: "Rafael",
        summary: "Homologação dos 3 valores principais.",
        changes: ["Definição oficial dos pilares de cultura interna"],
        status: "published"
      }
    ]
  },
  {
    id: "12",
    slug: "cultura",
    titulo: "Cultura",
    descricao: "Como trabalhamos, nos comunicamos e evoluímos.",
    categoria: "Empresa",
    currentVersion: "v1.1",
    status: "Validado",
    atualizadoEm: "Ontem",
    tempoLeitura: "8 minutos",
    publico: ["Toda a Empresa", "Novos Membros"],
    conteudo: {
      secoes: [
        {
          titulo: "Trabalho Assíncrono",
          texto: "Priorizamos a comunicação escrita e assíncrona sobre reuniões em tempo real. Se pode ser documentado, deve ser documentado no NEW OS."
        },
        {
          titulo: "Autonomia com Responsabilidade",
          texto: "Damos total autonomia na execução, esperando alta responsabilidade em relação a prazos, metas e qualidade das entregas."
        }
      ]
    },
    relacionados: ["contexto-base", "playbook"],
    tags: ["cultura", "operacoes", "comunicacao"],
    keywords: ["cultura", "assincrono", "trabalho", "autonomia"],
    versions: [
      {
        id: "cultura-v1-0",
        version: "v1.0",
        createdAt: "2026-06-20",
        author: "Juliana",
        summary: "Primeiro rascunho do guia de cultura.",
        changes: ["Padrões de reuniões e comunicação inicial"],
        status: "published"
      },
      {
        id: "cultura-v1-1",
        version: "v1.1",
        createdAt: "2026-07-18",
        author: "Juliana",
        summary: "Adicionado conceito de autonomia responsável.",
        changes: ["Inclusão da seção de Autonomia com Responsabilidade", "Detalhamento de workflows assíncronos no Slack"],
        status: "published"
      }
    ]
  },
  {
    id: "13",
    slug: "estrategia",
    titulo: "Estratégia",
    descricao: "Direção, prioridades e objetivos da empresa.",
    categoria: "Empresa",
    currentVersion: "v2.0",
    status: "Validado",
    atualizadoEm: "Há 2 dias",
    tempoLeitura: "11 minutos",
    publico: ["Toda a Empresa", "Sócios"],
    conteudo: {
      secoes: [
        {
          titulo: "Foco no Cliente Médio",
          texto: "Nosso foco estratégico para este semestre está na captação e retenção de empresas de tecnologia de médio porte, expandindo nossa presença digital."
        },
        {
          titulo: "Desenvolvimento do NEW OS",
          texto: "Evoluir o ecossistema interno para que sirva de produto escalável comercializável para clientes premium no futuro próximo."
        }
      ]
    },
    relacionados: ["roadmap", "icp"],
    tags: ["estrategia", "negocios", "planejamento"],
    keywords: ["estrategia", "cliente", "foco", "prioridades"],
    versions: [
      {
        id: "estrategia-v1-0",
        version: "v1.0",
        createdAt: "2026-02-15",
        author: "Rafael",
        summary: "Plano estratégico anual inicial.",
        changes: ["Mapeamento de objetivos de faturamento", "Definição de metas de time"],
        status: "published"
      },
      {
        id: "estrategia-v2-0",
        version: "v2.0",
        createdAt: "2026-07-17",
        author: "Rafael",
        summary: "Pivotagem para produto NEW OS e foco de captação.",
        changes: ["Reformulação do foco de mercado para empresas de tecnologia de médio faturamento", "Definição da entrega do NEW OS como prioridade de engenharia interna"],
        status: "published"
      }
    ]
  },
  {
    id: "14",
    slug: "roadmap",
    titulo: "Roadmap",
    descricao: "Planejamento e metas de médio/longo prazo do NEW OS.",
    categoria: "Empresa",
    currentVersion: "v1.2",
    status: "Validado",
    atualizadoEm: "Ontem",
    tempoLeitura: "7 minutos",
    publico: ["Toda a Empresa", "Sócios"],
    conteudo: {
      secoes: [
        {
          titulo: "Q3 2026 - Fundações",
          texto: "Consolidação da base de documentos, do design system e das ferramentas essenciais de operação."
        },
        {
          titulo: "Q4 2026 - Inteligência Artificial",
          texto: "Integração do motor de inteligência artificial nativo para consulta e processamento de informações dinâmicas."
        }
      ]
    },
    relacionados: ["estrategia", "new-os"],
    tags: ["framework", "planejamento", "roadmap"],
    keywords: ["metas", "fases", "roadmap", "desenvolvimento"],
    versions: [
      {
        id: "roadmap-v1-0",
        version: "v1.0",
        createdAt: "2026-07-10",
        author: "Rafael",
        summary: "Esboço inicial de marcos de entrega.",
        changes: ["Definição de entregas essenciais de fundação"],
        status: "published"
      },
      {
        id: "roadmap-v1-2",
        version: "v1.2",
        createdAt: "2026-07-18",
        author: "Rafael",
        summary: "Inclusão da fase de Inteligência Artificial para Q4.",
        changes: ["Mapeamento de sprints de IA no Q4", "Detalhamento de entregas de automações operacionais no Q3"],
        status: "published"
      }
    ]
  }
];
