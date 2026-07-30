import { BaseEntity, EntityReference } from "./common";

// A MemoryEntry is a learning or decision that was institutionally preserved.
// Not to be confused with Event (something that happened) or Evidence (something that proves).

export type MemoryCategory = "decision" | "recurring_error" | "approved_pattern" | "retrospective_insight";

export interface MemoryEntry extends BaseEntity {
  title: string;
  description: string;
  category: MemoryCategory;
  tags: string[];
  relatedEntities: EntityReference[]; // Connects to the events or evidences that led to this memory
}
