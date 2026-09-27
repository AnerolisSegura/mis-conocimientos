import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Entrada = {
  slug: string;
  titulo: string;
  fecha: string;
  resumen: string;
  contenido: string;
};

/**
 * Lee todos los archivos .md dentro de content/<categoriaSlug>/
 * y los devuelve como entradas, más recientes primero.
 */
export function getEntradas(categoriaSlug: string): Entrada[] {
  const dir = path.join(CONTENT_DIR, categoriaSlug);
  if (!fs.existsSync(dir)) return [];

  const archivos = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const entradas = archivos.map((archivo) => {
    const ruta = path.join(dir, archivo);
    const raw = fs.readFileSync(ruta, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug: archivo.replace(/\.md$/, ""),
      titulo: (data.titulo as string) ?? archivo,
      fecha: (data.fecha as string) ?? "",
      resumen: (data.resumen as string) ?? "",
      contenido: content.trim(),
    };
  });

  return entradas.sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
}

/** Busca una entrada puntual dentro de una categoría por su slug. */
export function getEntradaPorSlug(
  categoriaSlug: string,
  slug: string
): Entrada | null {
  const ruta = path.join(CONTENT_DIR, categoriaSlug, `${slug}.md`);
  if (!fs.existsSync(ruta)) return null;

  const raw = fs.readFileSync(ruta, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    titulo: (data.titulo as string) ?? slug,
    fecha: (data.fecha as string) ?? "",
    resumen: (data.resumen as string) ?? "",
    contenido: content.trim(),
  };
}

/** Cuenta total de entradas across todas las categorías dadas. */
export function getTotalEntradas(slugs: string[]): number {
  return slugs.reduce((total, slug) => total + getEntradas(slug).length, 0);
}