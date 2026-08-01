"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X, ExternalLink, Activity, Clock, Zap, Cpu, Server, Layers, Settings } from "lucide-react";
import { type AgentNode, AGENT_COLORS } from "@/data/agents";
import { StatusIndicator } from "./status-indicator";

interface RightInspectorProps {
  agent: AgentNode | null;
  onClose: () => void;
}

export function RightInspector({ agent, onClose }: RightInspectorProps) {
  // Color configuration: default to cyan for system details, agent domain color for selected agent
  const colors = agent
    ? AGENT_COLORS[agent.domain]
    : {
        primary: "#06B6D4", // cyan
        glow: "rgba(6, 182, 212, 0.25)",
        ring: "rgba(6, 182, 212, 0.15)",
        bg: "rgba(6, 182, 212, 0.05)",
        border: "rgba(255, 255, 255, 0.06)",
      };

  return (
    <div
      className="w-80 flex flex-col pointer-events-auto h-full"
      style={{
        background: "rgba(3, 3, 5, 0.6)",
        backdropFilter: "blur(40px)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Top accent line */}
      <div
        className="h-[2px] w-full transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
        }}
      />

      <div className="p-5 flex-1 flex flex-col overflow-y-auto">
        {agent ? (
          /* ==================================================================
             MODE A: SELECTED AGENT INSPECTION
             ================================================================== */
          <div className="flex-1 flex flex-col">
            {/* Header Row */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                {/* Role badge */}
                <div
                  className="flex items-center justify-center rounded-lg font-black text-sm tracking-wider"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    color: colors.primary,
                  }}
                >
                  {agent.role}
                </div>

                <div>
                  <h3 className="text-sm font-bold tracking-wide text-white/95">
                    {agent.title}
                  </h3>
                  <div className="mt-1 flex items-center">
                    <StatusIndicator status={agent.status} domain={agent.domain} size="md" />
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1 rounded-lg transition-colors hover:bg-white/5 cursor-pointer"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-[11px] leading-relaxed mb-5 text-white/50">
              {agent.description}
            </p>

            {/* Current Task */}
            {agent.currentTask && (
              <div
                className="mb-5 px-4 py-3 rounded border"
                style={{
                  background: `${colors.bg}`,
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-3 h-3" style={{ color: colors.primary }} />
                  <span
                    className="text-[9px] font-mono uppercase tracking-widest"
                    style={{ color: `${colors.primary}99` }}
                  >
                    ACTIVE_TASK
                  </span>
                </div>
                <p className="text-xs font-medium text-white/80">
                  {agent.currentTask}
                </p>
              </div>
            )}

            {/* Telemetry Logs */}
            <div className="space-y-2 mb-5">
              <div className="text-[8px] font-mono uppercase text-white/30 tracking-wider">Telemetry Logs</div>
              
              <div className="flex items-center justify-between px-3 py-2 rounded border bg-white/[0.01] border-white/[0.03]">
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-[#F97316]/70" />
                  <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">Tasks Done</span>
                </div>
                <span className="text-xs font-black font-mono text-white/80">
                  {agent.metrics.tasksCompleted.toLocaleString("pt-BR")}
                </span>
              </div>

              <div className="flex items-center justify-between px-3 py-2 rounded border bg-white/[0.01] border-white/[0.03]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-[#22C55E]/70" />
                  <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">Uptime</span>
                </div>
                <span className="text-xs font-black font-mono text-white/80">
                  {agent.metrics.uptime}
                </span>
              </div>

              <div className="px-3 py-2.5 rounded border bg-white/[0.01] border-white/[0.03]">
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/35 block mb-1">Last Pipeline Step</span>
                <p className="text-[10px] font-mono text-white/60 leading-relaxed">
                  {agent.metrics.lastAction}
                </p>
              </div>
            </div>

            {/* Connected Modules */}
            {agent.connectedModules.length > 0 && (
              <div className="mt-auto">
                <p className="text-[8px] font-mono uppercase tracking-widest mb-2 text-white/25">
                  Connected Routes
                </p>
                <div className="space-y-1.5">
                  {agent.connectedModules.map((mod) => (
                    <Link
                      key={mod.href}
                      href={mod.href}
                      className="flex items-center justify-between px-3 py-2 rounded border transition-colors hover:bg-white/[0.02]"
                      style={{
                        borderColor: colors.border,
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "10px",
                      }}
                    >
                      <span className="font-mono tracking-wide">{mod.name}</span>
                      <ExternalLink className="w-3 h-3" style={{ color: colors.primary }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {agent.connectedModules.length === 0 && (
              <div className="text-center py-4 rounded border border-dashed mt-auto border-white/[0.08] bg-white/[0.01]">
                <p className="text-[9px] font-mono uppercase tracking-widest text-white/20">
                  Module Pending Integration
                </p>
              </div>
            )}
          </div>
        ) : (
          /* ==================================================================
             MODE B: DEFAULT SYSTEM METRICS INSPECTION
             ================================================================== */
          <div className="flex-1 flex flex-col">
            {/* Header Row */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center rounded-lg bg-white/[0.02] border border-white/[0.08]" style={{ width: "42px", height: "42px" }}>
                <Settings className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wide text-white/90">
                  SYSTEM_INSPECTOR
                </h3>
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/30">
                  GLOBAL PARAMETERS
                </span>
              </div>
            </div>

            {/* System Status Table */}
            <div className="space-y-2 mb-6">
              <div className="text-[8px] font-mono uppercase text-white/30 tracking-wider">System Specifications</div>
              
              <div className="flex items-center justify-between px-3 py-2 rounded border bg-white/[0.01] border-white/[0.03]">
                <div className="flex items-center gap-2">
                  <Server className="w-3 h-3 text-cyan-400/70" />
                  <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">Database Host</span>
                </div>
                <span className="text-[10px] font-mono text-white/80">Supabase (PG)</span>
              </div>

              <div className="flex items-center justify-between px-3 py-2 rounded border bg-white/[0.01] border-white/[0.03]">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3 h-3 text-cyan-400/70" />
                  <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">Model Chain</span>
                </div>
                <span className="text-[10px] font-mono text-white/80">Claude 3.5 Sonnet</span>
              </div>

              <div className="flex items-center justify-between px-3 py-2 rounded border bg-white/[0.01] border-white/[0.03]">
                <div className="flex items-center gap-2">
                  <Layers className="w-3 h-3 text-cyan-400/70" />
                  <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">Memory Pool</span>
                </div>
                <span className="text-[10px] font-mono text-white/80">512MB / 2GB</span>
              </div>
            </div>

            {/* Active Processes list */}
            <div className="space-y-2 flex-1">
              <div className="text-[8px] font-mono uppercase text-white/30 tracking-wider">Active Curation Pipes</div>
              <div className="space-y-1.5 font-mono text-[9px]">
                {[
                  { name: "Curation Pipeline", status: "Active", code: "CUR-014" },
                  { name: "Approval Loop Trigger", status: "Idle", code: "APP-08" },
                  { name: "CDO Business Impact", status: "Active", code: "CDO-03" },
                ].map((pipe) => (
                  <div key={pipe.name} className="px-3 py-2 rounded border border-white/[0.03] bg-white/[0.01] flex items-center justify-between">
                    <div>
                      <span className="text-white/60 block">{pipe.name}</span>
                      <span className="text-white/20 text-[8px]">{pipe.code}</span>
                    </div>
                    <span className={`text-[8px] font-bold uppercase tracking-wider ${pipe.status === "Active" ? "text-cyan-400" : "text-white/30"}`}>
                      {pipe.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer warning */}
            <div className="mt-auto p-3 rounded bg-white/[0.01] border border-white/[0.03] flex items-start gap-2.5">
              <Activity className="w-3.5 h-3.5 text-[#22C55E] mt-0.5" />
              <div className="text-[9px] font-mono leading-relaxed text-white/40">
                System operating within nominal parameters. Telemetry index running in background.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
