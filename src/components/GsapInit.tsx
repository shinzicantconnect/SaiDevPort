"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Registers GSAP plugins once on mount. Must be rendered client-side.
 * Replaces the AOS initializer — all scroll animations are now driven by GSAP.
 */
export default function GsapInit() {
  useEffect(() => {
    // Ensure ScrollTrigger recalculates after fonts / images load
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return null;
}
