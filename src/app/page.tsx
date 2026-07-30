"use client";

import Link from "next/link";
import {
  FileText,
  ArrowUpRight,
  Clock,
  Compass,
  Calendar,
  Database,
  BrainCircuit,
  LayoutTemplate,
  Rocket
} from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { AppCard } from "@/components/ui/AppCard";
import { Section } from "@/components/ui/Section";
import { ProjectHealthBadge } from "@/components/projects/project-health-badge";
import { TaskStatusBadge } from "@/components/tasks/task-status-badge";
import { useRecentDocuments } from "@/contexts/recent-documents-context";
import { useCurrentUser } from "@/contexts/current-user-context";
import {
  dashboardMetrics,
  recentActivities,
  quickAccessItems,
  documentsData,
  projectsData,
  tasksData,
  patternsData,
} from "@/data";
import { getProjectClient } from "@/lib/projects";
import { SIMULATED_NOW } from "@/lib/date";

export default function Home() {
  const { recentDocuments } = useRecentDocuments();
  const { currentUser } = useCurrentUser();

  // Find the last viewed document details
  const lastViewedSlug = recentDocuments[0]?.slug;
  const lastViewedDoc = lastViewedSlug
    ? documentsData.find((d) => d.slug === lastViewedSlug)
    : null;

  // Projects in progress (max 4 active)
  const activeProjects = projectsData
    .filter((p) => p.status === "active")
    .slice(0, 4);

  // Flatten and filter upcoming deliverables (not completed/approved/delivered, sorted by due date, max 3)
  const upcomingDeliverables = projectsData
    .flatMap((p) =>
      p.deliverables
        .filter((d) => !["approved", "delivered"].includes(d.status))
        .map((d) => ({
          ...d,
          projectName: p.name,
          projectSlug: p.slug,
        }))
    )
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  // My Tasks
  const myTasks = currentUser 
    ? tasksData
        .filter((t) => t.responsibleId === currentUser.id && t.status !== "done")
        .sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        })
        .slice(0, 3)
    : [];

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader title="Knowledge Core" subtitle="Fábrica de Sistemas Inteligentes" />

      {/* NEW Core: Knowledge System */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AppCard className="bg-gradient-to-br from-[#111111] to-[#0A0A0A] border-[#27272A] relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="p-3 w-max rounded-lg bg-black border border-[#27272A] shadow-inner mb-4">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Architecture</h3>
              <p className="text-xs text-[#A1A1AA] line-clamp-2">Padrões de persistência, transações e infraestrutura de alta concorrência.</p>
            </div>
            <Link href="/patterns/architecture" className="mt-4 text-xs font-semibold text-white/70 flex items-center gap-1 hover:text-white transition-colors">
              Explorar Padrões <ChevronRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </AppCard>

        <AppCard className="bg-gradient-to-br from-[#111111] to-[#0A0A0A] border-[#27272A] relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="p-3 w-max rounded-lg bg-black border border-[#27272A] shadow-inner mb-4">
              <LayoutTemplate className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">UX & Design</h3>
              <p className="text-xs text-[#A1A1AA] line-clamp-2">Redução de carga cognitiva, task-driven interfaces e micro-interações.</p>
            </div>
            <Link href="/patterns/ux" className="mt-4 text-xs font-semibold text-white/70 flex items-center gap-1 hover:text-white transition-colors">
              Explorar Padrões <ChevronRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </AppCard>

        <AppCard className="bg-gradient-to-br from-[#111111] to-[#0A0A0A] border-[#27272A] relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="p-3 w-max rounded-lg bg-black border border-[#27272A] shadow-inner mb-4">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Engenharia de IA</h3>
              <p className="text-xs text-[#A1A1AA] line-clamp-2">Agentes proativos, automação via WhatsApp Cloud API e RAG multi-tenant.</p>
            </div>
            <Link href="/patterns/ia" className="mt-4 text-xs font-semibold text-white/70 flex items-center gap-1 hover:text-white transition-colors">
              Explorar Padrões <ChevronRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </AppCard>

        <AppCard className="bg-gradient-to-br from-[#111111] to-[#0A0A0A] border-[#27272A] relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="p-3 w-max rounded-lg bg-black border border-[#27272A] shadow-inner mb-4">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Estratégia & Vendas</h3>
              <p className="text-xs text-[#A1A1AA] line-clamp-2">Modelos de comercialização por evolução da infraestrutura, não por módulos.</p>
            </div>
            <Link href="/patterns/sales" className="mt-4 text-xs font-semibold text-white/70 flex items-center gap-1 hover:text-white transition-colors">
              Explorar Padrões <ChevronRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </AppCard>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Operational Active Projects & Deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects (col-span-2) */}
        <AppCard className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <h2 className="text-lg font-semibold text-white">Projetos em andamento</h2>
            <Link
              href="/projects"
              className="text-xs text-[#A1A1AA] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Ver todos</span>
              <ChevronRightIcon className="w-3 h-3" />
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            {activeProjects.length > 0 ? (
              activeProjects.map((p) => {
                const client = getProjectClient(p);
                return (
                  <div
                    key={p.id}
                    className="p-4 bg-[#0A0A0A] border border-[#27272A] rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="text-sm font-bold text-white hover:underline"
                      >
                        {p.name}
                      </Link>
                      <div className="text-[10px] text-[#A1A1AA] flex items-center gap-2">
                        <span>{client?.name || "Sem cliente"}</span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Prazo: {p.dueDate}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[9px] text-[#A1A1AA] uppercase">Progresso</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1 bg-[#1A1A1A] rounded-full overflow-hidden border border-[#27272A]">
                            <div className="h-full bg-white" style={{ width: `${p.progress}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-white">{p.progress}%</span>
                        </div>
                      </div>

                      <ProjectHealthBadge health={p.health} />
                    </div>
                  </div>
                );
              })
            ) : (
              <span className="text-xs text-[#A1A1AA]/50 italic">Nenhum projeto ativo em andamento.</span>
            )}
          </div>
        </AppCard>

        {/* My Tasks (col-span-1) */}
        <AppCard>
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <h2 className="text-lg font-semibold text-white">Meu Trabalho Hoje</h2>
            <Link
              href="/tasks/my-work"
              className="text-xs text-[#A1A1AA] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Ver tarefas</span>
              <ChevronRightIcon className="w-3 h-3" />
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {myTasks.length > 0 ? (
              myTasks.map((t) => {
                const isLate = t.dueDate && new Date(t.dueDate) < SIMULATED_NOW;

                return (
                  <Link
                    key={t.id}
                    href={`/tasks/${t.id}`}
                    className="flex flex-col p-3 bg-[#0A0A0A] border border-[#27272A] rounded-lg gap-2 hover:border-neutral-500 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-white truncate flex-1">
                        {t.title}
                      </span>
                      <TaskStatusBadge status={t.status} />
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-[#A1A1AA] truncate max-w-[120px]">
                        {projectsData.find(p => p.id === t.projectId)?.name || "Tarefa Geral"}
                      </span>
                      <div className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider ${isLate ? "text-red-400" : "text-zinc-500"}`}>
                        <Clock className="w-3 h-3" />
                        {t.dueDate ? new Date(t.dueDate).toLocaleDateString("pt-BR") : "S/P"}
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <span className="text-xs text-[#A1A1AA]/50 italic">Você não possui tarefas pendentes.</span>
            )}
          </div>
        </AppCard>

        {/* Upcoming Deliverables (col-span-1) */}
        <AppCard>
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <h2 className="text-lg font-semibold text-white">Próximas entregas</h2>
            <Link
              href="/projects/deliverables"
              className="text-xs text-[#A1A1AA] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Ver painel</span>
              <ChevronRightIcon className="w-3 h-3" />
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {upcomingDeliverables.length > 0 ? (
              upcomingDeliverables.map((d) => {
                const isLate = new Date(d.dueDate) < SIMULATED_NOW;

                return (
                  <div
                    key={d.id}
                    className="p-3 bg-[#0A0A0A] border border-[#27272A] rounded-lg space-y-2 hover:border-neutral-500 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-white truncate block flex-1">
                        {d.title}
                      </span>
                      <span className={`text-[8px] px-1 py-0.5 rounded border font-semibold uppercase ${isLate ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-[#111111] text-[#A1A1AA] border-[#27272A]"}`}>
                        {isLate ? "Atrasado" : "Pendente"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-[10px] text-[#A1A1AA]">
                      <Link href={`/projects/${d.projectSlug}`} className="hover:underline truncate block max-w-[120px]">
                        {d.projectName}
                      </Link>
                      <span className={isLate ? "text-red-400 font-medium" : ""}>{d.dueDate}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <span className="text-xs text-[#A1A1AA]/50 italic">Nenhuma entrega agendada.</span>
            )}
          </div>
        </AppCard>
      </div>

      {/* 2-Column Section: Continue / Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Continue de onde parou */}
        <AppCard className="flex flex-col justify-between">
          {lastViewedDoc ? (
            <>
              <div>
                <h2 className="text-lg font-semibold text-white">Continue de onde parou</h2>
                <div className="mt-4 p-4 rounded-lg bg-[#0A0A0A] border border-[#27272A]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-[#111111] border border-[#27272A]">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">{lastViewedDoc.titulo}</h3>
                        <p className="text-xs text-[#A1A1AA]">{lastViewedDoc.categoria}</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#A1A1AA]">Último acesso</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={`/documents/${lastViewedDoc.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Abrir documento</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-lg font-semibold text-white">Continue de onde parou</h2>
                <div className="mt-4 p-4 rounded-lg bg-[#0A0A0A] border border-[#27272A] border-dashed text-center">
                  <Compass className="w-8 h-8 text-[#A1A1AA] mx-auto stroke-[1.5]" />
                  <p className="mt-2 text-sm text-[#A1A1AA] font-medium">Nenhum histórico recente</p>
                  <p className="mt-0.5 text-xs text-[#A1A1AA]/70">Explore a biblioteca para começar.</p>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/documents"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Abrir Biblioteca</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          )}
        </AppCard>

        {/* Right: Atividade recente */}
        <AppCard>
          <h2 className="text-lg font-semibold text-white">Atividade recente</h2>
          <div className="mt-4 divide-y divide-[#27272A]">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="text-sm text-white">{activity.text}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#A1A1AA]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </AppCard>
      </div>

      {/* Acesso Rápido Section */}
      <Section title="Acesso rápido">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group rounded-xl border border-[#27272A] bg-[#111111] p-6 shadow-sm hover:border-neutral-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-[#0A0A0A] border border-[#27272A] group-hover:border-neutral-500 transition-colors">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-white transition-colors" />
                </div>
                <h3 className="mt-4 text-sm font-medium text-white">{item.name}</h3>
                <p className="mt-1 text-xs text-[#A1A1AA] line-clamp-2">{item.desc}</p>
              </Link>
            );
          })}
        </div>
      </Section>
    </PageContainer>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
