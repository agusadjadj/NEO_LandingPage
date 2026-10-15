import Link from "next/link";
import { MapaObras, TablaObras, TarjetaVenta } from "@/components/Catalogo";
import { Foto } from "@/components/Foto";
import { Pagina } from "@/components/Pagina";
import { Txt } from "@/components/Txt";
import { WaBoton } from "@/components/WhatsApp";
import { entradas } from "@/data/bitacora";
import { enVenta, entregados } from "@/data/edificios";
import { fotosInicio } from "@/data/paginas";
import { resolverFoto } from "@/lib/fotos";

export const metadata = { alternates: { canonical: "/" } };

const portada = fotosInicio.portada;

export default function Inicio() {
  const fotoPortada = resolverFoto(portada.src);
  return (
    <Pagina>
      <section className="hero">
        {fotoPortada && <img className="ph-img" src={fotoPortada.url} alt="" fetchPriority="high" />}
        <span className="hero-photo-note">{fotoPortada?.ilustrativa ? "Imagen ilustrativa" : <Txt>{portada.firma}</Txt>}</span>
        <div className="wrap">
          <h1 className="h-cover">
            Construimos
            <br />
            futuro.
          </h1>
          <div className="hero-foot">
            <p>Desarrollamos y construimos edificios en Santa Fe desde comienzos de los 2000. {entregados.length === 20 ? "Veinte" : entregados.length} ya tienen dueño.</p>
            <div className="btn-row">
              <WaBoton mensaje="Hola NEO, quiero conocer los edificios en venta.">Consultar por WhatsApp</WaBoton>
              <Link className="btn btn-outline" style={{ color: "#fff", borderColor: "#fff" }} href="/obras">
                Ver las obras
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow accent">En venta ahora</p>
              <h2 className="h-sec">Dos edificios, un mismo lugar.</h2>
            </div>
            <Link className="link" href="/invertir">
              Comprar en pozo →
            </Link>
          </div>
          <div className="grid-2">
            {enVenta.map((e, i) => (
              <TarjetaVenta key={e.slug} e={e} oscuro={i % 2 === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="wrap">
          <p className="eyebrow">Construimos futuro</p>
          <p className="statement">
            Cada edificio NEO lleva un número. Es nuestra manera de recordar lo que prometimos y ya cumplimos <em>veinte veces</em>, en los barrios de Santa Fe.
          </p>
          <div className="btn-row" style={{ marginTop: 40 }}>
            <Link className="btn btn-outline" href="/obras">
              Ver el catálogo
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow accent">Catálogo</p>
              <h2 className="h-sec">{entregados.length} edificios entregados.</h2>
            </div>
            <Link className="link" href="/obras">
              Ver las {entregados.length} obras →
            </Link>
          </div>
          <TablaObras lista={entregados.slice(0, 5)} />
        </div>
      </section>

      <section className="soft">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow accent">Mapa de obras</p>
              <h2 className="h-sec">Donde construimos, la ciudad cambió.</h2>
            </div>
            <p className="muted" style={{ maxWidth: 360, margin: 0 }}>
              Tocá un punto para ver el edificio. En naranja, lo que está en venta.
            </p>
          </div>
          <MapaObras />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow accent">Bitácora de obra</p>
              <h2 className="h-sec">La obra, mes a mes.</h2>
            </div>
            <Link className="link" href="/bitacora">
              Ver la bitácora →
            </Link>
          </div>
          <div className="grid-3">
            {entradas.slice(0, 3).map((b, i) => (
              <Link className="bcard" href="/bitacora" key={i}>
                <Foto foto={b.foto} ratio="4x3" oscuro={i % 2 === 0} />
                <span className="tag">
                  <Txt>{b.etiqueta}</Txt>
                </span>
                <h3 className="h-sm">
                  <Txt>{b.titulo}</Txt>
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="soft">
        <div className="wrap grid-2" style={{ alignItems: "center" }}>
          <Foto foto={fotosInicio.equipo} ratio="4x3" />
          <div>
            <p className="eyebrow accent">Cómo trabajamos</p>
            <h2 className="h-sec">Proyectamos, construimos y entregamos. Sin intermediarios.</h2>
            <p className="lead muted" style={{ marginTop: 20 }}>
              El mismo equipo dibuja el edificio, lo construye y te entrega las llaves. Cada render dice qué versión es y de qué fecha.
            </p>
            <Link className="link" href="/como-trabajamos">
              Conocer el proceso →
            </Link>
          </div>
        </div>
      </section>

      <section className="band-accent">
        <div className="wrap">
          <div>
            <p className="eyebrow" style={{ color: "#fff", opacity: 0.8 }}>
              Invertir en pozo
            </p>
            <h2>Tu departamento, en cuotas en pesos, mientras se construye.</h2>
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
