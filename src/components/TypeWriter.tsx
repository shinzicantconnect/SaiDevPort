"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const WORDS = ["developer.", "student.", "digital artist."];

/**
 * GSAP-driven typewriter with a marker-highlight reveal.
 * - Types each word char-by-char with human-feel jitter
 * - When the word is complete: sweeps a highlight in (scaleX 0→1)
 * - Pauses, then sweeps highlight out (scaleX 1→0), then erases
 * - Blinking caret via CSS
 */
export default function TypeWriter() {
  const textRef = useRef<HTMLSpanElement>(null);
  const hlRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const TYPE_SPEED   = 80;
    const DELETE_SPEED = 38;
    const PAUSE_AFTER  = 1800; // total pause while word is shown
    const PAUSE_BEFORE = 300;

    /* Sweep highlight in */
    const showHighlight = (onDone: () => void) => {
      gsap.fromTo(
        hlRef.current,
        { scaleX: 0, transformOrigin: "left center", autoAlpha: 1 },
        {
          scaleX: 1,
          duration: 0.45,
          ease: "power3.out",
          onComplete: onDone,
        }
      );
    };

    /* Sweep highlight out */
    const hideHighlight = (onDone: () => void) => {
      gsap.to(hlRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(hlRef.current, { autoAlpha: 0 });
          onDone();
        },
      });
    };

    const tick = () => {
      const el = textRef.current;
      if (!el) return;

      const currentWord = WORDS[wordIndex];

      if (!isDeleting) {
        charIndex++;
        el.textContent = currentWord.slice(0, charIndex);

        if (charIndex === currentWord.length) {
          /* Word fully typed — show highlight, then wait, then erase */
          isDeleting = true;
          showHighlight(() => {
            timeoutId = setTimeout(() => {
              hideHighlight(() => tick());
            }, PAUSE_AFTER);
          });
          return;
        }

        timeoutId = setTimeout(tick, TYPE_SPEED + Math.random() * 40 - 20);
      } else {
        /* Deleting */
        charIndex--;
        el.textContent = currentWord.slice(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % WORDS.length;
          timeoutId = setTimeout(tick, PAUSE_BEFORE);
          return;
        }

        timeoutId = setTimeout(tick, DELETE_SPEED);
      }
    };

    /* Initialise highlight as invisible */
    gsap.set(hlRef.current, { scaleX: 0, autoAlpha: 0 });

    /* Start after hero entry animation */
    timeoutId = setTimeout(tick, 1800);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="hero-fade mt-5 flex items-baseline gap-2 font-mono text-sm md:text-base">
      <span className="text-fg-faint uppercase tracking-widest2 text-xs shrink-0">
        I&apos;m a
      </span>

      {/* highlight + text wrapper */}
      <span className="relative inline-flex items-baseline">
        {/* marker highlight — sits behind text */}
        <span
          ref={hlRef}
          aria-hidden
          className="typewriter-highlight"
        />
        {/* typed text */}
        <span
          ref={textRef}
          className="relative z-10 text-fg font-semibold tracking-tight"
        />
      </span>

      {/* blinking caret */}
      <span
        aria-hidden
        className="typewriter-caret inline-block w-[2px] h-[1em] bg-fg align-middle shrink-0"
      />
    </div>
  );
}
