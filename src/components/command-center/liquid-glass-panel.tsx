"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, MessageSquare, Terminal, Settings2, BarChart2, ShieldAlert } from "lucide-react";

interface LiquidGlassPanelProps {
  agentName: string;
  agentRole: string;
}

export function LiquidGlassPanel({ agentName, agentRole }: LiquidGlassPanelProps) {
  const [activeTab, setActiveTab] = useState<"report" | "chat" | "terminal">("report");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="absolute overflow-hidden rounded-xl pointer-events-auto"
      style={{
        width: "440px",
        height: "280px",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "-100px", // positions it cleanly underneath the visual nodes
        background: "rgba(3, 3, 5, 0.35)",
        backdropFilter: "blur(40px) saturate(140%)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.01)",
        zIndex: 50,
      }}
    >
      {/* Top accent light highlight */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#F97316]/30 to-[#8B5CF6]/30" />

      {/* Header section with Tabs */}
      <div className="px-4 py-3 border-b border-white/[0.04] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F97316]">
            {agentRole}
          </span>
          <h4 className="text-xs font-bold text-white/90">{agentName} Pipeline</h4>
        </div>

        {/* Tab buttons */}
        <div className="flex gap-1.5 bg-black/40 p-0.5 rounded-lg border border-white/[0.03]">
          <button
            onClick={() => setActiveTab("report")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === "report" ? "bg-white/5 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            <FileText className="w-2.5 h-2.5" />
            REPORT
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === "chat" ? "bg-white/5 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            <MessageSquare className="w-2.5 h-2.5" />
            CHAT
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === "terminal" ? "bg-white/5 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            <Terminal className="w-2.5 h-2.5" />
            LIVE
          </button>
        </div>
      </div>

      {/* Content panel */}
      <div className="p-4 h-[208px] overflow-y-auto font-mono text-[10px] leading-relaxed text-white/60">
        {activeTab === "report" && (
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-white/[0.03] pb-1.5">
              <span className="text-white/35">PIPELINE CODE:</span>
              <span className="text-[#8B5CF6] font-bold">OPS-109_RUNNING</span>
            </div>
            
            {/* Mocked operational report metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded bg-white/[0.01] border border-white/[0.03]">
                <div className="flex items-center gap-1.5 mb-1 text-white/30 text-[9px]">
                  <BarChart2 className="w-3 h-3 text-[#F97316]/70" />
                  INGESTED_ROWS
                </div>
                <div className="text-xs font-black text-white/80">35,102 rows</div>
              </div>
              <div className="p-2 rounded bg-white/[0.01] border border-white/[0.03]">
                <div className="flex items-center gap-1.5 mb-1 text-white/30 text-[9px]">
                  <Settings2 className="w-3 h-3 text-cyan-400/70" />
                  LATENCY
                </div>
                <div className="text-xs font-black text-white/80">42ms avg</div>
              </div>
            </div>

            <div className="p-2 rounded border border-[#22C55E]/10 bg-[#22C55E]/5 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-1.5 animate-pulse" />
              <div>
                <span className="text-[9px] font-bold text-[#22C55E] uppercase block">Operations OK</span>
                <span className="text-[9px] text-white/40 leading-tight block">All actors successfully queried in the Supabase instance.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="space-y-3">
            <div className="flex flex-col gap-1 items-start">
              <span className="text-[8px] text-white/20">USER [Voice Command]</span>
              <p className="px-2.5 py-1.5 rounded-lg bg-white/5 text-white/85 text-[10px] max-w-[85%]">
                "COO, puxe o relatório de operações atualizado da sprint 19."
              </p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[8px] text-[#F97316]/60">COO_AGENT [Operational]</span>
              <p className="px-2.5 py-1.5 rounded-lg bg-[#F97316]/10 border border-[#F97316]/15 text-[#fdba74] text-[10px] max-w-[85%]">
                "Entendido. Puxando base ingestions do banco Supabase... Relatório de 35,102 linhas compilado."
              </p>
            </div>
          </div>
        )}

        {activeTab === "terminal" && (
          <div className="space-y-1 text-[9px] text-white/40">
            <div><span className="text-white/20">[13:41:02]</span> <span className="text-cyan-400">INIT</span> connection to supabase-db-engine</div>
            <div><span className="text-white/20">[13:41:03]</span> <span className="text-yellow-400">WARN</span> query took 32ms (limit: 50ms)</div>
            <div><span className="text-white/20">[13:41:05]</span> <span className="text-[#8B5CF6]">EXEC</span> parse_actors_manifest.js</div>
            <div><span className="text-white/20">[13:41:07]</span> <span className="text-[#22C55E]">DONE</span> 35k rows synchronized to local storage</div>
            <div><span className="text-white/20">[13:41:08]</span> <span className="text-white/30">INFO</span> pipeline idle state reached.</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
