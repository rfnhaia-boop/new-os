import { mockFlowManifest } from "@/data/evolution/knowledge-mock";
import { BookDashed, AlertCircle } from "lucide-react";

export default function FlowBooksPage() {
  const manifest = mockFlowManifest;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Manifesto Documental (Base FLOW)</h2>
          <p className="text-sm text-zinc-400">
            Abaixo estão os 10 documentos arquiteturais esperados para concluir a Fundação Documental.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {manifest.map((item) => (
          <div 
            key={item.id} 
            className="flex items-start gap-4 p-5 rounded-xl border border-dashed border-zinc-700 bg-[#111111]/50 opacity-80"
          >
            <div className="w-12 h-16 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center shrink-0 shadow-inner">
              <BookDashed className="w-5 h-5 text-zinc-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-zinc-500">{item.bookNumber}</span>
                <h3 className="text-sm font-semibold text-zinc-300 truncate" title={item.expectedTitle}>
                  {item.expectedTitle}
                </h3>
              </div>
              
              <div className="flex items-center gap-3 mt-3">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-800/50 text-[11px] font-medium text-zinc-400 border border-zinc-700/50">
                  {item.expectedDocumentStatus}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-rose-500/10 text-[11px] font-medium text-rose-400 border border-rose-500/20">
                  <AlertCircle className="w-3 h-3" /> Fonte Esperada
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3 text-sm text-blue-400">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p>
          Estes itens representam o <strong>mapa esperado</strong> da coleção. Eles não podem ser clicados e não apontam para <code>/book/[slug]</code> porque os arquivos originais ainda não foram localizados no repositório. Quando a fonte for ingerida, eles se transformarão em livros oficiais da Base de Conhecimento.
        </p>
      </div>
    </div>
  );
}
