"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Layout, ChevronRight } from "lucide-react";
import { documentsData } from "@/data";

interface SearchResultItem {
  id: string;
  type: "document" | "page";
  title: string;
  subtitle: string;
  url: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Define static pages for search
  const pages: SearchResultItem[] = [
    { id: "p1", type: "page", title: "Dashboard", subtitle: "Visão geral do NEW OS", url: "/" },
    { id: "p2", type: "page", title: "Empresa", subtitle: "Estrutura e identidade corporativa", url: "/company" },
    { id: "p3", type: "page", title: "NEX", subtitle: "Núcleo de execução e jornada comercial", url: "/nex" },
    { id: "p4", type: "page", title: "Biblioteca de Documentos", subtitle: "Repositório completo de documentos", url: "/documents" },
  ];

  // Convert documentsData to search result items
  const documents: SearchResultItem[] = documentsData.map((doc) => ({
    id: doc.id,
    type: "document",
    title: doc.titulo,
    subtitle: `${doc.categoria} • ${doc.currentVersion}`,
    url: `/documents/${doc.slug}`,
  }));

  const allSearchable = [...pages, ...documents];

  // Helper to normalize accents and ignore case
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const normalizedQuery = normalizeText(query);

  // Filter items based on query
  const filteredResults = allSearchable.filter((item) => {
    const doc = item.type === "document"
      ? documentsData.find((d) => d.id === item.id)
      : null;

    const matchesTitle = normalizeText(item.title).includes(normalizedQuery);
    const matchesSubtitle = normalizeText(item.subtitle).includes(normalizedQuery);

    let matchesTagsOrKeywords = false;
    if (doc) {
      const matchesDesc = normalizeText(doc.descricao).includes(normalizedQuery);
      const matchesCategory = normalizeText(doc.categoria).includes(normalizedQuery);
      const matchesTags = doc.tags.some((t) => normalizeText(t).includes(normalizedQuery));
      const matchesKeywords = doc.keywords.some((k) => normalizeText(k).includes(normalizedQuery));
      const matchesVersionChangelog = doc.versions.some(
        (v) =>
          normalizeText(v.summary).includes(normalizedQuery) ||
          v.changes.some((c) => normalizeText(c).includes(normalizedQuery))
      );
      matchesTagsOrKeywords = matchesDesc || matchesCategory || matchesTags || matchesKeywords || matchesVersionChangelog;
    }

    return matchesTitle || matchesSubtitle || matchesTagsOrKeywords;
  });

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setQuery("");
        setSelectedIndex(0);
      }, 50);
    }
  }, [isOpen]);

  // Keyboard navigation & Shortcuts inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredResults.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredResults.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          router.push(filteredResults[selectedIndex].url);
          onClose();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-sm">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#111111] border border-[#27272A] rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Search Input Box */}
        <div className="relative flex items-center border-b border-[#27272A] px-4 py-3">
          <Search className="w-5 h-5 text-[#A1A1AA] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Pesquisar documentos, páginas e categorias..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent border-0 text-white placeholder-[#A1A1AA] text-sm focus:outline-none focus:ring-0"
          />
          <span className="text-[10px] bg-[#0A0A0A] border border-[#27272A] text-[#A1A1AA] px-1.5 py-0.5 rounded font-mono shrink-0 select-none">
            ESC
          </span>
        </div>

        {/* Results list */}
        <div className="max-h-[350px] overflow-y-auto p-2 space-y-1">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.type === "page" ? Layout : FileText;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => {
                    router.push(item.url);
                    onClose();
                  }}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-white text-black"
                      : "text-white hover:bg-neutral-800/40"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded border shrink-0 ${
                        isSelected
                          ? "bg-neutral-100 border-neutral-300 text-black"
                          : "bg-[#0A0A0A] border-[#27272A] text-[#A1A1AA]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4
                        className={`text-sm font-medium truncate ${
                          isSelected ? "text-black font-semibold" : "text-white"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`text-xs truncate mt-0.5 ${
                          isSelected ? "text-black/75" : "text-[#A1A1AA]"
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? "text-black translate-x-0.5" : "text-[#A1A1AA]"
                    }`}
                  />
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-[#A1A1AA]">
              <p className="text-sm">Nenhum resultado encontrado para &quot;{query}&quot;</p>
              <p className="text-xs mt-1 text-[#A1A1AA]/60">
                Tente digitar outro termo de pesquisa.
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[#27272A] bg-[#0A0A0A]/50 text-[10px] text-[#A1A1AA]">
          <div className="flex items-center gap-2">
            <span>Navegar: <kbd className="font-mono">↓↑</kbd></span>
            <span>Selecionar: <kbd className="font-mono">Enter</kbd></span>
          </div>
          <span>Fechar: <kbd className="font-mono">Esc</kbd></span>
        </div>
      </div>
    </div>
  );
}
