import { ComponentType } from "react";
import { AppCard } from "./AppCard";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  valueColor?: string;
  icon: ComponentType<{ className?: string }>;
}

export function StatCard({ title, value, subtext = "Total disponível", valueColor = "text-white", icon: Icon }: StatCardProps) {
  return (
    <AppCard className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#A1A1AA]">{title}</span>
        <Icon className="w-5 h-5 text-[#A1A1AA]" />
      </div>
      <div className="mt-4">
        <span className={`text-3xl font-bold ${valueColor}`}>{value}</span>
        {subtext && <p className="mt-1 text-xs text-[#A1A1AA]">{subtext}</p>}
      </div>
    </AppCard>
  );
}
