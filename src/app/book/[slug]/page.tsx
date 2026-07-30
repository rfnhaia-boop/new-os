"use client";

import { useParams, useRouter } from "next/navigation";
import { PageContainer } from "@/components/ui/PageContainer";
import { booksData } from "@/data/books";
import { BookHero } from "@/components/books/book-hero";
import { ArrowLeft, Layers } from "lucide-react";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const book = booksData.find((b) => b.slug === params.slug);

  if (!book) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-xl font-bold text-white mb-2">Manual não encontrado</h2>
          <button onClick={() => router.back()} className="text-indigo-400 hover:underline">
            Voltar
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar para Biblioteca</span>
        </button>
      </div>

      <BookHero book={book} />

      {/* Book Summary or Index */}
      <div className="bg-[#0A0A0A] border border-[#27272A] rounded-xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          Índice de Conteúdo
        </h3>

        <div className="space-y-3">
          {book.sections.filter(s => s.type === "chapter_header").map((section, idx) => (
            <div key={section.id} className="flex items-start gap-4 p-4 rounded-lg bg-[#111111] border border-[#27272A] hover:border-indigo-500/30 transition-colors">
              <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold shrink-0">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{section.title}</h4>
                {section.content && <p className="text-xs text-[#A1A1AA] mt-1">{section.content}</p>}
              </div>
            </div>
          ))}
          
          {book.sections.filter(s => s.type === "chapter_header").length === 0 && (
            <div className="text-sm text-zinc-500 italic py-4">
              O índice deste manual não possui capítulos mapeados externamente.
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
