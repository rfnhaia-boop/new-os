import { ProjectHealth } from "@/data/types";
import { getProjectHealthLabel } from "@/lib/projects";

interface ProjectHealthBadgeProps {
  health: ProjectHealth;
}

export function ProjectHealthBadge({ health }: ProjectHealthBadgeProps) {
  const styles: Record<ProjectHealth, string> = {
    on_track: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    at_risk: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    delayed: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${styles[health]}`}>
      {getProjectHealthLabel(health)}
    </span>
  );
}
