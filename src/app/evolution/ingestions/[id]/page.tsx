import { getIngestion } from "@/lib/supabase/ingestions";
import { OperationalIngestionStatusBadge } from "@/components/evolution/ingestions/OperationalIngestionStatusBadge";
import { OperationalIngestionSummary } from "@/components/evolution/ingestions/OperationalIngestionSummary";
import { OperationalChangeGroup } from "@/components/evolution/ingestions/OperationalChangeGroup";
import { OperationalSourceViewer } from "@/components/evolution/ingestions/OperationalSourceViewer";
import { ActorBadge } from "@/components/evolution/shared/actor-badge";
import { ArrowLeft, CheckCircle2, Settings, Circle, AlertCircle, ShieldAlert, TrendingUp, Network } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface IngestionDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function IngestionDetailsPage({ params }: IngestionDetailsPageProps) {
  const { id } = await params;
  const ingestion = await getIngestion(id);

  if (!ingestion) return notFound();

  const completed = ingestion.changes.filter(c => c.classification === "completed" && c.type !== "decision" && c.type !== "architecture" && c.type !== "risk" && c.type !== "cross_project_impact" && c.type !== "pattern");
  const inProgress = ingestion.changes.filter(c => c.classification === "in_progress" && c.type !== "decision" && c.type !== "architecture" && c.type !== "risk" && c.type !== "cross_project_impact" && c.type !== "pattern");
  const planned = ingestion.changes.filter(c => c.classification === "planned" && c.type !== "decision" && c.type !== "architecture" && c.type !== "risk" && c.type !== "cross_project_impact" && c.type !== "pattern");
  const architecture = ingestion.changes.filter(c => c.type === "architecture");
  const decisions = ingestion.changes.filter(c => c.type === "decision");
  const patterns = ingestion.changes.filter(c => c.type === "pattern");
  const impacts = ingestion.changes.filter(c => c.type === "cross_project_impact");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-start gap-4">
        <Link
          href="/evolution/ingestions"
          className="w-10 h-10 rounded-lg bg-[#111111] border border-[#27272A] flex items-center justify-center hover:bg-[#1A1A1A] transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-zinc-400" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-white">{ingestion.title}</h2>
            <OperationalIngestionStatusBadge status={ingestion.status} />
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <span>Data de Ref: <strong className="text-white">{ingestion.referenceDate}</strong></span>
            <span>•</span>
            <span className="capitalize">Origem: <strong className="text-white">{ingestion.sourceType}</strong></span>
            <span>•</span>
            <div className="flex items-center gap-2">
              Ator: <ActorBadge actor={ingestion.actor} />
            </div>
          </div>
        </div>
      </div>

      <OperationalIngestionSummary ingestion={ingestion} />

      <div className="bg-[#111111] border border-[#27272A] rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-6 border-b border-[#27272A] pb-4">Alterações Estruturadas</h2>

        {ingestion.changes.length === 0 ? (
          <p className="text-sm text-zinc-500 italic">
            Nenhuma alteração estruturada aqui — ou a curadoria por IA não encontrou nada relevante no conteúdo, ou a chave da Anthropic ainda não está configurada. O conteúdo bruto continua abaixo.
          </p>
        ) : (
          <>
            <OperationalChangeGroup title="Concluídos" icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />} changes={completed} />
            <OperationalChangeGroup title="Em Andamento" icon={<Settings className="w-4 h-4 text-amber-500" />} changes={inProgress} />
            <OperationalChangeGroup title="Planejados" icon={<Circle className="w-4 h-4 text-zinc-500" />} changes={planned} />
            <div className="my-12 border-t border-[#27272A]"></div>
            <OperationalChangeGroup title="Decisões Técnicas" icon={<AlertCircle className="w-4 h-4 text-indigo-500" />} changes={decisions} />
            <OperationalChangeGroup title="Arquitetura & Entidades" icon={<Network className="w-4 h-4 text-purple-500" />} changes={architecture} />
            <OperationalChangeGroup title="Padrões Institucionais (Candidatos)" icon={<ShieldAlert className="w-4 h-4 text-rose-500" />} changes={patterns} />
            <OperationalChangeGroup title="Impactos Cross-Project" icon={<TrendingUp className="w-4 h-4 text-blue-500" />} changes={impacts} />
          </>
        )}
      </div>

      <OperationalSourceViewer content={ingestion.sourceContent} />
    </div>
  );
}
