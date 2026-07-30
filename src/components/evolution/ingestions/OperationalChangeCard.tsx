import { OperationalChange } from "@/data/evolution";
import { CheckCircle2, Circle, AlertCircle, FileText, Settings, ShieldAlert, TrendingUp } from "lucide-react";
import { EntityReferenceList } from "../shared/entity-reference-list";

interface OperationalChangeCardProps {
  change: OperationalChange;
}

export function OperationalChangeCard({ change }: OperationalChangeCardProps) {
  const getIcon = () => {
    switch (change.classification) {
      case "completed": return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case "in_progress": return <Settings className="w-5 h-5 text-amber-500 shrink-0" />;
      case "planned": return <Circle className="w-5 h-5 text-zinc-500 shrink-0" />;
      default: 
        if (change.type === "decision") return <AlertCircle className="w-5 h-5 text-indigo-500 shrink-0" />;
        if (change.type === "architecture") return <FileText className="w-5 h-5 text-purple-500 shrink-0" />;
        if (change.type === "risk") return <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />;
        if (change.type === "cross_project_impact") return <TrendingUp className="w-5 h-5 text-blue-500 shrink-0" />;
        return <Circle className="w-5 h-5 text-zinc-500 shrink-0" />;
    }
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#27272A] rounded-lg p-4 flex gap-4 items-start hover:border-indigo-500/30 transition-colors">
      <div className="mt-0.5">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-sm font-semibold text-white">{change.title}</h4>
          <span className="text-[10px] px-1.5 py-0.5 rounded border border-[#27272A] bg-[#111111] text-zinc-400 capitalize whitespace-nowrap">
            {change.type.replace(/_/g, " ")}
          </span>
        </div>
        <p className="text-sm text-zinc-400 mb-3">{change.description}</p>
        
        {change.requiresApproval && (
          <div className="mb-2 inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Requer Aprovação
          </div>
        )}
        
        {change.target && (
          <div className="mt-2 pt-2 border-t border-[#27272A]">
            <EntityReferenceList references={[change.target]} title="Alvo / Relacionado" />
          </div>
        )}
      </div>
    </div>
  );
}
