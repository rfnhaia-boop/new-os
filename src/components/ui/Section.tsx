import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, children, className = "" }: SectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
      {children}
    </div>
  );
}
