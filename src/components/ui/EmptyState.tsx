import { ComponentType } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon: ComponentType<{ className?: string }>;
}

export function EmptyState({ title, description, icon: Icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 border border-dashed border-[#27272A] rounded-xl bg-[#111111]/30">
      <Icon className="w-10 h-10 text-[#A1A1AA] stroke-[1.5]" />
      <p className="mt-4 text-sm text-[#A1A1AA] font-medium">{title}</p>
      {description && <p className="mt-1 text-xs text-[#A1A1AA]/70">{description}</p>}
    </div>
  );
}
