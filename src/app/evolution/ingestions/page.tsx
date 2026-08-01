import { OperationalIngestionCard } from "@/components/evolution/ingestions/OperationalIngestionCard";
import { listIngestions } from "@/lib/supabase/ingestions";
import Link from "next/link";
import { Filter } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function IngestionsListPage() {
  const ingestions = await listIngestions();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Ingestões Operacionais</h2>
          <p className="text-sm text-zinc-400">Resumos processados das operações e reuniões.</p>
        </div>
        <Link
          href="/evolution/ingestions/new"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Nova Ingestão
        </Link>
      </div>

      <div className="flex gap-2 mb-6">
        <button className="px-3 py-1.5 bg-[#111111] border border-[#27272A] rounded-lg text-sm text-zinc-300 hover:bg-[#1A1A1A] flex items-center gap-2">
          <Filter className="w-3 h-3" /> Projeto
        </button>
        <button className="px-3 py-1.5 bg-[#111111] border border-[#27272A] rounded-lg text-sm text-zinc-300 hover:bg-[#1A1A1A] flex items-center gap-2">
          <Filter className="w-3 h-3" /> Status
        </button>
        <button className="px-3 py-1.5 bg-[#111111] border border-[#27272A] rounded-lg text-sm text-zinc-300 hover:bg-[#1A1A1A] flex items-center gap-2">
          <Filter className="w-3 h-3" /> Data
        </button>
      </div>

      {ingestions.length === 0 ? (
        <div className="border border-dashed border-[#27272A] rounded-xl py-16 text-center">
          <p className="text-sm text-zinc-400">Nenhuma ingestão ainda.</p>
          <p className="text-xs text-zinc-500 mt-1">Clique em &quot;Nova Ingestão&quot; pra registrar a primeira.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingestions.map((ingestion) => (
            <OperationalIngestionCard key={ingestion.id} ingestion={ingestion} />
          ))}
        </div>
      )}
    </div>
  );
}
