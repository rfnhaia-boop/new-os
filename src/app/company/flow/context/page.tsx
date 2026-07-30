import { mockFlowContextPack } from "@/data/evolution/knowledge-mock";
import { Layers, HelpCircle, Activity, FileWarning } from "lucide-react";

export default function FlowContextPackPage() {
  const context = mockFlowContextPack;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-white">Context Pack (FLOW)</h2>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20">
              V {context.version} — {context.status}
            </span>
          </div>
          <p className="text-sm text-zinc-400">
            Pacote de contexto para inicialização de agentes de IA baseados na arquitetura oficial.
          </p>
        </div>
      </div>

      <div className="bg-[#111111] border border-[#27272A] rounded-xl p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-6">
          <FileWarning className="w-8 h-8 text-zinc-600" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Contexto Indisponível</h3>
        <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
          Nenhuma fonte documental oficial foi ingerida até o momento. As referências para decisões, arquitetura, glossário e módulos estão vazias.
        </p>
        <p className="text-xs text-zinc-500 bg-[#1A1A1A] border border-[#27272A] px-4 py-2 rounded-lg">
          O Context Pack será gerado automaticamente quando os 10 documentos do Manifesto Oficial forem ingeridos.
        </p>
      </div>

      {/* Skeletons to show where data would go */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-30 pointer-events-none">
        <div className="border border-[#27272A] rounded-xl p-5 bg-[#0A0A0A]">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-5 h-5 text-zinc-500" />
            <h3 className="text-sm font-bold text-zinc-400">Glossário & Terminologia</h3>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-zinc-800/50 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-800/50 rounded w-1/2"></div>
            <div className="h-4 bg-zinc-800/50 rounded w-5/6"></div>
          </div>
        </div>

        <div className="border border-[#27272A] rounded-xl p-5 bg-[#0A0A0A]">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-zinc-500" />
            <h3 className="text-sm font-bold text-zinc-400">Decisões & Regras</h3>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-zinc-800/50 rounded w-full"></div>
            <div className="h-4 bg-zinc-800/50 rounded w-2/3"></div>
            <div className="h-4 bg-zinc-800/50 rounded w-4/5"></div>
          </div>
        </div>
      </div>

    </div>
  );
}
