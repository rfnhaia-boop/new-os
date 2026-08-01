"use server";

import { askHermes } from "@/lib/hermes/client";

export async function askHermesAction(prompt: string): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
  if (!prompt.trim()) {
    return { ok: false, error: "Prompt vazio." };
  }

  try {
    const text = await askHermes(prompt);
    return { ok: true, text };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Falha ao falar com o Hermes." };
  }
}
