import { OperationalChange } from "@/data/evolution";
import { OperationalChangeCard } from "./OperationalChangeCard";
import { ReactNode } from "react";

interface OperationalChangeGroupProps {
  title: string;
  icon?: ReactNode;
  changes: OperationalChange[];
  emptyMessage?: string;
}

export function OperationalChangeGroup({ title, icon, changes, emptyMessage = "Nenhum item registrado." }: OperationalChangeGroupProps) {
  if (!changes || changes.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <div className="p-4 rounded-lg border border-dashed border-[#27272A] text-sm text-zinc-500 bg-[#111111]/50 text-center">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
        {icon}
        {title}
        <span className="ml-2 bg-[#27272A] text-zinc-400 text-xs py-0.5 px-2 rounded-full">
          {changes.length}
        </span>
      </h3>
      <div className="space-y-3">
        {changes.map((change) => (
          <OperationalChangeCard key={change.id} change={change} />
        ))}
      </div>
    </div>
  );
}
