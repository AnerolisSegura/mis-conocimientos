# Nodo

Bitácora técnica personal — matemáticas, física, programación, electrónica y
proyectos, documentados a medida que se aprenden. Next.js + Tailwind, con
un diseño cyberpunk estilo IDE: fondo casi-negro, grid de circuito, neón
rosa/fucsia/púrpura, contador de racha (localStorage) y paleta de comandos
con Ctrl+K.

## Poner en marcha

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Subir cambios a GitHub

```bash
git add .
git commit -m "mensaje describiendo el cambio"
git push
```

## Cómo escribir una entrada nueva

Crea un archivo `.md` en `content/<categoria>/`, por ejemplo
`content/matematicas/limites.md`:
```md
---
titulo: "Límites y continuidad"
fecha: "2026-09-27"
resumen: "Repaso de límites laterales y el teorema del valor intermedio."
---

Aquí va el contenido completo de la entrada.
```
Guarda el archivo y recarga la página — no hay que tocar código. Cada
entrada obtiene automáticamente su propia página en `/<categoria>/<slug>`
(el slug es el nombre del archivo sin `.md`).

## Historial de avance (qué se hizo, y por qué)

**Día 1 — fundación y frontend**
Se creó el proyecto base: Next.js (App Router) + TypeScript + Tailwind.
El diseño se definió como cyberpunk estilo IDE (fondo casi-negro, grid de
circuito de fondo, acentos neón rosa/fucsia/púrpura) para que el sitio se
sintiera como una terminal de desarrollo, no como un blog genérico.
Se construyó la landing con un grid de 5 categorías (Matemáticas, Física,
Programación, Electrónica, Proyectos) y la página de Matemáticas como
plantilla para las demás. El header (`app/components/Header.tsx`) suma
tres piezas interactivas: los tres puntos de colores estilo editor, un
contador de racha de estudio guardado en `localStorage`, y una paleta de
comandos (Ctrl+K) para saltar entre categorías sin usar el mouse.

**Día 2 — contenido dinámico**
Al principio las entradas vivían como un arreglo hardcodeado dentro de
`data/categorias.ts` — escribir algo nuevo significaba editar código.
Se cambió el modelo: cada entrada ahora es un archivo `.md` independiente
dentro de `content/<categoria>/`, con `titulo`, `fecha` y `resumen` en el
frontmatter. `lib/content.ts` (usando `gray-matter`) lee esa carpeta en
cada build/petición y arma la lista automáticamente — así, agregar
contenido nuevo es solo crear un archivo, no tocar el código del sitio.
`data/categorias.ts` quedó reducido a solo el nombre y la descripción de
cada categoría.

**Página individual por entrada + corrección de Next.js 16**
Las entradas se mostraban en la lista pero no llevaban a ningún lado al
hacer clic. Se creó la ruta dinámica `app/matematicas/[slug]/page.tsx`,
que busca la entrada por su slug (`getEntradaPorSlug` en `lib/content.ts`)
y renderiza el contenido completo con `react-markdown` (con el plugin
`@tailwindcss/typography` para que los títulos, listas y negritas del
Markdown se vean bien formateados, no como texto plano). Al implementarla
apareció un 404: el proyecto corre sobre Next.js 16, donde `params` en una
página dinámica dejó de ser un objeto directo y pasó a ser una `Promise`
(`params: Promise<{ slug: string }>`, resuelta con
`const { slug } = await params`). Con ese ajuste, la navegación
lista → entrada individual quedó funcionando.

## Contenido publicado hasta ahora

**Matemáticas**
- *Primera entrada* — explica cómo funciona el sistema de contenido (un
  archivo `.md` por entrada).
- *Pre-cálculo: la base que sostiene todo* — qué debería cubrir un repaso
  de pre-cálculo (álgebra, funciones, trigonometría, sucesiones), por qué
  es la base indispensable antes del cálculo (y por qué pesa doble en
  mecatrónica), técnicas concretas para agilizar el cálculo mental
  (romper números, memorizar anclas, estimar antes de calcular, practicar
  sin calculadora), y la diferencia entre practicar mucho y practicar de
  forma consciente (revisar el error, identificar el patrón, medir la
  velocidad con el tiempo).

## Hoja de ruta (paso a paso, un bloque por día)

**Día 1 — fundación + frontend** ✅
- [x] Estructura del proyecto, Tailwind, tokens de diseño cyberpunk neón
- [x] Landing page con grid de categorías y glow por categoría
- [x] Página de categoría (Matemáticas) como plantilla
- [x] Header estilo IDE: racha de estudio (localStorage) y paleta de
      comandos con Ctrl+K
- [x] Repo inicializado y subido a GitHub
- [ ] Cambia el link de GitHub en `Header.tsx` por el de tu repo real

**Día 2 — contenido dinámico** ✅
- [x] Entradas movidas a archivos `.md` individuales en `content/<categoria>/`
- [x] `lib/content.ts` lee esa carpeta y arma la lista automáticamente
- [x] Página individual por entrada (`/matematicas/<slug>`) con Markdown
      renderizado
- [ ] Conectar Física, Programación, Electrónica y Proyectos igual que
      Matemáticas (copia `app/matematicas/page.tsx` y
      `app/matematicas/[slug]/page.tsx`, cambia el slug)

**Día 3 — base de datos**
- Conectar Supabase (o el proveedor que prefieras) para guardar entradas,
  tags y fecha de forma estructurada en vez de archivos planos
- Migrar el contenido de Matemáticas como prueba

**Día 4 — API y búsqueda**
- Ruta de API (`app/api/entradas/route.ts`) que devuelva entradas
  filtradas por categoría o tag
- Buscador simple en el frontend que consuma esa API

**Día 5 — pulido y despliegue**
- Revisar accesibilidad (foco visible, contraste, `prefers-reduced-motion`
  — ya cubierto en `globals.css`, pero vale la pena repasarlo)
- Desplegar en Vercel, conectar el repo de GitHub
- Añadir el link al portafolio y a LinkedIn
