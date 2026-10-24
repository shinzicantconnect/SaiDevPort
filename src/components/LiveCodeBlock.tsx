"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Snippet definitions                                                  */
/* ------------------------------------------------------------------ */
const SNIPPETS = [
  {
    filename: "api/contact/route.ts",
    lang: "typescript",
    lines: [
      { tokens: [{ t: "import", c: "kw" }, { t: " { Resend } ", c: "fg" }, { t: "from", c: "kw" }, { t: ' "resend"', c: "str" }, { t: ";", c: "fg" }] },
      { tokens: [] },
      { tokens: [{ t: "export async function ", c: "kw" }, { t: "POST", c: "fn" }, { t: "(req) {", c: "fg" }] },
      { tokens: [{ t: "  const ", c: "kw" }, { t: "resend ", c: "fg" }, { t: "= ", c: "op" }, { t: "new ", c: "kw" }, { t: "Resend", c: "fn" }, { t: "(process.env.RESEND_API_KEY);", c: "fg" }] },
      { tokens: [] },
      { tokens: [{ t: "  await ", c: "kw" }, { t: "resend.emails.", c: "fg" }, { t: "send", c: "fn" }, { t: "({", c: "fg" }] },
      { tokens: [{ t: "    from", c: "prop" }, { t: ": ", c: "fg" }, { t: '"Portfolio Contact"', c: "str" }, { t: ",", c: "fg" }] },
      { tokens: [{ t: "    to", c: "prop" }, { t: ": ", c: "fg" }, { t: "process.env", c: "var" }, { t: ".CONTACT_EMAIL,", c: "fg" }] },
      { tokens: [{ t: "    subject", c: "prop" }, { t: ": `New message from ", c: "fg" }, { t: "${name}`", c: "var" }, { t: ",", c: "fg" }] },
      { tokens: [{ t: "  });", c: "fg" }] },
      { tokens: [{ t: "}", c: "fg" }] },
    ],
  },
  {
    filename: "components/Hero.tsx",
    lang: "tsx",
    lines: [
      { tokens: [{ t: "const ", c: "kw" }, { t: "HEADLINE_LINES ", c: "fg" }, { t: "= [", c: "op" }] },
      { tokens: [{ t: '  ["Web", "Developer"],', c: "str" }] },
      { tokens: [{ t: '  ["&", "Creative", "Nerd."]', c: "str" }] },
      { tokens: [{ t: "];", c: "fg" }] },
      { tokens: [] },
      { tokens: [{ t: "export default function ", c: "kw" }, { t: "Hero", c: "fn" }, { t: "() {", c: "fg" }] },
      { tokens: [{ t: "  const ", c: "kw" }, { t: "ref ", c: "fg" }, { t: "= ", c: "op" }, { t: "useRef", c: "fn" }, { t: "<", c: "fg" }, { t: "HTMLDivElement", c: "type" }, { t: ">(null);", c: "fg" }] },
      { tokens: [] },
      { tokens: [{ t: "  ", c: "fg" }, { t: "useEffect", c: "fn" }, { t: "(() => {", c: "fg" }] },
      { tokens: [{ t: "    gsap.", c: "fg" }, { t: "timeline", c: "fn" }, { t: "({", c: "fg" }] },
      { tokens: [{ t: "      defaults: { ease: ", c: "fg" }, { t: '"power4.out"', c: "str" }, { t: " }", c: "fg" }] },
      { tokens: [{ t: "    });", c: "fg" }] },
    ],
  },
  {
    filename: "data/projects.ts",
    lang: "typescript",
    lines: [
      { tokens: [{ t: "export const ", c: "kw" }, { t: "projects", c: "var" }, { t: ": ", c: "fg" }, { t: "Project", c: "type" }, { t: "[] = [", c: "fg" }] },
      { tokens: [{ t: "  {", c: "fg" }] },
      { tokens: [{ t: "    title", c: "prop" }, { t: ": ", c: "fg" }, { t: '"Sy-Stem Surveillance"', c: "str" }, { t: ",", c: "fg" }] },
      { tokens: [{ t: "    stack", c: "prop" }, { t: ': ["Next.js", "Supabase"],', c: "str" }] },
      { tokens: [{ t: "    live", c: "prop" }, { t: ": ", c: "fg" }, { t: "true", c: "kw" }, { t: ",", c: "fg" }] },
      { tokens: [{ t: "    year", c: "prop" }, { t: ": ", c: "fg" }, { t: "2024", c: "num" }, { t: ",", c: "fg" }] },
      { tokens: [{ t: "  },", c: "fg" }] },
      { tokens: [{ t: "  {", c: "fg" }] },
      { tokens: [{ t: "    title", c: "prop" }, { t: ": ", c: "fg" }, { t: '"ZV Assistant System"', c: "str" }, { t: ",", c: "fg" }] },
      { tokens: [{ t: "    stack", c: "prop" }, { t: ': ["TypeScript", "GSAP"],', c: "str" }] },
      { tokens: [{ t: "  },", c: "fg" }] },
      { tokens: [{ t: "];", c: "fg" }] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Token colour map (dark-terminal palette)                            */
/* ------------------------------------------------------------------ */
const TOKEN_COLORS: Record<string, string> = {
  kw:   "#c792ea",
  fn:   "#82aaff",
  str:  "#c3e88d",
  var:  "#f78c6c",
  type: "#ffcb6b",
  prop: "#89ddff",
  op:   "#89ddff",
  num:  "#f78c6c",
  fg:   "#cdd3de",
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                       */
/* ------------------------------------------------------------------ */
interface Token { t: string; c: string; }

function CodeLine({ tokens }: { tokens: Token[] }) {
  return (
    <span>
      {tokens.map((tok, i) => (
        <span key={i} style={{ color: TOKEN_COLORS[tok.c] ?? TOKEN_COLORS.fg }}>
          {tok.t}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                       */
/* ------------------------------------------------------------------ */
export default function LiveCodeBlock() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "fade">("typing");
  const [opacity, setOpacity] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const snippet = SNIPPETS[snippetIdx];

  const totalCharsInLine = useCallback(
    (lineIdx: number) =>
      snippet.lines[lineIdx]?.tokens.reduce((acc, t) => acc + t.t.length, 0) ?? 0,
    [snippet],
  );

  const clear = () => { if (timerRef.current) clearTimeout(timerRef.current); };

  /* Typing engine */
  useEffect(() => {
    if (phase !== "typing") return;
    const lineChars = totalCharsInLine(visibleLines);

    if (lineChars === 0) {
      timerRef.current = setTimeout(() => {
        const next = visibleLines + 1;
        if (next >= snippet.lines.length) setPhase("pause");
        else { setVisibleLines(next); setCharCount(0); }
      }, 80);
      return clear;
    }

    if (charCount < lineChars) {
      timerRef.current = setTimeout(
        () => setCharCount((c) => c + 1),
        28 + Math.random() * 30,
      );
    } else {
      timerRef.current = setTimeout(() => {
        const next = visibleLines + 1;
        if (next >= snippet.lines.length) setPhase("pause");
        else { setVisibleLines(next); setCharCount(0); }
      }, 120);
    }
    return clear;
  }, [phase, visibleLines, charCount, snippet, totalCharsInLine]);

  /* Pause -> fade */
  useEffect(() => {
    if (phase !== "pause") return;
    timerRef.current = setTimeout(() => setPhase("fade"), 2200);
    return clear;
  }, [phase]);

  /* Fade -> next snippet */
  useEffect(() => {
    if (phase !== "fade") return;
    setOpacity(0);
    timerRef.current = setTimeout(() => {
      setSnippetIdx((i) => (i + 1) % SNIPPETS.length);
      setVisibleLines(0);
      setCharCount(0);
      setOpacity(1);
      setPhase("typing");
    }, 600);
    return clear;
  }, [phase]);

  /* Build partial current line */
  const buildPartialLine = (): Token[] => {
    const tokens = snippet.lines[visibleLines]?.tokens ?? [];
    let remaining = charCount;
    const partial: Token[] = [];
    for (const tok of tokens) {
      if (remaining <= 0) break;
      partial.push({ t: tok.t.slice(0, remaining), c: tok.c });
      remaining -= tok.t.length;
    }
    return partial;
  };

  return (
    <div
      className="relative hidden lg:flex lg:w-[42vw] lg:max-w-[520px] shrink-0 items-center justify-center"
      aria-hidden
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[#82aaff]/5 blur-3xl scale-90" />

      {/* Terminal window */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-white/[0.08] shadow-2xl"
        style={{
          background: "rgba(13,17,28,0.92)",
          backdropFilter: "blur(12px)",
          transition: "opacity 0.55s ease",
          opacity,
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 text-center font-mono text-[11px] text-white/40 tracking-wide">
            {snippet.filename}
          </span>
          <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/30 uppercase tracking-wider">
            {snippet.lang}
          </span>
        </div>

        {/* Code body */}
        <div className="overflow-hidden px-4 py-5" style={{ minHeight: "320px" }}>
          <table className="w-full border-collapse font-mono text-[13px] leading-[1.75]">
            <tbody>
              {snippet.lines.map((line, i) => {
                const isDone = i < visibleLines;
                const isCurrent = i === visibleLines && phase === "typing";
                if (!isDone && !isCurrent) return null;
                return (
                  <tr key={i}>
                    <td
                      className="select-none pr-5 text-right text-[11px]"
                      style={{ color: "#3d5166", width: "2rem" }}
                    >
                      {i + 1}
                    </td>
                    <td>
                      {isDone ? (
                        <CodeLine tokens={line.tokens} />
                      ) : (
                        <>
                          <CodeLine tokens={buildPartialLine()} />
                          <span
                            className="inline-block align-middle"
                            style={{
                              width: "2px",
                              height: "1em",
                              background: "#82aaff",
                              marginLeft: "1px",
                              animation: "lcb-caret 1s step-end infinite",
                            }}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2"
          style={{ background: "rgba(130,170,255,0.06)" }}
        >
          <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">
            {phase === "pause" ? "● Ready" : "● Editing"}
          </span>
          <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
            Ln {visibleLines + 1} · {snippet.lang.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Snippet indicator dots */}
      <div className="absolute -bottom-6 flex gap-2">
        {SNIPPETS.map((_, i) => (
          <span
            key={i}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i === snippetIdx ? "1.5rem" : "0.375rem",
              background: i === snippetIdx ? "#82aaff" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      <style>{`@keyframes lcb-caret { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}
