import { notFound } from "next/navigation";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { categoriesData, documentsData } from "@/data";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return categoriesData.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryInfo = categoriesData.find((c) => c.slug === slug);

  if (!categoryInfo) {
    notFound();
  }

  // Filter documents in this category
  const categoryDocs = documentsData.filter(
    (doc) => doc.categoria === categoryInfo.nome
  );

  const docCountText =
    categoryDocs.length === 1
      ? "1 documento cadastrado"
      : `${categoryDocs.length} documentos cadastrados`;

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title={categoryInfo.nome}
        subtitle={categoryInfo.descricao}
        actions={
          <span className="text-xs text-[#A1A1AA] bg-[#111111] border border-[#27272A] px-3 py-2 rounded-lg shrink-0">
            {docCountText}
          </span>
        }
      />

      {/* Category Documents List */}
      <Section title={`Documentos de ${categoryInfo.nome}`}>
        <div className="space-y-3">
          {categoryDocs.map((doc) => (
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
          ))}
        </div>
      </Section>
    </PageContainer>
  );
}
