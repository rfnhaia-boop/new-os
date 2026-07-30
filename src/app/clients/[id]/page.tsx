import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Building,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { clientsData, tasksData } from "@/data";
import { ClientProposalArea } from "@/components/clients/client-proposal-area";
import { TaskStatusBadge } from "@/components/tasks/task-status-badge";

interface ClientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return clientsData.map((c) => ({
    id: c.id,
  }));
}

export default async function ClientDetailPage({ params }: ClientPageProps) {
  const { id } = await params;
  const client = clientsData.find((c) => c.id === id);

  if (!client) {
    notFound();
  }

  const clientTasks = tasksData.filter(t => t.clientId === client.id);

  return (
    <PageContainer>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[#A1A1AA] mb-6">
        <Link href="/clients" className="hover:text-white transition-colors">
          CRM & Clientes
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white truncate max-w-[200px]">{client.name}</span>
      </nav>

      {/* Account Info Details */}
      <div className="p-6 bg-[#111111] border border-[#27272A] rounded-xl flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="p-4 bg-[#0A0A0A] border border-[#27272A] rounded-xl text-white">
          <Building className="w-8 h-8" />
        </div>
        <div className="flex-1 space-y-2 text-center md:text-left min-w-0">
          <h1 className="text-2xl font-bold text-white tracking-tight">{client.name}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#A1A1AA] justify-center md:justify-start">
            <span>Setor: <strong className="text-white">{client.industry}</strong></span>
            <span className="text-white/20">&bull;</span>
            <span>Faturamento: <strong className="text-white">{client.revenue}</strong></span>
            <span className="text-white/20">&bull;</span>
            <span>Domínio: <a href={`https://${client.domain}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{client.domain}</a></span>
          </div>
          {client.notes && (
            <p className="text-xs text-[#A1A1AA] max-w-2xl bg-[#0A0A0A]/50 border border-[#27272A]/50 p-2.5 rounded-lg mt-2">
              {client.notes}
            </p>
          )}
        </div>
      </div>

      {/* Main split details column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left section: Contacts */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-5 bg-[#111111] border border-[#27272A] rounded-xl space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] border-b border-[#27272A] pb-2">
              Contatos Corporativos
            </h3>
            {client.contacts.length > 0 ? (
              <div className="space-y-4 divide-y divide-[#27272A]/50">
                {client.contacts.map((contact, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#A1A1AA]" />
                      <span className="text-xs font-bold text-white">{contact.name}</span>
                      <span className="text-[9px] bg-[#0A0A0A] border border-[#27272A] text-[#A1A1AA] px-1.5 py-0.5 rounded">
                        {contact.role}
                      </span>
                    </div>
                    <div className="space-y-1 pl-5 text-[11px] text-[#A1A1AA]">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3" />
                        <span>{contact.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-xs text-[#A1A1AA]/50 italic block">Nenhum contato cadastrado.</span>
            )}
          </div>
        </div>

        {/* Right Section: Proposals and Interactions */}
        <div className="lg:col-span-2 space-y-6">
          <ClientProposalArea initialProposals={client.proposals} />

          {/* Tasks & Follow-ups */}
          <div className="bg-[#0A0A0A] border border-[#27272A] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Tarefas e Follow-ups</h3>
            <div className="space-y-3">
              {clientTasks.length > 0 ? (
                clientTasks.map(task => (
                  <Link
                    key={task.id}
                    href={`/tasks/${task.id}`}
                    className="flex items-center justify-between p-3 bg-[#111111] border border-[#27272A] rounded-lg hover:border-indigo-500/50 transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{task.title}</h4>
                      <span className="text-[10px] text-[#A1A1AA]">{task.type || "Geral"}</span>
                    </div>
                    <TaskStatusBadge status={task.status} />
                  </Link>
                ))
              ) : (
                <span className="text-xs text-[#A1A1AA]/50 italic block">Nenhuma tarefa associada a este cliente.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
