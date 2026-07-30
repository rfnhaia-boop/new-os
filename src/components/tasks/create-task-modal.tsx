"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Task, TaskStatus, TaskPriority, projectsData, usersData } from "@/data";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Task) => void;
}

export function CreateTaskModal({
  isOpen,
  onClose,
  onCreate,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [projectId, setProjectId] = useState("");
  const [responsibleId, setResponsibleId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title) {
      setError("O título da tarefa é obrigatório.");
      return;
    }

    const newTask: Task = {
      id: `tsk_${Date.now()}`,
      title,
      description: description || undefined,
      status,
      priority,
      projectId: projectId || undefined,
      responsibleId: responsibleId || undefined,
      dueDate: dueDate || undefined,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    onCreate(newTask);
    alert(`Tarefa "${newTask.title}" criada com sucesso localmente!`);
    onClose();

    // Reset fields
    setTitle("");
    setDescription("");
    setPriority("medium");
    setStatus("todo");
    setProjectId("");
    setResponsibleId("");
    setDueDate("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#111111] border border-[#27272A] rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272A]">
          <h3 className="text-sm font-semibold text-white">Nova Tarefa Operacional</h3>
          <button
            onClick={onClose}
            className="text-[#A1A1AA] hover:text-white p-1 rounded hover:bg-[#1A1A1A] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[85vh] overflow-y-auto scrollbar-none">
          {error && (
            <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#A1A1AA] font-semibold">Título da Tarefa *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Corrigir bug de renderização"
              className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#A1A1AA] font-semibold">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva detalhes específicos da tarefa..."
              rows={2}
              className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none"
            />
          </div>

          {/* Project & Responsible */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] font-semibold">Projeto (Vincular)</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              >
                <option value="">Nenhum</option>
                {projectsData.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] font-semibold">Responsável</label>
              <select
                value={responsibleId}
                onChange={(e) => setResponsibleId(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              >
                <option value="">Não atribuído</option>
                {usersData.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority & Initial Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] font-semibold">Prioridade</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] font-semibold">Fase Inicial</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">A Fazer</option>
                <option value="in_progress">Em Andamento</option>
                <option value="review">Em Revisão</option>
              </select>
            </div>
          </div>

          {/* Due date */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#A1A1AA] font-semibold">Prazo de Entrega</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#27272A] mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-[#A1A1AA] hover:text-white border border-[#27272A] rounded-lg bg-transparent hover:bg-[#1A1A1A] transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 text-xs font-semibold text-black bg-white hover:bg-neutral-200 border border-white rounded-lg transition-colors cursor-pointer"
            >
              Criar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
