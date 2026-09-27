"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { categorias } from "@/data/categorias";

export default function Header() {
  const [streak, setStreak] = useState(1);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Racha de estudio, guardada en localStorage (por navegador, no compartida)
  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem("nodo_last_visit");
    let current = parseInt(localStorage.getItem("nodo_streak") || "1", 10);
    if (lastVisit !== today) {
      if (lastVisit) {
        const diffDays = Math.ceil(
          (new Date().getTime() - new Date(lastVisit).getTime()) / 86400000
        );
        if (diffDays === 1) current += 1;
        else if (diffDays > 1) current = 1;
      }
      localStorage.setItem("nodo_streak", String(current));
      localStorage.setItem("nodo_last_visit", today);
    }
    setStreak(current);
  }, []);

  // Luz que sigue al cursor
  useEffect(() => {
    const move = (e: MouseEvent) => {
      glowRef.current?.style.setProperty(
        "transform",
        `translate(${e.clientX}px, ${e.clientY}px)`
      );
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Paleta de comandos con Ctrl/Cmd+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-600/15 via-fuchsia-600/10 to-purple-600/15 blur-[160px]"
      />

      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800/80 bg-[#05060a]/90 px-6 py-3.5 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/90 shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/90 shadow-[0_0_10px_rgba(234,179,8,0.7)]" />
            <span className="h-3 w-3 rounded-full bg-green-500/90 shadow-[0_0_10px_rgba(34,197,94,0.7)]" />
          </div>
          <button
            onClick={() => setOpen(true)}
            className="ml-4 hidden items-center gap-3 rounded-lg border border-slate-800 bg-base px-3.5 py-1.5 font-mono text-xs text-slate-400 shadow-inner transition hover:border-pink-500/60 sm:flex"
          >
            <span className="text-pink-400">⚡ Buscar módulo...</span>
            <kbd className="rounded border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
              Ctrl+K
            </kbd>
          </button>
        </div>

        <nav className="flex items-center gap-4 font-mono text-xs">
          <div className="hidden items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 text-slate-400 shadow-sm md:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Racha: <strong className="text-pink-400">{streak}</strong> días
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/90 px-4 py-1.5 text-slate-200 shadow-md transition hover:border-pink-500/50 hover:text-pink-400"
          >
            GitHub ↗
          </a>
        </nav>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/85 px-4 pt-24 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-pink-500/40 bg-[#090a10] font-mono shadow-[0_0_60px_rgba(236,72,153,0.3)]">
            <div className="flex items-center border-b border-slate-800 bg-[#05060a] p-4">
              <span className="mr-3 text-pink-400">🔍</span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Escribe un comando o busca un módulo..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="rounded border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-400 transition hover:text-white"
              >
                ESC
              </button>
            </div>
            <div className="space-y-1 bg-surface p-2 text-sm">
              {categorias.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl p-3.5 text-slate-300 transition hover:bg-pink-500/15 hover:text-pink-400"
                >
                  <span>Ir a {cat.nombre}</span>
                  <span className="text-xs text-slate-500">/{cat.slug}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
