import { Crown, ListChecks, Handshake, Megaphone, Search, BarChart3, Bot } from "lucide-react";
import { AppCard } from "@/components/ui/AppCard";
import { AgentStatusBadge } from "./agent-status-badge";
import type { Agent } from "@/lib/supabase/agents";

const ROLE_ICON: Record<string, typeof Bot> = {
  CEO: Crown,
  COO: ListChecks,
  CRO: Handshake,
  CMO: Megaphone,
  "Head of Research": Search,
  CDO: BarChart3,
};

const ROLE_DOMAIN: Record<string, string> = {
  CEO: "Interpreta pedidos, roteia e decide",
  COO: "Projetos, tarefas, entregas",
  CRO: "Funil, propostas, clientes",
  CMO: "Conteúdo, campanhas, aquisição",
  "Head of Research": "Mercado, padrões, benchmarks",
  CDO: "Métricas, impacto, KPIs",
};

interface AgentCardProps {
  agent: Agent;
  emphasis?: boolean;
}

export function AgentCard({ agent, emphasis = false }: AgentCardProps) {
  const Icon = ROLE_ICON[agent.name ?? ""] ?? Bot;
  const domain = ROLE_DOMAIN[agent.name ?? ""] ?? "";

  return (
    <AppCard className={emphasis ? "border-white/20" : undefined}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-black border border-[#27272A] shadow-inner">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{agent.role ?? agent.name}</h3>
            <p className="mt-0.5 text-xs text-[#A1A1AA]">{domain}</p>
          </div>
        </div>
        <AgentStatusBadge status={agent.status} />
      </div>

      <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between">
        <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">Modelo</span>
        <span className="text-xs font-mono text-[#A1A1AA]">{agent.model ?? "—"}</span>
      </div>
    </AppCard>
  );
}
