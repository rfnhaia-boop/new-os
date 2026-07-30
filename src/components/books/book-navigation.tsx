import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookSection } from "@/data/types";

interface BookNavigationProps {
  sections: BookSection[];
  activeSectionId: string;
}

export function BookNavigation({ sections, activeSectionId }: BookNavigationProps) {
  const chapters = sections.filter(s => s.type === "chapter_header");
  const currentIndex = chapters.findIndex(c => c.id === activeSectionId);

  const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-[#27272A]">
      {prev ? (
        <a href={`#${prev.id}`} className="group flex flex-col items-start p-4 rounded-xl border border-[#27272A] bg-[#0A0A0A] hover:border-indigo-500/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1 mb-1 group-hover:text-indigo-400">
            <ChevronLeft className="w-3 h-3" />
            Anterior
          </span>
          <span className="text-sm font-medium text-white line-clamp-1">{prev.title}</span>
        </a>
      ) : <div />}

      {next ? (
        <a href={`#${next.id}`} className="group flex flex-col items-end p-4 rounded-xl border border-[#27272A] bg-[#0A0A0A] hover:border-indigo-500/50 transition-colors">
          <span className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1 mb-1 group-hover:text-indigo-400">
            Próximo
            <ChevronRight className="w-3 h-3" />
          </span>
          <span className="text-sm font-medium text-white line-clamp-1 text-right">{next.title}</span>
        </a>
      ) : <div />}
    </div>
  );
}
