"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  AlertCircle,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { projectsData, usersData, DeliverableStatus } from "@/data";
import { SIMULATED_NOW } from "@/lib/date";

interface ResolvedDeliverable {
  id: string;
  title: string;
  description?: string;
  status: DeliverableStatus;
  responsibleId: string;
  dueDate: string;
  completedAt?: string;
  projectSlug: string;
  projectName: string;
  projectId: string;
}

export default function DeliverablesPage() {
  const [selectedProject, setSelectedProject] = useState("Todos");
  const [selectedOwner, setSelectedOwner] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  // Flatten all deliverables with project context
  const allDeliverables: ResolvedDeliverable[] = projectsData.flatMap((p) =>
    p.deliverables.map((d) => ({
      ...d,
      projectSlug: p.slug,
      projectName: p.name,
      projectId: p.id,
    }))
  );

  // Filter logic
  const filteredDeliverables = allDeliverables.filter((d) => {
    const matchesProject = selectedProject === "Todos" || d.projectId === selectedProject;
    const matchesOwner = selectedOwner === "Todos" || d.responsibleId === selectedOwner;
    const matchesStatus = selectedStatus === "Todos" || d.status === selectedStatus;

    return matchesProject && matchesOwner && matchesStatus;
  });

  const limit7Days = new Date(SIMULATED_NOW.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Grouping
  const overdue = filteredDeliverables.filter((d) => {
    if (["approved", "delivered"].includes(d.status)) return false;
    return new Date(d.dueDate) < SIMULATED_NOW;
  });

  const upcoming7Days = filteredDeliverables.filter((d) => {
    if (["approved", "delivered"].includes(d.status)) return false;
    const dueDate = new Date(d.dueDate);
    return dueDate >= SIMULATED_NOW && dueDate <= limit7Days;
  });

  const inProgress = filteredDeliverables.filter((d) => {
    if (["approved", "delivered"].includes(d.status)) return false;
    const dueDate = new Date(d.dueDate);
    // Not overdue and not in next 7 days (or simply other in_progress/pending items)
    return dueDate > limit7Days || (dueDate >= SIMULATED_NOW && !upcoming7Days.some((up) => up.id === d.id));
  });

  const completed = filteredDeliverables.filter((d) =>
    ["approved", "delivered"].includes(d.status)
  );

  const renderDeliverableList = (list: ResolvedDeliverable[], emptyMessage: string) => {
    if (list.length === 0) {
      return (
        <span className="text-xs text-[#A1A1AA]/50 italic block p-4 bg-[#111111]/10 border border-[#27272A]/40 rounded-lg">
          {emptyMessage}
        </span>
      );
    }

    return (
      <div className="space-y-2.5">
        {list.map((d) => {
          const resp = usersData.find((u) => u.id === d.responsibleId);
          const isLate = !["approved", "delivered"].includes(d.status) && new Date(d.dueDate) < SIMULATED_NOW;

          return (
            <div
              key={d.id}
              className="p-4 bg-[#111111] border border-[#27272A] rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-neutral-500 transition-colors"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-white truncate">{d.title}</h4>
                  <span className="text-[9px] bg-[#0A0A0A] border border-[#27272A] text-[#A1A1AA] px-1.5 py-0.5 rounded">
                    Projeto: {d.projectName}
                  </span>
                </div>
                {d.description && (
                  <p className="text-[11px] text-[#A1A1AA] line-clamp-1">{d.description}</p>
                )}

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] text-[#A1A1AA] pt-0.5">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-[#A1A1AA]" />
                    <span>{resp?.name || "Não atribuído"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#A1A1AA]" />
                    <span className={isLate ? "text-red-400 font-semibold" : ""}>
                      Prazo: {d.dueDate}
                    </span>
                  </div>
                  {d.completedAt && (
                    <div className="flex items-center gap-1 text-emerald-400">
                      <Clock className="w-3 h-3" />
                      <span>Entregue em: {d.completedAt}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <Link
                  href={`/projects/${d.projectSlug}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white hover:text-black bg-transparent hover:bg-white border border-[#27272A] hover:border-white rounded-lg transition-colors cursor-pointer"
                >
                  <span>Ver Projeto</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title="Visão de Entregas"
        subtitle="Acompanhe de forma unificada os entregáveis de todos os projetos ativos."
      />

      {/* Advanced Filters */}
      <div className="space-y-4 bg-[#111111]/40 border border-[#27272A] rounded-xl p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <Filter className="w-4 h-4 text-[#A1A1AA]" />
          <span>Filtros Rápidos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#27272A]/60">
          {/* Project */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#A1A1AA] font-medium">Projeto</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full bg-[#111111] border border-[#27272A] text-[11px] text-white rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="Todos">Todos os Projetos</option>
              {projectsData.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
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
              <option value="Todos">Todos os Responsáveis</option>
              {usersData.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#A1A1AA] font-medium">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#111111] border border-[#27272A] text-[11px] text-white rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="Todos">Todos os Status</option>
              <option value="pending">Pendente</option>
              <option value="in_progress">Em Andamento</option>
              <option value="review">Em Revisão</option>
              <option value="approved">Aprovado</option>
              <option value="delivered">Entregue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Columns lists split */}
      <div className="space-y-8 mt-6">
        {/* Atrasados */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#27272A] pb-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Entregas Atrasadas ({overdue.length})
            </h3>
          </div>
          {renderDeliverableList(overdue, "Nenhum entregável atrasado no momento.")}
        </div>

        {/* Próximos 7 dias */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#27272A] pb-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Próximos 7 Dias ({upcoming7Days.length})
            </h3>
          </div>
          {renderDeliverableList(upcoming7Days, "Nenhum entregável com vencimento próximo.")}
        </div>

        {/* Em andamento */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#27272A] pb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Em Andamento ({inProgress.length})
            </h3>
          </div>
          {renderDeliverableList(inProgress, "Nenhum entregável em andamento planejado.")}
        </div>

        {/* Concluídos */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#27272A] pb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Concluídos ({completed.length})
            </h3>
          </div>
          {renderDeliverableList(completed, "Nenhum entregável concluído ainda.")}
        </div>
      </div>
    </PageContainer>
  );
}
