"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BootSequenceProps {
  bootPhase: number;
  hasBooted: boolean;
}

const BOOT_MESSAGES = [
  { phase: 1, text: "INITIALIZING SYSTEM KERNEL..." },
  { phase: 2, text: "LOADING NEURAL PATHWAYS..." },
  { phase: 3, text: "MAPPING AGENT GRID..." },
  { phase: 4, text: "ACTIVATING AMBIENT FIELD..." },
  { phase: 5, text: "CORE ONLINE" },
  { phase: 6, text: "ESTABLISHING CONNECTIONS..." },
  { phase: 7, text: "AGENTS SYNCHRONIZED" },
];

export function BootSequence({ bootPhase, hasBooted }: BootSequenceProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);

  // Find current message based on boot phase
  useEffect(() => {
    const msgIndex = BOOT_MESSAGES.findIndex((m) => m.phase === bootPhase);
    if (msgIndex !== -1 && msgIndex !== currentMessageIndex) {
      setCurrentMessageIndex(msgIndex);
      // Typing effect
      const fullText = BOOT_MESSAGES[msgIndex].text;
      let charIndex = 0;
      setDisplayedText("");
      const typeInterval = setInterval(() => {
        charIndex++;
        setDisplayedText(fullText.slice(0, charIndex));
        if (charIndex >= fullText.length) {
          clearInterval(typeInterval);
        }
      }, 25);
      return () => clearInterval(typeInterval);
    }
  }, [bootPhase, currentMessageIndex]);

  // Don't render anything if already booted
  if (hasBooted) return null;

  // Phase 8 = dissolve the boot overlay
  if (bootPhase >= 8) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 100 }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none flex items-end"
      style={{ zIndex: 100 }}
    >
      {/* Boot text console — bottom-left */}
      <div className="p-8 max-w-lg">
        {/* Previous messages (dimmed) */}
        {BOOT_MESSAGES.filter((m) => m.phase < bootPhase).map((msg, i) => (
          <motion.p
            key={msg.phase}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
            className="text-[11px] font-mono text-white/20 leading-relaxed"
          >
            <span className="text-[#8B5CF6]/30 mr-2">[{String(msg.phase).padStart(2, "0")}]</span>
            {msg.text}
          </motion.p>
        ))}

        {/* Current message (bright, typing) */}
        {currentMessageIndex >= 0 && (
          <motion.p
            key={`current-${bootPhase}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] font-mono leading-relaxed"
          >
            <span className="text-[#8B5CF6]/60 mr-2">
              [{String(bootPhase).padStart(2, "0")}]
            </span>
            <span
              style={{
                color:
                  bootPhase === 5
                    ? "#22C55E" // "CORE ONLINE" in green
                    : bootPhase === 7
                    ? "#F97316" // "AGENTS SYNCHRONIZED" in orange
                    : "rgba(255, 255, 255, 0.7)",
              }}
            >
              {displayedText}
            </span>
            {displayedText.length < (BOOT_MESSAGES[currentMessageIndex]?.text.length || 0) && (
              <span className="cc-type-cursor" />
            )}
          </motion.p>
        )}

        {/* Boot progress bar */}
        <div className="mt-4 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #F97316)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${(bootPhase / 8) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* "CORE ONLINE" flash effect at phase 5 */}
      {bootPhase === 5 && (
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)",
            zIndex: 99,
          }}
        />
      )}
    </div>
  );
}
