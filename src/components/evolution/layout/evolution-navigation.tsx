"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Network, 
  BrainCircuit, 
  Eye, 
  Lightbulb, 
  Scale, 
  TrendingUp 
} from "lucide-react";

const navItems = [
  { name: "Visão Geral", href: "/evolution", exact: true, icon: Network },
  { name: "Ingestões", href: "/evolution/ingestions", exact: false, icon: Network },
  { name: "Knowledge", href: "/evolution/knowledge", exact: false, icon: BrainCircuit },
  { name: "Memory", href: "/evolution/memory", exact: false, icon: Network },
  { name: "Observation", href: "/evolution/observation", exact: false, icon: Eye },
  { name: "Suggestions", href: "/evolution/suggestions", exact: false, icon: Lightbulb },
  { name: "Governance", href: "/evolution/governance", exact: false, icon: Scale },
  { name: "Impact", href: "/evolution/impact", exact: false, icon: TrendingUp },
];

export function EvolutionNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 p-1 bg-[#111111] border border-[#27272A] rounded-xl overflow-x-auto hide-scrollbar">
      {navItems.map((item) => {
        const isActive = item.exact 
          ? pathname === item.href 
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              isActive 
                ? "bg-[#27272A] text-white" 
                : "text-zinc-400 hover:text-white hover:bg-[#1A1A1A]"
            }`}
          >
            <item.icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : ""}`} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
