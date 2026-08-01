"use client";

interface CommandBackgroundProps {
  bootPhase: number;
}

export function CommandBackground({ bootPhase }: CommandBackgroundProps) {
  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#030305]"
      style={{
        zIndex: 0,
        backgroundImage: "url('/newos_background.png?v=2')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
