import { EmptyState } from "@/components/evolution/shared/empty-state";
import { Network } from "lucide-react";

export default function MemoryPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Memória Institucional</h2>
      <EmptyState 
        title="Aprendizados e Padrões"
        description="Repositório de decisões passadas, erros recorrentes e padrões aprovados para orientar as ações futuras."
        icon={<Network className="w-8 h-8" />}
      />
    </div>
  );
}
