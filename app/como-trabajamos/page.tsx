import type { Metadata } from "next";
import { Foto } from "@/components/Foto";
import { Pagina } from "@/components/Pagina";
import { Txt } from "@/components/Txt";
import { fotosComoTrabajamos } from "@/data/paginas";

export const metadata: Metadata = {
  title: { absolute: "Cómo trabajamos · Proyecto, renders, obra y entrega | NEO" },
  description: "NEO proyecta, construye y entrega sus edificios en Santa Fe con un solo equipo. Conocé el proceso, el equipo y nuestra historia.",
  alternates: { canonical: "/como-trabajamos" },
};

const textosEtapas = [
  { titulo: "Proyecto", texto: "Diseñamos cada edificio pensando en quién va a vivir ahí." },
  { titulo: "Renders", texto: "Cada imagen dice qué versión es y de qué fecha." },
  { titulo: "Obra", texto: "La construimos nosotros, con el mismo equipo." },
  { titulo: "Entrega", texto: "Te damos las llaves y seguimos cerca." },
];
const etapas = textosEtapas.map((t, i) => ({ ...t, foto: fotosComoTrabajamos.etapas[i] }));
const equipo = fotosComoTrabajamos.equipo;

const historia = [
  { obra: "NEO 01", detalle: "[año]" },
  { obra: "NEO 10", detalle: "[año]" },
  { obra: "NEO 18", detalle: "Ituzaingó 1825" },
  { obra: "NEO 20", detalle: "[año]" },
];

export default function ComoTrabajamos() {
  return (
    <Pagina>
      <section>
        <div className="wrap">
          <p className="eyebrow">Cómo trabajamos</p>
          <h1 className="h-page" style={{ maxWidth: 1000 }}>
            El mismo equipo dibuja el edificio, <span style={{ color: "var(--muted)" }}>lo construye y te entrega las llaves.</span>
          </h1>
        </div>
      </section>
      <Foto foto={fotosComoTrabajamos.portada} ratio="16x9" prioridad />

      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow accent">Proceso</p>
              <h2 className="h-sec">Cuatro etapas, un responsable.</h2>
            </div>
          </div>
          <div className="grid-4">
            {etapas.map((e, i) => (
              <div className="stage" key={e.titulo}>
                <Foto foto={e.foto} ratio="3x4" oscuro={i === 1 || i === 2} />
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{e.titulo}</h3>
                <p className="muted" style={{ fontSize: 15 }}>
                  {e.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="wrap grid-2" style={{ alignItems: "center", gap: 64 }}>
          <div>
            <p className="eyebrow">Renders al día</p>
            <h2 className="h-sec">Cada imagen dice qué versión es.</h2>
            <p className="lead muted" style={{ marginTop: 20 }}>
              Los renders cambian a medida que avanza el proyecto. Por eso cada imagen de esta web lleva su firma: quién la hizo, qué versión es y de qué fecha. Lo que ves es lo que se construye.
            </p>
          </div>
          <Foto foto={fotosComoTrabajamos.renderFirmado} ratio="4x3" oscuro />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow accent">El equipo</p>
              <h2 className="h-sec">Quiénes hacen NEO.</h2>
            </div>
          </div>
          <div className="grid-4">
            {equipo.map((p, i) => (
              <div className="person" key={i}>
                <Foto foto={p.foto} ratio="3x4" />
                <b>
                  <Txt>{p.nombre}</Txt>
                </b>
                <span className="muted" style={{ fontSize: 14 }}>
                  <Txt>{p.rol}</Txt>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="soft">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow accent">Proveedores</p>
              <h2 className="h-sec">Con quiénes construimos.</h2>
            </div>
            <p className="muted" style={{ margin: 0, maxWidth: 360 }}>
              Logos publicados con permiso de cada empresa.
            </p>
          </div>
          <div className="logos">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i}>
                <span className="fill">[Logo proveedor]</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Historia</p>
              <h2 className="h-sec">Nuestra historia se cuenta en edificios.</h2>
            </div>
          </div>
          <div className="timeline">
            {historia.map((h) => (
              <div key={h.obra}>
                <b>{h.obra}</b>
                <span className="muted">
                  <Txt>{h.detalle}</Txt>
                </span>
              </div>
            ))}
            <div className="now">
              <b>ALEM</b>
              <span className="muted">Torre y Barra, en obra</span>
            </div>
          </div>
        </div>
      </section>
    </Pagina>
  );
}
