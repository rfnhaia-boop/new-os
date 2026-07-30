"use client";

import { useState } from "react";
import { Plus, Users as UsersIcon, UserCheck, Shield, Clock } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { UserCard } from "@/components/users/user-card";
import { StatCard } from "@/components/ui/StatCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { InviteUserModal } from "@/components/users/invite-user-modal";
import { useCurrentUser } from "@/contexts/current-user-context";
import { usersData, SystemUser } from "@/data";

export default function UsersPage() {
  const { can } = useCurrentUser();
  const [users, setUsers] = useState<SystemUser[]>(usersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("Todos");
  const [selectedStatus, setSelectedStatus] = useState<string>("Todos");
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  // Compute metrics
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const invitedUsers = users.filter((u) => u.status === "invited").length;
  const adminUsers = users.filter((u) => u.role === "admin").length;

  const handleInviteUser = (newUserFields: Partial<SystemUser>) => {
    const defaultPermissions = [
      { module: "dashboard" as const, actions: ["view" as const] },
      { module: "documents" as const, actions: ["view" as const] },
    ];

    const newUser: SystemUser = {
      id: `usr_${Date.now()}`,
      name: newUserFields.name || "Novo Membro",
      email: newUserFields.email || "",
      role: newUserFields.role || "member",
      status: "invited",
      jobTitle: newUserFields.jobTitle || "Membro da Equipe",
      department: newUserFields.department || "Operações",
      createdAt: new Date().toISOString().split("T")[0],
      lastActiveAt: "Nunca",
      permissions: defaultPermissions,
    };

    setUsers((prev) => [newUser, ...prev]);
    alert(`Convite enviado com sucesso para ${newUser.name}!`);
  };

  // Filter logic
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === "Todos" || u.role === selectedRole;
    const matchesStatus =
      selectedStatus === "Todos" || u.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const headerActions = can("settings", "manage") && (
    <button
      onClick={() => setIsInviteOpen(true)}
      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-black bg-white hover:bg-neutral-200 border border-white rounded-lg transition-colors cursor-pointer w-full sm:w-auto"
    >
      <Plus className="w-4 h-4" />
      <span>Convidar usuário</span>
    </button>
  );

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title="Equipe"
        subtitle="Gerencie as pessoas, funções e acessos do NEW OS."
        actions={headerActions || undefined}
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de usuários"
          value={String(totalUsers)}
          icon={UsersIcon}
        />
        <StatCard
          title="Ativos"
          value={String(activeUsers)}
          icon={UserCheck}
        />
        <StatCard
          title="Convites pendentes"
          value={String(invitedUsers)}
          icon={Clock}
        />
        <StatCard
          title="Administradores"
          value={String(adminUsers)}
          icon={Shield}
        />
      </div>

      {/* Filters and Search Bar */}
      <div className="space-y-4 bg-[#111111]/40 border border-[#27272A] rounded-xl p-5">
        <SearchInput
          placeholder="Pesquisar por nome, e-mail, cargo ou departamento..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#27272A]/60">
          {/* Filter by Role */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-[#A1A1AA]">Função (Cargo)</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-[#111111] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500 cursor-pointer"
            >
              <option value="Todos">Todas as Funções</option>
              <option value="admin">Administrador</option>
              <option value="manager">Gestor</option>
              <option value="member">Membro</option>
              <option value="viewer">Visualizador</option>
            </select>
          </div>

          {/* Filter by Status */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-[#A1A1AA]">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#111111] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500 cursor-pointer"
            >
              <option value="Todos">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="invited">Convidado</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="space-y-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <EmptyState
            title="Nenhum membro encontrado"
            description="Tente redefinir sua pesquisa ou ajustar os filtros aplicados."
            icon={UsersIcon}
          />
        )}
      </div>

      {/* Invite Modal */}
      <InviteUserModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onInvite={handleInviteUser}
      />
    </PageContainer>
  );
}
