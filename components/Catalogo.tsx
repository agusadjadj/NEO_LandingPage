import Link from "next/link";
import { edificios, hrefEdificio, type Edificio } from "@/data/edificios";
import { Foto } from "./Foto";
import { FilaLink } from "./Interactivos";
import { Mapa, type Punto } from "./Mapa";
import { Picto } from "./Picto";
import { Txt } from "./Txt";

export const categorias = (e: Edificio) => (e.estado === "venta" ? (e.enObra ? "sale obra" : "sale") : "done");
export const estadoTexto = (e: Edificio) => (e.estado === "venta" ? (e.enObra ? "En venta · En obra" : "En venta") : "Entregado");
const ubicacion = (e: Edificio) => (e.direccion.startsWith("[") && e.estado === "venta" ? e.barrio : `${e.direccion} · ${e.barrio}`);

/** Tabla numerada de obras. */
export function TablaObras({ lista = edificios }: { lista?: Edificio[] }) {
  return (
    <table className="cat">
      <thead>
        <tr>
          <th>N.º</th>
          <th></th>
          <th>Edificio</th>
          <th className="hide-m">Ubicación</th>
          <th className="hide-m">Pisos</th>
          <th className="hide-m">Año</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {lista.map((e) => {
          const href = hrefEdificio(e);
          return (
            <FilaLink key={e.slug} href={href} cat={categorias(e)}>
              <td className={e.estado === "venta" ? "num acc" : "num"}>{e.codigo}</td>
              <td style={{ width: 56 }}>
                <Picto tipo={e.picto} />
              </td>
              <td className="name">
                <b>{href ? <Link href={href}>{e.nombre}</Link> : e.nombre}</b>
                <span>
                  <Txt>{e.resumen}</Txt>
                </span>
              </td>
              <td className="hide-m">
                <Txt>{ubicacion(e)}</Txt>
              </td>
              <td className="hide-m">
                <Txt>{e.pisos}</Txt>
              </td>
              <td className="hide-m">
                <Txt>{e.anio}</Txt>
              </td>
              <td>
                <span className={e.estado === "venta" ? "status sale" : "status"}>{estadoTexto(e)}</span>
              </td>
            </FilaLink>
          );
        })}
      </tbody>
    </table>
  );
}

/** Tarjeta vertical con la fachada, para la vista Imagen de Obras. */
export function TarjetaFachada({ e }: { e: Edificio }) {
  const href = hrefEdificio(e);
  const contenido = (
    <>
      <Foto foto={e.fachada} ratio="3x4" />
      <div className="bcard-row">
        <span className="bcard-num">{e.codigo}</span>
        <div>
          <h3 className="h-sm">{e.nombre}</h3>
          <p className="muted" style={{ fontSize: 14 }}>
            <Txt>{e.resumen}</Txt>
          </p>
        </div>
      </div>
    </>
  );
  return href ? (
    <Link className="bcard" data-cat={categorias(e)} href={href}>
      {contenido}
    </Link>
  ) : (
    <div className="bcard" data-cat={categorias(e)}>
      {contenido}
    </div>
  );
}

/** Tarjeta grande de un edificio en venta, para el Inicio. */
export function TarjetaVenta({ e, oscuro }: { e: Edificio; oscuro?: boolean }) {
  return (
    <Link className="bcard" href={hrefEdificio(e) ?? "/obras"}>
      {e.tarjeta && <Foto foto={e.tarjeta} ratio="4x3" oscuro={oscuro} />}
      <div className="bcard-row">
        <span className="bcard-num">{e.codigo}</span>
        <div>
          <span className="tag">{estadoTexto(e)}</span>
          <h3>{e.nombre}</h3>
          <p className="muted">
            <Txt>{e.tarjetaTexto ?? e.resumen}</Txt>
          </p>
        </div>
        <span style={{ marginLeft: "auto" }}>
          <Picto tipo={e.picto} />
        </span>
      </div>
    </Link>
  );
}

/** Mapa con todas las obras. */
export function MapaObras() {
  const puntos: Punto[] = edificios.map((e) => ({
    nombre: e.nombre,
    info: `${e.direccion} · ${e.barrio}`,
    href: hrefEdificio(e),
    venta: e.estado === "venta",
    ...e.mapa,
  }));
  return <Mapa puntos={puntos} />;
}
