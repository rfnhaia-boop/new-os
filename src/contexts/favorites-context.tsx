"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("newos_favorites");
    let initialFavorites: string[] = [];
    if (stored) {
      try {
        initialFavorites = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
    setTimeout(() => {
      setFavorites(initialFavorites);
      setIsMounted(true);
    }, 0);
  }, []);

  const isFavorite = (slug: string) => favorites.includes(slug);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      localStorage.setItem("newos_favorites", JSON.stringify(next));
      return next;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: isMounted ? favorites : [],
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
