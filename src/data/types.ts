import { ComponentType } from "react";

export type Category = "Todos" | "Empresa" | "NEX" | "Produtos" | "Operação" | "IA" | "Framework";

export interface CategoryInfo {
  id: string;
  slug: string;
  nome: Category;
  cor: string; // Tailwind styling color tokens
  icon: ComponentType<{ className?: string }>;
  descricao: string;
}

export interface DocumentVersion {
  id: string;
  version: string;
  createdAt: string;
  author: string;
  summary: string;
  changes: string[];
  status: "draft" | "published" | "archived";
}

export interface DocumentSection {
  titulo: string;
  texto: string;
}

export interface DocumentData {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  categoria: Category;
  currentVersion: string;
  status: string;
  atualizadoEm: string;
  tempoLeitura: string;
  publico: string[];
  conteudo: {
    secoes: DocumentSection[];
  };
  relacionados: string[]; // slugs
  tags: string[];
  keywords: string[];
  versions: DocumentVersion[];
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface DashboardMetric {
  title: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
}

export interface RecentActivity {
  text: string;
  time: string;
}

export interface QuickAccessItem {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  desc: string;
}

export interface CompanyHighlight {
  title: string;
  desc: string;
  icon: ComponentType<{ className?: string }>;
  docCount: string;
  href: string;
}

export interface NexMainCard {
  title: string;
  desc: string;
  slug: string;
  icon: ComponentType<{ className?: string }>;
}

export interface JourneyStep {
  name: string;
  desc: string;
}

export interface RecentDocument {
  slug: string;
  viewedAt: string; // ISO date string
}

export type UserRole = "admin" | "manager" | "member" | "viewer";

export type UserStatus = "active" | "invited" | "inactive";

export type SystemModule =
  | "dashboard"
  | "documents"
  | "company"
  | "nex"
  | "clients"
  | "projects"
  | "tasks"
  | "financial"
  | "settings"
  | "ia";

export type PermissionAction = "view" | "create" | "edit" | "delete" | "manage";

export interface Permission {
  module: SystemModule;
  actions: PermissionAction[];
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  jobTitle: string;
  department: string;
  createdAt: string;
  lastActiveAt?: string;
  permissions: Permission[];
}

export type ClientStatus = "lead" | "active" | "inactive";

export type PipelineStage = "lead" | "contact" | "proposal" | "closing" | "won" | "lost";

export interface Contact {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface ClientProposal {
  id: string;
  title: string;
  value: number;
  status: "draft" | "sent" | "accepted" | "declined";
  sentAt: string;
  documentSlug?: string;
}

export interface Client {
  id: string;
  name: string;
  logo?: string;
  status: ClientStatus;
  domain: string;
  industry: string;
  revenue: string;
  contacts: Contact[];
  proposals: ClientProposal[];
  pipelineStage: PipelineStage;
  notes?: string;
}

export type ProjectStatus = "planning" | "active" | "paused" | "completed" | "cancelled";

export type ProjectPriority = "low" | "medium" | "high" | "urgent";

export type ProjectHealth = "on_track" | "at_risk" | "delayed";

export type DeliverableStatus = "pending" | "in_progress" | "review" | "approved" | "delivered";

export interface ProjectMember {
  userId: string;
  role: string;
}

export interface Deliverable {
  id: string;
  title: string;
  description?: string;
  status: DeliverableStatus;
  responsibleId: string;
  dueDate: string;
  progress?: number;
  completedAt?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  clientId: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  health: ProjectHealth;
  ownerId: string;
  members: ProjectMember[];
  startDate: string;
  dueDate: string;
  progress: number;
  budget?: number;
  tags: string[];
  deliverables: Deliverable[];
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = "backlog" | "todo" | "in_progress" | "review" | "done";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface TaskChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskComment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  type?: string;
  projectId?: string;
  clientId?: string;
  deliverableId?: string;
  responsibleId?: string;
  dueDate?: string;
  checklist?: TaskChecklistItem[];
  comments?: TaskComment[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  contextDocumentId?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export type BookSectionType = "chapter_header" | "text" | "quote" | "timeline" | "architecture" | "decision" | "objective" | "warning" | "best_practice" | "metric" | "related";

export interface BookSection {
  id: string;
  type: BookSectionType;
  title?: string;
  content?: string;
  metadata?: Record<string, unknown>; // for metrics, related links, etc.
}

export interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  chapter?: string;
  volume?: string;
  version: string;
  readTime: string;
  tags: string[];
  products: string[];
  agents: string[];
  createdAt: string;
  updatedAt: string;
  sections: BookSection[];
}

export type PatternCategory = "architecture" | "design" | "ux" | "animations" | "authentication" | "database" | "crm" | "ia" | "sales" | "branding";

export interface Pattern {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: PatternCategory;
  content: string; // Markdown
  relatedProjects: string[]; // proj_flow, proj_nex
  createdAt: string;
  updatedAt: string;
  author: string;
}
