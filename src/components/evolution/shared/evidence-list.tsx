import { Evidence } from "@/data/evolution";
import { ShieldCheck, GitCommit, GitPullRequest, FileText, Activity, Image as ImageIcon, BarChart } from "lucide-react";

interface EvidenceListProps {
  evidences: Evidence[];
}

export function EvidenceList({ evidences }: EvidenceListProps) {
  if (!evidences || evidences.length === 0) return null;

  const getIcon = (type: Evidence["evidenceType"]) => {
    switch (type) {
      case "commit": return <GitCommit className="w-4 h-4 text-emerald-400" />;
      case "pull_request": return <GitPullRequest className="w-4 h-4 text-blue-400" />;
      case "document": return <FileText className="w-4 h-4 text-amber-400" />;
      case "metric": return <Activity className="w-4 h-4 text-purple-400" />;
      case "screenshot": return <ImageIcon className="w-4 h-4 text-indigo-400" />;
      case "report": return <BarChart className="w-4 h-4 text-rose-400" />;
      default: return <ShieldCheck className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="my-6">
      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <ShieldCheck className="w-3 h-3" />
        Evidências Anexadas
      </h4>
      <div className="flex flex-col gap-2">
        {evidences.map((ev) => (
          <div key={ev.id} className="flex items-center gap-3 p-3 rounded-lg border border-[#27272A] bg-[#111111]">
            <div className="w-8 h-8 rounded-md bg-[#1A1A1A] flex items-center justify-center shrink-0">
              {getIcon(ev.evidenceType)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{ev.title}</p>
              <p className="text-xs text-zinc-500 capitalize">{ev.evidenceType.replace("_", " ")}</p>
            </div>
            {ev.url && (
              <a href={ev.url} className="text-xs text-indigo-400 hover:underline px-2">Ver detalhe</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
