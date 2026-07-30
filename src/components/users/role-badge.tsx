import { UserRole } from "@/data/types";
import { getRoleLabel } from "@/lib/permissions";

interface RoleBadgeProps {
  role: UserRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const styles: Record<UserRole, string> = {
    admin: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    manager: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    member: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    viewer: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${styles[role]}`}>
      {getRoleLabel(role)}
    </span>
  );
}
