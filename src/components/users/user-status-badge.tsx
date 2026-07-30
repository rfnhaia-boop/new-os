import { UserStatus } from "@/data/types";
import { getStatusLabel } from "@/lib/permissions";

interface UserStatusBadgeProps {
  status: UserStatus;
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const styles: Record<UserStatus, string> = {
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    invited: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    inactive: "bg-[#1A1A1A] text-[#A1A1AA] border-[#27272A]",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${styles[status]}`}>
      {getStatusLabel(status)}
    </span>
  );
}
