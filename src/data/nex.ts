import { Cpu, Bookmark, Shield, Workflow, Sparkles, Layers } from "lucide-react";
import { NexMainCard, JourneyStep } from "./types";

export const nexMainCards: NexMainCard[] = [
  {
    title: "Posicionamento",
    desc: "Posicionamento estratégico e proposta de valor do núcleo NEX.",
    slug: "posicionamento-da-nex",
    icon: Cpu,
  },
  {
    title: "Oferta",
    desc: "Estruturação das linhas de produtos e modelos de oferta comercial.",
    slug: "oferta-estrategica",
    icon: Bookmark,
  },
  {
    title: "ICP",
    desc: "Perfil de Cliente Ideal (Ideal Customer Profile) detalhado.",
    slug: "icp",
    icon: Shield,
  },
  {
    title: "Processo Comercial",
    desc: "Definição de como a NEX conduz uma venda de ponta a ponta.",
    slug: "processo-comercial",
    icon: Workflow,
  },
  {
    title: "Marketing",
    desc: "Estratégia de canais e posicionamento de marca.",
    slug: "marketing",
    icon: Sparkles,
  },
  {
    title: "Playbook",
    desc: "Playbook de execução de operações e atendimento.",
    slug: "playbook",
    icon: Layers,
  },
];

export const journeySteps: JourneyStep[] = [
  { name: "Lead", desc: "Mapeamento e prospecção inicial" },
  { name: "Diagnóstico", desc: "Levantamento de dores e gargalos" },
  { name: "Proposta", desc: "Apresentação técnica e financeira" },
  { name: "Fechamento", desc: "Assinatura do contrato e termos" },
  { name: "Onboarding", desc: "Setup inicial do ecossistema" },
];

export const nexDocSlugs = [
  "posicionamento-da-nex",
  "oferta-estrategica",
  "icp",
  "processo-comercial",
  "marketing",
  "playbook",
];
