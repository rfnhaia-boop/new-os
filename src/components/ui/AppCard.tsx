import { ReactNode } from "react";

interface AppCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export function AppCard({ children, className = "", hoverable = false, onClick }: AppCardProps) {
  const hoverStyles = hoverable
    ? "hover:border-neutral-500 transition-colors cursor-pointer"
    : "";

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-[#27272A] bg-[#111111] p-6 shadow-sm ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
