import { notFound } from "next/navigation";
import { documentsData } from "@/data";
import { DocumentViewer } from "@/components/documents/document-viewer";

interface DocumentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return documentsData.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { slug } = await params;
  const doc = documentsData.find((d) => d.slug === slug);

  if (!doc) {
    notFound();
  }

  return <DocumentViewer document={doc} />;
}
