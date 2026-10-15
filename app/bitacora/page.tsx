import type { Metadata } from "next";
import Link from "next/link";
import { Foto } from "@/components/Foto";
import { Filtros } from "@/components/Interactivos";
import { Pagina } from "@/components/Pagina";
import { Txt } from "@/components/Txt";
import { WaBoton } from "@/components/WhatsApp";
import { entradas, filtros } from "@/data/bitacora";
import { sitio } from "@/data/sitio";

export const metadata: Metadata = {
  title: { absolute: "Bitácora de obra · El avance mes a mes de cada edificio | NEO" },
  description: "El avance de obra de NEO ALEM Torre, NEO ALEM Barra y cada edificio en curso, mes a mes, con fotos de dron y novedades.",
  alternates: { canonical: "/bitacora" },
};

export default function Bitacora() {
  const opciones = [
    { id: "all", texto: "Todos", cantidad: entradas.length },
    ...filtros.map((f) => ({ id: f.id, texto: f.nombre, cantidad: entradas.filter((e) => e.edificios.includes(f.id)).length })),
  ];
  return (
    <Pagina>
      <section style={{ paddingBottom: 48 }}>
        <div className="wrap grid-2" style={{ alignItems: "end", gap: 64 }}>
          <div>
            <p className="eyebrow">Bitácora de obra</p>
            <h1 className="h-page">La obra, mes a mes.</h1>
          </div>
          <p className="lead muted" style={{ margin: 0 }}>
            Cada entrada sale de Instagram y queda guardada acá, ordenada por edificio y por fecha. Quien compra en pozo puede seguir su departamento desde el primer pilote.
          </p>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap blog">
          <div>
            <p className="eyebrow">Edificio</p>
            <Filtros objetivo="#entries" opciones={opciones} estilo="lista" />
            <p className="muted" style={{ fontSize: 13, marginTop: 20 }}>
              Entradas tomadas de{" "}
              <a className="link" href={`https://instagram.com/${sitio.instagram}`} target="_blank" rel="noopener">
                @{sitio.instagram}
              </a>
              . Se suma una por mes y por edificio en obra.
            </p>
          </div>
          <div id="entries">
            {entradas.map((e, i) => (
              <article className="entry" data-cat={e.edificios.join(" ")} key={i}>
                <div className="entry-date">
                  <b>
                    <Txt>{e.dia}</Txt>
                  </b>
                  <span>
                    <Txt>{e.fecha}</Txt>
                  </span>
                </div>
                <div>
                  <span className="tag">
                    <Txt>{e.etiqueta}</Txt>
                  </span>
                  <h3>
                    <Txt>{e.titulo}</Txt>
                  </h3>
                  <p className="muted" style={{ fontSize: 15 }}>
                    <Txt>{e.texto}</Txt>
                  </p>
                </div>
                <Foto foto={e.foto} ratio="4x3" oscuro={i % 2 === 0} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="band-accent">
        <div className="wrap">
          <div>
            <p className="eyebrow" style={{ color: "#fff", opacity: 0.8 }}>
              Invertir en pozo
            </p>
            <h2>Seguí la obra de tu departamento desde el primer día.</h2>
          </div>
          <div className="btn-row">
            <WaBoton mensaje="Hola NEO, quiero armar un plan de pagos." variante="dark">
              Hablar con un asesor
            </WaBoton>
            <Link className="btn btn-outline" href="/invertir">
              Cómo funciona
            </Link>
          </div>
        </div>
      </section>
    </Pagina>
  );
}
