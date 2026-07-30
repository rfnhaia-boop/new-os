"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Building,
  Plus,
  Briefcase,
} from "lucide-react";
import { Project, Deliverable, DeliverableStatus, usersData, tasksData } from "@/data";
import { getProjectClient, getProjectOwner, getProjectPriorityLabel, calculateProjectProgress } from "@/lib/projects";
import { ProjectStatusBadge } from "./project-status-badge";
import { ProjectHealthBadge } from "./project-health-badge";
import { TaskStatusBadge } from "@/components/tasks/task-status-badge";
import { ProgressBar } from "./progress-bar";
import { DeliverableItem } from "./deliverable-item";
import { useCurrentUser } from "@/contexts/current-user-context";

interface ProjectDetailClientProps {
  initialProject: Project;
}

export function ProjectDetailClient({ initialProject }: ProjectDetailClientProps) {
  const { can } = useCurrentUser();
  const [project, setProject] = useState<Project>(initialProject);
  const projectTasks = tasksData.filter(t => t.projectId === project.id);

  // New Deliverable Form Fields
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newRespId, setNewRespId] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const client = getProjectClient(project);
  const owner = getProjectOwner(project);
  const priorityLabel = getProjectPriorityLabel(project.priority);

  // Handle deliverable status change
  const handleDeliverableStatusChange = (id: string, newStatus: DeliverableStatus) => {
    const updatedDeliverables = project.deliverables.map((d) => {
      if (d.id === id) {
        return {
          ...d,
          status: newStatus,
          completedAt: ["approved", "delivered"].includes(newStatus)
            ? new Date().toISOString().split("T")[0]
            : undefined,
        };
      }
      return d;
    });

    const newProgress = calculateProjectProgress(updatedDeliverables);

    setProject((prev) => ({
      ...prev,
      deliverables: updatedDeliverables,
      progress: newProgress,
      updatedAt: new Date().toISOString().split("T")[0],
    }));
  };

  // Add Deliverable
  const handleAddDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDueDate || !newRespId) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    const newDel: Deliverable = {
      id: `del_${Date.now()}`,
      title: newTitle,
      description: newDesc || undefined,
      status: "pending",
      responsibleId: newRespId,
      dueDate: newDueDate,
    };

    const updatedDeliverables = [...project.deliverables, newDel];
    const newProgress = calculateProjectProgress(updatedDeliverables);

    setProject((prev) => ({
      ...prev,
      deliverables: updatedDeliverables,
      progress: newProgress,
      updatedAt: new Date().toISOString().split("T")[0],
    }));

    setIsFormOpen(false);
    setNewTitle("");
    setNewDesc("");
    setNewDueDate("");
    setNewRespId("");
    alert("Entregável adicionado com sucesso e progresso recalculado!");
  };

  const priorityStyles = {
    low: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
    medium: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    high: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    urgent: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[#A1A1AA]">
        <Link href="/projects" className="hover:text-white transition-colors">
          Projetos
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white truncate max-w-[200px]">{project.name}</span>
      </nav>

      {/* Main summary Header Card */}
      <div className="p-6 bg-[#111111] border border-[#27272A] rounded-xl flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="p-4 bg-[#0A0A0A] border border-[#27272A] rounded-xl text-white">
          <Briefcase className="w-8 h-8" />
        </div>
        <div className="flex-1 space-y-2 text-center md:text-left min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-2.5 justify-center md:justify-start">
            <h1 className="text-2xl font-bold text-white tracking-tight">{project.name}</h1>
            <div className="flex items-center gap-2 justify-center shrink-0">
              <ProjectStatusBadge status={project.status} />
              <ProjectHealthBadge health={project.health} />
              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${priorityStyles[project.priority]}`}>
                {priorityLabel}
              </span>
            </div>
          </div>
          <p className="text-xs text-[#A1A1AA] max-w-3xl">{project.description}</p>
        </div>
      </div>

      {/* Layout Split Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Deliverables */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
                Entregas & Entregáveis
              </h3>
              {can("projects", "edit") && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Novo Entregável</span>
                </button>
              )}
            </div>

            {/* Deliverables list */}
            {project.deliverables.length > 0 ? (
              <div className="space-y-3">
                {project.deliverables.map((del) => (
                  <DeliverableItem
                    key={del.id}
                    deliverable={del}
                    onStatusChange={handleDeliverableStatusChange}
                    canEdit={can("projects", "edit")}
                  />
                ))}
              </div>
            ) : (
              <span className="text-xs text-[#A1A1AA]/50 italic block">
                Nenhum entregável cadastrado para este projeto.
              </span>
            )}
          </div>
        </div>

        {/* Right Column - Project Metadata, Team & Client */}
        <div className="lg:col-span-1 space-y-6">
          {/* Progress bar */}
          <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl">
            <ProgressBar progress={project.progress} />
          </div>

          {/* Client Information */}
          <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] border-b border-[#27272A] pb-2">
              Informações do Cliente
            </h3>
            {client ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#A1A1AA]" />
                  <span className="text-xs font-bold text-white">{client.name}</span>
                </div>
                <p className="text-[10px] text-[#A1A1AA]">{client.industry} &bull; {client.revenue}</p>
                <div className="pt-2">
                  <Link
                    href={`/clients/${client.id}`}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-400 hover:underline"
                  >
                    <span>Acessar no CRM</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ) : (
              <span className="text-xs text-[#A1A1AA]/50 italic">Nenhum cliente associado.</span>
            )}
          </div>

          {/* Project Tasks */}
          <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl space-y-4">
            <h2 className="text-sm font-semibold text-white">Tarefas Operacionais</h2>
            <div className="space-y-2">
              {projectTasks.length > 0 ? (
                projectTasks.map(task => (
                  <Link
                    key={task.id}
                    href={`/tasks/${task.id}`}
                    className="flex items-center justify-between p-3 bg-[#0A0A0A] border border-[#27272A] rounded-lg hover:border-indigo-500/50 transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{task.title}</h4>
                      <span className="text-[10px] text-[#A1A1AA]">{task.type || "Geral"}</span>
                    </div>
                    <TaskStatusBadge status={task.status} />
                  </Link>
                ))
              ) : (
                <span className="text-xs text-[#A1A1AA]/50 italic block">Nenhuma tarefa associada a este projeto.</span>
              )}
            </div>
          </div>

          {/* Timeline & Budget */}
          <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] border-b border-[#27272A] pb-2">
              Prazos & Orçamento
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-[#A1A1AA]">
                <span>Data de Início</span>
                <strong className="text-white">{project.startDate}</strong>
              </div>
              <div className="flex items-center justify-between text-[#A1A1AA]">
                <span>Prazo Final</span>
                <strong className="text-white">{project.dueDate}</strong>
              </div>
              {project.budget && (
                <div className="flex items-center justify-between text-[#A1A1AA] border-t border-[#27272A] pt-2 mt-2">
                  <span>Orçamento total</span>
                  <strong className="text-emerald-400 font-bold">
                    R$ {project.budget.toLocaleString("pt-BR")}
                  </strong>
                </div>
              )}
            </div>
          </div>

          {/* Team Members */}
          <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] border-b border-[#27272A] pb-2">
              Equipe do Projeto
            </h3>
            <div className="space-y-3">
              {/* Project Owner */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#27272A] flex items-center justify-center text-xs font-semibold text-white">
                  {owner?.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block truncate">{owner?.name}</span>
                  <span className="text-[10px] text-rose-400">Responsável Líder</span>
                </div>
              </div>

              {/* Members */}
              {project.members.filter((m) => m.userId !== project.ownerId).map((member, idx) => {
                const u = usersData.find((user) => user.id === member.userId);
                return (
                  <div key={idx} className="flex items-center gap-3 pt-2 border-t border-[#27272A]/50">
                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#27272A] flex items-center justify-center text-xs font-semibold text-white">
                      {u?.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block truncate">{u?.name}</span>
                      <span className="text-[10px] text-[#A1A1AA]">{member.role}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* New Deliverable Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#111111] border border-[#27272A] rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272A]">
              <h3 className="text-sm font-semibold text-white">Novo Entregável</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-[#A1A1AA] hover:text-white p-1 rounded hover:bg-[#1A1A1A] transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddDeliverable} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-[#A1A1AA] font-semibold">Título *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Auditoria de Banco de Dados"
                  className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#A1A1AA] font-semibold">Descrição</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Ex: Detalhamento sobre os requisitos..."
                  rows={2}
                  className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#A1A1AA] font-semibold">Prazo Final *</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-[#A1A1AA] font-semibold">Responsável *</label>
                  <select
                    value={newRespId}
                    onChange={(e) => setNewRespId(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
                  >
                    <option value="">Selecione...</option>
                    {usersData.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#27272A] mt-6">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#A1A1AA] hover:text-white border border-[#27272A] rounded-lg bg-transparent hover:bg-[#1A1A1A] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-semibold text-black bg-white hover:bg-neutral-200 border border-white rounded-lg transition-colors cursor-pointer"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
