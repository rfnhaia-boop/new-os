interface ReadingProgressProps {
  progress: number;
}

export function ReadingProgress({ progress }: ReadingProgressProps) {
  return (
    <div className="fixed top-14 left-64 right-0 h-1 bg-[#1A1A1A] z-50 overflow-hidden">
      <div 
        className="h-full bg-indigo-500 transition-all duration-150 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
      />
    </div>
  );
}
