"use client";

import { ReactNode } from "react";
import { EvolutionNavigation } from "./evolution-navigation";
import { Network } from "lucide-react";

interface EvolutionShellProps {
  children: ReactNode;
}

export function EvolutionShell({ children }: EvolutionShellProps) {
  return (
    <div className="flex flex-col h-full bg-black">
      <header className="px-6 py-8 border-b border-[#27272A]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Network className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Sistema de Evolução</h1>
              <p className="text-sm text-zinc-400">Camada base para inteligência institucional</p>
            </div>
          </div>
          <EvolutionNavigation />
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
