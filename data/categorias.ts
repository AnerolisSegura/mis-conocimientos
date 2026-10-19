export type Categoria = {
  slug: string;
  nombre: string;
  descripcion: string;
};

export const categorias: Categoria[] = [
  {
    slug: "matematicas",
    nombre: "Matemáticas",
    descripcion: "Cálculo, álgebra lineal y todo lo que sostiene el resto.",
  },
  {
    slug: "fisica",
    nombre: "Física",
    descripcion: "Mecánica, electromagnetismo y su conexión con mecatrónica.",
  },
  {
    slug: "programacion",
    nombre: "Programación",
    descripcion: "Full stack, automatización y lo que vas aprendiendo con Claude.",
  },
  {
    slug: "electronica",
    nombre: "Electrónica",
    descripcion: "Circuitos, sensores y control — el lado físico de mecatrónica.",
  },
  {
    slug: "proyectos",
    nombre: "Proyectos",
    descripcion: "SATU-Mecatrónico y otros proyectos aplicados, documentados en curso.",
  },
  {
    slug: "helpdesk",
    nombre: "Helpdesk",
    descripcion: "Help Desk y Stack",
  },
   {
    slug: "modelado",
    nombre: "Modelado",
    descripcion: "En esta sección puedes modelar fórmulas y sistemas escribiendo simplemente lo que quieres, como si le dieras un prompt a una IA",
  },
  {
    slug: "teoria-de-control",
    nombre: "Teoría de Control",
    descripcion: "Conceptos y aplicaciones de la teoría de control en sistemas mecatrónicos.La teoría de control estudia cómo hacer que un sistema se comporte como queremos, usando realimentación para mantenerlo estable y preciso.",
  },
];
