"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "About",  href: "#about"   },
  { label: "Work",   href: "#work"    },
  { label: "Team",   href: "#team"    },
  { label: "CV",     href: "#cv"      },
  { label: "Links",  href: "#links"   },
  { label: "Contact",href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route-style anchor clicks
  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-500 ease-editorial md:px-12 lg:px-20 ${
          scrolled || open
            ? "backdrop-blur-md bg-paper/90 dark:bg-charcoal/90 border-b hairline"
            : ""
        }`}
      >
        <a href="#" data-magnetic className="font-display text-sm tracking-widest2 uppercase">
          S. Mendoza
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 text-xs uppercase tracking-widest2 md:flex">
          {NAV_ITEMS.slice(0, -1).map((item) => (
            <a key={item.href} href={item.href} data-magnetic className="link-sweep">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            data-magnetic
            className="link-sweep hidden text-xs uppercase tracking-widest2 md:inline"
          >
            Contact
          </a>
          <ThemeToggle />

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`block h-px w-5 bg-current transition-all duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-all duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-x-0 top-[69px] z-40 flex flex-col gap-0 border-b hairline bg-paper/95 dark:bg-charcoal/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={close}
            className="border-t hairline px-6 py-5 text-sm uppercase tracking-widest2 transition-colors hover:bg-fg/5"
            style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
