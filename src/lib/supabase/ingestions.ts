import { createAdminClient } from "@/lib/supabase/admin";
import type { OperationalIngestion } from "@/data/evolution";
import { curateIngestion } from "@/lib/ai/curate-ingestion";

export async function listIngestions(): Promise<OperationalIngestion[]> {
  const supabase = createAdminClient();

  const { data: rows, error } = await supabase
    .from("operational_ingestions")
    .select("id, kind, projectId, title, referenceDate, sourceType, sourceContent, actorId, status, relatedEntities, createdAt, updatedAt")
    .order("createdAt", { ascending: false });

  if (error || !rows) {
    console.error("Erro ao listar ingestões:", error?.message);
    return [];
  }

  return Promise.all(rows.map((row) => hydrateIngestion(row)));
}

export async function getIngestion(id: string): Promise<OperationalIngestion | null> {
  const supabase = createAdminClient();

  const { data: row, error } = await supabase
    .from("operational_ingestions")
    .select("id, kind, projectId, title, referenceDate, sourceType, sourceContent, actorId, status, relatedEntities, createdAt, updatedAt")
    .eq("id", id)
    .maybeSingle();

  if (error || !row) {
    if (error) console.error("Erro ao buscar ingestão:", error.message);
    return null;
  }

  return hydrateIngestion(row);
}

async function hydrateIngestion(row: Record<string, unknown>): Promise<OperationalIngestion> {
  const supabase = createAdminClient();

  const [{ data: actor }, { data: changes }] = await Promise.all([
    supabase
      .from("actors")
      .select("id, type, name, avatarUrl")
      .eq("id", row.actorId as string)
      .maybeSingle(),
    supabase
      .from("operational_changes")
      .select("id, type, title, description, classification, target, requiresApproval")
      .eq("ingestionId", row.id as string),
  ]);

  return {
    id: row.id as string,
    kind: row.kind as OperationalIngestion["kind"],
    projectId: row.projectId as string,
    title: row.title as string,
    referenceDate: (row.referenceDate as string).slice(0, 10),
    sourceType: row.sourceType as OperationalIngestion["sourceType"],
    sourceContent: row.sourceContent as string,
    actor: actor ?? { type: "system", id: "unknown", name: "Desconhecido" },
    status: row.status as OperationalIngestion["status"],
    changes: (changes ?? []) as OperationalIngestion["changes"],
    relatedEntities: (row.relatedEntities ?? []) as OperationalIngestion["relatedEntities"],
    createdAt: row.createdAt as string,
    updatedAt: row.updatedAt as string,
    createdBy: actor ?? { type: "system", id: "unknown", name: "Desconhecido" },
  };
}

export interface CreateIngestionInput {
  projectId: string;
  title: string;
  referenceDate: string;
  sourceType: "conversation" | "manual" | "document" | "system";
  sourceContent: string;
  actorId: string;
}

export async function createIngestion(input: CreateIngestionInput): Promise<string> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("operational_ingestions")
    .insert({
      id: crypto.randomUUID(),
      kind: "operational",
      projectId: input.projectId,
      title: input.title,
      referenceDate: input.referenceDate,
      sourceType: input.sourceType,
      sourceContent: input.sourceContent,
      actorId: input.actorId,
      status: "received",
      relatedEntities: [],
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Falha ao criar ingestão");
  }

  const ingestionId = data.id as string;

  const curatedChanges = await curateIngestion({
    title: input.title,
    sourceContent: input.sourceContent,
  });

  if (curatedChanges.length > 0) {
    const { error: changesError } = await supabase.from("operational_changes").insert(
      curatedChanges.map((change) => ({
        id: crypto.randomUUID(),
        ingestionId,
        type: change.type,
        title: change.title,
        description: change.description,
        classification: change.classification,
        requiresApproval: change.requiresApproval,
      }))
    );

    if (changesError) {
      console.error("Erro ao salvar alterações curadas:", changesError.message);
    } else {
      await supabase
        .from("operational_ingestions")
        .update({ status: "under_review" })
        .eq("id", ingestionId);
    }
  }

  return ingestionId;
}
