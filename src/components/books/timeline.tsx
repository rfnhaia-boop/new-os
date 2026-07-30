import { Clock } from "lucide-react";

interface TimelineProps {
  content: string; // Could be a serialized JSON or just text for now
}

export function Timeline({ content }: TimelineProps) {
  // For now, we will render a generic timeline placeholder based on the text.
  // In a real app, this could parse JSON into an array of events.
  return (
    <div className="my-8 relative pl-6 border-l-2 border-[#27272A]">
      <div className="absolute w-4 h-4 rounded-full bg-indigo-500/20 border-2 border-indigo-500 left-[-9px] top-0" />
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-indigo-400" />
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Linha do Tempo</h3>
      </div>
      <p className="text-[#A1A1AA] text-sm mt-2">{content}</p>
    </div>
  );
}
