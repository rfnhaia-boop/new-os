import { ImprovementProposal } from "@/data/evolution";
import { ProposalStatusBadge } from "./proposal-status-badge";
import { ActorBadge } from "../shared/actor-badge";
import { Lightbulb } from "lucide-react";

interface ProposalCardProps {
  proposal: ImprovementProposal;
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  return (
    <div className="bg-[#111111] border border-[#27272A] rounded-xl p-5 hover:border-indigo-500/50 transition-colors flex flex-col h-full">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
          <Lightbulb className="w-5 h-5 text-indigo-400" />
        </div>
        <ProposalStatusBadge status={proposal.status} />
      </div>
      
      <h3 className="text-base font-bold text-white mb-2">{proposal.title}</h3>
      <p className="text-sm text-[#A1A1AA] line-clamp-3 mb-6 flex-1">
        {proposal.description}
      </p>

      <div className="pt-4 border-t border-[#27272A] flex items-center justify-between">
        <ActorBadge actor={proposal.createdBy} />
        <span className="text-xs text-zinc-500">
          {new Date(proposal.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
