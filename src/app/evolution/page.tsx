import { EmptyState } from "@/components/evolution/shared/empty-state";
import { Network } from "lucide-react";

export default function EvolutionOverviewPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Visão Geral</h2>
      <EmptyState 
        title="Sistema de Evolução Organizacional"
        description="Esta é a fundação para a inteligência institucional e governança do NEW OS. Selecione uma das abas acima para explorar o conhecimento, memória, observações e sugestões de melhoria."
        icon={<Network className="w-8 h-8" />}
      />
    </div>
  );
}
