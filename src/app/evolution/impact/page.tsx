import { EmptyState } from "@/components/evolution/shared/empty-state";
import { TrendingUp } from "lucide-react";
import { mockAssessments } from "@/data/evolution/mock";

export default function ImpactPage() {
  const assessment = mockAssessments[0];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Avaliação de Impacto</h2>
      
      {assessment ? (
        <div className="bg-[#111111] border border-[#27272A] rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Métricas de Sucesso: {assessment.relatedProposal.label}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg border border-[#27272A] bg-[#0A0A0A]">
              <h4 className="text-sm font-semibold text-zinc-400 mb-2">Resultado Esperado</h4>
              <p className="text-white mb-4">{assessment.expectedOutcome}</p>
              <div className="space-y-2">
                {assessment.expectedMetrics.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">{m.metricName}</span>
                    <span className="font-bold text-indigo-400">{m.targetValue}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg border border-[#27272A] bg-[#0A0A0A] opacity-50 relative">
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="bg-[#111111] border border-[#27272A] px-3 py-1 rounded text-xs font-bold text-zinc-400 uppercase tracking-wider">Aguardando Execução</span>
              </div>
              <h4 className="text-sm font-semibold text-zinc-400 mb-2">Resultado Observado</h4>
              <p className="text-white mb-4">{assessment.observedOutcome || "Nenhum resultado registrado ainda."}</p>
              {assessment.observedMetrics && assessment.observedMetrics.length > 0 ? (
                <div className="space-y-2">
                  {assessment.observedMetrics.map((m, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">{m.metricName}</span>
                      <span className="font-bold text-emerald-400">{m.observedValue}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-500 italic">Métricas não preenchidas.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <EmptyState 
          title="Avaliação de Impacto"
          description="Acompanhe se as melhorias implementadas geraram o resultado esperado na operação."
          icon={<TrendingUp className="w-8 h-8" />}
        />
      )}
    </div>
  );
}
