import type { MetadataRoute } from "next";
import { conFicha } from "@/data/edificios";
import { sitio } from "@/data/sitio";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = ["", "/obras", "/invertir", "/como-trabajamos", "/bitacora", "/contacto", ...conFicha.map((e) => `/${e.slug}`)];
  return paginas.map((p) => ({ url: `${sitio.url}${p}` }));
}
