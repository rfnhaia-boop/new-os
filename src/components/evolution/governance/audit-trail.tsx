import { AuditLog } from "@/data/evolution";
import { ActorBadge } from "../shared/actor-badge";
import { ShieldAlert } from "lucide-react";

interface AuditTrailProps {
  logs: AuditLog[];
}

export function AuditTrail({ logs }: AuditTrailProps) {
  if (!logs || logs.length === 0) return null;

  return (
    <div className="bg-[#111111] border border-[#27272A] rounded-xl overflow-hidden">
      <div className="p-4 border-b border-[#27272A] bg-[#1A1A1A] flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-zinc-400" />
        <h4 className="text-sm font-bold text-white">Trilha de Auditoria</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#27272A]">
              <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ação</th>
              <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ator</th>
              <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Detalhes</th>
              <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272A]">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-[#1A1A1A] transition-colors">
                <td className="p-4 text-sm font-medium text-white">{log.action}</td>
                <td className="p-4">
                  <ActorBadge actor={log.createdBy} />
                </td>
                <td className="p-4 text-sm text-zinc-400 max-w-xs truncate">{log.details}</td>
                <td className="p-4 text-xs text-zinc-500 whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
