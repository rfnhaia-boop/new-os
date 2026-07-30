import { ProposalStatus } from "@/data/evolution";

interface ProposalStatusBadgeProps {
  status: ProposalStatus;
  className?: string;
}

export function ProposalStatusBadge({ status, className = "" }: ProposalStatusBadgeProps) {
  const getLabel = () => {
    switch (status) {
      case "draft": return "Rascunho";
      case "submitted": return "Submetida";
      case "under_review": return "Em Análise";
      case "approved": return "Aprovada";
      case "rejected": return "Rejeitada";
      case "planned": return "Planejada";
      case "in_progress": return "Em Progresso";
      case "implemented": return "Implementada";
      case "measuring": return "Avaliando Impacto";
      case "validated": return "Validada";
      case "archived": return "Arquivada";
      default: return status;
    }
  };

  const getColors = () => {
    switch (status) {
      case "draft":
      case "archived":
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
      case "submitted":
      case "under_review":
      case "measuring":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "approved":
      case "planned":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "in_progress":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "implemented":
      case "validated":
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
