"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A minimal two-layer cursor (dot + lagging ring) with GSAP quickTo
 * for buttery interpolation. Disabled automatically on touch devices
 * via the .cursor-dot / .cursor-ring { display:none } media query.
 */
export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const scaleUp = () => gsap.to(ring, { scale: 1.8, duration: 0.3 });
    const scaleDown = () => gsap.to(ring, { scale: 1, duration: 0.3 });

    window.addEventListener("mousemove", move);

    const magnetic = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    magnetic.forEach((el) => {
      el.addEventListener("mouseenter", scaleUp);
      el.addEventListener("mouseleave", scaleDown);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      magnetic.forEach((el) => {
        el.removeEventListener("mouseenter", scaleUp);
        el.removeEventListener("mouseleave", scaleDown);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
