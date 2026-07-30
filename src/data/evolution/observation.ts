import { BaseEntity, EntityReference } from "./common";

// EventRecord: something that happened (Task completed, document updated, suggestion created)
export interface EventRecord extends BaseEntity {
  eventType: string; // e.g. "task_completed", "document_updated"
  description: string;
  sourceEntities: EntityReference[];
  timestamp: string; // ISO string
}

// Evidence: something that proves or supports information (Commit, PR, Metric, Screenshot, Report)
export interface Evidence extends BaseEntity {
  title: string;
  evidenceType: "commit" | "pull_request" | "document" | "metric" | "screenshot" | "report";
  url?: string;
  relatedEntities: EntityReference[];
}

export interface LearningNote extends BaseEntity {
  content: string;
  relatedEvents: EntityReference[]; // Points to EventRecords
}
