import { EmptyState } from "@/components/evolution/shared/empty-state";
import { Eye } from "lucide-react";

export default function ObservationPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Observação</h2>
      <EmptyState 
        title="Monitoramento Contínuo"
        description="Eventos que aconteceram no sistema e evidências (commits, métricas) aguardando análise."
        icon={<Eye className="w-8 h-8" />}
      />
    </div>
  );
}
