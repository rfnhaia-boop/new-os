"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  TrendingUp,
  Award,
  ChevronRight,
  Building,
  Target,
} from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { StatCard } from "@/components/ui/StatCard";
import { clientsData, Client, PipelineStage } from "@/data";
import { useCurrentUser } from "@/contexts/current-user-context";

const stageInfo: Record<PipelineStage, { label: string; color: string; border: string }> = {
  lead: { label: "Lead", color: "bg-blue-500/10 text-blue-400", border: "border-blue-500/20" },
  contact: { label: "Contato", color: "bg-yellow-500/10 text-yellow-400", border: "border-yellow-500/20" },
  proposal: { label: "Proposta", color: "bg-purple-500/10 text-purple-400", border: "border-purple-500/20" },
  closing: { label: "Fechamento", color: "bg-pink-500/10 text-pink-400", border: "border-pink-500/20" },
  won: { label: "Ganha", color: "bg-emerald-500/10 text-emerald-400", border: "border-emerald-500/20" },
  lost: { label: "Perdida", color: "bg-red-500/10 text-red-400", border: "border-red-500/20" },
};

const stagesList: PipelineStage[] = ["lead", "contact", "proposal", "closing", "won", "lost"];

export default function ClientsPage() {
  const { can } = useCurrentUser();
  const [clients, setClients] = useState<Client[]>(clientsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Client Modal Fields
  const [newName, setNewName] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newRevenue, setNewRevenue] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");

  // Metrics
  const totalLeads = clients.length;
  const activeDealsValue = clients
    .filter((c) => ["proposal", "closing"].includes(c.pipelineStage))
    .reduce((sum, c) => sum + c.proposals.reduce((pSum, p) => pSum + (p.status === "sent" ? p.value : 0), 0), 0);

  const wonDealsValue = clients.reduce(
    (sum, c) => sum + c.proposals.reduce((pSum, p) => pSum + (p.status === "accepted" ? p.value : 0), 0),
    0
  );

  const wonCount = clients.filter((c) => c.pipelineStage === "won").length;
  const conversionRate = totalLeads > 0 ? Math.round((wonCount / totalLeads) * 100) : 0;

  // Save/Add Client
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDomain || !newIndustry || !newRevenue) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    const newClient: Client = {
      id: `cli_${Date.now()}`,
      name: newName,
      status: "lead",
      domain: newDomain,
      industry: newIndustry,
      revenue: newRevenue,
      pipelineStage: "lead",
      contacts: newContactName
        ? [
            {
              name: newContactName,
              email: newContactEmail,
              phone: "Não cadastrado",
              role: "Principal",
            },
          ]
        : [],
      proposals: [],
    };

    setClients((prev) => [newClient, ...prev]);
    setIsModalOpen(false);

    // Reset fields
    setNewName("");
    setNewDomain("");
    setNewIndustry("");
    setNewRevenue("");
    setNewContactName("");
    setNewContactEmail("");
    alert(`Conta ${newClient.name} cadastrada com sucesso no funil!`);
  };

  // Move client pipeline stage
  const moveClientStage = (id: string, stage: PipelineStage) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, pipelineStage: stage, status: stage === "won" ? "active" : stage === "lost" ? "inactive" : "lead" } : c))
    );
  };

  // Filter clients
  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contacts.some((ct) => ct.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIndustry = selectedIndustry === "Todos" || c.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  const uniqueIndustries = Array.from(new Set(clients.map((c) => c.industry))).sort();

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title="CRM & Clientes"
        subtitle="Gerencie o pipeline de contas corporativas, propostas comerciais e contatos operacionais."
        actions={
          can("clients", "create") && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-black bg-white hover:bg-neutral-200 border border-white rounded-lg transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Lead/Conta</span>
            </button>
          )
        }
      />

      {/* CRM Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Leads / Contas"
          value={String(totalLeads)}
          icon={Building}
        />
        <StatCard
          title="Negócios no Pipeline"
          value={`R$ ${(activeDealsValue / 1000).toFixed(0)}k`}
          icon={TrendingUp}
        />
        <StatCard
          title="Propostas Fechadas"
          value={`R$ ${(wonDealsValue / 1000).toFixed(0)}k`}
          icon={Award}
        />
        <StatCard
          title="Taxa de Conversão"
          value={`${conversionRate}%`}
          icon={Target}
        />
      </div>

      {/* Filters and Search Bar */}
      <div className="space-y-4 bg-[#111111]/40 border border-[#27272A] rounded-xl p-5">
        <SearchInput
          placeholder="Pesquisar por nome da empresa, setor ou contato..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#27272A]/60">
          <span className="text-xs text-[#A1A1AA] mr-2">Setor:</span>
          <button
            onClick={() => setSelectedIndustry("Todos")}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
              selectedIndustry === "Todos"
                ? "bg-white text-black border-white"
                : "bg-[#111111] text-[#A1A1AA] border-[#27272A] hover:text-white"
            }`}
          >
            Todos
          </button>
          {uniqueIndustries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                selectedIndustry === ind
                  ? "bg-white text-black border-white"
                  : "bg-[#111111] text-[#A1A1AA] border-[#27272A] hover:text-white"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Funnel Board Container */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A1A1AA] border-b border-[#27272A] pb-2">
          Funil de Negócios
        </h3>
        
        {/* Kanban grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch">
          {stagesList.map((stage) => {
            const stageClients = filteredClients.filter((c) => c.pipelineStage === stage);
            const info = stageInfo[stage];

            return (
              <div
                key={stage}
                className="flex flex-col bg-[#111111]/30 border border-[#27272A] rounded-xl p-3 min-h-[350px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#27272A]">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${info.color} ${info.border}`}>
                    {info.label}
                  </span>
                  <span className="text-xs text-[#A1A1AA] font-bold">{stageClients.length}</span>
                </div>

                {/* Cards stack */}
                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[400px] scrollbar-none">
                  {stageClients.map((client) => {
                    const proposalValue = client.proposals.reduce((sum, p) => sum + p.value, 0);

                    return (
                      <div
                        key={client.id}
                        className="p-3 bg-[#111111] border border-[#27272A] rounded-lg space-y-2 hover:border-neutral-500 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <Link
                            href={`/clients/${client.id}`}
                            className="text-xs font-bold text-white hover:text-[#A1A1AA] transition-colors truncate block flex-1"
                          >
                            {client.name}
                          </Link>
                          <ChevronRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
                        </div>
                        <p className="text-[10px] text-[#A1A1AA]">{client.industry} &bull; {client.revenue}</p>

                        {proposalValue > 0 && (
                          <div className="text-[10px] text-white font-semibold">
                            R$ {(proposalValue / 1000).toFixed(0)}k em propostas
                          </div>
                        )}

                        {/* Interactive Move Select */}
                        <div className="pt-2 border-t border-[#27272A] flex items-center justify-between gap-2.5">
                          <span className="text-[9px] text-[#A1A1AA]">Fase:</span>
                          <select
                            value={client.pipelineStage}
                            onChange={(e) => moveClientStage(client.id, e.target.value as PipelineStage)}
                            className="bg-[#0A0A0A] border border-[#27272A] text-[9px] text-white rounded px-1 py-0.5 focus:outline-none cursor-pointer w-full"
                          >
                            {stagesList.map((s) => (
                              <option key={s} value={s}>
                                {stageInfo[s].label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#111111] border border-[#27272A] rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272A]">
              <h3 className="text-sm font-semibold text-white">Cadastrar Novo Lead</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#A1A1AA] hover:text-white p-1 rounded hover:bg-[#1A1A1A] transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddClient} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-[#A1A1AA] font-semibold">Nome da Empresa *</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: Alfa Tech"
                  className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#A1A1AA] font-semibold">Website / Domínio *</label>
                <input
                  type="text"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="Ex: alfatech.com"
                  className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#A1A1AA] font-semibold">Setor/Indústria *</label>
                  <input
                    type="text"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    placeholder="Ex: Tecnologia"
                    className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#A1A1AA] font-semibold">Faturamento Estimado *</label>
                  <input
                    type="text"
                    value={newRevenue}
                    onChange={(e) => setNewRevenue(e.target.value)}
                    placeholder="Ex: R$ 5M/ano"
                    className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              <div className="border-t border-[#27272A] pt-3 mt-4 space-y-3">
                <span className="text-[10px] text-[#A1A1AA] font-bold block">Contato Inicial (Opcional)</span>
                <div className="space-y-1">
                  <label className="text-[9px] text-[#A1A1AA] font-semibold">Nome do Contato</label>
                  <input
                    type="text"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    placeholder="Ex: Marcos"
                    className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-[#A1A1AA] font-semibold">E-mail do Contato</label>
                  <input
                    type="email"
                    value={newContactEmail}
                    onChange={(e) => setNewContactEmail(e.target.value)}
                    placeholder="Ex: marcos@alfatech.com"
                    className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none"
                  />
                </div>
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
                  Criar Conta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
