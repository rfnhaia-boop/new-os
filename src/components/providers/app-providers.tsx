"use client";

import { ReactNode } from "react";
import { FavoritesProvider } from "@/contexts/favorites-context";
import { RecentDocumentsProvider } from "@/contexts/recent-documents-context";
import { CurrentUserProvider } from "@/contexts/current-user-context";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <CurrentUserProvider>
      <FavoritesProvider>
        <RecentDocumentsProvider>{children}</RecentDocumentsProvider>
      </FavoritesProvider>
    </CurrentUserProvider>
  );
}
