import { NextResponse } from "next/server";
import { fetchRealDocuments } from "@/lib/supabase/documents";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const categoria = searchParams.get("categoria");

  const docs = await fetchRealDocuments();

  const filtered = docs.filter((d) => {
    if (tag && !d.tags?.includes(tag)) return false;
    if (categoria && d.categoria !== categoria) return false;
    return true;
  });

  return NextResponse.json({
    documents: filtered.map((d) => ({
      slug: d.slug,
      titulo: d.titulo,
      descricao: d.descricao,
      categoria: d.categoria,
      tags: d.tags,
      atualizadoEm: d.atualizadoEm,
      tempoLeitura: d.tempoLeitura,
    })),
  });
}
