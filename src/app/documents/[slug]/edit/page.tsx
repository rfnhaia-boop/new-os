import { notFound } from "next/navigation";
import { documentsData } from "@/data";
import { DocumentEditor } from "@/components/documents/document-editor";

interface EditPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return documentsData.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocumentEditPage({ params }: EditPageProps) {
  const { slug } = await params;
  const doc = documentsData.find((d) => d.slug === slug);

  if (!doc) {
    notFound();
  }

  return <DocumentEditor initialDocument={doc} slug={slug} />;
}
