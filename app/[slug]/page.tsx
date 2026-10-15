// Página de cada edificio con ficha cargada en data/edificios.ts.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FichaLibro } from "@/components/FichaLibro";
import { FichaVenta } from "@/components/FichaVenta";
import { Pagina } from "@/components/Pagina";
import { buscarEdificio, conFicha } from "@/data/edificios";

export const dynamicParams = false;

export function generateStaticParams() {
  return conFicha.map((e) => ({ slug: e.slug }));
}

const limpiar = (s: string) => s.replace(/\s*\[[^\]]*\]/g, "").trim();

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = buscarEdificio(slug);
  if (!e) return {};
  const lugar = limpiar(`${e.direccion}, ${e.barrio}`).replace(/^,\s*/, "");
  const title =
    e.estado === "venta"
      ? { absolute: `${e.nombre} · En venta en ${e.barrio}, Santa Fe | NEO` }
      : { absolute: `${e.nombre} · ${lugar} | Obra entregada` };
  const description =
    e.estado === "venta"
      ? `${e.nombre}: ${limpiar(e.tarjetaTexto ?? e.resumen)} Proyecto y obra NEO.`
      : `${e.nombre}: edificio en ${lugar}, Santa Fe. Una de las obras entregadas por NEO.`;
  return { title, description, alternates: { canonical: `/${e.slug}` }, openGraph: { title: title.absolute, description, url: `/${e.slug}` } };
}

export default async function EdificioPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const e = buscarEdificio(slug);
  if (!e) notFound();

  if (e.fichaVenta)
    return (
      <Pagina mensajeWa={`Hola NEO, me interesa ${e.nombre} (${e.direccion}, ${e.barrio}).`}>
        <FichaVenta e={e} />
      </Pagina>
    );
  if (e.fichaLibro) return <FichaLibro e={e} />;
  notFound();
}
