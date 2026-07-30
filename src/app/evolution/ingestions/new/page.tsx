"use client";

import { useRouter } from "next/navigation";
import { Network, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewIngestionPage() {
  const router = useRouter();

  const handleSimulateSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula salvamento indo pro mock da Flow
    router.push("/evolution/ingestions/ing-flow-001");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/evolution/ingestions"
          className="w-10 h-10 rounded-lg bg-[#111111] border border-[#27272A] flex items-center justify-center hover:bg-[#1A1A1A] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-zinc-400" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Nova Ingestão Operacional</h2>
          <p className="text-sm text-zinc-400">Insira o resumo bruto da operação para ser estruturado pelo sistema.</p>
        </div>
      </div>

      <form onSubmit={handleSimulateSave} className="bg-[#111111] border border-[#27272A] rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">Projeto</label>
            <select className="w-full bg-[#0A0A0A] border border-[#27272A] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
              <option value="proj_flow">Flow</option>
              <option value="proj_erp">ERP Corporativo</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">Origem</label>
            <select className="w-full bg-[#0A0A0A] border border-[#27272A] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
              <option value="conversation">Conversação / Reunião</option>
              <option value="document">Documento Textual</option>
              <option value="manual">Entrada Manual</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-white">Título da Ingestão</label>
          <input 
            type="text" 
            placeholder="Ex: Resumo da Entrega 3"
            defaultValue="Flow — Entrega 3: Agenda Interna / Operação do Dia"
            className="w-full bg-[#0A0A0A] border border-[#27272A] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-white">Data de Referência</label>
          <input 
            type="date" 
            defaultValue="2026-07-22"
            className="w-full bg-[#0A0A0A] border border-[#27272A] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 [color-scheme:dark]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-white">Conteúdo Bruto</label>
          <p className="text-xs text-zinc-500">Cole aqui o texto, resumo da conversa ou log para estruturação.</p>
          <textarea 
            rows={10}
            className="w-full bg-[#0A0A0A] border border-[#27272A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 custom-scrollbar"
            placeholder="Cole o resumo operacional aqui..."
          ></textarea>
        </div>

        <div className="pt-4 border-t border-[#27272A] flex justify-end">
          <button 
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
          >
            <Network className="w-4 h-4" />
            Processar Ingestão
          </button>
        </div>
      </form>
    </div>
  );
}
