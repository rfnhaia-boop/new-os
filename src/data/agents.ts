// ============================================================================
// NEW OS — Agent Data Layer
// Defines the 6 domain AI agents, their visual properties, and layout positions.
// ============================================================================

export type AgentDomain = "new" | "next";
export type AgentStatus = "active" | "idle" | "processing" | "offline";

export interface AgentMetrics {
  tasksCompleted: number;
  uptime: string;
  lastAction: string;
}

export interface AgentModule {
  name: string;
  href: string;
}

export interface AgentNode {
  id: string;
  role: string;
  title: string;
  description: string;
  domain: AgentDomain;
  status: AgentStatus;
  iconName: string;
  currentTask?: string;
  metrics: AgentMetrics;
  connectedModules: AgentModule[];
}

export interface AgentPosition {
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
}

export interface AgentWithPosition extends AgentNode {
  position: AgentPosition;
}

// Color system: Violet for "NEW" domain, Orange for "NEXT" domain
export const AGENT_COLORS = {
  new: {
    primary: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.4)",
    ring: "rgba(139, 92, 246, 0.2)",
    bg: "rgba(139, 92, 246, 0.08)",
    border: "rgba(139, 92, 246, 0.15)",
  },
  next: {
    primary: "#F97316",
    glow: "rgba(249, 115, 22, 0.4)",
    ring: "rgba(249, 115, 22, 0.2)",
    bg: "rgba(249, 115, 22, 0.08)",
    border: "rgba(249, 115, 22, 0.15)",
  },
} as const;

// Layout constants for positioning
export const CORE_POSITION: AgentPosition = { x: 63, y: 38 };
const AGENT_LAYOUT_RADIUS = 24; // percentage of viewport

// ============================================================================
// The 6 Domain Agents
// ============================================================================
export const agents: AgentNode[] = [
  {
    id: "ceo",
    role: "CEO",
    title: "Orquestrador Central",
    description:
      "Interpreta intenções, roteia tarefas e toma decisões de alto nível para todo o ecossistema NEW OS.",
    domain: "new",
    status: "active",
    iconName: "Brain",
    currentTask: "Monitorando 3 pipelines ativos",
    metrics: {
      tasksCompleted: 847,
      uptime: "99.7%",
      lastAction: "Roteou task para COO há 4min",
    },
    connectedModules: [
      { name: "IA Assistant", href: "/ia" },
      { name: "Governança", href: "/evolution/governance" },
    ],
  },
  {
    id: "coo",
    role: "COO",
    title: "Operações",
    description:
      "Gerencia projetos, entregas, tarefas e o pipeline operacional de toda a organização.",
    domain: "new",
    status: "active",
    iconName: "Briefcase",
    currentTask: "Gerenciando Sprint 19",
    metrics: {
      tasksCompleted: 1203,
      uptime: "99.2%",
      lastAction: "Atualizou status do Projeto FLOW",
    },
    connectedModules: [
      { name: "Projetos", href: "/projects" },
      { name: "Tarefas", href: "/tasks" },
    ],
  },
  {
    id: "cro",
    role: "CRO",
    title: "Comercial",
    description:
      "Controla o funil de vendas, propostas comerciais e o relacionamento com clientes no CRM.",
    domain: "next",
    status: "processing",
    iconName: "TrendingUp",
    currentTask: "Analisando pipeline de vendas Q3",
    metrics: {
      tasksCompleted: 412,
      uptime: "98.8%",
      lastAction: "Gerou proposta para Cliente #47",
    },
    connectedModules: [{ name: "Clientes", href: "/clients" }],
  },
  {
    id: "cdo",
    role: "CDO",
    title: "Dados & Métricas",
    description:
      "Mensura impacto real das decisões no negócio e alimenta o ciclo de inteligência com dados concretos.",
    domain: "next",
    status: "active",
    iconName: "BarChart3",
    currentTask: "Processando métricas Q3",
    metrics: {
      tasksCompleted: 567,
      uptime: "99.4%",
      lastAction: "Relatório de impacto gerado",
    },
    connectedModules: [{ name: "Impacto", href: "/evolution/impact" }],
  },
  {
    id: "cmo",
    role: "CMO",
    title: "Crescimento",
    description:
      "Estratégias de growth, campanhas de aquisição e posicionamento de marca no mercado.",
    domain: "next",
    status: "idle",
    iconName: "Megaphone",
    metrics: {
      tasksCompleted: 89,
      uptime: "97.1%",
      lastAction: "Módulo em implantação",
    },
    connectedModules: [],
  },
  {
    id: "hor",
    role: "HoR",
    title: "Pesquisa & Conhecimento",
    description:
      "Cataloga padrões arquiteturais, decisões estratégicas e mantém a base de conhecimento viva.",
    domain: "new",
    status: "active",
    iconName: "BookOpen",
    currentTask: "Catalogando 12 novos padrões",
    metrics: {
      tasksCompleted: 2341,
      uptime: "99.9%",
      lastAction: "Indexou Pattern FLOW-018",
    },
    connectedModules: [
      { name: "Conhecimento", href: "/evolution/knowledge" },
      { name: "Biblioteca", href: "/books" },
      { name: "Padrões", href: "/patterns" },
    ],
  },
];

// ============================================================================
// Position Calculator — Circular layout around the core
// ============================================================================
export function getAgentPositions(): AgentWithPosition[] {
  return agents.map((agent, i) => {
    const angle = (i * (360 / agents.length) - 90) * (Math.PI / 180);
    return {
      ...agent,
      position: {
        x: CORE_POSITION.x + AGENT_LAYOUT_RADIUS * Math.cos(angle),
        y: CORE_POSITION.y + AGENT_LAYOUT_RADIUS * Math.sin(angle),
      },
    };
  });
}

// Helper to get SVG-compatible path between core and agent
export function getConnectionPath(
  to: AgentPosition,
  curveIntensity: number = 0.12
): string {
  const from = CORE_POSITION;
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  // Perpendicular offset for curve
  const cpX = midX - dy * curveIntensity;
  const cpY = midY + dx * curveIntensity;
  // Scale to SVG viewBox (0-1000)
  return `M ${from.x * 10} ${from.y * 10} Q ${cpX * 10} ${cpY * 10} ${to.x * 10} ${to.y * 10}`;
}
