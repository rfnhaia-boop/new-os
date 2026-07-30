import { Deliverable, DeliverableStatus } from "@/data/types";
import { usersData } from "@/data/users";
import { getDeliverableStatusLabel } from "@/lib/projects";
import { Calendar, User, Clock, AlertCircle } from "lucide-react";
import { SIMULATED_NOW } from "@/lib/date";

interface DeliverableItemProps {
  deliverable: Deliverable;
  onStatusChange?: (id: string, newStatus: DeliverableStatus) => void;
  canEdit?: boolean;
}

export function DeliverableItem({
  deliverable,
  onStatusChange,
  canEdit = false,
}: DeliverableItemProps) {
  const responsible = usersData.find((u) => u.id === deliverable.responsibleId);
  const isOverdue =
    !["approved", "delivered"].includes(deliverable.status) &&
    new Date(deliverable.dueDate) < SIMULATED_NOW;

  const statusStyles: Record<DeliverableStatus, string> = {
    pending: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
    in_progress: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    review: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    approved: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    delivered: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  };

  return (
    <div className="p-4 bg-[#0A0A0A] border border-[#27272A] rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-neutral-500 transition-colors">
      <div className="space-y-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-xs font-bold text-white truncate">{deliverable.title}</h4>
          {isOverdue && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
              <AlertCircle className="w-2.5 h-2.5" />
              <span>Atrasado</span>
            </span>
          )}
        </div>
        {deliverable.description && (
          <p className="text-[11px] text-[#A1A1AA] line-clamp-2">{deliverable.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] text-[#A1A1AA] pt-1">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3 text-[#A1A1AA]" />
            <span>{responsible?.name || "Não atribuído"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#A1A1AA]" />
            <span className={isOverdue ? "text-red-400 font-medium" : ""}>
              Prazo: {deliverable.dueDate}
            </span>
          </div>
          {deliverable.completedAt && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Concluído em: {deliverable.completedAt}</span>
            </div>
          )}
        </div>
      </div>

      {/* Status Editor/Viewer */}
      <div className="shrink-0 flex items-center gap-3">
        {canEdit && onStatusChange ? (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#A1A1AA]">Status:</span>
            <select
              value={deliverable.status}
              onChange={(e) => onStatusChange(deliverable.id, e.target.value as DeliverableStatus)}
              className="bg-[#111111] border border-[#27272A] text-[10px] text-white rounded px-2 py-1 focus:outline-none cursor-pointer"
            >
              <option value="pending">Pendente</option>
              <option value="in_progress">Em Andamento</option>
              <option value="review">Em Revisão</option>
              <option value="approved">Aprovado</option>
              <option value="delivered">Entregue</option>
            </select>
          </div>
        ) : (
          <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-semibold border ${statusStyles[deliverable.status]}`}>
            {getDeliverableStatusLabel(deliverable.status)}
          </span>
        )}
      </div>
    </div>
  );
}
