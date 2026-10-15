// Fotos fijas de las páginas (las de edificios y bitácora están en sus propios archivos).
import type { Foto } from "./edificios";

export const fotosInicio = {
  portada: { src: "inicio/portada", que: "Toma de dron de NEO ALEM Torre y Barra al atardecer", firma: "Foto: dron NEO · NEO ALEM Torre y Barra, Candioti · [atardecer]" },
  equipo: { src: "inicio/equipo", que: "Foto grupal del equipo en obra revisando planos", firma: "Foto: NEO" },
} satisfies Record<string, Foto>;

const ct = (archivo: string) => `como-trabajamos/${archivo}`;

export const fotosComoTrabajamos = {
  portada: { src: ct("portada"), que: "Foto grande del equipo en obra revisando planos", firma: "Foto: NEO" },
  etapas: [
    { src: ct("etapa-proyecto"), que: "Plano o maqueta sobre la mesa", firma: "Foto: NEO" },
    { src: ct("etapa-renders"), que: "Render con su versión y fecha", firma: "Foto: NEO" },
    { src: ct("etapa-obra"), que: "Obra en curso, toma de dron", firma: "Foto: NEO" },
    { src: ct("etapa-entrega"), que: "Entrega de llaves", firma: "Foto: NEO" },
  ] as Foto[],
  renderFirmado: { src: ct("render-firmado"), que: "Render con firma visible: versión y fecha", firma: "Render: NEO · v[n] · [fecha]" },
  /** Retratos del equipo: equipo-1, equipo-2… Completar nombre y rol. */
  equipo: [1, 2, 3, 4].map((n) => ({
    nombre: "[Nombre]",
    rol: "[Rol]",
    foto: { src: ct(`equipo-${n}`), que: "Retrato en obra", firma: "Foto: NEO" } as Foto,
  })),
};
