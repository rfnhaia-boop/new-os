"use client";

import { Menu, Bell, User, Search } from "lucide-react";
import Link from "next/link";

interface AppHeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export function AppHeader({ onMenuClick, onSearchClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-[#0A0A0A] border-b border-[#27272A] md:pl-70">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 text-[#A1A1AA] hover:text-white rounded-lg md:hidden focus:outline-none focus:ring-1 focus:ring-[#27272A]"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Brand / Logo (Mobile only) */}
        <Link href="/" className="flex items-center gap-2 md:hidden">
          <div className="w-7 h-7 rounded bg-white flex items-center justify-center">
            <span className="text-black font-extrabold text-sm">N</span>
          </div>
          <span className="text-white font-bold text-base tracking-wide">NEW OS</span>
        </Link>

        {/* Title or Breadcrumbs (Desktop only) */}
        <span className="hidden md:inline text-sm font-medium text-[#A1A1AA] shrink-0">
          Sistema Operacional &gt; <span className="text-white">Dashboard</span>
        </span>

        {/* Global Search trigger bar (Desktop only) */}
        <button
          onClick={onSearchClick}
          className="hidden md:flex items-center justify-between w-64 px-3 py-1.5 ml-4 bg-[#111111] border border-[#27272A] hover:border-neutral-500 rounded-lg text-left text-xs text-[#A1A1AA] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Pesquisar...</span>
          </div>
          <kbd className="font-mono text-[9px] bg-[#0A0A0A] px-1.5 py-0.5 rounded border border-[#27272A]">
            Ctrl K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Search button for Mobile */}
        <button
          onClick={onSearchClick}
          className="p-1.5 text-[#A1A1AA] hover:text-white rounded-lg hover:bg-[#111111] border border-transparent hover:border-[#27272A] transition-all md:hidden"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          className="p-1.5 text-[#A1A1AA] hover:text-white rounded-lg hover:bg-[#111111] border border-transparent hover:border-[#27272A] transition-all"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
        </button>
        <button
          className="p-1.5 text-[#A1A1AA] hover:text-white rounded-lg hover:bg-[#111111] border border-transparent hover:border-[#27272A] transition-all"
          aria-label="Profile"
        >
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
