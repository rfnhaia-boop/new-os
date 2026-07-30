"use client";

import { useState } from "react";
import { Plus, FolderKanban, AlertTriangle, Clock, DollarSign, LayoutGrid, List } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { StatCard } from "@/components/ui/StatCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectTable } from "@/components/projects/project-table";
import { CreateProjectModal } from "@/components/projects/create-project-modal";
import { useCurrentUser } from "@/contexts/current-user-context";
import {
  projectsData,
  Project,
  clientsData,
  usersData,
} from "@/data";
import {
  getProjectClient,
  getProjectOwner,
  getOverdueDeliverables,
  calculateActiveProjectValue,
} from "@/lib/projects";

export default function ProjectsPage() {
  const { can } = useCurrentUser();
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Todos");
  const [selectedClient, setSelectedClient] = useState<string>("Todos");
  const [selectedOwner, setSelectedOwner] = useState<string>("Todos");
  const [selectedPriority, setSelectedPriority] = useState<string>("Todos");
  const [selectedHealth, setSelectedHealth] = useState<string>("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Compute metrics
  const activeProjectsCount = projects.filter((p) => p.status === "active").length;
  const atRiskCount = projects.filter((p) => p.health === "at_risk").length;
  
  const overdueDeliverablesCount = projects.reduce(
    (sum, p) => sum + getOverdueDeliverables(p.deliverables).length,
    0
  );

  const activeProjectsValue = calculateActiveProjectValue(projects);

  const handleCreateProject = (newProj: Project) => {
    setProjects((prev) => [newProj, ...prev]);
  };

  // Filter logic
  const filteredProjects = projects.filter((p) => {
    const client = getProjectClient(p);
    const owner = getProjectOwner(p);

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (owner?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === "Todos" || p.status === selectedStatus;
    const matchesClient = selectedClient === "Todos" || p.clientId === selectedClient;
    const matchesOwner = selectedOwner === "Todos" || p.ownerId === selectedOwner;
    const matchesPriority = selectedPriority === "Todos" || p.priority === selectedPriority;
    const matchesHealth = selectedHealth === "Todos" || p.health === selectedHealth;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesClient &&
      matchesOwner &&
      matchesPriority &&
      matchesHealth
    );
  });

  const headerActions = (
    <div className="flex items-center gap-3 w-full sm:w-auto">
      {/* View Mode Toggle */}
      <div className="flex items-center bg-[#111111] border border-[#27272A] rounded-lg p-0.5">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-1.5 rounded transition-colors cursor-pointer ${
            viewMode === "grid" ? "bg-white text-black" : "text-[#A1A1AA] hover:text-white"
          }`}
          title="Visualização em Cards"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode("table")}
          className={`p-1.5 rounded transition-colors cursor-pointer ${
            viewMode === "table" ? "bg-white text-black" : "text-[#A1A1AA] hover:text-white"
          }`}
          title="Visualização em Tabela"
        >
          <List className="w-4 h-4" />
        </button>
      </div>

      {can("projects", "create") && (
        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-white hover:bg-neutral-200 border border-white rounded-lg transition-colors cursor-pointer w-full sm:w-auto h-9"
        >
          <Plus className="w-4 h-4" />
          <span>Novo projeto</span>
        </button>
      )}
    </div>
  );

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title="Projetos"
        subtitle="Acompanhe os projetos, prazos e entregas da New."
        actions={headerActions}
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Projetos ativos"
          value={String(activeProjectsCount)}
          icon={FolderKanban}
        />
        <StatCard
          title="Em risco"
          value={String(atRiskCount)}
          icon={AlertTriangle}
        />
        <StatCard
          title="Entregas atrasadas"
          value={String(overdueDeliverablesCount)}
          icon={Clock}
        />
        <StatCard
          title="Valor dos projetos ativos"
          value={`R$ ${(activeProjectsValue / 1000).toFixed(0)}k`}
          icon={DollarSign}
        />
      </div>

      {/* Advanced Filters */}
      <div className="space-y-4 bg-[#111111]/40 border border-[#27272A] rounded-xl p-5">
        <SearchInput
          placeholder="Pesquisar por nome do projeto, descrição, cliente, responsável ou tags..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2 border-t border-[#27272A]/60">
          {/* Status */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#A1A1AA] font-medium">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#111111] border border-[#27272A] text-[11px] text-white rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="Todos">Todos</option>
              <option value="planning">Planejamento</option>
              <option value="active">Ativo</option>
              <option value="paused">Pausado</option>
              <option value="completed">Concluído</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>

          {/* Client */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#A1A1AA] font-medium">Cliente</label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full bg-[#111111] border border-[#27272A] text-[11px] text-white rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="Todos">Todos</option>
              {clientsData.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Owner */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#A1A1AA] font-medium">Responsável</label>
            <select
              value={selectedOwner}
              onChange={(e) => setSelectedOwner(e.target.value)}
              className="w-full bg-[#111111] border border-[#27272A] text-[11px] text-white rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="Todos">Todos</option>
              {usersData.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#A1A1AA] font-medium">Prioridade</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full bg-[#111111] border border-[#27272A] text-[11px] text-white rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="Todos">Todos</option>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>

          {/* Health */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#A1A1AA] font-medium">Saúde</label>
            <select
              value={selectedHealth}
              onChange={(e) => setSelectedHealth(e.target.value)}
              className="w-full bg-[#111111] border border-[#27272A] text-[11px] text-white rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="Todos">Todos</option>
              <option value="on_track">Em Dia</option>
              <option value="at_risk">Em Risco</option>
              <option value="delayed">Atrasado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Render list of projects */}
      {filteredProjects.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <ProjectTable projects={filteredProjects} />
        )
      ) : (
        <EmptyState
          title="Nenhum projeto encontrado"
          description="Tente ajustar seus termos de busca ou filtros avançados."
          icon={FolderKanban}
        />
      )}

      {/* Create Modal */}
      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateProject}
      />
    </PageContainer>
  );
}
