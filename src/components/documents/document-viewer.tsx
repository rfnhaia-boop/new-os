"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  UserCheck,
  ChevronRight,
  FileText,
} from "lucide-react";
import { DocumentData, documentsData } from "@/data";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { VersionBadge } from "@/components/ui/version-badge";
import { useRecentDocuments } from "@/contexts/recent-documents-context";
import { useCurrentUser } from "@/contexts/current-user-context";
import {
  getCurrentVersion,
  sortVersionsByDate,
} from "@/lib/document-versions";

interface DocumentViewerProps {
  document: DocumentData;
}

export function DocumentViewer({ document: initialDocument }: DocumentViewerProps) {
  const { addRecentDocument } = useRecentDocuments();
  const { can } = useCurrentUser();
  const [document, setDocument] = useState<DocumentData>(initialDocument);

  useEffect(() => {
    const stored = localStorage.getItem(`newos_doc_${initialDocument.slug}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTimeout(() => {
          setDocument(parsed);
        }, 0);
      } catch (e) {
        console.error(e);
      }
    }
  }, [initialDocument]);

  useEffect(() => {
    if (document.slug) {
      addRecentDocument(document.slug);
    }
  }, [document.slug, addRecentDocument]);

  // Smart Related Documents Algorithm
  const otherDocs = documentsData.filter((d) => d.slug !== document.slug);
  const scoredDocs = otherDocs.map((d) => {
    let score = 0;
    if (d.categoria === document.categoria) {
      score += 2;
    }
    const commonTags = d.tags.filter((t) => document.tags.includes(t));
    score += commonTags.length;
    return { doc: d, score };
  });

  const smartRelatedDocs = scoredDocs
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.doc)
    .slice(0, 4);

  const relatedDocs = smartRelatedDocs.length > 0
    ? smartRelatedDocs
    : documentsData.filter((d) => document.relacionados.includes(d.slug));

  const currVersion = getCurrentVersion(document);
  const sortedVersions = sortVersionsByDate(document.versions);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb & Navigation */}
      <nav className="flex items-center gap-2 text-sm text-[#A1A1AA]">
        <Link
          href="/documents"
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Documentos</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#A1A1AA]/70">{document.categoria}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white truncate max-w-[200px]">{document.titulo}</span>
      </nav>

      {/* Header section */}
      <div className="space-y-4 border-b border-[#27272A] pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#111111] border border-[#27272A] text-white">
            {document.categoria}
          </span>
          <StatusBadge status={document.status} />
          
          <VersionBadge version={document.currentVersion} />
          
          {currVersion && (
            <span className="text-xs text-[#A1A1AA]">
              por <strong className="text-white">{currVersion.author}</strong> em {currVersion.createdAt}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {document.titulo}
          </h1>
          <div className="flex items-center gap-2 shrink-0">
            {can("documents", "edit") && (
              <Link
                href={`/documents/${document.slug}/edit`}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white hover:text-black bg-transparent hover:bg-white border border-[#27272A] hover:border-white rounded-lg transition-colors cursor-pointer"
              >
                <span>Editar</span>
              </Link>
            )}
            <FavoriteButton documentSlug={document.slug} />
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#111111] border border-[#27272A]">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
            Objetivo
          </h2>
          <p className="mt-1.5 text-sm text-white/90 leading-relaxed">
            {document.descricao}
          </p>
        </div>
      </div>

      {/* Grid metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Metadata list */}
        <div className="space-y-6 md:col-span-1">
          <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl space-y-4">
            <h3 className="text-sm font-semibold text-white border-b border-[#27272A] pb-2">
              Informações Gerais
            </h3>
            
            <div className="space-y-3.5">
              <div className="flex items-center gap-2.5 text-xs text-[#A1A1AA]">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Leitura: <strong>{document.tempoLeitura}</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#A1A1AA]">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Atualizado: <strong>{document.atualizadoEm}</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#A1A1AA]">
                <Tag className="w-4 h-4 shrink-0" />
                <span>Versão: <strong>{document.currentVersion}</strong></span>
              </div>
            </div>
          </div>

          {/* Quem deve ler / Público */}
          <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white border-b border-[#27272A] pb-2">
              <UserCheck className="w-4 h-4 text-[#A1A1AA]" />
              <span>Quem deve ler</span>
            </div>
            <ul className="space-y-1.5">
              {document.publico.map((item, idx) => (
                <li key={idx} className="text-xs text-[#A1A1AA] flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 bg-[#111111] border border-[#27272A] rounded-xl space-y-6">
            <h3 className="text-sm font-semibold text-[#A1A1AA] uppercase tracking-wider">
              Conteúdo
            </h3>
            <div className="space-y-8">
              {document.conteudo.secoes.map((sec, idx) => (
                <section key={idx} className="space-y-2">
                  <h4 className="text-lg font-bold text-white border-l-2 border-white pl-3">
                    {sec.titulo}
                  </h4>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed whitespace-pre-line pl-3">
                    {sec.texto}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Histórico de Versões Section */}
      <div className="border-t border-[#27272A] pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Histórico de versões</h3>
        <div className="space-y-3">
          {sortedVersions.map((v) => {
            const isCurrent = v.version === document.currentVersion;
            return (
              <Link
                key={v.id}
                href={`/documents/${document.slug}/versions/${v.version}`}
                className={`group block p-4 bg-[#111111] border rounded-xl hover:border-neutral-500 transition-all ${
                  isCurrent
                    ? "border-white/30 bg-[#111111]/90 shadow-sm"
                    : "border-[#27272A]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <VersionBadge version={v.version} />
                    {isCurrent && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-white/10 text-white border border-white/20">
                        Atual
                      </span>
                    )}
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#0A0A0A] border border-[#27272A] text-[#A1A1AA]">
                      {v.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#A1A1AA]">
                    por <strong className="text-white">{v.author}</strong> em {v.createdAt}
                  </div>
                </div>
                <p className="mt-2 text-xs text-white/80">{v.summary}</p>
                {v.changes && v.changes.length > 0 && (
                  <ul className="mt-2.5 space-y-1 pl-4 list-disc text-[11px] text-[#A1A1AA]">
                    {v.changes.map((change, idx) => (
                      <li key={idx}>{change}</li>
                    ))}
                  </ul>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Related documents */}
      {relatedDocs.length > 0 && (
        <div className="border-t border-[#27272A] pt-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">Documentos relacionados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedDocs.map((relDoc) => (
              <Link
                key={relDoc.id}
                href={`/documents/${relDoc.slug}`}
                className="group flex items-center justify-between p-4 bg-[#111111] border border-[#27272A] hover:border-neutral-500 rounded-xl transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#0A0A0A] border border-[#27272A] text-[#A1A1AA] group-hover:text-white transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white group-hover:text-neutral-200 transition-colors">
                      {relDoc.titulo}
                    </h4>
                    <span className="text-[10px] text-[#A1A1AA]">{relDoc.categoria}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
