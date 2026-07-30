interface VersionBadgeProps {
  version: string;
  size?: "small" | "default";
}

export function VersionBadge({ version, size = "default" }: VersionBadgeProps) {
  const padding = size === "small" ? "px-1.5 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs";

  return (
    <span className={`inline-flex items-center rounded bg-[#111111] border border-[#27272A] text-[#A1A1AA] font-mono font-medium ${padding}`}>
      {version}
    </span>
  );
}
