import { Building2, Heart, Users, Compass } from "lucide-react";
import { CompanyHighlight } from "./types";

export const companyHighlights: CompanyHighlight[] = [
  {
    title: "Contexto Base",
    desc: "Entenda o que é a New e como a empresa pensa.",
    icon: Building2,
    docCount: "1 documento",
    href: "/documents/contexto-base",
  },
  {
    title: "Missão, Visão e Valores",
    desc: "Os princípios que orientam nossas decisões.",
    icon: Heart,
    docCount: "3 documentos",
    href: "/documents/missao",
  },
  {
    title: "Cultura",
    desc: "Como trabalhamos, nos comunicamos e evoluímos.",
    icon: Users,
    docCount: "1 documento",
    href: "/documents/cultura",
  },
  {
    title: "Estratégia",
    desc: "Direção, prioridades e objetivos da empresa.",
    icon: Compass,
    docCount: "2 documentos",
    href: "/documents/estrategia",
  },
];

export const companyDocSlugs = [
  "contexto-base",
  "missao",
  "visao",
  "valores",
  "cultura",
  "estrategia",
  "roadmap",
];
