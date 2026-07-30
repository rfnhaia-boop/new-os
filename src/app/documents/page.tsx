"use client";

import { useState, useEffect } from "react";
import { Plus, Filter, FileText } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { documentsData, categories, DocumentData } from "@/data";

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedVersion, setSelectedVersion] = useState("Todos");
  const [selectedReadingTime, setSelectedReadingTime] = useState("Todos");
  const [documents, setDocuments] = useState<DocumentData[]>(documentsData);

  useEffect(() => {
    // Load local overrides
    const next = documentsData.map((d) => {
      const stored = localStorage.getItem(`newos_doc_${d.slug}`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return d;
        }
      }
      return d;
    });
    setTimeout(() => {
      setDocuments(next);
    }, 0);
  }, []);

  // Helper to normalize accents and ignore case
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Helper to parse reading time minutes
  const parseReadingTime = (timeStr: string): number => {
    const match = timeStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const filteredDocuments = documents.filter((doc) => {
    // 1. Search Query filter (matches title, description, category, tags, keywords)
    const normalizedQuery = normalizeText(searchQuery);
    const matchesSearch =
      normalizeText(doc.titulo).includes(normalizedQuery) ||
      normalizeText(doc.descricao).includes(normalizedQuery) ||
      normalizeText(doc.categoria).includes(normalizedQuery) ||
      doc.tags.some((t) => normalizeText(t).includes(normalizedQuery)) ||
      doc.keywords.some((k) => normalizeText(k).includes(normalizedQuery));

    // 2. Category filter
    const matchesCategory =
      selectedCategory === "Todos" || doc.categoria === selectedCategory;

    // 3. Status filter
    const matchesStatus =
      selectedStatus === "Todos" || doc.status === selectedStatus;

    // 4. Version filter
    const matchesVersion =
      selectedVersion === "Todos" || doc.currentVersion === selectedVersion;

    // 5. Reading Time filter
    const minutes = parseReadingTime(doc.tempoLeitura);
    let matchesReadingTime = true;
    if (selectedReadingTime === "Até 5 min") {
      matchesReadingTime = minutes <= 5;
    } else if (selectedReadingTime === "5–10 min") {
      matchesReadingTime = minutes > 5 && minutes <= 10;
    } else if (selectedReadingTime === "Mais de 10 min") {
      matchesReadingTime = minutes > 10;
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesVersion &&
      matchesReadingTime
    );
  });

  const headerActions = (
    <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer w-full sm:w-auto">
      <Plus className="w-4 h-4" />
      <span>Novo Documento</span>
    </button>
  );

  // Extract unique versions for filter list from current documents state
  const uniqueVersions = Array.from(new Set(documents.map((d) => d.currentVersion))).sort();

  return (
    <PageContainer>
      {/* Top Header */}
      <PageHeader
        title="Documentos"
        subtitle="Centralize, organize e encontre qualquer documento da empresa."
        actions={headerActions}
      />

      {/* Search and Filters */}
      <div className="space-y-4 bg-[#111111]/40 border border-[#27272A] rounded-xl p-5">
        {/* Search Bar */}
        <SearchInput
          placeholder="Pesquisar por título, descrição, tags, categoria ou palavra-chave..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Category Filter Chips */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-[#A1A1AA] shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Categoria:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === category
                    ? "bg-white text-black border-white"
                    : "bg-[#111111] text-[#A1A1AA] border-[#27272A] hover:border-neutral-500 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdowns Row (Status, Version, Reading Time) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#27272A]/60">
          {/* Status Select */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-[#A1A1AA]">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#111111] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500 cursor-pointer"
            >
              <option value="Todos">Todos os Status</option>
              <option value="Validado">Validado</option>
            </select>
          </div>

          {/* Version Select */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-[#A1A1AA]">Versão</label>
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="w-full bg-[#111111] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500 cursor-pointer"
            >
              <option value="Todos">Todas as Versões</option>
              {uniqueVersions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* Reading Time Select */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-[#A1A1AA]">Tempo de Leitura</label>
            <select
              value={selectedReadingTime}
              onChange={(e) => setSelectedReadingTime(e.target.value)}
              className="w-full bg-[#111111] border border-[#27272A] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-neutral-500 cursor-pointer"
            >
              <option value="Todos">Qualquer tempo</option>
              <option value="Até 5 min">Até 5 min</option>
              <option value="5–10 min">5–10 min</option>
              <option value="Mais de 10 min">Mais de 10 min</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.titulo}
              category={doc.categoria}
              currentVersion={doc.currentVersion}
              status={doc.status}
              updatedAt={doc.atualizadoEm}
              href={`/documents/${doc.slug}`}
              slug={doc.slug}
              tags={doc.tags}
            />
          ))
        ) : (
          <EmptyState
            title="Nenhum documento encontrado"
            description="Tente redefinir sua pesquisa ou os filtros de categoria."
            icon={FileText}
          />
        )}
      </div>
    </PageContainer>
  );
}
