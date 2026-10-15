// npm run fotos — lista cada lugar de foto del sitio, si ya tiene foto propia,
// foto de stock provisoria o si falta, y actualiza docs/FOTOS.md.
import fs from "node:fs";
import path from "node:path";
import { edificios, type Foto } from "../data/edificios.ts";
import { entradas } from "../data/bitacora.ts";
import { fotosComoTrabajamos, fotosInicio } from "../data/paginas.ts";

const RAIZ = path.join(import.meta.dirname, "..");
const IMG = path.join(RAIZ, "public", "img");
const EXT = ["jpg", "webp", "png", "jpeg"];

function estado(src: string): "propia" | "stock" | "falta" {
  for (const [sufijo, e] of [["", "propia"], [".stock", "stock"]] as const)
    if (EXT.some((x) => fs.existsSync(path.join(IMG, `${src}${sufijo}.${x}`)))) return e;
  return "falta";
}

const grupos: [string, Foto[]][] = [
  ["Inicio", [fotosInicio.portada, fotosInicio.equipo]],
  ...edificios.map((e): [string, Foto[]] => {
    const v = e.fichaVenta;
    const fotos = [
      e.fachada,
      ...(e.tarjeta ? [e.tarjeta] : []),
      ...(v ? [v.portada, ...v.capitulos.map((c) => c.foto), ...v.tipologias.map((t) => t.foto), v.terminaciones.foto, ...v.avance.hitos.map((h) => h.foto)] : []),
      ...(e.fichaLibro?.fotos ?? []),
    ];
    const unicas = fotos.filter((f, i) => fotos.findIndex((g) => g.src === f.src) === i);
    return [e.nombre, unicas];
  }),
  ["Cómo trabajamos", [fotosComoTrabajamos.portada, ...fotosComoTrabajamos.etapas, fotosComoTrabajamos.renderFirmado, ...fotosComoTrabajamos.equipo.map((p) => p.foto)]],
  ["Bitácora", entradas.map((e) => e.foto)],
];

const marca = { propia: "✔ propia", stock: "◐ stock", falta: "✖ falta" };
const cuenta = { propia: 0, stock: 0, falta: 0 };
const md: string[] = [
  "# Fotos del sitio",
  "",
  "Este archivo lo genera `npm run fotos`. No editarlo a mano.",
  "",
  "## Cómo cargar una foto",
  "",
  "1. Buscá el lugar en la lista de abajo. La columna **Archivo** dice dónde va, dentro de `public/img/`.",
  "2. Guardá la foto con ese nombre y extensión `.jpg`, `.webp` o `.png`. Ejemplo: `public/img/edificios/neo-17/fachada.jpg`.",
  "3. Si ya había una foto de stock (`fachada.stock.jpg`), la tuya tiene prioridad. Podés borrar la de stock.",
  "4. Corré `npm run fotos` para ver qué falta, y hacé push: Vercel publica el sitio con las fotos nuevas.",
  "",
  "Tamaño recomendado: 2000 px de ancho (fachadas verticales, 1500 × 2000), menos de 300 KB.",
  "",
  "Las fotos de stock (`*.stock.jpg`) son provisorias y **no son obras de NEO**: el sitio les pone la firma \"Imagen ilustrativa\". Sus créditos están en [CREDITOS.md](CREDITOS.md).",
  "",
];

for (const [titulo, fotos] of grupos) {
  md.push(`## ${titulo}`, "", "| Estado | Archivo | Qué foto va |", "|---|---|---|");
  console.log(`\n${titulo}`);
  for (const f of fotos) {
    const e = estado(f.src);
    cuenta[e]++;
    md.push(`| ${marca[e]} | \`${f.src}\` | ${f.que} |`);
    console.log(`  ${marca[e].padEnd(9)} ${f.src.padEnd(42)} ${f.que}`);
  }
  md.push("");
}

fs.writeFileSync(path.join(RAIZ, "docs", "FOTOS.md"), md.join("\n"));
console.log(`\n${cuenta.propia} propias · ${cuenta.stock} de stock · ${cuenta.falta} faltan → docs/FOTOS.md actualizado`);
