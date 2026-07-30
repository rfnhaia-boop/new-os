import { CategoryInfo, Category } from "./types";
import {
  Building2,
  Cpu,
  Package,
  Briefcase,
  Sparkles,
  Code2,
} from "lucide-react";

export const categories: Category[] = [
  "Todos",
  "Empresa",
  "NEX",
  "Produtos",
  "Operação",
  "IA",
  "Framework",
];

export const categoriesData: CategoryInfo[] = [
  {
    id: "cat_empresa",
    slug: "empresa",
    nome: "Empresa",
    cor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    icon: Building2,
    descricao: "Documentos institucionais, cultura e diretrizes estratégicas.",
  },
  {
    id: "cat_nex",
    slug: "nex",
    nome: "NEX",
    cor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    icon: Cpu,
    descricao: "Núcleo de execução, inteligência e processo comercial.",
  },
  {
    id: "cat_produtos",
    slug: "produtos",
    nome: "Produtos",
    cor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    icon: Package,
    descricao: "Especificações, ofertas e roadmap de produtos.",
  },
  {
    id: "cat_operacao",
    slug: "operacao",
    nome: "Operação",
    cor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    icon: Briefcase,
    descricao: "Manuais de operação, playbooks de atendimento e suporte.",
  },
  {
    id: "cat_ia",
    slug: "ia",
    nome: "IA",
    cor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    icon: Sparkles,
    descricao: "Agentes de inteligência artificial, diretrizes e integrações.",
  },
  {
    id: "cat_framework",
    slug: "framework",
    nome: "Framework",
    cor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    icon: Code2,
    descricao: "Especificações técnicas do NEW OS e padrões de engenharia.",
  },
];
