"use client";

import { Star } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useFavorites } from "@/contexts/favorites-context";
import { documentsData } from "@/data";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const favoriteDocs = documentsData.filter((doc) =>
    favorites.includes(doc.slug)
  );

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title="Favoritos"
        subtitle="Acesse rapidamente os documentos que você marcou como importantes."
      />

      {/* Favorites List */}
      <div className="space-y-3">
        {favoriteDocs.length > 0 ? (
          favoriteDocs.map((doc) => (
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
            title="Nenhum documento favorito"
            description="Marque documentos com a estrela para encontrá-los rapidamente aqui."
            icon={Star}
          />
        )}
      </div>
    </PageContainer>
  );
}
