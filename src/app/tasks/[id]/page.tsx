"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageContainer } from "@/components/ui/PageContainer";
import { useCurrentUser } from "@/contexts/current-user-context";
import { TaskStatusBadge } from "@/components/tasks/task-status-badge";
import { UserAvatar } from "@/components/users/user-avatar";
import { SIMULATED_NOW } from "@/lib/date";
import { ArrowLeft, Calendar, User, AlertCircle, CheckCircle2, MessageSquare, Send } from "lucide-react";
import {
  tasksData,
  usersData,
  projectsData,
  clientsData,
  Task,
  TaskComment,
  TaskStatus,
  TaskPriority
} from "@/data";

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser, can } = useCurrentUser();
  
  const initialTask = tasksData.find((t) => t.id === params.id) as Task | undefined;
  
  const [task, setTask] = useState<Task | undefined>(initialTask);
  const [commentText, setCommentText] = useState("");

  if (!task) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-xl font-bold text-white mb-2">Tarefa não encontrada</h2>
          <button onClick={() => router.back()} className="text-indigo-400 hover:underline">
            Voltar
          </button>
        </div>
      </PageContainer>
    );
  }

  const responsible = usersData.find((u) => u.id === task.responsibleId);
  const project = projectsData.find((p) => p.id === task.projectId);
  const client = clientsData.find((c) => c.id === task.clientId);

  const isOverdue =
    task.dueDate &&
    task.status !== "done" &&
    new Date(task.dueDate) < SIMULATED_NOW;

  const handleStatusChange = (newStatus: TaskStatus) => {
    if (!can("tasks", "edit")) return;
    setTask({ ...task, status: newStatus, updatedAt: new Date().toISOString() });
  };

  const handlePriorityChange = (newPriority: TaskPriority) => {
    if (!can("tasks", "edit")) return;
    setTask({ ...task, priority: newPriority, updatedAt: new Date().toISOString() });
  };

  const toggleChecklist = (checkId: string) => {
    if (!can("tasks", "edit")) return;
    setTask((prev) => {
      if (!prev || !prev.checklist) return prev;
      return {
        ...prev,
        checklist: prev.checklist.map((item) =>
          item.id === checkId ? { ...item, completed: !item.completed } : item
        ),
      };
    });
  };

  const handleAddComment = () => {
    if (!commentText.trim() || !can("tasks", "create")) return;
    
    const newComment: TaskComment = {
      id: `com_${Date.now()}`,
      userId: currentUser!.id,
      content: commentText.trim(),
      createdAt: new Date().toISOString(),
    };

    setTask((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        comments: [...(prev.comments || []), newComment],
      };
    });
    setCommentText("");
  };

  const checklistTotal = task.checklist?.length || 0;
  const checklistCompleted = task.checklist?.filter((c) => c.completed).length || 0;
  const progress = checklistTotal > 0 ? (checklistCompleted / checklistTotal) * 100 : 0;

  return (
    <PageContainer>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-[#0A0A0A] border border-[#27272A] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-zinc-800 text-zinc-300 text-[10px] rounded uppercase font-semibold tracking-wider">
                  {task.type || "Geral"}
                </span>
                {isOverdue && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-red-500/10 text-red-400 text-[10px] rounded uppercase font-bold tracking-wider">
                    <AlertCircle className="w-3 h-3" /> Atrasada
                  </span>
                )}
              </div>
              <TaskStatusBadge status={task.status} />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">{task.title}</h1>
            
            {task.description ? (
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">{task.description}</p>
            ) : (
              <p className="text-sm text-zinc-600 italic mb-6">Nenhuma descrição fornecida.</p>
            )}

            {/* Sub-items (Checklist) */}
            {task.checklist && task.checklist.length > 0 && (
              <div className="mt-8 border-t border-[#27272A] pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    Checklist
                  </h3>
                  <span className="text-xs text-[#A1A1AA]">
                    {checklistCompleted} de {checklistTotal} concluídos
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-[#1A1A1A] rounded-full h-1.5 mb-4">
                  <div
                    className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="space-y-2">
                  {task.checklist.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        item.completed
                          ? "bg-[#111111] border-[#27272A] opacity-60"
                          : "bg-[#0A0A0A] border-[#27272A] hover:bg-[#111111]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleChecklist(item.id)}
                        disabled={!can("tasks", "edit")}
                        className="w-4 h-4 rounded border-[#27272A] text-indigo-500 focus:ring-indigo-500/20 bg-[#1A1A1A]"
                      />
                      <span className={`text-sm ${item.completed ? "text-[#A1A1AA] line-through" : "text-white"}`}>
                        {item.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="bg-[#0A0A0A] border border-[#27272A] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
              <MessageSquare className="w-4 h-4 text-zinc-400" />
              Comentários e Atualizações
            </h3>

            <div className="space-y-6 mb-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent">
              {(!task.comments || task.comments.length === 0) ? (
                <div className="text-center py-6 text-sm text-[#A1A1AA]">
                  Nenhum comentário registrado ainda.
                </div>
              ) : (
                task.comments.map((comment) => {
                  const author = usersData.find(u => u.id === comment.userId);
                  return (
                    <div key={comment.id} className="flex gap-4">
                      <div className="shrink-0 mt-1">
                        {author ? (
                          <UserAvatar name={author.name} avatarUrl={author.avatar} size="sm" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                            <User className="w-4 h-4 text-zinc-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs font-semibold text-white">{author?.name || "Usuário Removido"}</span>
                          <span className="text-[10px] text-zinc-500">
                            {new Date(comment.createdAt).toLocaleDateString("pt-BR", {
                              day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="text-xs text-[#A1A1AA] bg-[#111111] border border-[#27272A] p-3 rounded-lg rounded-tl-none leading-relaxed">
                          {comment.content}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {can("tasks", "create") && (
              <div className="flex items-start gap-3 pt-4 border-t border-[#27272A]">
                <div className="shrink-0 mt-1">
                  <UserAvatar name={currentUser.name} avatarUrl={currentUser.avatar} size="sm" />
                </div>
                <div className="flex-1 flex gap-2">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Adicione um comentário, anotação ou follow-up..."
                    className="w-full bg-[#111111] border border-[#27272A] rounded-lg p-3 text-xs text-white placeholder-zinc-500 resize-none outline-none focus:border-indigo-500/50 min-h-[60px]"
                    rows={2}
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!commentText.trim()}
                    className="shrink-0 p-3 bg-white text-black rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition-colors self-end"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-[#0A0A0A] border border-[#27272A] rounded-xl p-5 space-y-5">
            <h3 className="text-sm font-semibold text-white border-b border-[#27272A] pb-3">Detalhes</h3>
            
            <div className="space-y-4">
              {/* Status Select */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-[#A1A1AA] uppercase font-semibold">Status</span>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
                  disabled={!can("tasks", "edit")}
                  className="bg-[#111111] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 disabled:opacity-50"
                >
                  <option value="backlog">Backlog</option>
                  <option value="todo">A Fazer</option>
                  <option value="in_progress">Em Andamento</option>
                  <option value="review">Em Revisão</option>
                  <option value="done">Concluído</option>
                </select>
              </div>

              {/* Priority Select */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-[#A1A1AA] uppercase font-semibold">Prioridade</span>
                <select
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(e.target.value as TaskPriority)}
                  disabled={!can("tasks", "edit")}
                  className="bg-[#111111] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 disabled:opacity-50"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>

              {/* Due Date */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-[#A1A1AA] uppercase font-semibold">Prazo</span>
                <div className="flex items-center gap-2 bg-[#111111] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString("pt-BR") : "Não definido"}
                </div>
              </div>

              {/* Responsible */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-[#A1A1AA] uppercase font-semibold">Responsável</span>
                <div className="flex items-center gap-3 bg-[#111111] border border-[#27272A] rounded-lg px-3 py-2.5">
                  {responsible ? (
                    <>
                      <UserAvatar name={responsible.name} avatarUrl={responsible.avatar} size="sm" />
                      <span className="text-xs text-white">{responsible.name}</span>
                    </>
                  ) : (
                    <span className="text-xs text-zinc-500 italic">Não atribuído</span>
                  )}
                </div>
              </div>

              {/* Connections */}
              <div className="pt-4 mt-4 border-t border-[#27272A] space-y-4">
                {project && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#A1A1AA] uppercase font-semibold">Projeto</span>
                    <span className="text-xs text-indigo-400 font-medium">{project.name}</span>
                  </div>
                )}
                
                {client && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#A1A1AA] uppercase font-semibold">Cliente</span>
                    <span className="text-xs text-white font-medium">{client.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
