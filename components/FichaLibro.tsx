import Link from "next/link";
import { edificios, hrefEdificio, type Edificio } from "@/data/edificios";
import { resolverFoto } from "@/lib/fotos";
import { Logo } from "./Logo";
import { Txt } from "./Txt";
import { Visor, type FotoVisor } from "./Visor";
import { WaBarra } from "./WhatsApp";

/** Ficha de una obra entregada, en formato libro (plantilla de NEO 18). */
export function FichaLibro({ e }: { e: Edificio }) {
  const f = e.fichaLibro!;
  const fotos: FotoVisor[] = f.fotos.map((foto) => {
    const r = resolverFoto(foto.src);
    return { que: foto.que, firma: foto.firma, url: r?.url ?? null, ilustrativa: r?.ilustrativa ?? false };
  });

  // Anterior y siguiente en el orden del catálogo de entregados (de mayor a menor número).
  const lista = edificios.filter((x) => x.estado === "entregado");
  const pos = lista.findIndex((x) => x.slug === e.slug);
  const anterior = lista[pos + 1];
  const siguiente = lista[pos - 1];
  const venta = edificios.find((x) => x.estado === "venta" && hrefEdificio(x));

  return (
    <div className="book-body">
      <header className="book-header">
        <div className="wrap">
          <Logo />
          <span className="cat-label">
            Catálogo de obras · {e.codigo} de {lista.length}
          </span>
          <Link className="close" href="/obras">
            Cerrar ✕
          </Link>
        </div>
      </header>
      <main>
        <Visor fotos={fotos}>
          <p className="eyebrow">
            Entregado <Txt>{e.anio}</Txt>
          </p>
          <h1>
            NEO
            <br />
            {e.codigo}
          </h1>
          <p className="eyebrow" style={{ color: "var(--ink)" }}>
            <Txt>{`${e.direccion} · ${e.barrio}`}</Txt>
          </p>
          <p className="muted">
            <Txt>{f.descripcion}</Txt>
          </p>
          <dl className="book-data">
            {f.datos.map(([dt, dd]) => (
              <div key={dt}>
                <dt>{dt}</dt>
                <dd>
                  <Txt>{dd}</Txt>
                </dd>
              </div>
            ))}
          </dl>
        </Visor>
        <section style={{ padding: "0 0 72px" }}>
          <div className="wrap book-nav">
            {anterior ? (
              <Link href={hrefEdificio(anterior) ?? "/obras"}>
                <span className="eyebrow" style={{ display: "block", margin: 0 }}>
                  ← Anterior
                </span>
                <b>{anterior.nombre}</b>
              </Link>
            ) : (
              <span />
            )}
            <Link className="btn btn-wa" href={venta ? hrefEdificio(venta)! : "/obras"}>
              Ver lo que está en venta
            </Link>
            {siguiente ? (
              <Link href={hrefEdificio(siguiente) ?? "/obras"} style={{ textAlign: "right" }}>
                <span className="eyebrow" style={{ display: "block", margin: 0 }}>
                  Siguiente →
                </span>
                <b>{siguiente.nombre}</b>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </section>
      </main>
      <WaBarra mensaje={`Hola NEO, vi ${e.nombre} y quiero consultar por lo que tienen en venta.`} />
    </div>
  );
}
