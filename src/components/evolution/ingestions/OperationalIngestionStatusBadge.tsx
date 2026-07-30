import { OperationalIngestionStatus } from "@/data/evolution";

interface OperationalIngestionStatusBadgeProps {
  status: OperationalIngestionStatus;
  className?: string;
}

export function OperationalIngestionStatusBadge({ status, className = "" }: OperationalIngestionStatusBadgeProps) {
  const getLabel = () => {
    switch (status) {
      case "received": return "Recebido";
      case "under_review": return "Em Análise";
      case "approved": return "Aprovado";
      case "applied": return "Aplicado";
      case "rejected": return "Rejeitado";
      default: return status;
    }
  };

  const getColors = () => {
    switch (status) {
      case "received":
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
      case "under_review":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "approved":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "applied":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md border ${getColors()} ${className}`}>
      {getLabel()}
    </span>
  );
}
