import Link from "next/link";
import { edificios, type Dato, type Edificio } from "@/data/edificios";
import { TablaObras } from "./Catalogo";
import { Foto } from "./Foto";
import { Picto } from "./Picto";
import { Txt } from "./Txt";
import { WaBoton } from "./WhatsApp";

function Datos({ datos, columnas, style }: { datos: Dato[]; columnas?: number; style?: React.CSSProperties }) {
  return (
    <dl className="datagrid" style={{ ...(columnas ? { gridTemplateColumns: `repeat(${columnas}, 1fr)` } : {}), ...style }}>
      {datos.map(([dt, dd]) => (
        <div key={dt}>
          <dt>{dt}</dt>
          <dd>
            <Txt>{dd}</Txt>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Ficha de un edificio en venta (plantilla de NEO ALEM Torre). */
export function FichaVenta({ e }: { e: Edificio }) {
  const f = e.fichaVenta!;
  const consulta = `Hola NEO, me interesa ${e.nombre} (${e.direccion}, ${e.barrio}).`;
  const lineas = e.nombreLineas ?? [e.nombre];
  const otras = edificios.filter((o) => o.slug !== e.slug).slice(0, 4);

  return (
    <>
      <section className="f-hero">
        <div className="wrap">
          <p className="eyebrow">Obras / En venta{e.enObra ? " · En obra" : ""}</p>
          <div className="f-hero-top">
            <div>
              <h1 className="h-page">
                {lineas.map((l, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {l}
                  </span>
                ))}
              </h1>
              <p className="lead muted" style={{ marginTop: 16 }}>
                <Txt>{e.resumen}</Txt>
              </p>
            </div>
            <Picto tipo={e.picto} />
          </div>
          <div className="keydata">
            {f.claves.map((c, i) => (
              <span key={c} className={i === f.claves.length - 1 ? "hl" : undefined}>
                <Txt>{c}</Txt>
              </span>
            ))}
          </div>
        </div>
        <Foto foto={f.portada} ratio="16x9" oscuro prioridad />
      </section>

      <nav className="subnav" aria-label="Secciones del edificio">
        <div className="wrap">
          <a href="#tipologias">Tipologías</a>
          <a href="#amenities">Amenities</a>
          <a href="#avance">Avance de obra</a>
          <a href="#financiacion">Financiación</a>
          <a href="#ubicacion">Ubicación</a>
          <WaBoton mensaje={consulta}>WhatsApp</WaBoton>
        </div>
      </nav>

      <section>
        <div className="wrap grid-2" style={{ alignItems: "start", gap: 64 }}>
          <div>
            <p className="eyebrow accent">El proyecto</p>
            <h2 className="h-sec">{f.proyecto.titulo}</h2>
            <p className="lead muted" style={{ marginTop: 20 }}>
              <Txt>{f.proyecto.texto}</Txt>
            </p>
          </div>
          <Datos datos={f.datos} />
        </div>
      </section>

      <section id="amenities" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {f.capitulos.map((c, i) => (
            <div className="chapter" key={c.titulo}>
              <div className="chapter-text">
                <p className="chapter-num">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="h-sec">{c.titulo}</h3>
                <p className="lead muted" style={{ marginTop: 16 }}>
                  <Txt>{c.texto}</Txt>
                </p>
              </div>
              <Foto foto={c.foto} ratio="4x3" oscuro={i % 2 === 0} />
            </div>
          ))}
        </div>
      </section>

      <section className="soft" id="tipologias">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow accent">Tipologías</p>
              <h2 className="h-sec">Elegí tu departamento.</h2>
            </div>
            <a className="link" href={f.plantasPdf ?? "#"}>
              Descargar plantas en PDF {!f.plantasPdf && <span className="fill">[pendiente]</span>}
            </a>
          </div>
          <div className="grid-3">
            {f.tipologias.map((t) => (
              <div className="typo" key={t.nombre}>
                <p className="eyebrow" style={{ margin: 0 }}>
                  {t.nombre}
                </p>
                <Foto foto={t.foto} ratio="4x3" />
                <div className="row">
                  <span>Superficie</span>
                  <b>
                    <Txt>{t.superficie}</Txt>
                  </b>
                </div>
                <div className="row">
                  <span>Disponibles</span>
                  <b>
                    <Txt>{t.disponibles}</Txt>
                  </b>
                </div>
                <div className="btn-row">
                  <a className="btn btn-outline" href={f.plantasPdf ?? "#"}>
                    Ver planta
                  </a>
                  <WaBoton mensaje={`Hola NEO, me interesa un departamento de ${t.nombre} en ${e.nombre}.`}>Consultar</WaBoton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap grid-2" style={{ alignItems: "center" }}>
          <Foto foto={f.terminaciones.foto} ratio="4x3" />
          <div>
            <p className="eyebrow accent">Terminaciones</p>
            <h2 className="h-sec">Lo que no se ve en un render.</h2>
            <Datos datos={f.terminaciones.datos} columnas={2} style={{ marginTop: 32 }} />
          </div>
        </div>
      </section>

      <section className="dark" id="avance">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Avance de obra</p>
              <h2 className="h-sec">
                {f.avance.porcentaje === null ? <span className="fill">[x]</span> : f.avance.porcentaje}% construido.
              </h2>
            </div>
            <Link className="link" href="/bitacora">
              Ver la bitácora completa →
            </Link>
          </div>
          <div className="progress" role="progressbar" aria-label="Avance de obra" aria-valuemin={0} aria-valuemax={100} aria-valuenow={f.avance.porcentaje ?? undefined}>
            <span style={{ width: `${f.avance.porcentaje ?? 20}%` }}></span>
          </div>
          <p className="muted" style={{ fontSize: 14 }}>
            Actualizado al <Txt>{f.avance.actualizado}</Txt>
            {f.avance.porcentaje === null && " · la barra se ajusta con el porcentaje real"}
          </p>
          <div className="grid-3" style={{ marginTop: 40 }}>
            {f.avance.hitos.map((h, i) => (
              <div key={i}>
                <Foto foto={h.foto} ratio="4x3" oscuro />
                <p style={{ marginTop: 12 }}>
                  <b>
                    <Txt>{h.fecha}</Txt> ·
                  </b>{" "}
                  <Txt>{h.texto}</Txt>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="financiacion">
        <div className="wrap grid-2" style={{ gap: 64 }}>
          <div>
            <p className="eyebrow accent">Financiación</p>
            <h2 className="h-sec">Pagalo mientras se construye.</h2>
            <p className="lead muted" style={{ marginTop: 20 }}>
              Reservás tu departamento a valor de obra y lo pagás en cuotas en pesos durante la construcción.
            </p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <WaBoton mensaje={`Hola NEO, quiero armar un plan de pagos para ${e.nombre}.`}>Armar mi plan de pagos</WaBoton>
              <Link className="btn btn-outline" href="/invertir">
                Cómo se compra en pozo
              </Link>
            </div>
          </div>
          <Datos datos={f.financiacion} columnas={2} />
        </div>
      </section>

      <section className="soft" id="ubicacion">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow accent">Ubicación</p>
              <h2 className="h-sec">
                <Txt>{`${e.direccion}, ${e.barrio}.`}</Txt>
              </h2>
            </div>
          </div>
          <div className="grid-2" style={{ alignItems: "start" }}>
            <div className="ph r-4x3" role="img" aria-label={`Mapa de Google con la ubicación de ${e.nombre}`}>
              <span className="ph-what">Mapa de Google con la ubicación de {e.nombre}</span>
              <span className="ph-sign">Mapa a conectar</span>
            </div>
            <div>
              <Datos datos={f.cercania} columnas={2} />
              <h3 className="h-sm" style={{ margin: "40px 0 12px" }}>
                Descargas
              </h3>
              <div className="btn-row">
                <a className="btn btn-outline" href="#">
                  Brochure PDF <span className="fill">[pendiente]</span>
                </a>
                <a className="btn btn-outline" href={f.plantasPdf ?? "#"}>
                  Plantas PDF {!f.plantasPdf && <span className="fill">[pendiente]</span>}
                </a>
              </div>
              <h3 className="h-sm" style={{ margin: "40px 0 12px" }}>
                Créditos
              </h3>
              <p className="muted" style={{ fontSize: 15 }}>
                <Txt>{f.creditos}</Txt>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow accent">Más obras</p>
              <h2 className="h-sec">Lo que ya construimos.</h2>
            </div>
            <Link className="link" href="/obras">
              Ver todas las obras →
            </Link>
          </div>
          <TablaObras lista={otras} />
        </div>
      </section>
    </>
  );
}
