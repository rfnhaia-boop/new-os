import { Link as LinkIcon, ExternalLink } from "lucide-react";
import Link from "next/link";

interface RelatedLink {
  title: string;
  url: string;
}

interface RelatedDocumentsProps {
  title: string;
  links: RelatedLink[];
}

export function RelatedDocuments({ title, links }: RelatedDocumentsProps) {
  return (
    <div className="my-8 bg-[#111111] border border-[#27272A] rounded-xl p-6">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
        <LinkIcon className="w-4 h-4 text-[#A1A1AA]" />
        {title}
      </h3>
      <div className="space-y-2">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.url}
            className="flex items-center justify-between p-3 rounded-lg bg-[#0A0A0A] border border-[#27272A] hover:border-indigo-500/50 hover:bg-[#1A1A1A] transition-colors group"
          >
            <span className="text-sm text-zinc-300 font-medium group-hover:text-white">{link.title}</span>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
