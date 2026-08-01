"use client";

import { motion } from "framer-motion";
import { type AgentNode, AGENT_COLORS } from "@/data/agents";

interface ConnectionLinesProps {
  agents: AgentNode[];
  selectedAgentId: string | null;
  cx: number;
  cy: number;
  radius: number;
}

export function ConnectionLines({
  agents,
  selectedAgentId,
  cx,
  cy,
  radius,
}: ConnectionLinesProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 600 600"
      style={{ zIndex: 15 }}
    >
      <defs>
        {/* Sharp neon glow filters */}
        <filter id="line-glow-new" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="line-glow-next" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="line-glow-selected" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {agents.map((agent, i) => {
        // Calculate straight line coordinates
        const angle = (i * (360 / agents.length) - 90) * (Math.PI / 180);
        const tx = cx + radius * Math.cos(angle);
        const ty = cy + radius * Math.sin(angle);

        const color = AGENT_COLORS[agent.domain].primary;
        const isSelected = selectedAgentId === agent.id;
        const baseOpacity = isSelected ? 0.9 : selectedAgentId ? 0.08 : 0.25;
        const filterName = isSelected
          ? "url(#line-glow-selected)"
          : `url(#line-glow-${agent.domain})`;

        return (
          <g key={agent.id}>
            {/* Straight base line (Reference style: sharp, clean, no curve spaghetti) */}
            <line
              x1={cx}
              y1={cy}
              x2={tx}
              y2={ty}
              stroke={color}
              strokeWidth={isSelected ? "1.5" : "1"}
              strokeDasharray="4 6"
              opacity={baseOpacity}
              filter={filterName}
            />

            {/* Travel pulse circle 1 */}
            <circle r={isSelected ? "3" : "2"} fill={color} opacity={isSelected ? 1 : 0.6}>
              <animateMotion
                dur={isSelected ? "1.2s" : "2.2s"}
                repeatCount="indefinite"
                path={`M ${cx} ${cy} L ${tx} ${ty}`}
              />
            </circle>

            {/* Travel pulse circle 2 (Delayed feedback) */}
            <circle r="1.5" fill={color} opacity={isSelected ? 0.7 : 0.3}>
              <animateMotion
                dur={isSelected ? "1.6s" : "2.8s"}
                repeatCount="indefinite"
                path={`M ${tx} ${ty} L ${cx} ${cy}`}
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}
