import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { FavoriteButton } from "./favorite-button";
import { VersionBadge } from "./version-badge";

interface DocumentCardProps {
  title: string;
  category: string;
  currentVersion: string;
  status: string;
  updatedAt: string;
  href: string;
  slug: string;
  tags?: string[];
}

export function DocumentCard({
  title,
  category,
  currentVersion,
  status,
  updatedAt,
  href,
  slug,
  tags = [],
}: DocumentCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-[#111111] border border-[#27272A] rounded-xl hover:border-neutral-500 transition-all cursor-pointer gap-4"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="p-2.5 rounded-lg bg-[#0A0A0A] border border-[#27272A] text-[#A1A1AA] group-hover:text-white transition-colors shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors truncate">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#0A0A0A] border border-[#27272A] text-[#A1A1AA]">
              {category}
            </span>
            
            <VersionBadge version={currentVersion} size="small" />

            {/* Tags list */}
            {tags.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-[#0A0A0A] text-[#A1A1AA] border border-[#27272A]"
                  >
                    #{tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="text-[9px] text-[#A1A1AA] font-semibold shrink-0">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-[#27272A] sm:border-t-0 pt-3 sm:pt-0 shrink-0">
        <div className="flex items-center gap-6">
          <StatusBadge status={status} />

          {/* Date */}
          <span className="text-xs text-[#A1A1AA]">
            {updatedAt}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <FavoriteButton documentSlug={slug} />
          <div className="text-[#A1A1AA] group-hover:text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
