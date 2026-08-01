"use client";

import { useEffect, useState, useRef } from "react";
import { Folder, FileText, Database, ShieldAlert, Cpu, Terminal as TermIcon } from "lucide-react";

// ============================================================================
// Left Sidebar Console: System Directory & Telemetry (Padrão Rafael V3)
// ============================================================================
export function LeftConsole({ bootPhase }: { bootPhase: number }) {
  if (bootPhase < 8) return null;

  return (
    <div
      className="fixed left-6 top-24 bottom-6 w-72 flex flex-col pointer-events-auto rounded-lg overflow-hidden"
      style={{
        zIndex: 40,
        background: "rgba(3, 3, 5, 0.6)",
        backdropFilter: "blur(40px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.65), inset 0 0 30px rgba(255,255,255,0.01)",
      }}
    >
      {/* Header border stripe */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#8B5CF6] via-cyan-500 to-[#F97316] opacity-70" />

      <div className="p-4 flex-1 flex flex-col overflow-hidden">
        {/* Section Title */}
        <div className="flex items-center gap-2 mb-5">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
          <h4 className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-white/90">
            SYS_CONTEXT // DIRECTORY
          </h4>
        </div>

        {/* Database Tables */}
        <div className="space-y-1 mb-5">
          <div className="text-[8px] font-mono uppercase text-white/30 tracking-[0.2em] mb-1.5 px-1">Supabase Tables</div>
          {[
            { name: "actors", count: 6, size: "1.2 KB" },
            { name: "operational_ingestions", count: 24, size: "48 KB" },
            { name: "memory_entries", count: 184, size: "212 KB" },
            { name: "improvement_proposals", count: 12, size: "32 KB" },
            { name: "approval_flows", count: 8, size: "14 KB" },
          ].map((table) => (
            <div
              key={table.name}
              className="flex items-center justify-between px-2.5 py-1.5 rounded bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 border border-white/[0.02] hover:border-[#8B5CF6]/30 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Folder className="w-3 h-3 text-[#8B5CF6]/65 group-hover:text-cyan-400 transition-colors" />
                <span className="text-[9px] font-mono text-white/70 tracking-wider group-hover:text-white transition-colors">{table.name}</span>
              </div>
              <div className="flex items-center gap-3 text-[8px] font-mono text-white/35">
                <span>{table.count} rows</span>
                <span>{table.size}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Local Files / Knowledge Vault */}
        <div className="space-y-1 flex-1 overflow-y-auto min-h-0 pr-1">
          <div className="text-[8px] font-mono uppercase text-white/30 tracking-[0.2em] mb-1.5 px-1">Knowledge Graph Docs</div>
          {[
            "PLANO_AGENTIC_OS.md",
            "ROADMAP.md",
            "AGENTS.md",
            "handoff_malta_08_01.md",
            "nex-design-language.json",
          ].map((file) => (
            <div
              key={file}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-white/[0.02] transition-all duration-300 border border-transparent hover:border-white/[0.03] hover:scale-[1.01] group cursor-pointer"
            >
              <FileText className="w-3 h-3 text-[#F97316]/60 group-hover:text-cyan-400 transition-colors" />
              <span className="text-[9px] font-mono text-white/50 tracking-wider truncate group-hover:text-white/80 transition-colors">{file}</span>
            </div>
          ))}
        </div>

        {/* Bottom Engine Specs widget */}
        <div className="mt-4 pt-4 border-t border-white/[0.04] space-y-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-white/50">ENGINE_STATUS</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[8px] font-mono uppercase text-white/50">
            <div className="bg-white/[0.01] p-2 border border-white/[0.03] rounded">
              <span className="text-white/20 block mb-0.5 tracking-wider">MODEL_CHAIN</span>
              <span className="text-cyan-400 font-black tracking-widest">CLAUDE_3_5</span>
            </div>
            <div className="bg-white/[0.01] p-2 border border-white/[0.03] rounded">
              <span className="text-white/20 block mb-0.5 tracking-wider">AGENTS</span>
              <span className="text-[#22C55E] font-black tracking-widest">06 // 06</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Bottom Log Console: Journey logs (frequently updating terminal stream)
// ============================================================================
interface LogEntry {
  timestamp: string;
  agent: string;
  action: string;
  id: number;
}

const SAMPLE_LOGS = [
  { agent: "CEO", action: "Analyzing intake of sureflow documentation stack" },
  { agent: "COO", action: "Scheduling delivery sprint backlog tasks for NEX" },
  { agent: "CRO", action: "Drafting corporate commercial proposal for new lead" },
  { agent: "CDO", action: "Compiling business impact analytics from actors matrix" },
  { agent: "HoR", action: "Indexing operational pattern checklist inside obsidian vault" },
  { agent: "CEO", action: "Routing high priority suggestion to governance queue" },
  { agent: "COO", action: "Pruning completed sprint deliverables in PostgreSQL db" },
  { agent: "CRO", action: "Executing client contract status transition triggers" },
  { agent: "CMO", action: "Analyzing marketing metrics loop in local memory" },
  { agent: "CDO", action: "Calculating cost projection changes on Supabase layer" },
];

export function BottomTerminal({ bootPhase }: { bootPhase: number }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logCounterRef = useRef(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Initialize and append logs continuously
  useEffect(() => {
    if (bootPhase < 8) return;

    // Set initial 3 logs
    const initialLogs = Array.from({ length: 3 }).map((_, i) => {
      const sample = SAMPLE_LOGS[i];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds() - (3 - i) * 2).padStart(2, "0")}`;
      logCounterRef.current++;
      return {
        timestamp: timeStr,
        agent: sample.agent,
        action: sample.action,
        id: logCounterRef.current,
      };
    });
    setLogs(initialLogs);

    // Continuous loop
    const logInterval = setInterval(() => {
      const sample = SAMPLE_LOGS[Math.floor(Math.random() * SAMPLE_LOGS.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

      logCounterRef.current++;
      const newLog = {
        timestamp: timeStr,
        agent: sample.agent,
        action: sample.action,
        id: logCounterRef.current,
      };

      setLogs((prev) => {
        // Keep maximum of 15 logs
        const cut = prev.length > 15 ? prev.slice(prev.length - 15) : prev;
        return [...cut, newLog];
      });
    }, 1800);

    return () => clearInterval(logInterval);
  }, [bootPhase]);

  // Scroll to bottom when logs update
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  if (bootPhase < 8) return null;

  return (
    <div
      className="fixed bottom-6 left-[310px] right-[360px] h-52 flex flex-col pointer-events-auto rounded-lg overflow-hidden"
      style={{
        zIndex: 40,
        background: "rgba(3, 3, 5, 0.6)",
        backdropFilter: "blur(40px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.65), inset 0 0 30px rgba(255,255,255,0.01)",
      }}
    >
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#F97316] via-cyan-500 to-[#8B5CF6] opacity-70" />


      {/* Title Header */}
      <div className="px-4 py-2 border-b border-white/[0.04] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TermIcon className="w-3.5 h-3.5 text-cyan-400" />
          <h4 className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-white/90">
            JOURNEY_LOG // ACTIVE_PIPELINES
          </h4>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" style={{ boxShadow: "0 0 8px #22C55E" }} />
          <span className="text-[8px] font-mono uppercase text-white/40 tracking-[0.2em] font-bold">LIVE FEED</span>
        </div>
      </div>

      {/* Terminal logs list */}
      <div className="flex-1 p-4 font-mono text-[9px] overflow-y-auto space-y-1.5 scrollbar-thin">
        {logs.map((log) => {
          const isViolet = log.agent === "CEO" || log.agent === "COO" || log.agent === "HoR";
          const colorClass = isViolet ? "text-[#8B5CF6]" : "text-[#F97316]";
          return (
            <div key={log.id} className="flex items-start gap-3 hover:bg-white/[0.02] px-2 py-0.5 rounded transition-colors duration-150">
              <span className="text-white/20 select-none">[{log.timestamp}]</span>
              <span className={`font-black select-none ${colorClass}`} style={{ minWidth: "30px" }}>
                {log.agent}
              </span>
              <span className="text-white/10 select-none">❯</span>
              <span className="text-white/70 tracking-wide leading-relaxed truncate flex-1">{log.action}</span>
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}

