"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { RecentDocument } from "@/data";

interface RecentDocumentsContextType {
  recentDocuments: RecentDocument[];
  addRecentDocument: (slug: string) => void;
  clearRecentDocuments: () => void;
}

const RecentDocumentsContext = createContext<RecentDocumentsContextType | undefined>(undefined);

export function RecentDocumentsProvider({ children }: { children: ReactNode }) {
  const [recentDocuments, setRecentDocuments] = useState<RecentDocument[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("newos_recent_documents");
    let valid: RecentDocument[] = [];
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          valid = parsed.filter(
            (item) =>
              item &&
              typeof item.slug === "string" &&
              typeof item.viewedAt === "string"
          );
        }
      } catch (e) {
        console.error("Failed to parse recent documents", e);
      }
    }
    setTimeout(() => {
      setRecentDocuments(valid);
      setIsMounted(true);
    }, 0);
  }, []);

  const addRecentDocument = useCallback((slug: string) => {
    setRecentDocuments((prev) => {
      // Remove duplicate
      const filtered = prev.filter((d) => d.slug !== slug);
      // Place at the top
      const newDoc: RecentDocument = {
        slug,
        viewedAt: new Date().toISOString(),
      };
      // Limit list to 10 items
      const next = [newDoc, ...filtered].slice(0, 10);
      localStorage.setItem("newos_recent_documents", JSON.stringify(next));
      return next;
    });
  }, []);

  const clearRecentDocuments = useCallback(() => {
    setRecentDocuments([]);
    localStorage.removeItem("newos_recent_documents");
  }, []);

  return (
    <RecentDocumentsContext.Provider
      value={{
        recentDocuments: isMounted ? recentDocuments : [],
        addRecentDocument,
        clearRecentDocuments,
      }}
    >
      {children}
    </RecentDocumentsContext.Provider>
  );
}

export function useRecentDocuments() {
  const context = useContext(RecentDocumentsContext);
  if (!context) {
    throw new Error(
      "useRecentDocuments must be used within a RecentDocumentsProvider"
    );
  }
  return context;
}
