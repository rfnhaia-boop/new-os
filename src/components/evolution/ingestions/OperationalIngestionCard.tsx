import { OperationalIngestion } from "@/data/evolution";
import { OperationalIngestionStatusBadge } from "./OperationalIngestionStatusBadge";
import { ActorBadge } from "../shared/actor-badge";
import { Calendar, Network, MessageSquare, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

interface OperationalIngestionCardProps {
  ingestion: OperationalIngestion;
}

export function OperationalIngestionCard({ ingestion }: OperationalIngestionCardProps) {
  const completedCount = ingestion.changes.filter(c => c.classification === "completed").length;
  const decisionsCount = ingestion.changes.filter(c => c.type === "decision").length;

  return (
    <Link href={`/evolution/ingestions/${ingestion.id}`} className="block">
      <div className="bg-[#111111] border border-[#27272A] rounded-xl p-5 hover:border-indigo-500/50 transition-colors">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#27272A] flex items-center justify-center shrink-0">
              <Network className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">{ingestion.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {ingestion.referenceDate}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-zinc-400 flex items-center gap-1 capitalize">
                  <MessageSquare className="w-3 h-3" />
                  {ingestion.sourceType}
                </span>
              </div>
            </div>
          </div>
          <OperationalIngestionStatusBadge status={ingestion.status} />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-[#27272A]">
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs text-zinc-500 mb-1">Total</span>
            <span className="text-sm font-bold text-white">{ingestion.changes.length}</span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-[#27272A]">
            <span className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Concluídos
            </span>
            <span className="text-sm font-bold text-white">{completedCount}</span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-[#27272A]">
            <span className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> Decisões
            </span>
            <span className="text-sm font-bold text-white">{decisionsCount}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <ActorBadge actor={ingestion.actor} />
          <span className="text-[10px] text-zinc-500">
            Cadastrado em {new Date(ingestion.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
