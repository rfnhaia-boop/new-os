import { BarChart3 } from "lucide-react";

interface MetricCardProps {
  title: string;
  content: string; // The metric value
  subtext?: string;
}

export function MetricCard({ title, content, subtext }: MetricCardProps) {
  return (
    <div className="my-6 bg-[#0A0A0A] border border-[#27272A] rounded-xl p-6 flex flex-col items-center justify-center text-center">
      <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
        <BarChart3 className="w-5 h-5 text-indigo-400" />
      </div>
      <h3 className="text-sm font-medium text-[#A1A1AA] uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-4xl font-black text-white">{content}</p>
      {subtext && <p className="text-xs text-[#A1A1AA] mt-2">{subtext}</p>}
    </div>
  );
}
