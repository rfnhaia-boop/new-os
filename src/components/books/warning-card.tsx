import { AlertTriangle } from "lucide-react";

interface WarningCardProps {
  title: string;
  content: string;
}

export function WarningCard({ title, content }: WarningCardProps) {
  return (
    <div className="my-6 bg-red-950/20 border border-red-500/30 rounded-xl p-6 flex gap-4 items-start">
      <div className="p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-1">{title}</h3>
        <p className="text-red-100/90 text-sm">{content}</p>
      </div>
    </div>
  );
}
