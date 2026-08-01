import type { OperationalChange, OperationalChangeType, OperationalClassification } from "@/data/evolution";

const CHANGE_TYPES: OperationalChangeType[] = [
  "progress",
  "decision",
  "task",
  "roadmap",
  "architecture",
  "documentation",
  "risk",
  "pending",
  "pattern",
  "cross_project_impact",
];

const CLASSIFICATIONS: OperationalClassification[] = [
  "completed",
  "in_progress",
  "planned",
  "informational",
];

const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    changes: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          type: { type: "STRING", enum: CHANGE_TYPES },
          title: { type: "STRING" },
          description: { type: "STRING" },
          classification: { type: "STRING", enum: CLASSIFICATIONS },
          requiresApproval: { type: "BOOLEAN" },
        },
        required: ["type", "title", "description", "classification", "requiresApproval"],
      },
    },
  },
  required: ["changes"],
};

const MODEL = "gemini-3.5-flash";

export type CuratedChange = Pick<
  OperationalChange,
  "type" | "title" | "description" | "classification" | "requiresApproval"
>;

/**
 * Lê o conteúdo bruto de uma ingestão e extrai as alterações estruturadas via Gemini.
 * Retorna [] (sem lançar erro) se a chave não estiver configurada ou a extração falhar —
 * a ingestão continua válida com status "received", só sem curadoria ainda.
 */
export async function curateIngestion(input: {
  title: string;
  sourceContent: string;
}): Promise<CuratedChange[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY não configurada — pulando curadoria automática.");
    return [];
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text:
                  "Você é o Head of Research do NEW OS, responsável por curar ingestões operacionais da empresa NEW. " +
                  "Leia o relato bruto e extraia as alterações operacionais relevantes de forma estruturada, em português. " +
                  "Seja seletivo: só registre o que é factual e relevante para o histórico institucional. Não invente informação. " +
                  "Se não houver nada relevante, retorne changes como lista vazia.",
              },
            ],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: `Título da ingestão: ${input.title}\n\nConteúdo bruto:\n${input.sourceContent}` }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("Falha na curadoria automática:", response.status, await response.text());
      return [];
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return [];

    const parsed = JSON.parse(text) as { changes: CuratedChange[] };
    return parsed.changes ?? [];
  } catch (err) {
    console.error("Falha na curadoria automática:", err instanceof Error ? err.message : err);
    return [];
  }
}
