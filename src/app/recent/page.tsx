"use client";

import { Clock3, Trash2 } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRecentDocuments } from "@/contexts/recent-documents-context";
import { useCurrentUser } from "@/contexts/current-user-context";
import { documentsData } from "@/data";

function formatRelativeTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);

    if (diffSec < 60) return "Agora";
    if (diffMin < 60) {
      return `Há ${diffMin} ${diffMin === 1 ? "minuto" : "minutos"}`;
    }
    if (diffHrs < 24) {
      if (date.getDate() === now.getDate()) {
        return "Hoje";
      }
    }

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Ontem";
    }

    const months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
    return `${date.getDate()} de ${months[date.getMonth()]}`;
  } catch {
    return "Recentemente";
  }
}

export default function RecentPage() {
  const { recentDocuments, clearRecentDocuments } = useRecentDocuments();
  const { can } = useCurrentUser();

  const handleClear = () => {
    if (
      window.confirm("Deseja realmente limpar todo o histórico de leitura?")
    ) {
      clearRecentDocuments();
    }
  };

  // Resolve matching document metadata
  const resolvedDocs = recentDocuments
    .map((recent) => {
      const doc = documentsData.find((d) => d.slug === recent.slug);
      if (!doc) return null;
      return {
        ...doc,
        viewedAt: recent.viewedAt,
      };
    })
    .filter(Boolean) as Array<typeof documentsData[0] & { viewedAt: string }>;

  const headerActions = resolvedDocs.length > 0 && can("documents", "delete") && (
    <button
      onClick={handleClear}
      className="inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-[#A1A1AA] hover:text-white bg-[#111111] hover:bg-[#111111]/80 border border-[#27272A] hover:border-red-500/50 rounded-lg transition-colors cursor-pointer w-full sm:w-auto"
    >
      <Trash2 className="w-3.5 h-3.5" />
      <span>Limpar histórico</span>
    </button>
  );

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title="Recentes"
        subtitle="Continue de onde parou e acesse seus últimos documentos visualizados."
        actions={headerActions || undefined}
      />

      {/* Recents list */}
      <div className="space-y-3">
        {resolvedDocs.length > 0 ? (
          resolvedDocs.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.titulo}
              category={doc.categoria}
              currentVersion={doc.currentVersion}
              status={doc.status}
              updatedAt={formatRelativeTime(doc.viewedAt)}
              href={`/documents/${doc.slug}`}
              slug={doc.slug}
              tags={doc.tags}
            />
          ))
        ) : (
          <EmptyState
            title="Nenhum documento recente"
            description="Os documentos que você acessar aparecerão aqui automaticamente."
            icon={Clock3}
          />
        )}
      </div>
    </PageContainer>
  );
}
