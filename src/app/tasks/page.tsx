"use client";

import { useState } from "react";
import { Plus, ListTodo, UserCheck, AlertCircle, CheckCircle, LayoutGrid, TableProperties } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { StatCard } from "@/components/ui/StatCard";
import { TaskCard } from "@/components/tasks/task-card";
import { CreateTaskModal } from "@/components/tasks/create-task-modal";
import { useCurrentUser } from "@/contexts/current-user-context";
import {
  tasksData,
  Task,
  TaskStatus,
  clientsData,
} from "@/data";
import { SIMULATED_NOW } from "@/lib/date";
import { TasksTable } from "@/components/tasks/tasks-table";

const columnInfo: Record<TaskStatus, { label: string; color: string; border: string }> = {
  backlog: { label: "Backlog", color: "bg-zinc-500/10 text-zinc-400", border: "border-zinc-500/20" },
  todo: { label: "A Fazer", color: "bg-blue-500/10 text-blue-400", border: "border-blue-500/20" },
  in_progress: { label: "Em Andamento", color: "bg-yellow-500/10 text-yellow-400", border: "border-yellow-500/20" },
  review: { label: "Em Revisão", color: "bg-purple-500/10 text-purple-400", border: "border-purple-500/20" },
  done: { label: "Concluído", color: "bg-emerald-500/10 text-emerald-400", border: "border-emerald-500/20" },
};

const columnsList: TaskStatus[] = ["backlog", "todo", "in_progress", "review", "done"];

export default function TasksPage() {
  const { can, currentUser } = useCurrentUser();
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("Todos");
  const [selectedClient, setSelectedClient] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todos");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");

  // Metrics
  const totalTasks = tasks.length;
  const myTasks = tasks.filter((t) => t.responsibleId === currentUser.id).length;
  const overdueTasks = tasks.filter(
    (t) => t.dueDate && t.status !== "done" && new Date(t.dueDate) < SIMULATED_NOW
  ).length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;

  const handleCreateTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus, updatedAt: new Date().toISOString().split("T")[0] } : t))
    );
  };

  // Filters
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = selectedPriority === "Todos" || t.priority === selectedPriority;
    const matchesClient = selectedClient === "Todos" || t.clientId === selectedClient;
    const matchesType = selectedType === "Todos" || t.type === selectedType;

    return matchesSearch && matchesPriority && matchesClient && matchesType;
  });

  const uniqueTypes = Array.from(new Set(tasks.map(t => t.type).filter(Boolean))) as string[];

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title="Tarefas"
        subtitle="Gerencie o backlog operacional, delegações de trabalho e prazos da equipe."
        actions={
          can("tasks", "create") && (
            <button
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-black bg-white hover:bg-neutral-200 border border-white rounded-lg transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Nova tarefa</span>
            </button>
          )
        }
      />

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total de Tarefas" value={String(totalTasks)} icon={ListTodo} />
        <StatCard title="Minhas Tarefas" value={String(myTasks)} icon={UserCheck} />
        <StatCard title="Prazos Atrasados" value={String(overdueTasks)} icon={AlertCircle} valueColor="text-red-400" />
        <StatCard title="Concluídas" value={String(completedTasks)} icon={CheckCircle} valueColor="text-emerald-400" />
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-[#111111] p-4 rounded-xl border border-[#27272A]">
        <div className="flex-1 w-full max-w-md">
          <SearchInput
            placeholder="Buscar tarefas..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Priority */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none min-w-[130px]"
          >
            <option value="Todos">Todas Prioridades</option>
            <option value="urgent">Urgente</option>
            <option value="high">Alta</option>
            <option value="medium">Média</option>
            <option value="low">Baixa</option>
          </select>
          {/* Client */}
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none min-w-[130px]"
          >
            <option value="Todos">Todos Clientes</option>
            {clientsData.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {/* Type */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none min-w-[130px]"
          >
            <option value="Todos">Todos os Tipos</option>
            {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          {/* View Toggles */}
          <div className="flex items-center gap-1 bg-[#0A0A0A] border border-[#27272A] rounded-lg p-1 ml-auto">
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${
                viewMode === "kanban" ? "bg-[#27272A] text-white" : "text-[#A1A1AA] hover:text-white"
              }`}
              title="Quadro"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${
                viewMode === "table" ? "bg-[#27272A] text-white" : "text-[#A1A1AA] hover:text-white"
              }`}
              title="Tabela"
            >
              <TableProperties className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Board or Table Content */}
      {viewMode === "table" ? (
        <TasksTable tasks={filteredTasks} />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
            {columnsList.map((status) => {
              const statusTasks = filteredTasks.filter((t) => t.status === status);
              const info = columnInfo[status];

              return (
                <div key={status} className="flex flex-col bg-[#111111]/30 border border-[#27272A] rounded-xl p-3 min-h-[400px]">
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#27272A]">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${info.color} ${info.border}`}>
                      {info.label}
                    </span>
                    <span className="text-xs text-[#A1A1AA] font-bold">{statusTasks.length}</span>
                  </div>

                  {/* Cards list */}
                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] scrollbar-none">
                    {statusTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={handleStatusChange}
                        canEdit={can("tasks", "edit")}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Modal */}
      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateTask}
      />
    </PageContainer>
  );
}
