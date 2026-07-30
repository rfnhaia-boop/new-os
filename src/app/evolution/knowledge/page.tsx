import { EmptyState } from "@/components/evolution/shared/empty-state";
import { BrainCircuit } from "lucide-react";

export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Knowledge Base</h2>
      <EmptyState 
        title="Camada de Conhecimento"
        description="A inteligência agregadora da empresa. Aqui os manuais, decisões e arquiteturas estarão conectados."
        icon={<BrainCircuit className="w-8 h-8" />}
      />
    </div>
  );
}
