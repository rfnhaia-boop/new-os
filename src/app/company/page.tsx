import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { AppCard } from "@/components/ui/AppCard";
import {
  documentsData,
  companyHighlights,
  companyDocSlugs,
} from "@/data";

export default function CompanyPage() {
  const companyDocs = documentsData.filter((doc) =>
    companyDocSlugs.includes(doc.slug)
  );

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title="Empresa"
        subtitle="Conheça a identidade, a estratégia e a estrutura da New."
      />

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {companyHighlights.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} href={item.href}>
              <AppCard hoverable className="h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-[#0A0A0A] border border-[#27272A] text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#27272A] flex items-center justify-between">
                  <span className="text-[10px] text-[#A1A1AA]">{item.docCount}</span>
                  <span className="text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    Visualizar
                  </span>
                </div>
              </AppCard>
            </Link>
          );
        })}
      </div>

      {/* Company Documents List */}
      <Section title="Documentos da Empresa">
        <div className="space-y-3">
          {companyDocs.map((doc) => (
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
