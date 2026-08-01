import { createClient } from "@supabase/supabase-js";
import type { DocumentData } from "@/data/types";

// Client de leitura pública (funciona no browser e no servidor — só usa as chaves NEXT_PUBLIC_).
function readClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${d.getUTCFullYear()}`;
}

export async function fetchRealDocuments(): Promise<DocumentData[]> {
  const supabase = readClient();

  const { data: rows, error } = await supabase
    .from("documents")
    .select("id, slug, titulo, descricao, categoria, currentVersion, status, atualizadoEm, tempoLeitura, publico, conteudo, relacionados, tags, keywords");

  if (error || !rows) {
    if (error) console.error("Erro ao buscar documentos reais:", error.message);
    return [];
  }

  const { data: versionRows } = await supabase
    .from("document_versions")
    .select("id, documentId, version, createdAt, author, summary, changes, status");

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    titulo: row.titulo,
    descricao: row.descricao,
    categoria: row.categoria,
    currentVersion: row.currentVersion,
    status: row.status,
    atualizadoEm: formatDate(row.atualizadoEm),
    tempoLeitura: row.tempoLeitura,
    publico: row.publico ?? [],
    conteudo: row.conteudo,
    relacionados: row.relacionados ?? [],
    tags: row.tags ?? [],
    keywords: row.keywords ?? [],
    versions: (versionRows ?? [])
      .filter((v) => v.documentId === row.id)
      .map((v) => ({
        id: v.id,
        version: v.version,
        createdAt: v.createdAt,
        author: v.author,
        summary: v.summary,
        changes: v.changes ?? [],
        status: v.status,
      })),
  })) as DocumentData[];
}

export async function fetchRealDocumentBySlug(slug: string): Promise<DocumentData | null> {
  const docs = await fetchRealDocuments();
  return docs.find((d) => d.slug === slug) ?? null;
}
