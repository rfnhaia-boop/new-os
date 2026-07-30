import { X, Search } from "lucide-react";
import Link from "next/link";
import { Book } from "@/data/types";

interface BookHeaderProps {
  book: Book;
}

export function BookHeader({ book }: BookHeaderProps) {
  return (
    <header className="h-14 bg-[#111111]/80 backdrop-blur-md border-b border-[#27272A] flex items-center justify-between px-4 sticky top-0 z-50 shrink-0">
      <div className="flex items-center gap-4">
        {/* Placeholder for left actions if any */}
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-[#A1A1AA] hover:text-white transition-colors" title="Buscar no livro">
          <Search className="w-4 h-4" />
        </button>
        <Link href={`/book/${book.slug}`} className="p-2 text-[#A1A1AA] hover:text-white transition-colors bg-[#27272A]/50 rounded-lg" title="Fechar leitor">
          <X className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
