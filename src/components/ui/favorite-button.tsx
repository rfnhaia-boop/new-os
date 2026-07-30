"use client";

import { Star } from "lucide-react";
import { useFavorites } from "@/contexts/favorites-context";

interface FavoriteButtonProps {
  documentSlug: string;
}

export function FavoriteButton({ documentSlug }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(documentSlug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(documentSlug);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={`p-1.5 rounded-lg border border-transparent hover:border-[#27272A] hover:bg-[#111111] transition-all cursor-pointer ${
        active ? "text-yellow-400" : "text-[#A1A1AA] hover:text-white"
      }`}
    >
      <Star className="w-4.5 h-4.5" fill={active ? "currentColor" : "none"} />
    </button>
  );
}
