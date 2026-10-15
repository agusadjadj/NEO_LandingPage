import type { Metadata } from "next";
import { MapaObras, TablaObras, TarjetaFachada } from "@/components/Catalogo";
import { Filtros, Vistas } from "@/components/Interactivos";
import { Pagina } from "@/components/Pagina";
import { edificios, enVenta, entregados } from "@/data/edificios";

export const metadata: Metadata = {
  title: { absolute: "Obras · Catálogo numerado de edificios NEO en Santa Fe" },
  description: `Las obras de NEO numeradas: ${entregados.length} edificios entregados y ${enVenta.length} en venta en Santa Fe. Filtrá por estado o miralas en el mapa.`,
  alternates: { canonical: "/obras" },
};

export default function Obras() {
  return (
    <Pagina mensajeWa="Hola NEO, quiero consultar por sus obras.">
      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 0, borderBottom: "1.5px solid var(--ink)", paddingBottom: 24 }}>
            <h1 className="h-page">Obras</h1>
            <p className="eyebrow" style={{ margin: 0 }}>
              {edificios.length} proyectos · <b style={{ color: "var(--ink)" }}>{entregados.length} entregados</b> · {enVenta.length} en venta
            </p>
          </div>
          <div className="toolbar">
            <Filtros
              objetivo="#obras-views"
              opciones={[
                { id: "all", texto: "Todas" },
                { id: "sale", texto: "En venta" },
                { id: "obra", texto: "En obra" },
                { id: "done", texto: "Entregadas" },
              ]}
            />
            <Vistas
              inicial="v-list"
              opciones={[
                { id: "v-img", texto: "Imagen" },
                { id: "v-list", texto: "Lista" },
                { id: "v-map", texto: "Mapa" },
              ]}
            />
          </div>
          <div id="obras-views">
            <div className="view on" id="v-list">
              <TablaObras />
            </div>
            <div className="view" id="v-img">
              <div className="grid-4">
                {edificios.map((e) => (
                  <TarjetaFachada key={e.slug} e={e} />
                ))}
              </div>
            </div>
            <div className="view" id="v-map">
              <MapaObras />
            </div>
          </div>
        </div>
      </section>
      <section className="soft" style={{ marginTop: 96 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow accent">Las obras en la ciudad</p>
              <h2 className="h-sec">Veinte direcciones en Santa Fe.</h2>
            </div>
            <p className="muted" style={{ maxWidth: 360, margin: 0 }}>
              Ver dónde construyó NEO es la mejor carta de presentación.
            </p>
          </div>
          <MapaObras />
        </div>
      </section>
    </Pagina>
  );
}
