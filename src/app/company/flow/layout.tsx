import Link from "next/link";
import { BookOpen, Layers, Archive, Activity } from "lucide-react";

export default function FlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Product Header */}
      <div className="flex items-start justify-between border-b border-[#27272A] pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">FLOW</h1>
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
              Produto
            </span>
          </div>
          <p className="text-zinc-400">
            A plataforma para gestão da barbearia. Base Documental Oficial (Versão 1.0).
          </p>
        </div>
        
        <div className="flex flex-col items-end text-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-zinc-500">Status Documental:</span>
            <span className="text-amber-500 font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              Parcial (Aguardando Fontes)
            </span>
          </div>
          <p className="text-zinc-500 text-xs">
            Ingerido: 0 de 10 Documentos Oficiais
          </p>
        </div>
      </div>

      {/* Product Navigation */}
      <div className="flex gap-1 overflow-x-auto pb-2 border-b border-[#27272A] custom-scrollbar">
        <Link 
          href="/company/flow"
          className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-[#1A1A1A] transition-colors flex items-center gap-2"
        >
          <Activity className="w-4 h-4" /> Visão Geral
        </Link>
        <Link 
          href="/company/flow/books"
          className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-[#1A1A1A] transition-colors flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" /> Livros Oficiais
        </Link>
        <Link 
          href="/company/flow/context"
          className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-[#1A1A1A] transition-colors flex items-center gap-2"
        >
          <Layers className="w-4 h-4" /> Context Pack
        </Link>
      </div>

      {/* Content */}
      <div className="pt-4">
        {children}
      </div>
    </div>
  );
}
