import { CheckCircle2 } from "lucide-react";

interface BestPracticeCardProps {
  title: string;
  content: string;
}

export function BestPracticeCard({ title, content }: BestPracticeCardProps) {
  return (
    <div className="my-6 bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-6 flex gap-4 items-start">
      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
        <CheckCircle2 className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-1">{title}</h3>
        <p className="text-indigo-100/90 text-sm">{content}</p>
      </div>
    </div>
  );
}
