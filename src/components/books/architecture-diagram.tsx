import { Component } from "lucide-react";

interface ArchitectureDiagramProps {
  title: string;
  content: string;
}

export function ArchitectureDiagram({ title, content }: ArchitectureDiagramProps) {
  return (
    <div className="my-8 bg-[#111111] border border-[#27272A] rounded-xl overflow-hidden">
      <div className="bg-[#1A1A1A] px-4 py-3 border-b border-[#27272A] flex items-center gap-2">
        <Component className="w-4 h-4 text-indigo-400" />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div className="p-8 flex items-center justify-center min-h-[200px] bg-[url('/grid.svg')] bg-center">
        {/* Placeholder for actual diagram, could be an image or a mermaid render in the future */}
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
            <Component className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-sm text-[#A1A1AA]">{content}</p>
        </div>
      </div>
    </div>
  );
}
