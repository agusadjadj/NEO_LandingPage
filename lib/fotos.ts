import fs from "node:fs";
import path from "node:path";

// Busca la foto en public/img al compilar. La foto propia (fachada.jpg) tiene
// prioridad sobre la de stock provisoria (fachada.stock.jpg).
const EXT = ["jpg", "webp", "png", "jpeg"];
const RAIZ = path.join(process.cwd(), "public", "img");

export type FotoResuelta = { url: string; ilustrativa: boolean };

export function resolverFoto(src: string): FotoResuelta | null {
  for (const sufijo of ["", ".stock"]) {
    for (const ext of EXT) {
      const rel = `${src}${sufijo}.${ext}`;
      if (fs.existsSync(path.join(RAIZ, rel))) return { url: `/img/${rel}`, ilustrativa: sufijo === ".stock" };
    }
  }
  return null;
}
