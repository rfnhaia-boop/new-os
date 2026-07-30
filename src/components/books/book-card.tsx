import Link from "next/link";
import { Book } from "@/data/types";
import { BookOpen, Clock } from "lucide-react";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/book/${book.slug}`}
      className="flex flex-col bg-[#0A0A0A] border border-[#27272A] rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all group h-full"
    >
      <div className="h-32 bg-gradient-to-br from-indigo-900/40 to-neutral-900 flex items-center justify-center border-b border-[#27272A] p-4 relative overflow-hidden">
        <BookOpen className="w-12 h-12 text-indigo-500/20 absolute -right-2 -bottom-2 transform rotate-12 group-hover:scale-110 transition-transform" />
        <h3 className="text-lg font-bold text-white text-center z-10 leading-tight">{book.title}</h3>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-[#A1A1AA] line-clamp-2 mb-4 flex-1">
          {book.description}
        </p>
        
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex flex-wrap gap-2">
            {book.tags.slice(0, 3).map(tag => (
              <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase bg-[#111111] text-zinc-400 border border-[#27272A]">
                {tag}
              </span>
            ))}
            {book.tags.length > 3 && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#111111] text-zinc-500 border border-[#27272A]">
                +{book.tags.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {book.readTime}
            </span>
            <span className="uppercase">{book.version}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
