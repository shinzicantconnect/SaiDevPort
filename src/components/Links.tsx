"use client";

import { useRef, ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialLinks } from "@/data/links";

gsap.registerPlugin(ScrollTrigger);

export default function Links() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  /* ── Hover slide effects ─────────────────────────── */
  const handleEnter = (id: string) => {
    gsap.to(rowRefs.current[id], { x: 16, duration: 0.5, ease: "power3.out" });
  };
  const handleLeave = (id: string) => {
    gsap.to(rowRefs.current[id], { x: 0, duration: 0.5, ease: "power3.out" });
  };

  /* ── Scroll reveal ───────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Section header */
      gsap.from(".links-label", {
        autoAlpha: 0,
        y: 12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".links-label", start: "top 88%" },
      });

      gsap.from(".links-heading", {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 40,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".links-heading", start: "top 85%" },
      });

      /* Each link row slides in from left */
      gsap.from(".links-row", {
        autoAlpha: 0,
        x: -40,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".links-row",
          start: "top 88%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="links" className="px-6 py-28 md:px-12 lg:px-20">
      <div>
        <span className="links-label inline-block text-xs uppercase tracking-widest2 text-fg-faint">
          03 — Elsewhere
        </span>
        <div className="overflow-hidden mt-6">
          <h2 className="links-heading font-display text-4xl leading-tight tracking-tightest md:text-5xl">
            Find me around.
          </h2>
        </div>
      </div>

      <div className="mt-14 divide-y hairline border-y hairline">
        {socialLinks.map((link, i) => {
          const active = Boolean(link.url);

          const rowContent: ReactNode = (
            <>
              <span
                ref={(el) => {
                  rowRefs.current[link.id] = el;
                }}
                className="flex items-baseline gap-6"
              >
                <span className="font-mono text-xs text-fg-faint">
                  0{i + 1}
                </span>
                <span className="font-display text-2xl tracking-tightest sm:text-3xl md:text-4xl">
                  {link.label}
                </span>
                <span className="hidden text-sm text-fg-muted sm:inline">
                  {link.handle}
                </span>
              </span>
              <span className="text-xs uppercase tracking-widest2 text-fg-faint">
                {active ? "↗ Visit" : "Coming Soon"}
              </span>
            </>
          );

          const sharedClass = `links-row group flex items-center justify-between py-8 ${
            active ? "cursor-pointer" : "cursor-default opacity-50"
          }`;

          if (active) {
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                onMouseEnter={() => handleEnter(link.id)}
                onMouseLeave={() => handleLeave(link.id)}
                className={sharedClass}
              >
                {rowContent}
              </a>
            );
          }

          return (
            <div key={link.id} className={sharedClass}>
              {rowContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}
