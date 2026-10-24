"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Section label ───────────────────────────── */
      gsap.from(".works-label", {
        autoAlpha: 0,
        y: 12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".works-label",
          start: "top 88%",
        },
      });

      /* ── Heading clip reveal ─────────────────────── */
      gsap.from(".works-heading", {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 40,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".works-heading",
          start: "top 85%",
        },
      });

      /* ── Sub-paragraph fade ──────────────────────── */
      gsap.from(".works-desc", {
        autoAlpha: 0,
        y: 24,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".works-desc",
          start: "top 88%",
        },
      });

      /* ── Cards stagger in ────────────────────────── */
      gsap.from(".works-card", {
        autoAlpha: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".works-card",
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="px-6 py-28 md:px-12 lg:px-20">
      <div className="flex flex-col items-start justify-between gap-6 border-b hairline pb-10 md:flex-row md:items-end">
        <div>
          <span className="works-label inline-block text-xs uppercase tracking-widest2 text-fg-faint">
            02 — Selected Works
          </span>
          <div className="overflow-hidden mt-6">
            <h2 className="works-heading font-display text-4xl leading-tight tracking-tightest md:text-5xl">
              Systems, apps &amp; layouts.
            </h2>
          </div>
        </div>
        <p className="works-desc max-w-sm text-sm text-fg-muted">
          A selection of municipal systems, custom web applications, and
          creative design work — built independently, end to end.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <div key={project.id} className="works-card">
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
