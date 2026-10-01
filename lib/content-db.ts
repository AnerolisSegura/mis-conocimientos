import { supabase } from "./supabase";
import type { Entrada } from "./content";

export async function getEntradasDB(categoria: string): Promise<Entrada[]> {
  const { data, error } = await supabase
    .from("entradas")
    .select("*")
    .eq("categoria", categoria)
    .order("fecha", { ascending: false });

  if (error) {
    console.error("Error leyendo entradas de Supabase:", error.message);
    return [];
  }

  return (data ?? []).map((fila) => ({
    slug: fila.slug,
    titulo: fila.titulo,
    fecha: fila.fecha,
    resumen: fila.resumen,
    contenido: fila.contenido,
    tags: fila.tags ?? [],
  }));
}

export async function getEntradaPorSlugDB(
  categoria: string,
  slug: string
): Promise<Entrada | null> {
  const { data, error } = await supabase
    .from("entradas")
    .select("*")
    .eq("categoria", categoria)
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;

  return {
    slug: data.slug,
    titulo: data.titulo,
    fecha: data.fecha,
    resumen: data.resumen,
    contenido: data.contenido,
    tags: data.tags ?? [],
  };
}