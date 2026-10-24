"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CV_PATH     = "/cv.pdf";
const CV_PNG_PATH = "/SAI FAKE CV.png";

const highlights = [
  { label: "Education",  value: "BS Information Technology", sub: "University Student" },
  { label: "Focus",      value: "Full-Stack Development",    sub: "Next.js · TypeScript · Supabase" },
  { label: "Design",     value: "Graphic & Apparel",         sub: "Sublimation Layouts" },
  { label: "Networking", value: "Cisco Certified",           sub: "System Architecture" },
];

export default function CV() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cv-label", {
        autoAlpha: 0, y: 12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".cv-label", start: "top 88%" },
      });
      gsap.from(".cv-heading", {
        clipPath: "inset(100% 0% 0% 0%)", y: 40, duration: 1.1, ease: "power4.out",
        scrollTrigger: { trigger: ".cv-heading", start: "top 85%" },
      });
      gsap.from(".cv-desc", {
        autoAlpha: 0, y: 24, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".cv-desc", start: "top 88%" },
      });
      gsap.from(".cv-highlight", {
        autoAlpha: 0, y: 32, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".cv-highlight", start: "top 88%" },
      });
      gsap.from(".cv-preview-wrap", {
        autoAlpha: 0, y: 48, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".cv-preview-wrap", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cv" className="px-6 py-28 md:px-12 lg:px-20">

      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-6 border-b hairline pb-10 md:flex-row md:items-end">
        <div>
          <span className="cv-label inline-block text-xs uppercase tracking-widest2 text-fg-faint">
            04 &#8212; Curriculum Vitae
          </span>
          <div className="overflow-hidden mt-6">
            <h2 className="cv-heading font-display text-4xl leading-tight tracking-tightest md:text-5xl">
              Experience &amp; credentials.
            </h2>
          </div>
        </div>
        <p className="cv-desc max-w-sm text-sm text-fg-muted">
          A summary of my academic background, technical skills, and creative work &#8212; available to view and download.
        </p>
      </div>

      {/* Highlights strip */}
      <div className="mt-16 grid grid-cols-2 gap-px border hairline lg:grid-cols-4" style={{ background: "var(--border)" }}>
        {highlights.map((h) => (
          <div key={h.label} className="cv-highlight flex flex-col gap-1 bg-paper dark:bg-charcoal p-6 md:p-8">
            <span className="text-[10px] uppercase tracking-widest2 text-fg-faint">{h.label}</span>
            <span className="mt-2 font-display text-lg leading-snug tracking-tightest md:text-xl">{h.value}</span>
            <span className="text-xs text-fg-muted">{h.sub}</span>
          </div>
        ))}
      </div>

      {/* PNG preview + sidebar */}
      <div className="cv-preview-wrap mt-14 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">

        {/* CV Image panel — compact thumbnail */}
        <div className="relative w-full max-w-xs shrink-0 overflow-hidden border hairline group">
          {/* Chrome bar */}
          <div className="flex items-center justify-between border-b hairline bg-paper dark:bg-charcoal px-4 py-2.5">
            <span className="text-[10px] uppercase tracking-widest2 text-fg-faint">Sai Mendoza &#8212; CV</span>
            <a
              href={CV_PATH}
              download="Sai_Mendoza_CV.pdf"
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest2 link-sweep"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </a>
          </div>

          {/* PNG snapshot */}
          <img
            src={CV_PNG_PATH}
            alt="Sai Mendoza CV preview"
            className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            draggable={false}
          />
        </div>

        {/* Sidebar CTA */}
        <div className="flex flex-col justify-between gap-10 lg:w-72">
          <div>
            <h3 className="font-display text-2xl tracking-tightest md:text-3xl">Ready to collaborate?</h3>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              My CV covers full-stack development projects, graphic design work, and networking coursework.
              Feel free to download a copy or reach out directly.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={CV_PATH}
              download="Sai_Mendoza_CV.pdf"
              className="group flex items-center justify-between border hairline px-6 py-4 transition-colors duration-300 hover:bg-fg hover:text-bg"
            >
              <span className="text-xs uppercase tracking-widest2">Download CV</span>
              <svg
                className="transition-transform duration-300 group-hover:translate-x-1"
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>

            <a
              href="#contact"
              className="group flex items-center justify-between border hairline px-6 py-4 transition-colors duration-300 hover:bg-fg hover:text-bg"
            >
              <span className="text-xs uppercase tracking-widest2">Get in Touch</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">&#8599;</span>
            </a>
          </div>

          <div className="border-t hairline pt-6">
            <span className="text-[10px] uppercase tracking-widest2 text-fg-faint">Last updated &#183; 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}