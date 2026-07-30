import { KnowledgeCollection, KnowledgeSourceManifestItem, ProductContextPack } from "./knowledge";

export const mockFlowKnowledgeCollection: KnowledgeCollection = {
  id: "col-flow",
  companyId: "comp-new",
  productId: "proj_flow",
  title: "FLOW BOOK — Base Documental Oficial",
  slug: "flow-book",
  version: "1.0",
  status: "partial",
  bookIds: [],
  tags: ["flow", "produto", "documentação", "fundação"],
  createdAt: "2026-07-22T00:00:00Z",
  updatedAt: "2026-07-22T00:00:00Z",
  createdBy: { type: "human", id: "user-rafael", name: "Rafael" }
};

export const mockFlowManifest: KnowledgeSourceManifestItem[] = [
  {
    id: "man-flow-000",
    collectionId: "col-flow",
    bookNumber: "000",
    expectedTitle: "NEW Design System de Documentação",
    expectedSlug: "000-design-system",
    expectedVersion: "1.0",
    expectedDocumentStatus: "Padrão Oficial",
    sourceFound: false,
    contentComplete: false,
    ingestionStatus: "missing"
  },
  {
    id: "man-flow-001",
    collectionId: "col-flow",
    bookNumber: "001",
    expectedTitle: "Visão Geral do Sistema",
    expectedSlug: "001-visao-geral",
    expectedVersion: "1.0",
    expectedDocumentStatus: "Arquitetura Principal",
    sourceFound: false,
    contentComplete: false,
    ingestionStatus: "missing"
  },
  {
    id: "man-flow-002",
    collectionId: "col-flow",
    bookNumber: "002",
    expectedTitle: "Motor de Disponibilidade Multiprofissional",
    expectedSlug: "002-motor-disponibilidade",
    expectedVersion: "1.0",
    expectedDocumentStatus: "Arquitetura Principal",
    sourceFound: false,
    contentComplete: false,
    ingestionStatus: "missing"
  },
  {
    id: "man-flow-003",
    collectionId: "col-flow",
    bookNumber: "003",
    expectedTitle: "Agendamento Público",
    expectedSlug: "003-agendamento-publico",
    expectedVersion: "1.0",
    expectedDocumentStatus: "Arquitetura Principal",
    sourceFound: false,
    contentComplete: false,
    ingestionStatus: "missing"
  },
  {
    id: "man-flow-004",
    collectionId: "col-flow",
    bookNumber: "004",
    expectedTitle: "Operação do Dia",
    expectedSlug: "004-operacao-do-dia",
    expectedVersion: "1.0",
    expectedDocumentStatus: "Arquitetura Principal",
    sourceFound: false,
    contentComplete: false,
    ingestionStatus: "missing"
  },
  {
    id: "man-flow-005",
    collectionId: "col-flow",
    bookNumber: "005",
    expectedTitle: "Central Operacional",
    expectedSlug: "005-central-operacional",
    expectedVersion: "1.0",
    expectedDocumentStatus: "Arquitetura Principal",
    sourceFound: false,
    contentComplete: false,
    ingestionStatus: "missing"
  },
  {
    id: "man-flow-006",
    collectionId: "col-flow",
    bookNumber: "006",
    expectedTitle: "Arquitetura Geral",
    expectedSlug: "006-arquitetura-geral",
    expectedVersion: "1.0",
    expectedDocumentStatus: "Arquitetura Oficial",
    sourceFound: false,
    contentComplete: false,
    ingestionStatus: "missing"
  },
  {
    id: "man-flow-007",
    collectionId: "col-flow",
    bookNumber: "007",
    expectedTitle: "APIs e Integrações",
    expectedSlug: "007-apis-integracoes",
    expectedVersion: "1.0",
    expectedDocumentStatus: "Arquitetura Oficial",
    sourceFound: false,
    contentComplete: false,
    ingestionStatus: "missing"
  },
  {
    id: "man-flow-008",
    collectionId: "col-flow",
    bookNumber: "008",
    expectedTitle: "FLOW BOOK — Livro Oficial do Produto",
    expectedSlug: "008-flow-book",
    expectedVersion: "1.0",
    expectedDocumentStatus: "Documento Mestre",
    sourceFound: false,
    contentComplete: false,
    ingestionStatus: "missing"
  },
  {
    id: "man-flow-009",
    collectionId: "col-flow",
    bookNumber: "009",
    expectedTitle: "Auditoria da Documentação",
    expectedSlug: "009-auditoria",
    expectedVersion: "1.0",
    expectedDocumentStatus: "Aprovado com Ajustes",
    sourceFound: false,
    contentComplete: false,
    ingestionStatus: "missing"
  }
];

export const mockFlowContextPack: ProductContextPack = {
  id: "ctx-flow-1.0",
  productId: "proj_flow",
  version: "1.0",
  status: "partial",
  sourceBookIds: [],
  architectureReferences: [],
  moduleReferences: [],
  ruleReferences: [],
  terminologyReferences: [],
  decisionReferences: [],
  roadmapReferences: [],
  generatedAt: "2026-07-22T00:00:00Z",
  updatedAt: "2026-07-22T00:00:00Z",
};
