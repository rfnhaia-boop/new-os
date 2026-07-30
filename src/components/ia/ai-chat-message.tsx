import { ChatMessage } from "@/data/types";
import { Sparkles, User } from "lucide-react";

interface AIChatMessageProps {
  message: ChatMessage;
}

export function AIChatMessage({ message }: AIChatMessageProps) {
  const isAI = message.role === "assistant";

  return (
    <div className={`flex gap-4 p-5 ${isAI ? "bg-[#111111]/40 border-y border-[#27272A]/50" : ""}`}>
      {/* Avatar */}
      <div className="shrink-0 mt-0.5">
        {isAI ? (
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-[#27272A] flex items-center justify-center">
            <User className="w-4 h-4 text-zinc-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#A1A1AA]">
            {isAI ? "NEW OS AI" : "Você"}
          </span>
          <span className="text-[9px] text-[#A1A1AA]/50">{message.timestamp}</span>
        </div>
        
        <div className="text-xs text-white leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
}
