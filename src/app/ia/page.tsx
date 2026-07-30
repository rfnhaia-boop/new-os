"use client";

import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { AIChatClient } from "@/components/ia/ai-chat-client";

export default function IAPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Assistente de Inteligência Artificial"
        subtitle="Consulte processos, analise documentos e obtenha insights contextuais com a IA integrada."
      />
      
      {/* The chat interface will take the remaining height */}
      <div className="h-[calc(100vh-140px)] min-h-[500px]">
        <AIChatClient />
      </div>
    </PageContainer>
  );
}
