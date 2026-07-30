import {
  Project,
  ProjectStatus,
  ProjectPriority,
  ProjectHealth,
  Deliverable,
  DeliverableStatus,
  Client,
  SystemUser,
} from "@/data/types";
import { clientsData } from "@/data/clients";
import { usersData } from "@/data/users";
import { projectsData } from "@/data/projects";

const SIMULATED_NOW = new Date("2026-07-20");

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.slug === slug);
}

export function getProjectClient(project: Project): Client | undefined {
  return clientsData.find((c) => c.id === project.clientId);
}

export function getProjectOwner(project: Project): SystemUser | undefined {
  return usersData.find((u) => u.id === project.ownerId);
}

export function getProjectStatusLabel(status: ProjectStatus): string {
  const labels: Record<ProjectStatus, string> = {
    planning: "Planejamento",
    active: "Ativo",
    paused: "Pausado",
    completed: "Concluído",
    cancelled: "Cancelado",
  };
  return labels[status] || status;
}

export function getProjectPriorityLabel(priority: ProjectPriority): string {
  const labels: Record<ProjectPriority, string> = {
    low: "Baixa",
    medium: "Média",
    high: "Alta",
    urgent: "Urgente",
  };
  return labels[priority] || priority;
}

export function getProjectHealthLabel(health: ProjectHealth): string {
  const labels: Record<ProjectHealth, string> = {
    on_track: "Em Dia",
    at_risk: "Em Risco",
    delayed: "Atrasado",
  };
  return labels[health] || health;
}

export function getDeliverableStatusLabel(status: DeliverableStatus): string {
  const labels: Record<DeliverableStatus, string> = {
    pending: "Pendente",
    in_progress: "Em Andamento",
    review: "Em Revisão",
    approved: "Aprovado",
    delivered: "Entregue",
  };
  return labels[status] || status;
}

export function calculateProjectProgress(deliverables: Deliverable[]): number {
  if (deliverables.length === 0) return 0;
  const completed = deliverables.filter((d) =>
    ["approved", "delivered"].includes(d.status)
  ).length;
  return Math.round((completed / deliverables.length) * 100);
}

export function getOverdueDeliverables(deliverables: Deliverable[]): Deliverable[] {
  return deliverables.filter((d) => {
    if (["approved", "delivered"].includes(d.status)) return false;
    const dueDate = new Date(d.dueDate);
    return dueDate < SIMULATED_NOW;
  });
}

export function getUpcomingDeliverables(
  deliverables: Deliverable[],
  days: number = 7
): Deliverable[] {
  const limitDate = new Date(SIMULATED_NOW.getTime() + days * 24 * 60 * 60 * 1000);
  return deliverables.filter((d) => {
    if (["approved", "delivered"].includes(d.status)) return false;
    const dueDate = new Date(d.dueDate);
    return dueDate >= SIMULATED_NOW && dueDate <= limitDate;
  });
}

export function calculateActiveProjectValue(projects: Project[]): number {
  return projects
    .filter((p) => ["active", "planning"].includes(p.status))
    .reduce((sum, p) => sum + (p.budget || 0), 0);
}
