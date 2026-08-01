import { createAdminClient } from "@/lib/supabase/admin";

export interface Agent {
  id: string;
  type: "human" | "ai_agent" | "system";
  name: string | null;
  role: string | null;
  model: string | null;
  status: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getAgents(): Promise<Agent[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("actors")
    .select("id, type, name, role, model, status, avatarUrl, createdAt, updatedAt")
    .eq("type", "ai_agent")
    .order("createdAt", { ascending: true });

  if (error) {
    console.error("Erro ao buscar agentes:", error.message);
    return [];
  }

  return data as Agent[];
}
