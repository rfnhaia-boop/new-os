import { BaseEntity, EntityReference } from "./common";

// Knowledge layer acts as an aggregator and interconnection layer.
// It references existing books, documents, and introduces new structural concepts.

export interface Framework extends BaseEntity {
  title: string;
  description: string;
  version: string;
  relatedEntities: EntityReference[]; // Connects to Books, Documents, etc.
}

export interface Decision extends BaseEntity {
  title: string;
  context: string;
  rationale: string;
  status: "proposed" | "accepted" | "rejected" | "deprecated";
  relatedEntities: EntityReference[];
}

export interface ArchitectureDoc extends BaseEntity {
  title: string;
  summary: string;
  diagramUrl?: string;
  relatedEntities: EntityReference[];
}

export interface KnowledgeCollection extends BaseEntity {
  companyId: string;
  productId: string;
  title: string;
  slug: string;
  version: string;
  status: "official" | "partial" | "draft" | "archived";
  bookIds: string[];
  tags: string[];
}

export interface KnowledgeSourceManifestItem {
  id: string;
  collectionId: string;
  bookNumber: string;
  expectedTitle: string;
  expectedSlug: string;
  expectedVersion?: string;
  expectedDocumentStatus?: string;
  sourceFound: boolean;
  sourcePath?: string;
  sourceFormat?: string;
  contentComplete: boolean;
  ingestionStatus: "missing" | "located" | "validated" | "ingested" | "rejected";
  bookId?: string;
  notes?: string;
}

export interface ProductContextPack {
  id: string;
  productId: string;
  version: string;
  status: "official" | "partial" | "outdated";
  sourceBookIds: string[];
  architectureReferences: EntityReference[];
  moduleReferences: EntityReference[];
  ruleReferences: EntityReference[];
  terminologyReferences: EntityReference[];
  decisionReferences: EntityReference[];
  roadmapReferences: EntityReference[];
  generatedAt: string;
  updatedAt: string;
}
