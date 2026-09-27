import Link from "next/link";
import { categorias } from "@/data/categorias";
import { getEntradas } from "@/lib/content";

const categoria = categorias.find((c) => c.slug === "fisica")!;

export default function MatematicasPage() {
  const entradas = getEntradas(categoria.slug);

  return (
    <main className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-16">
      <Link
        href="/"
        className="font-mono text-xs text-slate-500 transition hover:text-pink-400"
      >
        ← nodo
      </Link>

      <div className="mt-6 mb-10">
        <span className="rounded-full border border-pink-500/20 bg-pink-500/10 px-3.5 py-1.5 font-mono text-xs text-pink-400 shadow-inner">
          {categoria.slug}.mod
        </span>
        <h1 className="mt-4 font-mono text-4xl font-bold tracking-tight text-text">
          {categoria.nombre}
        </h1>
        <p className="mt-3 text-slate-400">{categoria.descripcion}</p>
      </div>

      <div className="divide-y divide-slate-800/60">
        {entradas.length === 0 && (
          <p className="py-8 font-mono text-sm text-slate-500">
            Todavía no hay entradas aquí. La primera va apenas la escribas.
          </p>
        )}
        {entradas.map((entrada) => (
          <Link
            key={entrada.slug}
            href={`/fisica/${entrada.slug}`}
            className="block py-8 transition hover:bg-pink-500/5"
          >
            <time className="font-mono text-xs text-fuchsia-400">
              {entrada.fecha}
            </time>
            <h2 className="mt-2 font-mono text-2xl font-bold text-text transition hover:text-pink-300">
              {entrada.titulo}
            </h2>
            <p className="mt-2 text-slate-400">{entrada.resumen}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
