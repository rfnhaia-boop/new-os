import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`space-y-8 max-w-7xl w-full mx-auto ${className}`}>
      {children}
    </div>
  );
}
