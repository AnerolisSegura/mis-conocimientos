# Nodo

Bitácora técnica personal — matemáticas, física, programación, electrónica y
proyectos, documentados a medida que se aprenden. Next.js + Tailwind, con
un diseño cyberpunk estilo IDE: fondo casi-negro, grid de circuito, neón
rosa/fucsia/púrpura, contador de racha (localStorage) y paleta de comandos
con Ctrl+K.

## Poner en marcha hoy

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. La página de inicio y la categoría
**Matemáticas** ya funcionan; son la plantilla para las otras 4.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Setup inicial: landing + Tailwind + categoría Matemáticas"
git branch -M main
git remote add origin <URL-de-tu-repo-en-GitHub>
git push -u origin main
```

## Hoja de ruta (paso a paso, un bloque por día)

**Día 1 — hoy: fundación + frontend**
- [x] Estructura del proyecto, Tailwind, tokens de diseño cyberpunk neón
- [x] Landing page con grid de categorías y glow por categoría
- [x] Página de categoría (Matemáticas) como plantilla
- [x] Header estilo IDE: racha de estudio (localStorage) y paleta de
      comandos con Ctrl+K (`app/components/Header.tsx`)
- [ ] Cambia el link de GitHub en `Header.tsx` por el de tu repo real
- [ ] Duplicar la plantilla para Física, Programación, Electrónica y
      Proyectos (copia `app/matematicas/page.tsx` a `app/fisica/page.tsx`,
      etc., cambiando `"matematicas"` por el slug correspondiente)
- [ ] Repo inicializado y subido a GitHub

**Día 2 — contenido dinámico**
- [x] Entradas movidas a archivos `.md` individuales en `content/<categoria>/`
- [x] `lib/content.ts` lee esa carpeta y arma la lista automáticamente
      (usa `gray-matter` para el frontmatter — corre `npm install` de nuevo
      para traerla)
- [ ] Conectar Física, Programación, Electrónica y Proyectos igual que
      Matemáticas (copia `app/matematicas/page.tsx`, cambia el slug)

**Cómo escribir una entrada nueva (a partir de hoy):**
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
Guarda el archivo y recarga la página — no hay que tocar código.

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
