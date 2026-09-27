import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Nodo — Central de conocimiento",
  description:
    "Bitácora de aprendizaje: matemáticas, física, programación, electrónica y proyectos, documentados a medida que se construyen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`dark ${display.variable} ${mono.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden bg-base font-sans text-text selection:bg-pink-500 selection:text-base">
        <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#1f1f2e12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <Header />
        {children}
        <footer className="relative z-10 mt-32 border-t border-slate-900 bg-[#020204] py-8 text-center font-mono text-xs text-slate-600">
          NODO // SISTEMA ACTIVO
        </footer>
      </body>
    </html>
  );
}
