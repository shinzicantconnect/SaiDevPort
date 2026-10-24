"use client";

import { useRef, MouseEvent, ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  as?: "a" | "button";
  target?: string;
  rel?: string;
}

const base =
  "relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm tracking-widest2 uppercase font-medium transition-colors duration-500 ease-editorial select-none";

const variants = {
  solid:
    "bg-ink text-paper hover:bg-graphite dark:bg-fg dark:text-bg dark:hover:bg-fg/80",
  outline:
    "border border-ink text-ink hover:bg-ink hover:text-paper dark:border-fg dark:text-fg dark:hover:bg-fg dark:hover:text-bg",
  ghost: "text-ink hover:opacity-60 dark:text-fg",
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  as,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.35,
      y: y * 0.5,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  const classes = `${base} ${variants[variant]} ${className}`;
  const Component = as === "button" ? "button" : href ? "a" : "button";

  if (Component === "a") {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        data-magnetic
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onClick}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      data-magnetic
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
