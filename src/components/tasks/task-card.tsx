"use client";

import { Task, TaskStatus, usersData, projectsData } from "@/data";
import { TaskPriorityBadge } from "./task-priority-badge";
import { TaskStatusBadge } from "./task-status-badge";
import { UserAvatar } from "@/components/users/user-avatar";
import { Calendar, AlertCircle } from "lucide-react";
import { SIMULATED_NOW } from "@/lib/date";

interface TaskCardProps {
  task: Task;
  onStatusChange?: (id: string, newStatus: TaskStatus) => void;
  canEdit?: boolean;
}

export function TaskCard({ task, onStatusChange, canEdit = false }: TaskCardProps) {
  const responsible = usersData.find((u) => u.id === task.responsibleId);
  const project = projectsData.find((p) => p.id === task.projectId);

  const isOverdue =
    task.dueDate &&
    task.status !== "done" &&
    new Date(task.dueDate) < SIMULATED_NOW;

  return (
    <div className="p-4 bg-[#111111] border border-[#27272A] rounded-xl hover:border-neutral-500 transition-colors space-y-3">
      {/* Title / Priority / Status */}
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-xs font-bold text-white leading-normal">{task.title}</h4>
          {isOverdue && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
              <AlertCircle className="w-2.5 h-2.5" />
              <span>Atrasado</span>
            </span>
          )}
        </div>
        {task.description && (
          <p className="text-[11px] text-[#A1A1AA] line-clamp-2">{task.description}</p>
        )}
      </div>

      {/* Meta tags and associations */}
      <div className="flex flex-wrap items-center gap-1.5">
        <TaskPriorityBadge priority={task.priority} />
        <TaskStatusBadge status={task.status} />
        {project && (
          <span className="text-[9px] bg-[#0A0A0A] border border-[#27272A] text-[#A1A1AA] px-1.5 py-0.5 rounded max-w-[120px] truncate">
            {project.name}
          </span>
        )}
      </div>

      {/* Footer Area: Responsible, DueDate and Status Mover */}
      <div className="border-t border-[#27272A] pt-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Responsible User */}
          {responsible ? (
            <div className="flex items-center gap-2">
              <UserAvatar name={responsible.name} avatarUrl={responsible.avatar} size="sm" />
              <span className="text-[10px] text-[#A1A1AA] truncate max-w-[100px]">
                {responsible.name}
              </span>
            </div>
          ) : (
            <span className="text-[10px] text-[#A1A1AA]/50 italic">Sem responsável</span>
          )}

          {/* Due date */}
          {task.dueDate && (
            <span className={`text-[10px] text-[#A1A1AA] flex items-center gap-1 shrink-0 ${isOverdue ? "text-red-400 font-semibold" : ""}`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{task.dueDate}</span>
            </span>
          )}
        </div>

        {/* Change status select */}
        {canEdit && onStatusChange && (
          <div className="flex items-center justify-between gap-2.5 border-t border-[#27272A]/50 pt-2">
            <span className="text-[9px] text-[#A1A1AA]">Mover para:</span>
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
              className="bg-[#0A0A0A] border border-[#27272A] text-[9px] text-white rounded px-1.5 py-0.5 focus:outline-none cursor-pointer w-full max-w-[120px]"
            >
              <option value="backlog">Backlog</option>
              <option value="todo">A Fazer</option>
              <option value="in_progress">Em Andamento</option>
              <option value="review">Em Revisão</option>
              <option value="done">Concluído</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
