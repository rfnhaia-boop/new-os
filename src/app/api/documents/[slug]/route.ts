import { NextResponse } from "next/server";
import { fetchRealDocumentBySlug } from "@/lib/supabase/documents";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await fetchRealDocumentBySlug(slug);

  if (!doc) {
    return NextResponse.json({ error: "documento não encontrado" }, { status: 404 });
  }

  return NextResponse.json({ document: doc });
}
