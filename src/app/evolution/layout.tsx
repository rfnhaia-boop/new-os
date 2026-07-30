import { ReactNode } from "react";
import { EvolutionShell } from "@/components/evolution/layout/evolution-shell";

export default function EvolutionLayout({ children }: { children: ReactNode }) {
  return <EvolutionShell>{children}</EvolutionShell>;
}
