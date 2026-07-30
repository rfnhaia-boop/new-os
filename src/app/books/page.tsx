"use client";

import { useState } from "react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { booksData } from "@/data/books";
import { BookCard } from "@/components/books/book-card";
import { BookSearch } from "@/components/books/book-search";

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("Todos");

  // Extract all unique tags
  const allTags = Array.from(new Set(booksData.flatMap(b => b.tags)));

  const filteredBooks = booksData.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "Todos" || book.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <PageContainer>
      <PageHeader 
        title="Biblioteca" 
        subtitle="Manuais, Playbooks e Guias Operacionais do NEW OS."
      />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-[#111111] p-4 rounded-xl border border-[#27272A] mb-8">
        <div className="flex-1 w-full max-w-md">
          <BookSearch value={searchQuery} onChange={setSearchQuery} />
        </div>
        
        <div className="w-full md:w-auto">
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#27272A] text-sm text-white rounded-lg px-3 py-3 focus:outline-none focus:border-indigo-500"
          >
            <option value="Todos">Todas as Categorias</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-[#A1A1AA]">
            Nenhum manual encontrado para os filtros selecionados.
          </div>
        )}
      </div>
    </PageContainer>
  );
}
