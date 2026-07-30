interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <div className="w-full space-y-1">
      <div className="flex items-center justify-between text-[10px] text-[#A1A1AA]">
        <span>Progresso</span>
        <strong className="text-white">{clamped}%</strong>
      </div>
      <div className="w-full h-1.5 bg-[#1A1A1A] border border-[#27272A] rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
