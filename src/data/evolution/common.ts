import { ActorReference } from "./actors";

export interface AuditMetadata {
  createdAt: string;
  updatedAt: string;
  createdBy: ActorReference;
  updatedBy?: ActorReference;
}

export interface BaseEntity extends AuditMetadata {
  id: string;
}

export type ValidEntityType = 
  | "book" 
  | "chapter" 
  | "document" 
  | "framework" 
  | "decision" 
  | "architecture" 
  | "project" 
  | "task" 
  | "proposal" 
  | "improvement"
  | "roadmap_item"
  | "institutional_pattern"
  | "metric"
  | "operational_ingestion";

export interface EntityReference {
  entityType: ValidEntityType;
  entityId: string;
  label?: string;
  url?: string; // Optional link for quick navigation
}
