import { EntityReference } from "@/data/evolution";
import { Link as LinkIcon, ExternalLink } from "lucide-react";
import Link from "next/link";

interface EntityReferenceListProps {
  references: EntityReference[];
  title?: string;
}

export function EntityReferenceList({ references, title = "Referências Relacionadas" }: EntityReferenceListProps) {
  if (!references || references.length === 0) return null;

  return (
    <div className="my-4">
      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
        <LinkIcon className="w-3 h-3" />
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {references.map((ref, i) => (
          <Link
            key={i}
            href={ref.url || "#"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#27272A] bg-[#111111] hover:bg-[#1A1A1A] hover:border-indigo-500/50 transition-colors text-sm text-zinc-300 group"
          >
            <span className="font-medium">{ref.label || ref.entityId}</span>
            <span className="text-[10px] text-zinc-500 bg-[#0A0A0A] px-1.5 py-0.5 rounded uppercase border border-[#27272A]">
              {ref.entityType}
            </span>
            <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-indigo-400 ml-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
