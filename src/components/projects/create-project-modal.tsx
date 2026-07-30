"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Project, ProjectStatus, ProjectPriority, clientsData, usersData } from "@/data";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (project: Project) => void;
}

export function CreateProjectModal({
  isOpen,
  onClose,
  onCreate,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("planning");
  const [priority, setPriority] = useState<ProjectPriority>("medium");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [budget, setBudget] = useState("");
  const [tagsStr, setTagsStr] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !description || !clientId || !ownerId || !startDate || !dueDate) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (new Date(dueDate) < new Date(startDate)) {
      setError("A data de prazo final não pode ser anterior à data de início.");
      return;
    }

    const budgetVal = budget ? parseFloat(budget) : 0;
    if (budgetVal < 0) {
      setError("O orçamento não pode ser um valor negativo.");
      return;
    }

    const cleanSlug = name
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9]+/g, "-") // Replace spaces/special chars with hyphens
      .replace(/(^-|-$)+/g, ""); // Trim hyphens

    const newProject: Project = {
      id: `proj_${Date.now()}`,
      slug: cleanSlug,
      name,
      description,
      clientId,
      status,
      priority,
      health: "on_track",
      ownerId,
      members: [{ userId: ownerId, role: "Líder de Projeto" }],
      startDate,
      dueDate,
      progress: 0,
      budget: budgetVal || undefined,
      tags: tagsStr
        ? tagsStr
            .split(",")
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean)
        : [],
      deliverables: [],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    onCreate(newProject);
    alert(`Projeto "${newProject.name}" criado com sucesso no funil local!`);
    onClose();

    // Reset fields
    setName("");
    setDescription("");
    setClientId("");
    setOwnerId("");
    setStatus("planning");
    setPriority("medium");
    setStartDate("");
    setDueDate("");
    setBudget("");
    setTagsStr("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#111111] border border-[#27272A] rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272A]">
          <h3 className="text-sm font-semibold text-white">Criar Novo Projeto</h3>
          <button
            onClick={onClose}
            className="text-[#A1A1AA] hover:text-white p-1 rounded hover:bg-[#1A1A1A] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto scrollbar-none">
          {error && (
            <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#A1A1AA] font-semibold">Nome do Projeto *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Refatoração de Processos"
              className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#A1A1AA] font-semibold">Descrição do Escopo *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o escopo e entregáveis principais..."
              rows={2}
              className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none"
            />
          </div>

          {/* Client & Owner grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] font-semibold">Cliente *</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              >
                <option value="">Selecione...</option>
                {clientsData.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] font-semibold">Responsável *</label>
              <select
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              >
                <option value="">Selecione...</option>
                {usersData.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] font-semibold">Status Inicial</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              >
                <option value="planning">Planejamento</option>
                <option value="active">Ativo</option>
                <option value="paused">Pausado</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] font-semibold">Prioridade</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ProjectPriority)}
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] font-semibold">Data de Início *</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] font-semibold">Prazo Final *</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Budget & Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] font-semibold">Orçamento (R$)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ex: 85000"
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] font-semibold">Tags (separadas por vírgula)</label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="Ex: tech, crm, infra"
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none"
              />
            </div>
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
              className="px-4 py-2.5 text-xs font-semibold text-black bg-white hover:bg-neutral-200 border border-white rounded-lg transition-colors cursor-pointer block text-center"
            >
              Criar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
