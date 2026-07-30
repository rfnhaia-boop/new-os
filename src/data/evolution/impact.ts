import { BaseEntity, EntityReference } from "./common";

export interface MetricTarget {
  metricName: string;
  targetValue: string;
}

export interface MetricResult {
  metricName: string;
  observedValue: string;
}

export type AssessmentStatus = 
  | "not_started" 
  | "collecting_data" 
  | "positive" 
  | "neutral" 
  | "negative" 
  | "inconclusive";

export interface ImpactAssessment extends BaseEntity {
  relatedProposal: EntityReference; // Points to an ImprovementProposal
  expectedOutcome: string;
  expectedMetrics: MetricTarget[];
  observedOutcome?: string;
  observedMetrics?: MetricResult[];
  assessmentStatus: AssessmentStatus;
}
