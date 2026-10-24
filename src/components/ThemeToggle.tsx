"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

/**
 * Persists the user's preference in localStorage and applies/removes
 * the `dark` class on <html>. A GSAP micro-animation spins the icon on toggle.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  /* Initialise from saved preference or system default */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");

    /* Spin + scale the icon for tactile feedback */
    gsap.fromTo(
      "#theme-toggle-icon",
      { rotate: 0, scale: 1 },
      { rotate: next ? -180 : 180, scale: 0.7, duration: 0.18, ease: "power2.in",
        onComplete: () =>
          gsap.to("#theme-toggle-icon", {
            rotate: next ? -360 : 360,
            scale: 1,
            duration: 0.28,
            ease: "back.out(2)",
          }),
      }
    );
  };

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      data-magnetic
      className="flex h-8 w-8 items-center justify-center rounded-full border hairline text-xs transition-colors duration-300 hover:bg-fg hover:text-bg"
    >
      <span
        id="theme-toggle-icon"
        className="inline-block leading-none select-none"
        aria-hidden
      >
        {dark ? "☀" : "☾"}
      </span>
    </button>
  );
}
