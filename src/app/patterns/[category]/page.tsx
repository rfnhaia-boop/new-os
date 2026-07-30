"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Settings2 } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { patternsData, PatternCategory } from "@/data";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';

// Component mapping for markdown rendering to match NEW's visual style
const markdownComponents = {
  h1: ({ children }: any) => <h1 className="text-2xl font-black text-white tracking-wide uppercase mt-8 mb-4 border-b border-[#27272A] pb-2">{children}</h1>,
  h2: ({ children }: any) => <h2 className="text-xl font-bold text-white mt-6 mb-3">{children}</h2>,
  p: ({ children }: any) => <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">{children}</p>,
  ul: ({ children }: any) => <ul className="list-none space-y-2 mb-4 text-[#A1A1AA] text-sm">{children}</ul>,
  li: ({ children }: any) => (
    <li className="flex items-start gap-2">
      <div className="mt-1.5 w-1 h-1 rounded-full bg-cyan-500 shrink-0" />
      <span>{children}</span>
    </li>
  ),
  code: ({ children }: any) => <code className="bg-[#111] border border-[#27272A] text-cyan-400 px-1 py-0.5 rounded text-xs">{children}</code>,
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-2 border-cyan-500 pl-4 py-1 my-4 bg-cyan-950/10 italic text-[#A1A1AA]">
      {children}
    </blockquote>
  )
};

export default function PatternCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const category = resolvedParams.category as PatternCategory;

  const validCategories = ["architecture", "design", "ux", "animations", "authentication", "database", "crm", "ia", "sales", "branding"];
  if (!validCategories.includes(category)) {
    notFound();
  }

  const categoryPatterns = patternsData.filter(p => p.category === category);

  return (
    <PageContainer>
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium text-[#A1A1AA] hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Dashboard</span>
        </Link>
      </div>

      <PageHeader 
        title={`Padrões de ${category.charAt(0).toUpperCase() + category.slice(1)}`}
        subtitle="Knowledge Core - Fábrica de Sistemas Inteligentes" 
      />

      <div className="mt-8 space-y-12">
        {categoryPatterns.length > 0 ? (
          categoryPatterns.map(pattern => (
            <article key={pattern.id} className="relative group">
              {/* Glassmorphism Background Card */}
              <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/5 rounded-2xl -z-10 transition-all duration-500 group-hover:bg-[#111111]/90 group-hover:border-white/10" />
              
              <div className="p-8">
                <header className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                        {pattern.id}
                      </span>
                      <span className="text-[10px] text-[#A1A1AA] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Atualizado em {new Date(pattern.updatedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">{pattern.title}</h2>
                    <p className="mt-2 text-sm text-[#A1A1AA]/80 max-w-2xl">{pattern.description}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2 shrink-0">
                    <span className="text-[10px] uppercase font-bold text-[#555] tracking-widest text-right">Projetos Relacionados</span>
                    <div className="flex gap-2 justify-end">
                      {pattern.relatedProjects.map(proj => (
                        <span key={proj} className="px-2 py-1 text-[10px] font-medium text-[#A1A1AA] bg-[#1A1A1A] rounded border border-[#27272A]">
                          {proj.replace('proj_', '').toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </header>

                <div className="prose prose-invert max-w-none prose-p:text-[#A1A1AA] prose-headings:text-white">
                  <ReactMarkdown components={markdownComponents}>
                    {pattern.content}
                  </ReactMarkdown>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-20 bg-[#050505] rounded-2xl border border-white/5">
            <Settings2 className="w-12 h-12 text-[#A1A1AA]/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">Nenhum padrão encontrado</h3>
            <p className="text-sm text-[#A1A1AA] mt-2">Ainda não extraímos padrões para a categoria {category}.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
