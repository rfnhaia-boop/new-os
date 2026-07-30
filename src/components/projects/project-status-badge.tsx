import { ProjectStatus } from "@/data/types";
import { getProjectStatusLabel } from "@/lib/projects";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const styles: Record<ProjectStatus, string> = {
    planning: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    paused: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    completed: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    cancelled: "bg-[#1A1A1A] text-[#A1A1AA] border-[#27272A]",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${styles[status]}`}>
      {getProjectStatusLabel(status)}
    </span>
  );
}
