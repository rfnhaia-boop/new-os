"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, FileText, DollarSign, Clock } from "lucide-react";
import { ClientProposal, documentsData } from "@/data";

interface ClientProposalAreaProps {
  initialProposals: ClientProposal[];
}

export function ClientProposalArea({
  initialProposals,
}: ClientProposalAreaProps) {
  const [proposals, setProposals] = useState<ClientProposal[]>(initialProposals);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [docSlug, setDocSlug] = useState("");

  const handleAddProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !value) {
      alert("Por favor, insira o título e o valor da proposta.");
      return;
    }

    const newProposal: ClientProposal = {
      id: `prop_${Date.now()}`,
      title,
      value: parseFloat(value),
      status: "sent",
      sentAt: new Date().toISOString().split("T")[0],
      documentSlug: docSlug || undefined,
    };

    setProposals((prev) => [newProposal, ...prev]);
    setIsModalOpen(false);

    // Reset fields
    setTitle("");
    setValue("");
    setDocSlug("");
    alert("Nova proposta registrada com sucesso localmente!");
  };

  const getStatusBadgeClass = (status: ClientProposal["status"]) => {
    const styles = {
      draft: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
      sent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      accepted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      declined: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return styles[status] || styles.draft;
  };

  const getStatusLabel = (status: ClientProposal["status"]) => {
    const labels = {
      draft: "Rascunho",
      sent: "Enviada",
      accepted: "Aceita",
      declined: "Declinada",
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Proposal list card */}
      <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
            Propostas Comerciais
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nova Proposta</span>
          </button>
        </div>

        {proposals.length > 0 ? (
          <div className="space-y-3">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="p-4 bg-[#0A0A0A] border border-[#27272A] rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-neutral-500 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-white">
                      {proposal.title}
                    </span>
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-semibold border ${getStatusBadgeClass(
                        proposal.status
                      )}`}
                    >
                      {getStatusLabel(proposal.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[10px] text-[#A1A1AA]">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span>R$ {proposal.value.toLocaleString("pt-BR")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Enviada em {proposal.sentAt}</span>
                    </div>
                  </div>
                </div>

                {proposal.documentSlug && (
                  <Link
                    href={`/documents/${proposal.documentSlug}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold text-[#A1A1AA] hover:text-white bg-[#111111] hover:bg-[#111111]/80 border border-[#27272A] rounded transition-colors cursor-pointer self-start sm:self-center"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Ver Proposta</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <span className="text-xs text-[#A1A1AA]/50 italic block">
            Nenhuma proposta comercial enviada.
          </span>
        )}
      </div>

      {/* Add Proposal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#111111] border border-[#27272A] rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272A]">
              <h3 className="text-sm font-semibold text-white">
                Registrar Nova Proposta
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#A1A1AA] hover:text-white p-1 rounded hover:bg-[#1A1A1A] transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddProposal} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-[#A1A1AA] font-semibold">
                  Título da Proposta *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Licenciamento NEW OS"
                  className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#A1A1AA] font-semibold">
                  Valor da Proposta (R$) *
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Ex: 50000"
                  className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#A1A1AA] font-semibold">
                  Documento Vinculado (Opcional)
                </label>
                <select
                  value={docSlug}
                  onChange={(e) => setDocSlug(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
                >
                  <option value="">Nenhum documento</option>
                  {documentsData.map((doc) => (
                    <option key={doc.id} value={doc.slug}>
                      {doc.titulo} (Versão {doc.currentVersion})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#27272A] mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#A1A1AA] hover:text-white border border-[#27272A] rounded-lg bg-transparent hover:bg-[#1A1A1A] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-semibold text-black bg-white hover:bg-neutral-200 border border-white rounded-lg transition-colors cursor-pointer"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
