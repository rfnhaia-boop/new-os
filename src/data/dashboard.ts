import { FileText, Package, Sparkles, Layers, Building2, Cpu } from "lucide-react";
import { DashboardMetric, RecentActivity, QuickAccessItem } from "./types";

export const dashboardMetrics: DashboardMetric[] = [
  {
    title: "Documentos",
    value: "8",
    icon: FileText,
  },
  {
    title: "Produtos",
    value: "2",
    icon: Package,
  },
  {
    title: "Agentes IA",
    value: "4",
    icon: Sparkles,
  },
  {
    title: "Processos",
    value: "12",
    icon: Layers,
  },
];

export const recentActivities: RecentActivity[] = [
  { text: "ICP atualizado", time: "Há 10 min" },
  { text: "Playbook Comercial criado", time: "Há 2 horas" },
  { text: "Marketing e Comunicação revisado", time: "Ontem" },
];

export const quickAccessItems: QuickAccessItem[] = [
  {
    name: "Empresa",
    href: "/company",
    icon: Building2,
    desc: "Dados institucionais e estrutura",
  },
  {
    name: "NEX",
    href: "/nex",
    icon: Cpu,
    desc: "Núcleo de execução e inteligência",
  },
  {
    name: "Produtos",
    href: "/produtos",
    icon: Package,
    desc: "Gerenciamento de produtos",
  },
  {
    name: "Documentos",
    href: "/documents",
    icon: FileText,
    desc: "Repositório de arquivos e playbooks",
  },
];
