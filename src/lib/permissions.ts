import { SystemUser, UserRole, UserStatus, SystemModule, PermissionAction } from "@/data/types";

export function hasPermission(
  user: SystemUser | null | undefined,
  module: SystemModule,
  action: PermissionAction
): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;

  const permission = user.permissions.find((p) => p.module === module);
  if (!permission) return false;

  return (
    permission.actions.includes(action) ||
    permission.actions.includes("manage")
  );
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    admin: "Administrador",
    manager: "Gestor",
    member: "Membro",
    viewer: "Visualizador",
  };
  return labels[role] || role;
}

export function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    admin: "Acesso total a todas as áreas e configurações do sistema.",
    manager: "Gerenciamento de equipes, projetos, clientes e documentos.",
    member: "Criação e edição de tarefas, documentos e projetos designados.",
    viewer: "Apenas leitura de documentos, relatórios e andamento de projetos.",
  };
  return descriptions[role] || "";
}

export function getStatusLabel(status: UserStatus): string {
  const labels: Record<UserStatus, string> = {
    active: "Ativo",
    invited: "Convidado",
    inactive: "Inativo",
  };
  return labels[status] || status;
}

export function getUsersByStatus(users: SystemUser[], status: UserStatus): SystemUser[] {
  return users.filter((u) => u.status === status);
}

export function getUsersByRole(users: SystemUser[], role: UserRole): SystemUser[] {
  return users.filter((u) => u.role === role);
}
