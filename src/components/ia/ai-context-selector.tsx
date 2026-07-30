import { FileText, X } from "lucide-react";
import { documentsData } from "@/data/documents";

interface AIContextSelectorProps {
  selectedDocumentId: string | null;
  onSelect: (id: string | null) => void;
}

export function AIContextSelector({ selectedDocumentId, onSelect }: AIContextSelectorProps) {
  const selectedDoc = selectedDocumentId
    ? documentsData.find((d) => d.id === selectedDocumentId)
    : null;

  return (
    <div className="flex items-center gap-2 mb-2 px-2">
      <span className="text-[10px] text-[#A1A1AA] font-semibold">Anexar contexto:</span>
      
      {selectedDoc ? (
        <div className="flex items-center gap-1.5 px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-md">
          <FileText className="w-3 h-3 text-indigo-400" />
          <span className="text-[10px] text-indigo-400 font-medium truncate max-w-[200px]">
            {selectedDoc.titulo}
          </span>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-indigo-400/70 hover:text-indigo-400 ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <select
          value={selectedDocumentId || ""}
          onChange={(e) => onSelect(e.target.value || null)}
          className="bg-[#111111] border border-[#27272A] text-[10px] text-[#A1A1AA] rounded px-2 py-1 focus:outline-none cursor-pointer max-w-[200px]"
        >
          <option value="">Nenhum documento</option>
          {documentsData.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.titulo}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
