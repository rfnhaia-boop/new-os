import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Bookmark,
  Layers,
  Clock,
} from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { AppCard } from "@/components/ui/AppCard";
import {
  documentsData,
  nexMainCards,
  journeySteps,
  nexDocSlugs,
} from "@/data";

export default function NexPage() {
  const nexDocs = documentsData.filter((doc) =>
    nexDocSlugs.includes(doc.slug)
  );

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title="NEX"
        subtitle="Construindo empresas preparadas para crescer."
      />

      {/* Grid of 6 Main Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nexMainCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={`/documents/${card.slug}`}>
              <AppCard hoverable className="h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-[#0A0A0A] border border-[#27272A] text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#27272A] flex items-center justify-end">
                  <span className="text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    Acessar documento
                  </span>
                </div>
              </AppCard>
            </Link>
          );
        })}
      </div>

      {/* Jornada Comercial Section */}
      <Section title="Jornada Comercial">
        <AppCard>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-4">
            {journeySteps.map((step, index) => (
              <div
                key={step.name}
                className="flex flex-col lg:flex-row items-center w-full lg:w-auto"
              >
                {/* Step Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-4 py-2 bg-[#0A0A0A] border border-[#27272A] rounded-xl w-full lg:w-48">
                  <span className="text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
                    Fase 0{index + 1}
                  </span>
                  <h4 className="mt-1 text-sm font-bold text-white">{step.name}</h4>
                  <p className="mt-1 text-[11px] text-[#A1A1AA] leading-tight">
                    {step.desc}
                  </p>
                </div>

                {/* Connector Arrow (Hidden for the last step) */}
                {index < journeySteps.length - 1 && (
                  <div className="flex items-center justify-center py-2 lg:py-0 lg:px-4 shrink-0 text-[#27272A]">
                    {/* Down arrow on mobile, right arrow on desktop */}
                    <ArrowRight className="w-5 h-5 hidden lg:block" />
                    <span className="text-sm font-bold block lg:hidden">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </AppCard>
      </Section>

      {/* Métricas Section */}
      <Section title="Métricas">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Documentos" value="6" icon={FileText} subtext="Total da área" />
          <StatCard title="Playbooks" value="1" icon={Bookmark} subtext="Manuais operacionais" />
          <StatCard title="Processos" value="3" icon={Layers} subtext="Mapeados" />
          <StatCard title="Última atualização" value="Hoje" icon={Clock} subtext="Atualização geral" />
        </div>
      </Section>

      {/* Documentos da NEX Section */}
      <Section title="Documentos da NEX">
        <div className="space-y-3">
          {nexDocs.map((doc) => (
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
