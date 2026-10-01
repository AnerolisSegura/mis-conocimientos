import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);
const CONTENT_DIR = path.join(process.cwd(), "content", "matematicas");

async function migrar() {
  const archivos = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  console.log(`Encontrados ${archivos.length} archivo(s) en matematicas/`);

  for (const archivo of archivos) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, archivo), "utf-8");
    const { data, content } = matter(raw);
    const slug = archivo.replace(/\.md$/, "");

    const { error } = await supabase.from("entradas").upsert(
      {
        categoria: "matematicas",
        slug,
        titulo: data.titulo ?? slug,
        fecha: data.fecha ?? null,
        resumen: data.resumen ?? "",
        contenido: content.trim(),
        tags: data.tags ?? [],
      },
      { onConflict: "categoria,slug" }
    );

    if (error) console.error(`✗ Error migrando ${archivo}:`, error.message);
    else console.log(`✓ Migrado: ${slug}`);
  }
  console.log("Listo.");
}

migrar();