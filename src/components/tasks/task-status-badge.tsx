import { TaskStatus } from "@/data/types";
import { getTaskStatusLabel } from "@/lib/tasks";

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const styles: Record<TaskStatus, string> = {
    backlog: "bg-[#1A1A1A] text-[#A1A1AA] border-[#27272A]",
    todo: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    in_progress: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    review: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    done: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold border ${styles[status]}`}>
      {getTaskStatusLabel(status)}
    </span>
  );
}
