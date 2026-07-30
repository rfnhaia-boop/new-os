interface ChapterHeaderProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export function ChapterHeader({ title, subtitle, id }: ChapterHeaderProps) {
  return (
    <div id={id} className="pt-16 pb-6 mt-8 border-b border-[#27272A] scroll-mt-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h1>
      {subtitle && <p className="text-[#A1A1AA] mt-3 text-lg">{subtitle}</p>}
    </div>
  );
}
