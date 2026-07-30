import { Task, projectsData, usersData, clientsData } from "@/data";
import { TaskStatusBadge } from "./task-status-badge";
import { UserAvatar } from "@/components/users/user-avatar";
import { Calendar, AlertCircle } from "lucide-react";
import { SIMULATED_NOW } from "@/lib/date";
import Link from "next/link";

interface TasksTableProps {
  tasks: Task[];
}

export function TasksTable({ tasks }: TasksTableProps) {
  return (
    <div className="bg-[#0A0A0A] border border-[#27272A] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#A1A1AA]">
          <thead className="text-xs uppercase bg-[#111111] border-b border-[#27272A]">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-white">Tarefa</th>
              <th scope="col" className="px-6 py-4 font-medium text-white">Status</th>
              <th scope="col" className="px-6 py-4 font-medium text-white">Prioridade</th>
              <th scope="col" className="px-6 py-4 font-medium text-white">Responsável</th>
              <th scope="col" className="px-6 py-4 font-medium text-white">Projeto / Cliente</th>
              <th scope="col" className="px-6 py-4 font-medium text-white">Prazo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272A]">
            {tasks.map((task) => {
              const responsible = usersData.find((u) => u.id === task.responsibleId);
              const project = projectsData.find((p) => p.id === task.projectId);
              const client = clientsData.find((c) => c.id === task.clientId);

              const isOverdue =
                task.dueDate &&
                task.status !== "done" &&
                new Date(task.dueDate) < SIMULATED_NOW;

              return (
                <tr key={task.id} className="hover:bg-[#111111]/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/tasks/${task.id}`} className="block">
                      <div className="font-medium text-white hover:text-indigo-400 transition-colors">
                        {task.title}
                      </div>
                      <div className="text-xs text-[#A1A1AA] mt-1">{task.type || "Geral"}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <TaskStatusBadge status={task.status} />
                  </td>
                  <td className="px-6 py-4">
                    {task.priority === "urgent" && <span className="text-red-400 text-xs font-semibold">Urgente</span>}
                    {task.priority === "high" && <span className="text-orange-400 text-xs font-medium">Alta</span>}
                    {task.priority === "medium" && <span className="text-yellow-400 text-xs">Média</span>}
                    {task.priority === "low" && <span className="text-zinc-400 text-xs">Baixa</span>}
                  </td>
                  <td className="px-6 py-4">
                    {responsible ? (
                      <div className="flex items-center gap-2">
                        <UserAvatar name={responsible.name} avatarUrl={responsible.avatar} size="sm" />
                        <span className="text-xs">{responsible.name.split(" ")[0]}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-500">Não atribuído</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {project && <span className="text-xs text-indigo-400 truncate max-w-[150px]">{project.name}</span>}
                      {client && <span className="text-xs text-zinc-400 truncate max-w-[150px]">{client.name}</span>}
                      {!project && !client && <span className="text-xs text-zinc-600">-</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {task.dueDate ? (
                      <div className={`flex items-center gap-1.5 text-xs ${isOverdue ? "text-red-400 font-medium" : ""}`}>
                        {isOverdue ? <AlertCircle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5 opacity-50" />}
                        {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-600">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
            
            {tasks.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#A1A1AA]">
                  Nenhuma tarefa encontrada com os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
