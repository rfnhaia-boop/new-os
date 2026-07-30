import { TaskPriority } from "@/data/types";
import { getTaskPriorityLabel } from "@/lib/tasks";

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
}

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  const styles: Record<TaskPriority, string> = {
    low: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
    medium: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    high: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    urgent: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold border ${styles[priority]}`}>
      {getTaskPriorityLabel(priority)}
    </span>
  );
}
