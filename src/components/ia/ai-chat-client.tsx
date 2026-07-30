"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, RefreshCcw } from "lucide-react";
import { ChatMessage } from "@/data/types";
import { simulateAIResponse } from "@/lib/ai";
import { AIChatMessage } from "./ai-chat-message";
import { AIContextSelector } from "./ai-context-selector";

export function AIChatClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_init",
      role: "assistant",
      content: "Olá! Sou o assistente de inteligência artificial do NEW OS. Como posso te ajudar com nossos processos, projetos ou documentos hoje?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [contextDocumentId, setContextDocumentId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      contextDocumentId: contextDocumentId || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const responseContent = await simulateAIResponse(userMsg.content, contextDocumentId || undefined);
      
      const aiMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        role: "assistant",
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: `msg_err_${Date.now()}`,
        role: "assistant",
        content: "Ocorreu um erro ao processar sua mensagem. Tente novamente.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `msg_init_${Date.now()}`,
        role: "assistant",
        content: "Chat reiniciado. O que você gostaria de explorar agora?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] border border-[#27272A] rounded-xl overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#27272A] bg-[#111111]/80 backdrop-blur-sm z-10">
        <div>
          <h2 className="text-sm font-semibold text-white">Assistente NEW OS</h2>
          <p className="text-[10px] text-[#A1A1AA]">Sessão de Inteligência Artificial Local (Simulada)</p>
        </div>
        <button
          onClick={clearChat}
          className="p-2 text-[#A1A1AA] hover:text-white rounded-lg hover:bg-[#1A1A1A] transition-colors"
          title="Reiniciar conversa"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent">
        <div className="pb-4">
          {messages.map((msg) => (
            <AIChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && (
            <div className="flex gap-4 p-5 bg-[#111111]/40 border-y border-[#27272A]/50">
              <div className="shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                </div>
              </div>
              <div className="flex-1 flex items-center">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#111111] border-t border-[#27272A]">
        <AIContextSelector
          selectedDocumentId={contextDocumentId}
          onSelect={setContextDocumentId}
        />
        
        <div className="relative flex items-end gap-2 bg-[#0A0A0A] border border-[#27272A] rounded-xl p-2 focus-within:border-indigo-500/50 transition-colors">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Faça uma pergunta sobre a empresa, clientes ou documentos..."
            className="flex-1 max-h-32 min-h-[40px] bg-transparent text-xs text-white resize-none outline-none py-2 px-2 scrollbar-none"
            rows={1}
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="p-2 shrink-0 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-[9px] text-[#A1A1AA] text-center mt-2">
          A IA do NEW OS pode cometer erros. Verifique informações importantes.
        </div>
      </div>
    </div>
  );
}
