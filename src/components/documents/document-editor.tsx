"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Trash2,
  ChevronUp,
  ChevronDown,
  Heading,
  AlignLeft,
  List as ListIcon,
  Quote,
  Code,
  Minus,
  Folder,
  Layers,
  Clock,
  Users,
  Tag,
} from "lucide-react";
import { Category, DocumentData } from "@/data";

interface DocumentBlock {
  id: string;
  type: "heading" | "paragraph" | "list" | "quote" | "code" | "divider";
  content: string;
}

interface DocumentEditorProps {
  initialDocument: DocumentData;
  slug: string;
}

export function DocumentEditor({ initialDocument, slug }: DocumentEditorProps) {
  const router = useRouter();

  const [document, setDocument] = useState<DocumentData>(initialDocument);
  const [blocks, setBlocks] = useState<DocumentBlock[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<Category>("Empresa");
  const [status, setStatus] = useState("Validado");
  const [tempoLeitura, setTempoLeitura] = useState("");
  const [publicoText, setPublicoText] = useState("");
  const [tagsText, setTagsText] = useState("");

  // Load document from static data or localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`newos_doc_${slug}`);
    let doc = initialDocument;
    if (stored) {
      try {
        doc = JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }

    // Parse sections to blocks
    const parsedBlocks: DocumentBlock[] = [];
    doc.conteudo.secoes.forEach((sec, idx) => {
      parsedBlocks.push({
        id: `block-heading-${idx}-${Date.now()}`,
        type: "heading",
        content: sec.titulo,
      });

      let type: DocumentBlock["type"] = "paragraph";
      let content = sec.texto;

      if (content.startsWith("> ")) {
        type = "quote";
        content = content.replace(/^>\s+/, "");
      } else if (content.startsWith("```")) {
        type = "code";
        content = content.replace(/^```[a-z]*\n/, "").replace(/\n```$/, "");
      }

      parsedBlocks.push({
        id: `block-content-${idx}-${Date.now()}`,
        type,
        content,
      });
    });

    setTimeout(() => {
      setDocument(doc);
      setTitulo(doc.titulo);
      setDescricao(doc.descricao);
      setCategoria(doc.categoria);
      setStatus(doc.status);
      setTempoLeitura(doc.tempoLeitura);
      setPublicoText(doc.publico.join(", "));
      setTagsText(doc.tags.join(", "));
      setBlocks(parsedBlocks);
    }, 0);
  }, [slug, initialDocument]);

  // Block handlers
  const updateBlockContent = (id: string, content: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content } : b))
    );
  };

  const updateBlockType = (id: string, type: DocumentBlock["type"]) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, type } : b)));
  };

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[nextIndex];
    newBlocks[nextIndex] = temp;
    setBlocks(newBlocks);
  };

  const addBlock = (type: DocumentBlock["type"], index?: number) => {
    const newBlock: DocumentBlock = {
      id: `block-added-${Date.now()}-${Math.random()}`,
      type,
      content: "",
    };

    if (typeof index === "number") {
      const next = [...blocks];
      next.splice(index + 1, 0, newBlock);
      setBlocks(next);
    } else {
      setBlocks((prev) => [...prev, newBlock]);
    }
  };

  // Convert blocks back to static secoes schema
  const serializeBlocks = () => {
    const secoes: Array<{ titulo: string; texto: string }> = [];
    let currentSection: { titulo: string; texto: string } | null = null;

    blocks.forEach((block) => {
      if (block.type === "heading") {
        if (currentSection) {
          secoes.push(currentSection);
        }
        currentSection = {
          titulo: block.content || "Sem título",
          texto: "",
        };
      } else {
        if (!currentSection) {
          currentSection = {
            titulo: "Introdução",
            texto: "",
          };
        }

        let formattedContent = block.content;
        if (block.type === "quote") {
          formattedContent = `> ${block.content}`;
        } else if (block.type === "code") {
          formattedContent = `\`\`\`\n${block.content}\n\`\`\``;
        } else if (block.type === "divider") {
          formattedContent = "\n---\n";
        }

        if (currentSection.texto) {
          currentSection.texto += "\n\n" + formattedContent;
        } else {
          currentSection.texto = formattedContent;
        }
      }
    });

    if (currentSection) {
      secoes.push(currentSection);
    }

    return secoes;
  };

  const handleSave = (targetStatus?: string) => {
    const savedStatus = targetStatus || status;
    const publico = publicoText
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedDoc = {
      ...document,
      titulo,
      descricao,
      categoria,
      status: savedStatus,
      tempoLeitura,
      publico,
      tags,
      conteudo: {
        secoes: serializeBlocks(),
      },
      atualizadoEm: "Hoje",
    };

    localStorage.setItem(`newos_doc_${slug}`, JSON.stringify(updatedDoc));

    if (!targetStatus) {
      router.push(`/documents/${slug}`);
    } else {
      setStatus(savedStatus);
      setDocument(updatedDoc);
      alert("Rascunho salvo com sucesso localmente!");
    }
  };

  const headings = blocks.filter((b) => b.type === "heading");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#27272A] bg-[#0A0A0A]/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link
              href={`/documents/${slug}`}
              className="text-[#A1A1AA] hover:text-white p-1 rounded hover:bg-[#111111] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="h-4 w-px bg-[#27272A]" />
            <h1 className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-[400px]">
              Editando: {titulo || "Documento sem Título"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSave("Rascunho")}
              className="px-3 py-1.5 text-xs font-semibold text-[#A1A1AA] hover:text-white border border-[#27272A] rounded-lg bg-transparent hover:bg-[#111111] transition-colors cursor-pointer"
            >
              Salvar rascunho
            </button>
            <button
              onClick={() => handleSave()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-black bg-white hover:bg-neutral-200 border border-white rounded-lg transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main layout wrapper */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
              Estrutura
            </h3>
            <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1">
              {headings.length > 0 ? (
                headings.map((h, idx) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      const el = window.document.getElementById(h.id);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 w-full text-left px-2 py-1.5 text-xs text-[#A1A1AA] hover:text-white rounded hover:bg-[#0A0A0A] transition-colors cursor-pointer"
                  >
                    <Heading className="w-3.5 h-3.5 text-white/50 shrink-0" />
                    <span className="truncate">{h.content || `Seção ${idx + 1}`}</span>
                  </button>
                ))
              ) : (
                <span className="text-xs text-[#A1A1AA]/50 italic block">
                  Nenhuma seção (título) adicionada.
                </span>
              )}
            </div>
          </div>

          <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
              Metadados
            </h3>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-[#A1A1AA] flex items-center gap-1.5">
                <Folder className="w-3 h-3" />
                <span>Categoria</span>
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as Category)}
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-neutral-500 cursor-pointer"
              >
                <option value="Empresa">Empresa</option>
                <option value="NEX">NEX</option>
                <option value="Produtos">Produtos</option>
                <option value="Operação">Operação</option>
                <option value="IA">IA</option>
                <option value="Framework">Framework</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-[#A1A1AA] flex items-center gap-1.5">
                <Layers className="w-3 h-3" />
                <span>Status</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-neutral-500 cursor-pointer"
              >
                <option value="Validado">Validado</option>
                <option value="Rascunho">Rascunho</option>
                <option value="Arquivado">Arquivado</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-[#A1A1AA] flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                <span>Tempo de Leitura</span>
              </label>
              <input
                type="text"
                value={tempoLeitura}
                onChange={(e) => setTempoLeitura(e.target.value)}
                placeholder="Ex: 8 minutos"
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-[#A1A1AA] flex items-center gap-1.5">
                <Users className="w-3 h-3" />
                <span>Quem deve ler (público)</span>
              </label>
              <input
                type="text"
                value={publicoText}
                onChange={(e) => setPublicoText(e.target.value)}
                placeholder="Diretoria, Geral, Suporte"
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-[#A1A1AA] flex items-center gap-1.5">
                <Tag className="w-3 h-3" />
                <span>Tags (separadas por vírgula)</span>
              </label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="crm, vendas, onboarding"
                className="w-full bg-[#0A0A0A] border border-[#27272A] text-xs text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-neutral-500"
              />
            </div>
          </div>
        </aside>

        {/* Center/Right Column */}
        <section className="lg:col-span-3 space-y-6">
          <div className="p-6 bg-[#111111] border border-[#27272A] rounded-xl space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-[#A1A1AA]">Título do Documento</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#27272A] focus:border-white focus:ring-0 text-2xl font-bold text-white py-1.5 px-0 placeholder-white/30 outline-none"
                placeholder="Título do documento..."
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-[#A1A1AA]">Objetivo / Descrição</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={2}
                className="w-full bg-transparent border-0 border-b border-[#27272A] focus:border-white focus:ring-0 text-sm text-[#A1A1AA] py-1.5 px-0 placeholder-[#A1A1AA]/30 outline-none resize-none"
                placeholder="Insira o objetivo ou descrição sumária do documento..."
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A1A1AA] pb-1 border-b border-[#27272A]/50">
              Blocos de Conteúdo
            </h3>

            {blocks.map((block, index) => {
              return (
                <div
                  key={block.id}
                  id={block.id}
                  className="group relative flex gap-3 p-4 bg-[#111111]/70 border border-[#27272A] rounded-xl hover:border-neutral-500 transition-colors"
                >
                  <div className="flex flex-col items-center justify-between shrink-0 border-r border-[#27272A] pr-3 gap-2">
                    <div className="p-1 rounded bg-[#0A0A0A] border border-[#27272A] text-[#A1A1AA]">
                      {block.type === "heading" && <Heading className="w-3.5 h-3.5" />}
                      {block.type === "paragraph" && <AlignLeft className="w-3.5 h-3.5" />}
                      {block.type === "list" && <ListIcon className="w-3.5 h-3.5" />}
                      {block.type === "quote" && <Quote className="w-3.5 h-3.5" />}
                      {block.type === "code" && <Code className="w-3.5 h-3.5" />}
                      {block.type === "divider" && <Minus className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => moveBlock(index, "up")}
                        disabled={index === 0}
                        className="text-[#A1A1AA] hover:text-white disabled:opacity-30 disabled:hover:text-[#A1A1AA]"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveBlock(index, "down")}
                        disabled={index === blocks.length - 1}
                        className="text-[#A1A1AA] hover:text-white disabled:opacity-30 disabled:hover:text-[#A1A1AA]"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <select
                        value={block.type}
                        onChange={(e) =>
                          updateBlockType(block.id, e.target.value as DocumentBlock["type"])
                        }
                        className="bg-[#0A0A0A] border border-[#27272A] text-[10px] text-[#A1A1AA] rounded-md px-1.5 py-0.5 focus:outline-none cursor-pointer"
                      >
                        <option value="paragraph">Parágrafo</option>
                        <option value="heading">Título de Seção</option>
                        <option value="quote">Citação</option>
                        <option value="code">Código</option>
                        <option value="divider">Divisor</option>
                      </select>

                      <button
                        onClick={() => deleteBlock(block.id)}
                        className="text-[#A1A1AA]/50 hover:text-red-500 p-1 rounded hover:bg-[#0A0A0A] transition-colors"
                        title="Remover bloco"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {block.type === "divider" ? (
                      <div className="py-4 border-b border-dashed border-[#27272A]" />
                    ) : (
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlockContent(block.id, e.target.value)}
                        rows={block.type === "heading" ? 1 : block.type === "code" ? 4 : 2}
                        className={`w-full bg-[#0A0A0A] border border-[#27272A] rounded-lg text-xs text-white p-2.5 outline-none focus:border-neutral-500 font-sans resize-y ${
                          block.type === "heading"
                            ? "font-bold text-sm"
                            : block.type === "code"
                            ? "font-mono bg-[#09090b] text-emerald-400"
                            : block.type === "quote"
                            ? "italic border-l-2 border-white pl-3 text-white/90"
                            : ""
                        }`}
                        placeholder={
                          block.type === "heading"
                            ? "Insira o título da seção..."
                            : block.type === "code"
                            ? "Insira o bloco de código..."
                            : block.type === "quote"
                            ? "Insira a citação..."
                            : "Escreva o parágrafo..."
                        }
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-[#111111]/40 border border-[#27272A] border-dashed rounded-xl flex flex-col items-center justify-center gap-3">
            <span className="text-xs font-semibold text-[#A1A1AA]">Adicionar Bloco</span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => addBlock("paragraph")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] border border-[#27272A] text-xs text-[#A1A1AA] hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Parágrafo</span>
              </button>
              <button
                onClick={() => addBlock("heading")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] border border-[#27272A] text-xs text-[#A1A1AA] hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
              >
                <Heading className="w-3.5 h-3.5" />
                <span>Título</span>
              </button>
              <button
                onClick={() => addBlock("quote")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] border border-[#27272A] text-xs text-[#A1A1AA] hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
              >
                <Quote className="w-3.5 h-3.5" />
                <span>Citação</span>
              </button>
              <button
                onClick={() => addBlock("code")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] border border-[#27272A] text-xs text-[#A1A1AA] hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
              >
                <Code className="w-3.5 h-3.5" />
                <span>Código</span>
              </button>
              <button
                onClick={() => addBlock("divider")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] border border-[#27272A] text-xs text-[#A1A1AA] hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
                <span>Divisor</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
