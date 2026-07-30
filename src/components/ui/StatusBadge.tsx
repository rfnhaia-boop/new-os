interface StatusBadgeProps {
  status: string;
  pulse?: boolean;
}

export function StatusBadge({ status, pulse = true }: StatusBadgeProps) {
  const isGreen = status.toLowerCase() === "validado";
  const badgeColor = isGreen
    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
    : "bg-amber-500/10 border-amber-500/20 text-amber-400";
  const dotColor = isGreen ? "bg-emerald-400" : "bg-amber-400";

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${pulse ? "animate-pulse" : ""}`} />
      {status}
    </span>
  );
}
