"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import TypeWriter from "./TypeWriter";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LINES = [["Full-Stack", "Developer"], ["&", "Creative", "Nerd."]];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Entry animation ─────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.set(".hero-word", { yPercent: 120 })
        .set(".hero-fade", { autoAlpha: 0, y: 16 })
        .set(avatarRef.current, { autoAlpha: 0, scale: 0.88, y: 30 })
        .to(".hero-word", { yPercent: 0, duration: 1.1, stagger: 0.06 }, 0.2)
        .to(
          ".hero-fade",
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 },
          "-=0.5"
        )
        .to(
          avatarRef.current,
          { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        );

      /* ── Subtle float loop on avatar ─────────────── */
      gsap.to(avatarRef.current, {
        y: -14,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.6,
      });

      /* ── Parallax scroll: headline drifts up slowly ── */
      gsap.to(headlineRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ── Parallax scroll: desc drifts up slightly ── */
      gsap.to(descRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ── Avatar parallax — drifts down (opposite of text) ── */
      gsap.to(avatarRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ── Bottom row fades + slides out on scroll ── */
      gsap.to(bottomRowRef.current, {
        autoAlpha: 0,
        y: 24,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "10% top",
          end: "35% top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] flex-col justify-between px-6 pt-28 pb-10 md:px-12 md:pt-32 lg:px-20"
    >
      {/* top row */}
      <div className="hero-fade flex items-center justify-between text-xs uppercase tracking-widest2 text-fg-muted">
        <span>Sai Mendoza</span>
        <span className="hidden sm:inline">Jesus Christ is God</span>
        <span>{new Date().getFullYear()}</span>
      </div>

      {/* headline + avatar two-column */}
      <div className="mt-20 flex flex-col items-start gap-10 md:mt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">

        {/* left: headline, desc, buttons */}
        <div className="flex-1">
          <h1
            ref={headlineRef}
            className="font-display text-[clamp(2.8rem,12vw,6.4vw)] leading-[0.92] tracking-tightest md:text-[8vw] lg:text-[6.4vw]"
          >
            {HEADLINE_LINES.map((line, li) => (
              <span key={li} className="reveal-line block">
                {line.map((word, wi) => (
                  <span key={wi} className="reveal-word hero-word mr-[0.28em] inline-block">
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <TypeWriter />

          <p
            ref={descRef}
            className="hero-fade mt-8 max-w-xl text-base text-fg-muted md:text-lg"
          >
            Currently a student at Father Saturnino Urios University,
            taking Bachelor Of Science in Information Technology.
            I design and build full-stack web applications and systems —
            and bring the same precision to apparel and graphic layout work.
            Based in the Philippines.
          </p>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#work" variant="solid">
              View Work
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Get in Touch
            </MagneticButton>
          </div>
        </div>

        {/* right: pixel avatar */}
        <div
          ref={avatarRef}
          className="relative hidden lg:flex lg:w-[30vw] lg:max-w-[420px] shrink-0 items-center justify-center"
        >
          {/* subtle glow behind the avatar */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-ink/5 blur-3xl scale-90"
          />
          <Image
            src="/hero-avatar.jpg"
            alt="Pixel art avatar — Sai Mendoza"
            width={420}
            height={420}
            priority
            className="relative w-full select-none"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>

      {/* bottom row */}
      <div
        ref={bottomRowRef}
        className="hero-fade mt-24 flex items-end justify-between border-t hairline pt-6 text-xs uppercase tracking-widest2 text-fg-faint"
      >
        <span>Scroll</span>
        <span className="h-10 w-px bg-ink/20" />
        <span>Available for freelance work</span>
      </div>
    </section>
  );
}
