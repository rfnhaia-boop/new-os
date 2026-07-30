import { Book } from "@/data/types";
import { BookOpen, ListTree } from "lucide-react";
import Link from "next/link";

interface BookSidebarProps {
  book: Book;
  activeSectionId: string;
}

export function BookSidebar({ book, activeSectionId }: BookSidebarProps) {
  const chapters = book.sections.filter(s => s.type === "chapter_header");

  return (
    <aside className="w-64 shrink-0 border-r border-[#27272A] bg-[#0A0A0A] flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-[#27272A] shrink-0">
        <Link href={`/book/${book.slug}`} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
            <BookOpen className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-white truncate">{book.title}</h2>
            <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">{book.volume}</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-zinc-500 mb-4">
          <ListTree className="w-4 h-4" />
          Índice
        </div>
        
        <nav className="space-y-1">
          {chapters.length > 0 ? (
            chapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeSectionId === chapter.id 
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
                    : "text-[#A1A1AA] hover:bg-[#111111] hover:text-white"
                }`}
              >
                {chapter.title}
              </a>
            ))
          ) : (
            <div className="text-xs text-zinc-600 px-3 py-2 italic">Nenhum capítulo mapeado.</div>
          )}
        </nav>
      </div>
    </aside>
  );
}
