"use client";

import { useParams, useRouter } from "next/navigation";
import { booksData } from "@/data/books";
import { BookViewer } from "@/components/books/book-viewer";

export default function BookViewerPage() {
  const params = useParams();
  const router = useRouter();
  
  const book = booksData.find((b) => b.slug === params.slug);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <h2 className="text-xl font-bold text-white mb-2">Manual não encontrado</h2>
        <button onClick={() => router.back()} className="text-indigo-400 hover:underline">
          Voltar
        </button>
      </div>
    );
  }

  // The viewer takes full control of the screen layout
  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <BookViewer book={book} />
    </div>
  );
}
