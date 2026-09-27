import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { categorias } from "@/data/categorias";
import { getEntradaPorSlug, getEntradas } from "@/lib/content";

const categoria = categorias.find((c) => c.slug === "programacion")!;

export function generateStaticParams() {
  return getEntradas(categoria.slug).map((entrada) => ({
    slug: entrada.slug,
  }));
}

export default async function EntradaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entrada = getEntradaPorSlug(categoria.slug, slug);
  if (!entrada) notFound();

  return (
    <main className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-16">
      <Link
        href="/programacion"
        className="font-mono text-xs text-slate-500 transition hover:text-pink-400"
      >
        ← {categoria.nombre}
      </Link>

      <article className="mt-6">
        <time className="font-mono text-xs text-fuchsia-400">
          {entrada.fecha}
        </time>
        <h1 className="mt-2 font-mono text-4xl font-bold tracking-tight text-text">
          {entrada.titulo}
        </h1>
        <p className="mt-4 text-lg text-slate-400">{entrada.resumen}</p>

        <div className="my-10 h-px bg-gradient-to-r from-pink-500/60 via-fuchsia-500/30 to-transparent" />

        <div
          className="prose prose-invert max-w-none
          prose-headings:font-mono prose-headings:text-pink-300
          prose-strong:text-text prose-a:text-pink-400
          prose-li:text-slate-300 prose-p:text-slate-300"
        >
          <ReactMarkdown>{entrada.contenido}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
