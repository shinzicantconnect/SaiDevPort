"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "@/data/links";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Section label ───────────────────────────── */
      gsap.from(".about-label", {
        autoAlpha: 0,
        y: 12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-label",
          start: "top 88%",
        },
      });

      /* ── Heading clip-path reveal ────────────────── */
      gsap.from(".about-heading", {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 40,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
        },
      });

      /* ── Body paragraph ──────────────────────────── */
      gsap.from(".about-body", {
        autoAlpha: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-body",
          start: "top 85%",
        },
      });

      /* ── Skill columns stagger ───────────────────── */
      gsap.from(".about-skill-col", {
        autoAlpha: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-skill-col",
          start: "top 88%",
        },
      });

      /* ── Skills border-top line draw ─────────────── */
      gsap.from(".about-skills-grid", {
        "--skills-line": "0%",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".about-skills-grid",
          start: "top 88%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="px-6 py-28 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="about-label inline-block text-xs uppercase tracking-widest2 text-fg-faint">
            01 — About
          </span>
          <div className="overflow-hidden mt-6">
            <h2 className="about-heading font-display text-4xl leading-tight tracking-tightest md:text-5xl">
              Precision across code and craft.
            </h2>
          </div>
        </div>

        <div className="lg:col-span-8">
          <p className="about-body max-w-2xl text-balance text-lg leading-relaxed text-fg-muted md:text-xl">
            I&apos;m an IT student and independent developer building full-stack
            web applications, system architecture, and enterprise networking
            solutions — from attendance platforms with live QR scanning to
            e-commerce systems deployed end to end. Outside of code, I bring
            the same eye for structure and detail into graphic and apparel
            design work, including sublimation layouts.
          </p>

          <div className="about-skills-grid mt-16 grid grid-cols-1 gap-10 border-t hairline pt-10 sm:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.id} className="about-skill-col">
                <h3 className="text-xs uppercase tracking-widest2 text-fg-faint">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="group flex items-center gap-2 text-sm"
                      style={{ color: "var(--fg)" }}
                    >
                      <span
                        className="h-1 w-1 rounded-full transition-all duration-300 group-hover:w-3"
                        style={{ background: "var(--fg)", opacity: 0.4 }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                        onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
