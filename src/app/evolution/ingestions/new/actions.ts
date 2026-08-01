"use server";

import { redirect } from "next/navigation";
import { createIngestion } from "@/lib/supabase/ingestions";

export async function createIngestionAction(formData: FormData) {
  const projectId = String(formData.get("projectId") ?? "proj_flow");
  const title = String(formData.get("title") ?? "").trim();
  const referenceDate = String(formData.get("referenceDate") ?? "");
  const sourceType = String(formData.get("sourceType") ?? "manual") as
    | "conversation"
    | "manual"
    | "document"
    | "system";
  const sourceContent = String(formData.get("sourceContent") ?? "").trim();

  if (!title || !referenceDate || !sourceContent) {
    throw new Error("Preencha título, data de referência e conteúdo.");
  }

  const id = await createIngestion({
    projectId,
    title,
    referenceDate,
    sourceType,
    sourceContent,
    actorId: "user-rafael",
  });

  redirect(`/evolution/ingestions/${id}`);
}
