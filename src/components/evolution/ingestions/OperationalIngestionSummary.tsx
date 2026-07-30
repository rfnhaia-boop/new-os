import { OperationalIngestion } from "@/data/evolution";
import { ShieldCheck, Settings, Circle, AlertCircle, ShieldAlert, TrendingUp } from "lucide-react";

interface OperationalIngestionSummaryProps {
  ingestion: OperationalIngestion;
}

export function OperationalIngestionSummary({ ingestion }: OperationalIngestionSummaryProps) {
  const completed = ingestion.changes.filter(c => c.classification === "completed").length;
  const inProgress = ingestion.changes.filter(c => c.classification === "in_progress").length;
  const planned = ingestion.changes.filter(c => c.classification === "planned").length;
  const decisions = ingestion.changes.filter(c => c.type === "decision").length;
  const risks = ingestion.changes.filter(c => c.type === "risk" || c.type === "pending").length;
  const impacts = ingestion.changes.filter(c => c.type === "cross_project_impact").length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="bg-[#111111] border border-[#27272A] rounded-xl p-4 flex flex-col items-center justify-center text-center">
        <ShieldCheck className="w-6 h-6 text-emerald-500 mb-2" />
        <span className="text-2xl font-bold text-white mb-1">{completed}</span>
        <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Concluídos</span>
      </div>
      
      <div className="bg-[#111111] border border-[#27272A] rounded-xl p-4 flex flex-col items-center justify-center text-center">
        <Settings className="w-6 h-6 text-amber-500 mb-2" />
        <span className="text-2xl font-bold text-white mb-1">{inProgress}</span>
        <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Em Andamento</span>
      </div>

      <div className="bg-[#111111] border border-[#27272A] rounded-xl p-4 flex flex-col items-center justify-center text-center">
        <Circle className="w-6 h-6 text-zinc-500 mb-2" />
        <span className="text-2xl font-bold text-white mb-1">{planned}</span>
        <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Planejados</span>
      </div>

      <div className="bg-[#111111] border border-[#27272A] rounded-xl p-4 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-6 h-6 text-indigo-500 mb-2" />
        <span className="text-2xl font-bold text-white mb-1">{decisions}</span>
        <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Decisões</span>
      </div>

      <div className="bg-[#111111] border border-[#27272A] rounded-xl p-4 flex flex-col items-center justify-center text-center">
        <ShieldAlert className="w-6 h-6 text-rose-500 mb-2" />
        <span className="text-2xl font-bold text-white mb-1">{risks}</span>
        <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Pendências/Riscos</span>
      </div>

      <div className="bg-[#111111] border border-[#27272A] rounded-xl p-4 flex flex-col items-center justify-center text-center">
        <TrendingUp className="w-6 h-6 text-blue-500 mb-2" />
        <span className="text-2xl font-bold text-white mb-1">{impacts}</span>
        <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Impactos</span>
      </div>
    </div>
  );
}
