import { ReactNode } from "react";
import { BoxSelect } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 border border-dashed border-[#27272A] rounded-2xl bg-[#0A0A0A] text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#27272A] flex items-center justify-center text-zinc-500 mb-6">
        {icon || <BoxSelect className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
