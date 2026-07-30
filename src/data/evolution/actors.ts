export type ActorType = "human" | "ai_agent" | "system";

export interface ActorReference {
  type: ActorType;
  id: string;
  name?: string;
  avatarUrl?: string; // Optional for UI display
}
