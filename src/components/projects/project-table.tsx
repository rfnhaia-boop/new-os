import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import { ProjectStatusBadge } from "./project-status-badge";
import { ProjectHealthBadge } from "./project-health-badge";
import { Project } from "@/data/types";
import { getProjectClient, getProjectOwner, getProjectPriorityLabel } from "@/lib/projects";

interface ProjectTableProps {
  projects: Project[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  const priorityStyles = {
    low: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
    medium: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    high: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    urgent: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  return (
    <div className="overflow-x-auto border border-[#27272A] rounded-xl bg-[#0A0A0A]">
      <table className="min-w-full divide-y divide-[#27272A] text-left text-xs text-[#A1A1AA]">
        <thead className="bg-[#111111] text-white font-medium">
          <tr>
            <th className="px-5 py-3.5">Projeto</th>
            <th className="px-5 py-3.5">Cliente</th>
            <th className="px-5 py-3.5">Responsável</th>
            <th className="px-5 py-3.5 text-center">Status</th>
            <th className="px-5 py-3.5 text-center">Saúde</th>
            <th className="px-5 py-3.5 text-center">Prioridade</th>
            <th className="px-5 py-3.5">Progresso</th>
            <th className="px-5 py-3.5">Prazo</th>
            <th className="px-5 py-3.5 text-right">Ação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#27272A]/70">
          {projects.map((project) => {
            const client = getProjectClient(project);
            const owner = getProjectOwner(project);
            const priorityLabel = getProjectPriorityLabel(project.priority);

            return (
              <tr key={project.id} className="hover:bg-[#111111]/30 transition-colors">
                <td className="px-5 py-4 font-semibold text-white">
                  <Link href={`/projects/${project.slug}`} className="hover:underline block">
                    {project.name}
                  </Link>
                </td>
                <td className="px-5 py-4">{client?.name || "-"}</td>
                <td className="px-5 py-4">{owner?.name || "-"}</td>
                <td className="px-5 py-4 text-center">
                  <ProjectStatusBadge status={project.status} />
                </td>
                <td className="px-5 py-4 text-center">
                  <ProjectHealthBadge health={project.health} />
                </td>
                <td className="px-5 py-4 text-center">
                  <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold border ${priorityStyles[project.priority]}`}>
                    {priorityLabel}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-[#1A1A1A] border border-[#27272A] rounded-full overflow-hidden shrink-0">
                      <div className="h-full bg-white" style={{ width: `${project.progress}%` }} />
                    </div>
                    <span className="font-bold text-white text-[10px]">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#A1A1AA]" />
                    <span>{project.dueDate}</span>
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center justify-center p-1.5 text-white hover:text-black bg-transparent hover:bg-white border border-[#27272A] hover:border-white rounded-lg transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
