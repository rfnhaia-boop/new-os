"use client";

import { useEffect, useState, useRef } from "react";
import { Book, BookSection } from "@/data/types";
import { BookSidebar } from "./book-sidebar";
import { BookHeader } from "./book-header";
import { BookFooter } from "./book-footer";
import { ReadingProgress } from "./reading-progress";
import { BookNavigation } from "./book-navigation";
import { ChapterHeader } from "./chapter-header";
import { Quote } from "./quote";
import { Timeline } from "./timeline";
import { ArchitectureDiagram } from "./architecture-diagram";
import { DecisionCard } from "./decision-card";
import { ObjectiveCard } from "./objective-card";
import { WarningCard } from "./warning-card";
import { BestPracticeCard } from "./best-practice-card";
import { MetricCard } from "./metric-card";
import { RelatedDocuments } from "./related-documents";

interface BookViewerProps {
  book: Book;
}

export function BookViewer({ book }: BookViewerProps) {
  const [activeSectionId, setActiveSectionId] = useState("");
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const totalScroll = scrollHeight - clientHeight;
      const currentProgress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      setProgress(currentProgress);

      // Determine active section for sidebar
      const chapters = book.sections.filter(s => s.type === "chapter_header");
      let currentActive = "";
      
      for (const chapter of chapters) {
        const element = document.getElementById(chapter.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the element is near the top of the viewport
          if (rect.top <= 100) {
            currentActive = chapter.id;
          }
        }
      }
      
      if (currentActive) {
        setActiveSectionId(currentActive);
      } else if (chapters.length > 0 && scrollTop < 100) {
        // Default to first if at top
        setActiveSectionId(chapters[0].id);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Init
      handleScroll();
    }
    
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [book.sections]);

  const renderSection = (section: BookSection) => {
    switch (section.type) {
      case "chapter_header":
        return <ChapterHeader key={section.id} id={section.id} title={section.title!} subtitle={section.content} />;
      case "text":
        return <p key={section.id} className="my-4 text-zinc-300 leading-relaxed">{section.content}</p>;
      case "quote":
        return <Quote key={section.id} content={section.content!} author={(section.metadata as { author?: string })?.author} />;
      case "timeline":
        return <Timeline key={section.id} content={section.content!} />;
      case "architecture":
        return <ArchitectureDiagram key={section.id} title={section.title!} content={section.content!} />;
      case "decision":
        return <DecisionCard key={section.id} title={section.title!} content={section.content!} />;
      case "objective":
        return <ObjectiveCard key={section.id} title={section.title!} content={section.content!} />;
      case "warning":
        return <WarningCard key={section.id} title={section.title!} content={section.content!} />;
      case "best_practice":
        return <BestPracticeCard key={section.id} title={section.title!} content={section.content!} />;
      case "metric":
        return <MetricCard key={section.id} title={section.title!} content={section.content!} subtext={(section.metadata as { subtext?: string })?.subtext} />;
      case "related":
        return <RelatedDocuments key={section.id} title={section.title!} links={(section.metadata as { links?: { title: string, url: string }[] })?.links || []} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar - fixed */}
      <BookSidebar book={book} activeSectionId={activeSectionId} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <BookHeader book={book} />
        <ReadingProgress progress={progress} />
        
        <main 
          ref={containerRef}
          className="flex-1 overflow-y-auto scroll-smooth"
        >
          <div className="max-w-3xl mx-auto px-6 py-12 md:px-12">
            {/* Book Title (Internal) */}
            <div className="mb-12 text-center pb-8 border-b border-[#27272A]">
              <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4 block">
                {book.volume} • {book.version}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                {book.title}
              </h1>
              <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto">
                {book.description}
              </p>
            </div>

            {/* Render sections dynamically */}
            <article className="prose prose-invert prose-zinc max-w-none">
              {book.sections.map(renderSection)}
            </article>

            <BookNavigation sections={book.sections} activeSectionId={activeSectionId} />
            <BookFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
