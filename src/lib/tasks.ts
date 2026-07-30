import { Task, TaskStatus, TaskPriority } from "@/data/types";
import { tasksData } from "@/data/tasks";

export function getTaskById(id: string): Task | undefined {
  return tasksData.find((t) => t.id === id);
}

export function getTasksByProject(tasks: Task[], projectId: string): Task[] {
  return tasks.filter((t) => t.projectId === projectId);
}

export function getTasksByResponsible(tasks: Task[], responsibleId: string): Task[] {
  return tasks.filter((t) => t.responsibleId === responsibleId);
}

export function getTaskStatusLabel(status: TaskStatus): string {
  const labels: Record<TaskStatus, string> = {
    backlog: "Backlog",
    todo: "A Fazer",
    in_progress: "Em Andamento",
    review: "Em Revisão",
    done: "Concluído",
  };
  return labels[status] || status;
}

export function getTaskPriorityLabel(priority: TaskPriority): string {
  const labels: Record<TaskPriority, string> = {
    low: "Baixa",
    medium: "Média",
    high: "Alta",
    urgent: "Urgente",
  };
  return labels[priority] || priority;
}
