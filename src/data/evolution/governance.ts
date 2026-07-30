import { BaseEntity, EntityReference } from "./common";
import { ActorReference } from "./actors";

export interface ApprovalStep {
  id: string;
  approver: ActorReference;
  status: "pending" | "approved" | "rejected";
  comments?: string;
  updatedAt: string;
}

export interface ApprovalFlow extends BaseEntity {
  targetEntity: EntityReference; // Usually points to a Proposal
  steps: ApprovalStep[];
  status: "active" | "completed" | "cancelled";
}

export interface AuditLog extends BaseEntity {
  action: string;
  targetEntity: EntityReference;
  details: string;
}
