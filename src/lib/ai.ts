import { documentsData } from "@/data/documents";

export async function simulateAIResponse(
  query: string,
  contextDocumentId?: string
): Promise<string> {
  // Simulate network delay between 1s and 2.5s
  const delay = Math.floor(Math.random() * 1500) + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const lowerQuery = query.toLowerCase();

  // If there's a context document, perform RAG-like behavior
  if (contextDocumentId) {
    const doc = documentsData.find((d) => d.id === contextDocumentId);
    if (doc) {
      if (lowerQuery.includes("resum") || lowerQuery.includes("síntese") || lowerQuery.includes("sumariz")) {
        return `**Resumo do documento "${doc.titulo}":**\n\n${doc.descricao}\n\nEste documento possui ${doc.tempoLeitura} de leitura e foca nas categorias: ${doc.tags?.join(", ") || "nenhuma"}.`;
      }
      return `Analisando o contexto do documento "${doc.titulo}", vejo que seu foco é: "${doc.descricao}". Para perguntas mais específicas, lembre-se que minha leitura atual considera as palavras-chave: ${doc.keywords?.join(", ") || "nenhuma"}.`;
    }
  }

  // Fallback keyword-based responses
  if (lowerQuery.includes("venda") || lowerQuery.includes("comercial") || lowerQuery.includes("crm")) {
    return "Em nosso contexto comercial, recomendo verificar o playbook de vendas em seus documentos. Ele contém roteiros e processos sobre a abordagem a leads.";
  }

  if (lowerQuery.includes("projeto") || lowerQuery.includes("entreg")) {
    return "Os projetos operacionais são acompanhados através da matriz de status e saúde. Verifique o módulo de Projetos e Tarefas para alinhamento de prazos.";
  }

  if (lowerQuery.includes("bom dia") || lowerQuery.includes("olá") || lowerQuery.includes("ola")) {
    return "Olá! Sou o Assistente IA do NEW OS. Como posso ajudar com seus documentos, projetos ou dados de equipe hoje?";
  }

  // Generic fallback
  return "Compreendo. Como um assistente simulado nesta versão, estou configurado para demonstrar capacidades limitadas. Em produção, eu me conectaria à API de Inteligência Artificial para responder com total compreensão do contexto do NEW OS.";
}
