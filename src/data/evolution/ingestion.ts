import { ActorReference } from "./actors";
import { EntityReference, BaseEntity } from "./common";

export type OperationalIngestionStatus =
  | "received"
  | "under_review"
  | "approved"
  | "applied"
  | "rejected"
  | "partial";

export type OperationalChangeType =
  | "progress"
  | "decision"
  | "task"
  | "roadmap"
  | "architecture"
  | "documentation"
  | "risk"
  | "pending"
  | "pattern"
  | "cross_project_impact";

export type OperationalClassification =
  | "completed"
  | "in_progress"
  | "planned"
  | "informational";

export interface OperationalChange {
  id: string;
  type: OperationalChangeType;
  title: string;
  description: string;
  classification: OperationalClassification;
  target?: EntityReference;
  requiresApproval: boolean;
}

export type IngestionKind = "operational" | "documentation";

export interface OperationalIngestion extends BaseEntity {
  kind?: IngestionKind;
  projectId: string;
  title: string;
  referenceDate: string;
  sourceType: "conversation" | "manual" | "document" | "system";
  sourceContent: string;
  actor: ActorReference;
  status: OperationalIngestionStatus;
  changes: OperationalChange[];
  relatedEntities: EntityReference[];
}
