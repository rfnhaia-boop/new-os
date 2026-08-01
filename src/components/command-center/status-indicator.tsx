"use client";

import { type AgentStatus, AGENT_COLORS, type AgentDomain } from "@/data/agents";

interface StatusIndicatorProps {
  status: AgentStatus;
  domain: AgentDomain;
  size?: "sm" | "md";
}

const STATUS_COLORS: Record<AgentStatus, string> = {
  active: "#22C55E",
  processing: "#EAB308",
  idle: "#6B7280",
  offline: "#EF4444",
};

const STATUS_LABELS: Record<AgentStatus, string> = {
  active: "Online",
  processing: "Processando",
  idle: "Em espera",
  offline: "Offline",
};

export function StatusIndicator({ status, domain, size = "md" }: StatusIndicatorProps) {
  const color = STATUS_COLORS[status];
  const dotSize = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";
  const pingSize = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";
  const showPing = status === "active" || status === "processing";

  return (
    <div className="flex items-center gap-1.5">
      <span className="relative flex">
        <span
          className={`relative inline-flex rounded-full ${dotSize}`}
          style={{ backgroundColor: color }}
        />
        {showPing && (
          <span
            className={`absolute inline-flex rounded-full ${pingSize} opacity-75`}
            style={{
              backgroundColor: color,
              animation: "cc-status-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
        )}
      </span>
      {size === "md" && (
        <span
          className="text-[10px] font-mono uppercase tracking-widest"
          style={{ color }}
        >
          {STATUS_LABELS[status]}
        </span>
      )}
    </div>
  );
}
