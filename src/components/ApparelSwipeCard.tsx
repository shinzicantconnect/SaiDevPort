"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";

interface ApparelSwipeCardProps {
  images: string[];
  title: string;
}

const STACK_DEPTH = 3;

export default function ApparelSwipeCard({ images, title }: ApparelSwipeCardProps) {
  const [deck, setDeck] = useState<string[]>(images);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragState = useRef<{ startX: number; startY: number; dragging: boolean }>({
    startX: 0,
    startY: 0,
    dragging: false,
  });
  const activeRef = useRef<HTMLDivElement | null>(null);
  const throwing = useRef(false);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, deck.length);
  }, [deck.length]);

  const applyStackPositions = useCallback(() => {
    const visibleCount = Math.min(STACK_DEPTH, deck.length - 1);
    for (let i = 1; i <= visibleCount; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const scale = 1 - i * 0.05;
      const yOffset = i * 10;
      const rotate = i % 2 === 0 ? i * 2.5 : -(i * 2.5);
      gsap.set(el, { scale, y: yOffset, rotate, zIndex: deck.length - i, opacity: 1, x: 0 });
    }
    for (let i = STACK_DEPTH + 1; i < deck.length; i++) {
      const el = cardRefs.current[i];
      if (el) gsap.set(el, { opacity: 0 });
    }
  }, [deck.length]);

  useEffect(() => {
    const top = cardRefs.current[0];
    if (top) {
      gsap.set(top, { x: 0, y: 0, rotate: 0, scale: 1, zIndex: deck.length, opacity: 1 });
    }
    applyStackPositions();
  }, [deck, applyStackPositions]);

  const promoteStack = useCallback(() => {
    const visibleCount = Math.min(STACK_DEPTH, deck.length - 2);
    for (let i = 0; i <= visibleCount; i++) {
      const el = cardRefs.current[i + 1];
      if (!el) continue;
      const scale = 1 - i * 0.05;
      const yOffset = i * 10;
      const rotate = i % 2 === 0 ? i * 2.5 : -(i * 2.5);
      gsap.to(el, { scale, y: yOffset, rotate, zIndex: deck.length - 1 - i, opacity: 1, x: 0, duration: 0.45, ease: "power3.out" });
    }
  }, [deck.length]);

  const throwCard = useCallback(
    (dir: "left" | "right") => {
      if (throwing.current || deck.length === 0) return;
      throwing.current = true;
      const top = cardRefs.current[0];
      if (!top) { throwing.current = false; return; }
      const xOut = dir === "right" ? window.innerWidth * 0.8 : -(window.innerWidth * 0.8);
      const rotate = dir === "right" ? 30 : -30;
      gsap.to(top, {
        x: xOut, y: -80, rotate, opacity: 0, duration: 0.55, ease: "power3.in",
        onStart: () => promoteStack(),
        onComplete: () => {
          setDeck((prev) => [...prev.slice(1), prev[0]]);
          throwing.current = false;
        },
      });
    },
    [deck.length, promoteStack]
  );

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => throwCard("right"), 3500);
    return () => clearInterval(id);
  }, [images.length, throwCard]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (throwing.current) return;
    dragState.current = { startX: e.clientX, startY: e.clientY, dragging: true };
    activeRef.current = cardRefs.current[0];
    activeRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging || !activeRef.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    gsap.set(activeRef.current, { x: dx, y: dy * 0.4, rotate: dx * 0.08 });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 80) {
      throwCard(dx > 0 ? "right" : "left");
    } else {
      gsap.to(activeRef.current, { x: 0, y: 0, rotate: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    }
    activeRef.current = null;
  };

  const visibleDeck = deck.slice(0, Math.min(STACK_DEPTH + 1, deck.length));

  return (
    <div className="apparel-swipe-root">
      <div className="apparel-stack">
        {[...visibleDeck].reverse().map((src, ri) => {
          const i = visibleDeck.length - 1 - ri;
          const isTop = i === 0;
          return (
            <div
              key={src + i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`apparel-card${isTop ? " apparel-card--top" : ""}`}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${title} ${i + 1}`} className="apparel-card__img" draggable={false} />
              {isTop && (
                <div className="apparel-card__hint"><span>drag to swipe</span></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="apparel-controls">
        <button className="apparel-btn" onClick={() => throwCard("left")} aria-label="Previous">&#8249;</button>
        <div className="apparel-dots">
          {images.map((_, i) => {
            const activeIdx = images.indexOf(deck[0]);
            return <span key={i} className={`apparel-dot${i === activeIdx ? " apparel-dot--active" : ""}`} />;
          })}
        </div>
        <button className="apparel-btn" onClick={() => throwCard("right")} aria-label="Next">&#8250;</button>
      </div>

      <style>{`
        .apparel-swipe-root { position:relative; width:100%; display:flex; flex-direction:column; align-items:center; gap:16px; user-select:none; -webkit-user-select:none; }
        .apparel-stack { position:relative; width:100%; aspect-ratio:1/1; display:flex; align-items:center; justify-content:center; }
        .apparel-card { position:absolute; width:78%; aspect-ratio:1/1; border-radius:16px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.20),0 2px 8px rgba(0,0,0,0.12); background:#111; transform-origin:bottom center; will-change:transform,opacity; }
        .apparel-card--top { cursor:grab; touch-action:none; }
        .apparel-card--top:active { cursor:grabbing; }
        .apparel-card__img { width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; border-radius:16px; }
        .apparel-card__hint { position:absolute; bottom:14px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.45); backdrop-filter:blur(10px); border-radius:999px; padding:5px 16px; font-size:9px; letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,0.7); pointer-events:none; white-space:nowrap; animation:hintPulse 2.6s ease-in-out infinite; }
        @keyframes hintPulse { 0%,100% { opacity:0.55; } 50% { opacity:1; } }
        .apparel-controls { display:flex; align-items:center; gap:10px; width:100%; justify-content:center; }
        .apparel-btn { width:34px; height:34px; border-radius:50%; border:1px solid rgba(128,128,128,0.22); background:transparent; color:inherit; font-size:20px; line-height:1; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s,border-color 0.2s,transform 0.15s; flex-shrink:0; }
        .apparel-btn:hover { background:rgba(128,128,128,0.12); border-color:rgba(128,128,128,0.4); transform:scale(1.1); }
        .apparel-dots { display:flex; gap:5px; flex-wrap:wrap; justify-content:center; flex:1; }
        .apparel-dot { width:5px; height:5px; border-radius:50%; background:rgba(128,128,128,0.3); transition:all 0.3s ease; display:block; }
        .apparel-dot--active { background:currentColor; transform:scale(1.5); opacity:0.9; }
      `}</style>
    </div>
  );
}