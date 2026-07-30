import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { RoleBadge } from "./role-badge";
import { UserStatusBadge } from "./user-status-badge";
import { SystemUser } from "@/data/types";

interface UserCardProps {
  user: SystemUser;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-[#111111] border border-[#27272A] rounded-xl hover:border-neutral-500 transition-all gap-4">
      {/* User Info Profile */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <UserAvatar name={user.name} avatarUrl={user.avatar} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors truncate">
              {user.name}
            </h3>
            <RoleBadge role={user.role} />
            <UserStatusBadge status={user.status} />
          </div>
          <p className="text-xs text-[#A1A1AA] truncate mt-0.5">{user.email}</p>
          
          <div className="flex items-center gap-2 mt-1.5 flex-wrap text-[11px] text-[#A1A1AA]">
            <span>{user.jobTitle}</span>
            <span className="w-1 h-1 rounded-full bg-[#27272A]" />
            <span>{user.department}</span>
          </div>
        </div>
      </div>

      {/* Action / Meta section */}
      <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-[#27272A] sm:border-t-0 pt-3 sm:pt-0 shrink-0">
        <div className="flex flex-col items-start sm:items-end text-[10px] text-[#A1A1AA]">
          <span>Atividade</span>
          <strong className="text-white mt-0.5">{user.lastActiveAt || "Não registrado"}</strong>
        </div>

        <Link
          href={`/users/${user.id}`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white hover:text-black bg-transparent hover:bg-white border border-[#27272A] hover:border-white rounded-lg transition-colors cursor-pointer"
        >
          <span>Acessar</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
