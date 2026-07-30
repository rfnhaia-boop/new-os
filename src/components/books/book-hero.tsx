import Link from "next/link";
import { Book } from "@/data/types";
import { BookOpen, Clock, Package, Users, Calendar } from "lucide-react";

interface BookHeroProps {
  book: Book;
}

export function BookHero({ book }: BookHeroProps) {
  return (
    <div className="relative overflow-hidden bg-[#0A0A0A] border border-[#27272A] rounded-2xl p-6 md:p-12 mb-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-transparent pointer-events-none" />
      <BookOpen className="absolute -right-12 -bottom-12 w-64 h-64 text-indigo-500/5 rotate-12 pointer-events-none" />

      {/* Cover representation */}
      <div className="w-48 h-64 shrink-0 bg-gradient-to-br from-indigo-900 to-neutral-900 rounded-lg border border-[#27272A] shadow-2xl flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors" />
        <BookOpen className="w-16 h-16 text-indigo-500/30" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[10px] text-white/50 uppercase tracking-widest">{book.volume}</p>
        </div>
      </div>

      <div className="flex-1 space-y-6 z-10 text-center md:text-left">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            {book.chapter || "Playbook"}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            {book.title}
          </h1>
          <p className="text-[#A1A1AA] mt-4 max-w-2xl text-sm md:text-base leading-relaxed">
            {book.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 bg-[#111111] px-3 py-1.5 rounded-lg border border-[#27272A]">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span className="font-medium">{book.readTime}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#111111] px-3 py-1.5 rounded-lg border border-[#27272A]">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span className="font-medium">Atualizado em {new Date(book.updatedAt).toLocaleDateString("pt-BR")}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#111111] px-3 py-1.5 rounded-lg border border-[#27272A]">
            <span className="font-bold text-white">{book.version}</span>
          </div>
        </div>

        <div className="pt-6 border-t border-[#27272A] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {book.products.length > 0 && (
            <div>
              <h4 className="text-[10px] uppercase font-bold text-zinc-500 mb-2 flex items-center gap-1">
                <Package className="w-3 h-3" /> Produtos
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {book.products.map(p => (
                  <span key={p} className="text-xs text-zinc-300 bg-zinc-800/50 px-2 py-1 rounded border border-zinc-800">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
          {book.agents.length > 0 && (
            <div>
              <h4 className="text-[10px] uppercase font-bold text-zinc-500 mb-2 flex items-center gap-1">
                <Users className="w-3 h-3" /> Agentes/Público
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {book.agents.map(a => (
                  <span key={a} className="text-xs text-zinc-300 bg-zinc-800/50 px-2 py-1 rounded border border-zinc-800">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-4">
          <Link
            href={`/book/${book.slug}/viewer`}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-sm font-bold rounded-xl hover:bg-neutral-200 transition-colors"
          >
            Iniciar Leitura
          </Link>
        </div>
      </div>
    </div>
  );
}
