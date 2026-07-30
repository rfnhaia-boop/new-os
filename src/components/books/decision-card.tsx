import { Scale } from "lucide-react";

interface DecisionCardProps {
  title: string;
  content: string;
}

export function DecisionCard({ title, content }: DecisionCardProps) {
  return (
    <div className="my-6 bg-[#111111] border border-[#27272A] border-l-4 border-l-amber-500 rounded-r-xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <Scale className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider">Decisão de Projeto: {title}</h3>
      </div>
      <p className="text-[#A1A1AA] text-sm">{content}</p>
    </div>
  );
}
