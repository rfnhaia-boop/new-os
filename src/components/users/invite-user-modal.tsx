"use client";

import { useState } from "react";
import { X, Mail, User, Briefcase, Shield } from "lucide-react";
import { UserRole, SystemUser } from "@/data/types";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (user: Partial<SystemUser>) => void;
}

export function InviteUserModal({
  isOpen,
  onClose,
  onInvite,
}: InviteUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState<UserRole>("member");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !jobTitle || !department) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    onInvite({
      name,
      email,
      jobTitle,
      department,
      role,
    });

    // Reset and close
    setName("");
    setEmail("");
    setJobTitle("");
    setDepartment("");
    setRole("member");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#111111] border border-[#27272A] rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272A]">
          <h3 className="text-sm font-semibold text-white">
            Convidar Membro da Equipe
          </h3>
          <button
            onClick={onClose}
            className="text-[#A1A1AA] hover:text-white p-1 rounded hover:bg-[#1A1A1A] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-[#A1A1AA] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Nome Completo</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João Silva"
              className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-[#A1A1AA] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>E-mail</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: joao@nex.com.br"
              className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Job Title */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-[#A1A1AA] flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Cargo</span>
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Ex: Designer"
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500"
              />
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-[#A1A1AA] flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Departamento</span>
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Ex: Produto"
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500"
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-[#A1A1AA] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Função (Permissões)</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500 cursor-pointer"
            >
              <option value="viewer">Visualizador</option>
              <option value="member">Membro</option>
              <option value="manager">Gestor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#27272A] mt-6">
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
              Enviar Convite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
