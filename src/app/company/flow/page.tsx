import { mockFlowKnowledgeCollection } from "@/data/evolution/knowledge-mock";
import { mockFlowDocIngestion } from "@/data/evolution/mock";
import { FolderGit2, Calendar, HardDrive, AlertTriangle } from "lucide-react";

export default function FlowOverviewPage() {
  const collection = mockFlowKnowledgeCollection;
  const ingestion = mockFlowDocIngestion;

  return (
    <div className="space-y-8">
      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111111] border border-[#27272A] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <FolderGit2 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-medium text-zinc-400">Total Esperado</h3>
          </div>
          <p className="text-2xl font-bold text-white">10 Livros</p>
        </div>
        <div className="bg-[#111111] border border-[#27272A] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <HardDrive className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-medium text-zinc-400">Ingeridos</h3>
          </div>
          <p className="text-2xl font-bold text-white">0 Livros</p>
        </div>
        <div className="bg-[#111111] border border-[#27272A] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-medium text-zinc-400">Pendências</h3>
          </div>
          <p className="text-2xl font-bold text-white">10 Arquivos</p>
        </div>
        <div className="bg-[#111111] border border-[#27272A] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-zinc-400" />
            <h3 className="text-sm font-medium text-zinc-400">Data de Referência</h3>
          </div>
          <p className="text-lg font-bold text-white">Julho de 2026</p>
        </div>
      </div>

      {/* Ingestion Report */}
      <div className="bg-[#111111] border border-amber-500/20 rounded-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
        <div className="p-6 pl-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-amber-500">Relatório da Fundação Documental (Aguardando Fontes)</h2>
          </div>
          
          <div className="space-y-4 text-sm text-zinc-300">
            <p>
              A tentativa oficial de <strong>Ingestão Documental ({ingestion.title})</strong> foi registrada em {ingestion.referenceDate}, 
              porém nenhum arquivo original correspondente à documentação oficial foi localizado no repositório.
            </p>
            <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#27272A] font-mono text-xs whitespace-pre-wrap">
              {ingestion.sourceContent}
            </div>
            <p>
              A fundação documental <strong>não pode ser declarada concluída</strong> até que todos os 10 arquivos oficiais (Markdown, PDF, etc.) sejam fornecidos e processados com sucesso.
            </p>
          </div>
        </div>
      </div>
      
      {/* Metadata */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3">Tags Oficiais</h3>
        <div className="flex gap-2 flex-wrap">
          {collection.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-medium rounded-md border border-zinc-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
