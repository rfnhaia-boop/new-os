import { ApprovalFlow } from "@/data/evolution";
import { ActorBadge } from "../shared/actor-badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface ApprovalWorkflowViewerProps {
  flow: ApprovalFlow;
}

export function ApprovalWorkflowViewer({ flow }: ApprovalWorkflowViewerProps) {
  return (
    <div className="bg-[#111111] border border-[#27272A] rounded-xl overflow-hidden">
      <div className="p-4 border-b border-[#27272A] bg-[#1A1A1A]">
        <h4 className="text-sm font-bold text-white">Fluxo de Aprovação</h4>
      </div>
      <div className="p-5">
        <div className="relative pl-6 border-l-2 border-[#27272A] space-y-6">
          {flow.steps.map((step, idx) => {
            const isApproved = step.status === "approved";
            const isRejected = step.status === "rejected";
            const isPending = step.status === "pending";

            return (
              <div key={step.id} className="relative">
                <div className={`absolute -left-[35px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-[#0A0A0A] ${
                  isApproved ? "border-emerald-500 text-emerald-500" :
                  isRejected ? "border-rose-500 text-rose-500" :
                  "border-zinc-500 text-zinc-500"
                }`}>
                  {isApproved && <CheckCircle2 className="w-3 h-3" />}
                  {isRejected && <XCircle className="w-3 h-3" />}
                  {isPending && <Clock className="w-3 h-3" />}
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <ActorBadge actor={step.approver} />
                    <span className="text-xs text-zinc-500">{new Date(step.updatedAt).toLocaleDateString()}</span>
                  </div>
                  {step.comments && (
                    <div className="mt-2 p-3 rounded-md bg-[#1A1A1A] border border-[#27272A] text-sm text-zinc-300">
                      {step.comments}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
