"use client";

import { useState } from "react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { useCurrentUser } from "@/contexts/current-user-context";
import { TaskCard } from "@/components/tasks/task-card";
import { SIMULATED_NOW } from "@/lib/date";
import { tasksData, Task, TaskStatus } from "@/data";
import { AlertCircle, Calendar, CheckCircle } from "lucide-react";

export default function MyWorkPage() {
  const { currentUser, can } = useCurrentUser();
  const [tasks, setTasks] = useState<Task[]>(tasksData);

  const myTasks = tasks.filter((t) => t.responsibleId === currentUser?.id);
  
  const overdueTasks = myTasks.filter(
    (t) => t.dueDate && t.status !== "done" && new Date(t.dueDate) < SIMULATED_NOW
  );
  
  const upcomingTasks = myTasks.filter(
    (t) => t.dueDate && t.status !== "done" && new Date(t.dueDate) >= SIMULATED_NOW
  ).sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
  
  const pendingNoDateTasks = myTasks.filter(
    (t) => !t.dueDate && t.status !== "done"
  );
  
  const recentlyCompleted = myTasks.filter(
    (t) => t.status === "done"
  ).slice(0, 5); // Just show last 5

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t))
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Meu Trabalho Hoje"
        subtitle={`Visão consolidada das suas prioridades, prazos e itens em andamento, ${currentUser?.name.split(" ")[0]}.`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Atention Needed */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#27272A] pb-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-white">Atrasadas & Urgentes</h3>
          </div>
          <div className="space-y-3">
            {overdueTasks.length === 0 ? (
              <p className="text-xs text-[#A1A1AA] py-4">Nenhuma tarefa atrasada. Ótimo trabalho!</p>
            ) : (
              overdueTasks.map(t => (
                <TaskCard key={t.id} task={t} onStatusChange={handleStatusChange} canEdit={can("tasks", "edit")} />
              ))
            )}
          </div>
        </div>

        {/* Upcoming */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#27272A] pb-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">Próximas</h3>
          </div>
          <div className="space-y-3">
            {upcomingTasks.length === 0 ? (
              <p className="text-xs text-[#A1A1AA] py-4">Nenhuma tarefa com prazo futuro.</p>
            ) : (
              upcomingTasks.map(t => (
                <TaskCard key={t.id} task={t} onStatusChange={handleStatusChange} canEdit={can("tasks", "edit")} />
              ))
            )}
            
            {pendingNoDateTasks.length > 0 && (
              <>
                <div className="pt-4 border-t border-[#27272A] mt-4">
                  <h4 className="text-xs font-semibold text-[#A1A1AA] mb-3">Sem Prazo Definido</h4>
                  <div className="space-y-3">
                    {pendingNoDateTasks.map(t => (
                      <TaskCard key={t.id} task={t} onStatusChange={handleStatusChange} canEdit={can("tasks", "edit")} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Recently Completed */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#27272A] pb-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Concluídas Recentemente</h3>
          </div>
          <div className="space-y-3 opacity-60">
            {recentlyCompleted.length === 0 ? (
              <p className="text-xs text-[#A1A1AA] py-4">Nenhuma tarefa concluída ainda.</p>
            ) : (
              recentlyCompleted.map(t => (
                <TaskCard key={t.id} task={t} onStatusChange={handleStatusChange} canEdit={can("tasks", "edit")} />
              ))
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
