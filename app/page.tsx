import Link from "next/link";
import { categorias } from "@/data/categorias";
import { getEntradas } from "@/lib/content";
import { getEntradasDB } from "@/lib/content-db";

const glow = [
  "group-hover:border-pink-500/80 group-hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]",
  "group-hover:border-fuchsia-500/80 group-hover:shadow-[0_0_40px_rgba(217,70,239,0.25)]",
  "group-hover:border-rose-500/80 group-hover:shadow-[0_0_40px_rgba(244,63,94,0.25)]",
  "group-hover:border-purple-500/80 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]",
  "group-hover:border-pink-400/80 group-hover:shadow-[0_0_40px_rgba(244,114,182,0.25)]",
];

export default function Home() {
  const totalEntradas = getTotalEntradas(categorias.map((c) => c.slug));

  return (
    <main className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <div className="mb-24 space-y-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 font-mono text-xs text-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
          <span className="h-2 w-2 rounded-full bg-pink-500" />
          NODO // {totalEntradas} ENTRADAS
        </div>
        <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
          Central de{" "}
          <span className="bg-gradient-to-r from-pink-500 via-fuchsia-400 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(236,72,153,0.6)]">
            conocimiento
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-slate-400 md:text-lg">
          Bitácora de una estudiante de mecatrónica: matemáticas, física,
          programación, electrónica y proyectos, documentados a medida que
          se aprenden.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {categorias.map((cat, i) => {
          const numEntradas = conteos.find((c) => c.slug === cat.slug)?.count ?? 0;
          return (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className={`group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-surface/80 p-8 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 ${glow[i % glow.length]}`}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent blur-3xl transition-transform duration-700 group-hover:scale-150" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-full border border-pink-500/20 bg-pink-500/10 px-3.5 py-1.5 font-mono text-xs text-pink-400 shadow-inner">
                      {cat.slug}.mod
                    </span>
                    <span className="font-mono text-xs text-slate-600 transition group-hover:text-pink-400">
                      {numEntradas} entradas
                    </span>
                  </div>
                  <h3 className="mb-3 font-mono text-3xl font-bold tracking-tight transition-colors group-hover:text-pink-300">
                    {cat.nombre}
                  </h3>
                  <p className="mb-8 text-sm font-light leading-relaxed text-slate-400">
                    {cat.descripcion}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-800/60 pt-4 font-mono text-xs text-pink-400 transition group-hover:text-pink-300">
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    ejecutar_modulo()
                  </span>
                  <span className="text-base font-bold transition-transform duration-300 group-hover:translate-x-2.5">
                    →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
