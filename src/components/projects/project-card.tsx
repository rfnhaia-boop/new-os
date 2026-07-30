import Link from "next/link";
import { ChevronRight, Calendar, Layers } from "lucide-react";
import { ProjectStatusBadge } from "./project-status-badge";
import { ProjectHealthBadge } from "./project-health-badge";
import { ProgressBar } from "./progress-bar";
import { Project } from "@/data/types";
import { getProjectClient, getProjectOwner, getProjectPriorityLabel } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const client = getProjectClient(project);
  const owner = getProjectOwner(project);
  const priorityLabel = getProjectPriorityLabel(project.priority);

  const priorityStyles = {
    low: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
    medium: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    high: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    urgent: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  return (
    <div className="group flex flex-col p-5 bg-[#111111] border border-[#27272A] rounded-xl hover:border-neutral-500 transition-all gap-4">
      {/* Title & Status Header */}
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-bold text-white group-hover:text-neutral-200 transition-colors truncate block"
          >
            {project.name}
          </Link>
          <div className="flex items-center gap-1.5 shrink-0">
            <ProjectStatusBadge status={project.status} />
            <ProjectHealthBadge health={project.health} />
          </div>
        </div>
        <p className="text-xs text-[#A1A1AA] line-clamp-2 mt-1">{project.description}</p>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[11px] text-[#A1A1AA] border-t border-[#27272A] pt-3">
        <div className="space-y-0.5">
          <span className="block text-[9px] uppercase tracking-wider text-[#A1A1AA]/70">Cliente</span>
          <span className="text-white font-medium truncate block">{client?.name || "Não atribuído"}</span>
        </div>
        <div className="space-y-0.5">
          <span className="block text-[9px] uppercase tracking-wider text-[#A1A1AA]/70">Responsável</span>
          <span className="text-white font-medium truncate block">{owner?.name || "Não atribuído"}</span>
        </div>
        <div className="space-y-0.5">
          <span className="block text-[9px] uppercase tracking-wider text-[#A1A1AA]/70">Prioridade</span>
          <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold border ${priorityStyles[project.priority]}`}>
            {priorityLabel}
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="block text-[9px] uppercase tracking-wider text-[#A1A1AA]/70">Prazo Final</span>
          <span className="text-white font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#A1A1AA]" />
            <span>{project.dueDate}</span>
          </span>
        </div>
      </div>

      {/* Progress & Deliverables Footer */}
      <div className="border-t border-[#27272A] pt-3 flex flex-col gap-3">
        <ProgressBar progress={project.progress} />
        
        <div className="flex items-center justify-between gap-2 text-[10px] text-[#A1A1AA]">
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            <strong>{project.deliverables.length}</strong> entregáveis
          </span>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-white hover:text-black bg-transparent hover:bg-white border border-[#27272A] hover:border-white rounded-lg transition-colors cursor-pointer"
          >
            <span>Acessar</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
