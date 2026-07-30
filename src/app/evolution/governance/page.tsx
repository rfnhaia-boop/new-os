import { ApprovalWorkflowViewer } from "@/components/evolution/governance/approval-workflow-viewer";
import { AuditTrail } from "@/components/evolution/governance/audit-trail";
import { ApprovalFlow, AuditLog } from "@/data/evolution";
import { mockHumanActor, mockAIActor } from "@/data/evolution/mock";

const mockFlow: ApprovalFlow = {
  id: "flow-1",
  targetEntity: { entityType: "proposal", entityId: "prop-001", label: "Implementar cache" },
  status: "active",
  steps: [
    {
      id: "step-1",
      approver: mockAIActor,
      status: "approved",
      comments: "Avaliando métricas de performance. O benefício supera o custo.",
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "step-2",
      approver: mockHumanActor,
      status: "pending",
      updatedAt: new Date().toISOString(),
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: mockHumanActor,
};

const mockLogs: AuditLog[] = [
  {
    id: "log-1",
    action: "PROPOSAL_CREATED",
    targetEntity: { entityType: "proposal", entityId: "prop-001" },
    details: "Proposta criada pelo agente baseado em métricas de lentidão.",
    createdAt: new Date(Date.now() - 100000000).toISOString(),
    updatedAt: new Date(Date.now() - 100000000).toISOString(),
    createdBy: mockAIActor,
  },
  {
    id: "log-2",
    action: "STEP_APPROVED",
    targetEntity: { entityType: "proposal", entityId: "prop-001" },
    details: "Avaliação automática concluída.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    createdBy: mockAIActor,
  }
];

export default function GovernancePage() {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Governança e Fluxos de Aprovação</h2>
        <p className="text-sm text-zinc-400">Gerenciamento de responsabilidades e trilha de auditoria para ações executadas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ApprovalWorkflowViewer flow={mockFlow} />
        <AuditTrail logs={mockLogs} />
      </div>
    </div>
  );
}
