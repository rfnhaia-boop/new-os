import { QuoteIcon } from "lucide-react";

interface QuoteProps {
  content: string;
  author?: string;
}

export function Quote({ content, author }: QuoteProps) {
  return (
    <div className="my-8 relative bg-[#111111] border border-[#27272A] rounded-2xl p-8 overflow-hidden">
      <QuoteIcon className="absolute -top-4 -left-4 w-24 h-24 text-[#27272A]/50 rotate-180" />
      <div className="relative z-10">
        <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">&quot;{content}&quot;</p>
        {author && (
          <div className="mt-4 flex items-center gap-2">
            <div className="w-6 h-[1px] bg-indigo-500" />
            <span className="text-sm text-indigo-400 font-semibold uppercase tracking-wider">{author}</span>
          </div>
        )}
      </div>
    </div>
  );
}
