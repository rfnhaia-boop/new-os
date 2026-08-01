"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Briefcase,
  TrendingUp,
  Megaphone,
  BookOpen,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { type AgentNode as AgentDataType, AGENT_COLORS } from "@/data/agents";
import { StatusIndicator } from "./status-indicator";

const ICON_MAP: Record<string, LucideIcon> = {
  Brain,
  Briefcase,
  TrendingUp,
  Megaphone,
  BookOpen,
  BarChart3,
};

interface AgentNodeProps {
  agent: AgentDataType;
  x: number;
  y: number;
  index: number;
  isSelected: boolean;
  dimmed: boolean;
  onClick: () => void;
}

export function AgentNode({
  agent,
  x,
  y,
  index,
  isSelected,
  dimmed,
  onClick,
}: AgentNodeProps) {
  const Icon = ICON_MAP[agent.iconName] || Brain;
  const colors = AGENT_COLORS[agent.domain];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: dimmed ? 0.25 : 1,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: index * 0.08,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="absolute cursor-pointer group"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
        zIndex: isSelected ? 35 : 30,
      }}
    >
      {/* Outer glow ring on hover/select */}
      <div
        className="absolute rounded-full transition-all duration-500"
        style={{
          width: "80px",
          height: "80px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: isSelected
            ? `radial-gradient(circle, ${colors.bg} 30%, transparent 70%)`
            : "transparent",
          boxShadow: isSelected
            ? `0 0 35px ${colors.glow}, 0 0 70px ${colors.ring}`
            : "none",
          opacity: isSelected ? 1 : 0,
        }}
      />

      {/* Rotating HUD Bracket Ring (Sharp, clean sci-fi) */}
      {!dimmed && (
        <svg
          viewBox="0 0 100 100"
          className="absolute cc-hud-rotate"
          style={{
            width: "74px",
            height: "74px",
            left: "50%",
            top: "50%",
            marginLeft: "-37px",
            marginTop: "-37px",
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={colors.primary}
            strokeWidth="0.8"
            strokeDasharray="25 75"
            opacity={isSelected ? 0.75 : 0.2}
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={colors.primary}
            strokeWidth="0.4"
            strokeDasharray="2 30"
            opacity={isSelected ? 0.5 : 0.1}
          />
        </svg>
      )}

      {/* Main node circle */}
      <div
        className="relative flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          width: "56px",
          height: "56px",
          background: isSelected
            ? `linear-gradient(135deg, ${colors.bg}, rgba(5, 5, 8, 0.95))`
            : "rgba(4, 4, 6, 0.8)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${isSelected ? `${colors.primary}50` : colors.border}`,
          boxShadow: isSelected
            ? `0 0 25px ${colors.glow}, inset 0 0 15px ${colors.ring}`
            : `0 0 15px rgba(0,0,0,0.5)`,
        }}
      >
        <Icon
          className="transition-all duration-300"
          style={{
            width: "22px",
            height: "22px",
            color: isSelected ? colors.primary : `${colors.primary}85`,
            filter: isSelected ? `drop-shadow(0 0 6px ${colors.glow})` : "none",
          }}
        />
      </div>

      {/* Labels below */}
      <div className="text-center mt-3 pointer-events-none whitespace-nowrap">
        <p
          className="text-[10px] font-mono font-black uppercase tracking-[0.2em] transition-colors duration-300"
          style={{
            color: isSelected ? colors.primary : "rgba(255,255,255,0.8)",
            textShadow: isSelected ? `0 0 10px ${colors.glow}` : "none",
          }}
        >
          {agent.role}
        </p>
        <p
          className="text-[8px] font-mono uppercase tracking-wider mt-0.5 transition-colors duration-300"
          style={{
            color: isSelected ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
          }}
        >
          {agent.title}
        </p>

        {/* Status indicator */}
        <div className="flex justify-center mt-1">
          <StatusIndicator status={agent.status} domain={agent.domain} size="sm" />
        </div>
      </div>

      {/* Hover tooltip — current task */}
      {agent.currentTask && !isSelected && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3.5 
                     opacity-0 group-hover:opacity-100 transition-all duration-300
                     pointer-events-none whitespace-nowrap"
          style={{ zIndex: 50 }}
        >
          <div
            className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider"
            style={{
              background: "rgba(3, 3, 5, 0.95)",
              backdropFilter: "blur(25px)",
              border: `1px solid ${colors.border}`,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {agent.currentTask}
          </div>
        </div>
      )}
    </motion.div>
  );
}
