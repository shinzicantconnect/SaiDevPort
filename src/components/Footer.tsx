"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEnter = () => {
    gsap.to(arrowRef.current, { y: -4, duration: 0.35, ease: "power2.out" });
  };
  const handleLeave = () => {
    gsap.to(arrowRef.current, { y: 0, duration: 0.35, ease: "power2.out" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Label ───────────────────────────────────── */
      gsap.from(".footer-label", {
        autoAlpha: 0,
        y: 12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".footer-label", start: "top 90%" },
      });

      /* ── CTA heading clip reveal ─────────────────── */
      gsap.from(".footer-heading", {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 40,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".footer-heading", start: "top 88%" },
      });

      /* ── Back-to-top button ──────────────────────── */
      gsap.from(".footer-btn", {
        autoAlpha: 0,
        y: 20,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: ".footer-btn", start: "top 90%" },
      });

      /* ── Footer fine-print ───────────────────────── */
      gsap.from(".footer-meta", {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".footer-meta", start: "top 92%" },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="border-t hairline px-6 py-16 md:px-12 lg:px-20"
    >
      {/* ── CTA + Form ───────────────────────────────── */}
      <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <span className="footer-label inline-block text-xs uppercase tracking-widest2 text-fg-faint">
            04 — Let&apos;s Talk
          </span>
          <div className="overflow-hidden mt-6">
            <h2 className="footer-heading max-w-lg font-display text-3xl leading-tight tracking-tightest md:text-4xl">
              Have a project in mind? I&apos;d love to hear about it.
            </h2>
          </div>
          <ContactForm />
        </div>

        <button
          type="button"
          onClick={scrollTop}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          data-magnetic
          className="footer-btn order-last mt-2 self-start flex items-center gap-3 border hairline px-6 py-3 text-xs uppercase tracking-widest2 transition-colors duration-500 hover:bg-ink hover:text-paper dark:hover:bg-fg dark:hover:text-bg md:order-none md:self-start"
        >
          Back to Top
          <span ref={arrowRef} className="inline-block">↑</span>
        </button>
      </div>

      <div className="footer-meta mt-16 flex flex-col items-start justify-between gap-4 border-t hairline pt-8 text-xs uppercase tracking-widest2 text-fg-faint sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Created by Sai Mendoza.</span>
        <span>Designed &amp; built independently.</span>
      </div>
    </footer>
  );
}
