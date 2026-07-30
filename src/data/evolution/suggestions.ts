import { BaseEntity, EntityReference } from "./common";

export type ProposalStatus = 
  | "draft" 
  | "submitted" 
  | "under_review" 
  | "approved" 
  | "rejected" 
  | "planned" 
  | "in_progress" 
  | "implemented" 
  | "measuring" 
  | "validated" 
  | "archived";

export interface ImprovementProposal extends BaseEntity {
  title: string;
  description: string;
  status: ProposalStatus;
  relatedEntities: EntityReference[];
}
