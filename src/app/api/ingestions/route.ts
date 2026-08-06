import { NextResponse } from "next/server";
import { createIngestion, listIngestions } from "@/lib/supabase/ingestions";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const key = request.headers.get("x-new-os-api-key");
  return Boolean(key) && key === process.env.NEW_OS_API_KEY;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const ingestions = await listIngestions();
  return NextResponse.json({
    ingestions: ingestions.map((i) => ({
      id: i.id,
      title: i.title,
      status: i.status,
      referenceDate: i.referenceDate,
      changesCount: i.changes.length,
    })),
  });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { title, sourceContent, projectId, referenceDate, sourceType } = body as Record<string, unknown>;

  if (typeof title !== "string" || !title.trim() || typeof sourceContent !== "string" || !sourceContent.trim()) {
    return NextResponse.json({ error: "title e sourceContent são obrigatórios" }, { status: 400 });
  }

  try {
    const id = await createIngestion({
      title: title.trim(),
      sourceContent: sourceContent.trim(),
      projectId: typeof projectId === "string" && projectId.trim() ? projectId.trim() : "proj_crm_ia",
      referenceDate: typeof referenceDate === "string" && referenceDate.trim() ? referenceDate.trim() : new Date().toISOString().slice(0, 10),
      sourceType: sourceType === "manual" || sourceType === "document" || sourceType === "system" ? sourceType : "conversation",
      actorId: "user-rafael",
    });

    return NextResponse.json({ id, url: `https://new-os.newflowsys.cloud/evolution/ingestions/${id}` }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "falha ao criar ingestão" },
      { status: 500 }
    );
  }
}
