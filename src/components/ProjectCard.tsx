"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Project } from "@/data/types";
import ApparelSwipeCard from "./ApparelSwipeCard";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const slides = project.images ?? (project.image ? [project.image] : []);

  // ── Hover animations ─────────────────────────────────────────
  const handleEnter = () => {
    gsap.to(imageRef.current, { scale: 1.04, duration: 0.7, ease: "power3.out" });
    gsap.to(arrowRef.current, { x: 6, y: -6, duration: 0.4, ease: "power3.out" });
    gsap.to(cardRef.current, {
      borderColor:
        getComputedStyle(document.documentElement).getPropertyValue("--fg").trim() ||
        "rgba(0,0,0,0.9)",
      duration: 0.4,
    });
  };

  const handleLeave = () => {
    gsap.to(imageRef.current, { scale: 1, duration: 0.7, ease: "power3.out" });
    gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    gsap.to(cardRef.current, {
      borderColor:
        getComputedStyle(document.documentElement).getPropertyValue("--border").trim() ||
        "rgba(0,0,0,0.12)",
      duration: 0.4,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative border hairline p-6 transition-colors duration-500 md:p-8"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-fg-faint">{project.index}</span>
        <span className="text-xs uppercase tracking-widest2 text-fg-faint">
          {project.category} · {project.year}
        </span>
      </div>

      {/* ── Image / Slideshow ───────────────────────────────── */}
      {project.images && project.images.length > 1 ? (
        /* Apparel swipe-card stack */
        <div className="mt-6 w-full">
          <ApparelSwipeCard images={project.images} title={project.title} />
        </div>
      ) : (
        /* Standard single-image display */
        <div className="relative mt-6 w-full overflow-hidden bg-mist aspect-[4/3]">
          <div ref={imageRef} className="absolute inset-0">
            {slides.length > 0 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slides[0]}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center border border-dashed border-ink/15">
                <span className="text-xs uppercase tracking-widest2 text-fg-faint">Mockup Placeholder</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl tracking-tightest md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-muted">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border hairline px-3 py-1 text-[10px] uppercase tracking-widest2 text-fg-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <span
          ref={arrowRef}
          aria-hidden="true"
          className="hidden shrink-0 text-3xl md:inline-block"
        >
          ↗
        </span>
      </div>

      <div className="mt-6 flex gap-6 border-t hairline pt-5 text-xs uppercase tracking-widest2">
        {project.liveUrl ? (
          <a href={project.liveUrl} data-magnetic className="link-sweep" target="_blank" rel="noreferrer">
            Live Demo
          </a>
        ) : (
          <span className="text-fg-faint">Live Demo — Soon</span>
        )}
        {project.repoUrl ? (
          <a href={project.repoUrl} data-magnetic className="link-sweep" target="_blank" rel="noreferrer">
            Repository
          </a>
        ) : (
          <span className="text-fg-faint">Repository — Soon</span>
        )}
      </div>
    </div>
  );
}

