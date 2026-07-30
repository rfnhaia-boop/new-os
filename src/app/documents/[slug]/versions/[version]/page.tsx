import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { VersionBadge } from "@/components/ui/version-badge";
import { documentsData } from "@/data";

interface VersionPageProps {
  params: Promise<{
    slug: string;
    version: string;
  }>;
}

export async function generateStaticParams() {
  const paths: Array<{ slug: string; version: string }> = [];
  documentsData.forEach((doc) => {
    doc.versions.forEach((v) => {
      paths.push({
        slug: doc.slug,
        version: v.version,
      });
    });
  });
  return paths;
}

export default async function VersionPage({ params }: VersionPageProps) {
  const { slug, version } = await params;

  const doc = documentsData.find((d) => d.slug === slug);
  if (!doc) {
    notFound();
  }

  // De-normalize version format if needed
  const ver = doc.versions.find((v) => v.version === version);
  if (!ver) {
    notFound();
  }

  const isCurrent = doc.currentVersion === version;

  return (
    <PageContainer>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[#A1A1AA] mb-6">
        <Link href="/documents" className="hover:text-white transition-colors">
          Documentos
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/documents/${doc.slug}`}
          className="hover:text-white transition-colors truncate max-w-[200px]"
        >
          {doc.titulo}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white">Versão {version}</span>
      </nav>

      {/* Warning if historical */}
      {!isCurrent && (
        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 text-amber-200 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
          <div className="text-sm">
            <h4 className="font-semibold text-amber-400">Versão Histórica</h4>
            <p className="mt-0.5 text-amber-200/80">
              Você está visualizando uma versão antiga deste documento. Para ver
              as diretrizes mais recentes, acesse o documento atual.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="space-y-4 border-b border-[#27272A] pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge
            status={ver.status === "published" ? "Validado" : "Rascunho"}
          />
          <VersionBadge version={ver.version} />
          {isCurrent && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-white border border-white/20">
              Versão Atual
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {doc.titulo} &mdash; {ver.version}
          </h1>
        </div>

        <div className="text-xs text-[#A1A1AA]">
          Criada por <strong className="text-white">{ver.author}</strong> em{" "}
          {ver.createdAt}
        </div>
      </div>

      {/* Version summary details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 bg-[#111111] border border-[#27272A] rounded-xl space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A1A1AA]">
              Resumo da Versão
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              {ver.summary}
            </p>
          </div>

          <div className="p-6 bg-[#111111] border border-[#27272A] rounded-xl space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A1A1AA]">
              Alterações Realizadas
            </h3>
            <ul className="space-y-2.5">
              {ver.changes.map((change, idx) => (
                <li
                  key={idx}
                  className="text-sm text-[#A1A1AA] flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-2" />
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl text-center space-y-4">
            <h4 className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
              Documento Completo
            </h4>
            <p className="text-xs text-[#A1A1AA]">
              Navegue para o documento principal para ler o conteúdo completo
              atualizado.
            </p>
            <Link
              href={`/documents/${doc.slug}`}
              className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Atual</span>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
