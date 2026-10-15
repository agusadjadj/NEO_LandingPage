// Bitácora de obra: una entrada por publicación de Instagram, la más nueva primero.
// Las tres primeras se muestran también en el Inicio.

import type { Foto } from "./edificios";

export type Entrada = {
  /** Día y mes/año como se muestran: dia "12", fecha "Ene 2026". */
  dia: string;
  fecha: string;
  /** Filtros a los que pertenece (ver `filtros`). */
  edificios: string[];
  etiqueta: string;
  titulo: string;
  texto: string;
  foto: Foto;
};

export const filtros = [
  { id: "torre", nombre: "NEO ALEM Torre" },
  { id: "barra", nombre: "NEO ALEM Barra" },
  { id: "pozo", nombre: "NEO ALEM (pozo)" },
  { id: "n19", nombre: "NEO 19" },
];

const img = (archivo: string) => `bitacora/${archivo}`;

export const entradas: Entrada[] = [
  {
    dia: "12",
    fecha: "Ene 2026",
    edificios: ["torre"],
    etiqueta: "NEO ALEM Torre · Fundaciones",
    titulo: "Pilotaje terminado: empieza la excavación del subsuelo",
    texto: "Arrancamos el año en obra. Seguimos avanzando con las fundaciones de la torre.",
    foto: { src: img("2026-01-pilotaje"), que: "Toma de dron sobre la excavación", firma: "Foto: dron NEO" },
  },
  {
    dia: "16",
    fecha: "[mes año]",
    edificios: ["torre", "barra"],
    etiqueta: "NEO ALEM · Proyecto",
    titulo: "Así será el paseo peatonal y comercial",
    texto: "Todo el desarrollo queda comunicado por un paseo con locales, parquización, cámaras y seguridad privada.",
    foto: { src: img("paseo-peatonal"), que: "Render del paseo peatonal", firma: "Render: NEO" },
  },
  {
    dia: "[dd]",
    fecha: "[mes año]",
    edificios: ["torre"],
    etiqueta: "NEO ALEM Torre · [Etapa]",
    titulo: "[Título de la entrada]",
    texto: "[Texto de la publicación de Instagram]",
    foto: { src: img("torre-avance-1"), que: "Toma de dron mensual, mismo punto", firma: "Foto: dron NEO" },
  },
  {
    dia: "[dd]",
    fecha: "[mes año]",
    edificios: ["barra"],
    etiqueta: "NEO ALEM Barra · [Etapa]",
    titulo: "[Título de la entrada]",
    texto: "[Texto de la publicación de Instagram]",
    foto: { src: img("barra-avance-1"), que: "Avance de NEO ALEM Barra", firma: "Foto: NEO" },
  },
  {
    dia: "[dd]",
    fecha: "[mes año]",
    edificios: ["barra"],
    etiqueta: "NEO ALEM Barra · [Etapa]",
    titulo: "[Título de la entrada]",
    texto: "[Texto de la publicación de Instagram]",
    foto: { src: img("barra-avance-2"), que: "Avance de NEO ALEM Barra", firma: "Foto: NEO" },
  },
  {
    dia: "[dd]",
    fecha: "[mes año]",
    edificios: ["pozo"],
    etiqueta: "NEO ALEM (pozo) · [Etapa]",
    titulo: "[Título de la entrada]",
    texto: "[Texto de la publicación de Instagram]",
    foto: { src: img("terreno"), que: "Foto del terreno", firma: "Foto: NEO" },
  },
  {
    dia: "[dd]",
    fecha: "2024",
    edificios: ["n19"],
    etiqueta: "NEO 19 · [Etapa]",
    titulo: "[Título de la entrada]",
    texto: "[Texto de la publicación de Instagram]",
    foto: { src: img("neo-19-obra"), que: "Foto de obra de NEO 19", firma: "Foto: NEO" },
  },
];
