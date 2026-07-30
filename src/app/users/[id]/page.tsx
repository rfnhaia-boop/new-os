import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Calendar, Mail, Briefcase, Check, X } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { UserAvatar } from "@/components/users/user-avatar";
import { RoleBadge } from "@/components/users/role-badge";
import { UserStatusBadge } from "@/components/users/user-status-badge";
import { usersData, SystemModule, PermissionAction } from "@/data";
import { hasPermission, getRoleLabel } from "@/lib/permissions";

interface UserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return usersData.map((u) => ({
    id: u.id,
  }));
}

const modulesList: Array<{ id: SystemModule; name: string }> = [
  { id: "dashboard", name: "Dashboard" },
  { id: "documents", name: "Documentos" },
  { id: "company", name: "Empresa" },
  { id: "nex", name: "NEX" },
  { id: "clients", name: "Clientes" },
  { id: "projects", name: "Projetos" },
  { id: "tasks", name: "Tarefas" },
  { id: "financial", name: "Financeiro" },
  { id: "settings", name: "Configurações" },
];

const actionsList: Array<{ id: PermissionAction; name: string }> = [
  { id: "view", name: "Visualizar" },
  { id: "create", name: "Criar" },
  { id: "edit", name: "Editar" },
  { id: "delete", name: "Excluir" },
  { id: "manage", name: "Gerenciar" },
];

export default async function UserDetailPage({ params }: UserPageProps) {
  const { id } = await params;
  const user = usersData.find((u) => u.id === id);

  if (!user) {
    notFound();
  }

  return (
    <PageContainer>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[#A1A1AA] mb-6">
        <Link href="/users" className="hover:text-white transition-colors">
          Equipe
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white truncate max-w-[200px]">{user.name}</span>
      </nav>

      {/* Profile summary card */}
      <div className="p-6 bg-[#111111] border border-[#27272A] rounded-xl flex flex-col md:flex-row items-center md:items-start gap-6">
        <UserAvatar name={user.name} avatarUrl={user.avatar} size="lg" />
        <div className="flex-1 space-y-3 text-center md:text-left min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-2.5 justify-center md:justify-start">
            <h1 className="text-2xl font-bold text-white tracking-tight">{user.name}</h1>
            <div className="flex items-center gap-2 justify-center shrink-0">
              <RoleBadge role={user.role} />
              <UserStatusBadge status={user.status} />
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#A1A1AA] justify-center md:justify-start">
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{user.jobTitle} &bull; {user.department}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Entrada em {user.createdAt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Matriz de Permissões</h2>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Tabela consolidada de acessos e ações por módulo operacional (Apenas Leitura).
            </p>
          </div>
          <span className="text-[10px] font-semibold text-[#A1A1AA] bg-[#111111] border border-[#27272A] px-2 py-1 rounded">
            Perfil: {getRoleLabel(user.role)}
          </span>
        </div>

        {/* Table responsive container */}
        <div className="overflow-x-auto border border-[#27272A] rounded-xl bg-[#0A0A0A]">
          <table className="min-w-full divide-y divide-[#27272A] text-left text-xs text-[#A1A1AA]">
            <thead className="bg-[#111111] text-white font-medium">
              <tr>
                <th className="px-5 py-3.5">Módulo</th>
                {actionsList.map((action) => (
                  <th key={action.id} className="px-5 py-3.5 text-center">
                    {action.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]/70">
              {modulesList.map((mod) => (
                <tr key={mod.id} className="hover:bg-[#111111]/30 transition-colors">
                  <td className="px-5 py-4 font-semibold text-white shrink-0">{mod.name}</td>
                  {actionsList.map((action) => {
                    const hasAction = hasPermission(user, mod.id, action.id);
                    return (
                      <td key={action.id} className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center">
                          {hasAction ? (
                            <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                          ) : (
                            <div className="p-1 rounded-full bg-red-500/5 text-red-500/30 border border-red-500/10">
                              <X className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}
