import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Central de Comando — NEW OS",
  description:
    "Hub orbital de comando dos agentes de IA do sistema NEW OS. Visualização em tempo real das conexões, status e operações dos 6 agentes de domínio.",
};

export default function CommandCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
