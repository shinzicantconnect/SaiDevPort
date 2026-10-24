"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TeamMember = {
    id: string;
    name: string;
    role: string;
    github: string;
};

const team: TeamMember[] = [
    {
        id: "poloy",
        name: "Poloy Escrupolo",
        role: "Frontend Developer",
        github: "https://github.com/Poloywrxc",
    },
    {
        id: "erle",
        name: "Erle Daniel Sudario",
        role: "Full Stack Developer",
        github: "https://github.com/Daniel2525-ui",
    },
    {
        id: "jedz",
        name: "Jedrik Lamanilao",
        role: "Debugger",
        github: "https://github.com/jedzie02",
    },
    {
        id: "binsoy",
        name: "Vince Lagnada",
        role: "Full Stack Developer",
        github: "https://github.com/it-dot",
    },
    {
        id: "steb",
        name: "Stevengel",
        role: "Full Stack Developer",
        github: "https://github.com/stevengelvillanuevamonet-collab",
    }
];

export default function Team() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".team-label", {
                autoAlpha: 0,
                y: 12,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: ".team-label", start: "top 92%" },
            });

            gsap.from(".team-heading", {
                clipPath: "inset(100% 0% 0% 0%)",
                y: 40,
                duration: 1.1,
                ease: "power4.out",
                scrollTrigger: { trigger: ".team-heading", start: "top 92%" },
            });

            gsap.from(".team-desc", {
                autoAlpha: 0,
                y: 24,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: { trigger: ".team-desc", start: "top 92%" },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* ── Keyframe for card fade-up ── */}
            <style>{`
        @keyframes team-card-in {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .team-card-anim {
          animation: team-card-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

            <section ref={sectionRef} id="team" className="px-6 py-28 md:px-12 lg:px-20">

                {/* ── Header ─────────────────────────────────────────── */}
                <div className="flex flex-col items-start justify-between gap-6 border-b hairline pb-10 md:flex-row md:items-end">
                    <div>
                        <span className="team-label inline-block text-xs uppercase tracking-widest text-fg-faint">
                            04 — The Team
                        </span>
                        <div className="overflow-hidden mt-6">
                            <h2
                                className="team-heading font-display text-4xl leading-tight tracking-tighter md:text-5xl"
                                style={{ willChange: "clip-path, transform" }}
                            >
                                People I build with.
                            </h2>
                        </div>
                    </div>
                    <p className="team-desc max-w-sm text-sm text-fg-muted">
                        Friends and collaborators who bring their own craft to the table —
                        each one a builder in their own right.
                    </p>
                </div>

                {/* ── Cards ──────────────────────────────────────────── */}
                <div className="mt-16 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-start sm:gap-6">
                    {team.map((member, i) => (
                        <a
                            key={member.id}
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="team-card-anim group relative flex flex-col items-center gap-5 rounded-2xl border hairline p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)]"
                            style={{
                                background: "var(--card)",
                                animationDelay: `${i * 0.12}s`,
                            }}
                        >
                            {/* Avatar */}
                            <div className="h-20 w-20 overflow-hidden rounded-full ring-2 ring-transparent transition-all duration-300 group-hover:ring-fg-faint">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`${member.github}.png?size=160`}
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            "https://github.com/ghost.png";
                                    }}
                                />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold leading-snug">
                                    {member.name}
                                </span>
                                <span className="text-xs text-fg-muted">{member.role}</span>
                            </div>

                            {/* GitHub handle */}
                            <span className="flex items-center gap-1.5 text-xs text-fg-faint transition-colors duration-200 group-hover:text-fg-muted">
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                                    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.912.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                                </svg>
                                {member.github.replace("https://github.com/", "@")}
                            </span>

                            {/* Hover arrow */}
                            <span className="absolute right-4 top-4 translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 text-fg-faint text-xs">
                                ↗
                            </span>
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
}