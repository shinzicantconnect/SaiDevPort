"use client";

import { useEffect } from "react";
import AOS from "aos";

/**
 * Initializes AOS once on mount, after hydration — avoids SSR/client
 * markup mismatches since AOS mutates DOM attributes (data-aos-*).
 */
export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      mirror: false,
    });

    // Recalculate on route-level layout shifts (fonts, images loading in)
    const refresh = () => AOS.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return null;
}
