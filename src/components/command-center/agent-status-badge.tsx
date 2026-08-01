interface AgentStatusBadgeProps {
  status: string | null;
}

const STATUS_MAP: Record<string, { label: string; color: string; dot: string }> = {
  working: {
    label: "Ativo agora",
    color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    dot: "bg-emerald-400",
  },
  waiting: {
    label: "Aguardando",
    color: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    dot: "bg-amber-400",
  },
  idle: {
    label: "Em espera",
    color: "bg-[#27272A] border-[#27272A] text-[#A1A1AA]",
    dot: "bg-[#A1A1AA]",
  },
};

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
  const config = STATUS_MAP[status ?? "idle"] ?? STATUS_MAP.idle;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border shrink-0 ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${status === "working" ? "animate-pulse" : ""}`} />
      {config.label}
    </span>
  );
}
