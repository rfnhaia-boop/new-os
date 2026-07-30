"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";

interface OperationalSourceViewerProps {
  content: string;
}

export function OperationalSourceViewer({ content }: OperationalSourceViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-[#27272A] rounded-xl bg-[#0A0A0A] overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-[#111111] hover:bg-[#1A1A1A] transition-colors"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-bold text-white">Conteúdo Original da Ingestão</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-zinc-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-6 border-t border-[#27272A]">
          <pre className="text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto custom-scrollbar">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}
