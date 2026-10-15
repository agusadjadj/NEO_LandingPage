import type { Metadata } from "next";
import Link from "next/link";
import { Pagina } from "@/components/Pagina";
import { Txt } from "@/components/Txt";
import { WaBoton } from "@/components/WhatsApp";
import { conFicha, entregados } from "@/data/edificios";

export const metadata: Metadata = {
  title: { absolute: "Invertir en pozo · Comprá hoy, pagá mientras se construye | NEO" },
  description: "Cómo comprar un departamento en pozo con NEO en Santa Fe: reserva, boleto, cuotas en pesos durante la obra y entrega. Preguntas frecuentes.",
  alternates: { canonical: "/invertir" },
};

const pasos = [
  ["Elegí tu unidad", "Recorré las tipologías de NEO ALEM Torre y Barra y elegí piso, orientación y cantidad de dormitorios con un asesor."],
  ["Reservá con una seña", "Con una seña de [monto] la unidad queda reservada a tu nombre y a valor de obra."],
  ["Firmá el boleto", "Firmás el boleto de compraventa y abonás el anticipo de [%]."],
  ["Pagá mientras se construye", "El saldo se paga en [cantidad] cuotas en pesos, ajustadas por [índice]. Seguís el avance en la bitácora."],
  ["Recibí las llaves", "Al terminar la obra, el mismo equipo que la construyó te entrega tu departamento."],
];

const preguntas = [
  ["¿Qué pasa si la obra se demora?", "[Respuesta de NEO sobre plazos y demoras]"],
  ["¿Cómo se ajustan las cuotas?", "[Índice de ajuste y frecuencia]"],
  ["¿Puedo ceder el boleto antes de la entrega?", "[Condiciones de cesión del boleto]"],
  ["¿Puedo visitar la obra?", "[Cómo y cuándo se coordinan las visitas]"],
  ["¿Qué incluye el precio?", "[Qué incluye: cochera, terminaciones, amenities, gastos]"],
];

export default function Invertir() {
  const venta = conFicha.find((e) => e.estado === "venta");
  return (
    <Pagina>
      <section>
        <div className="wrap grid-2" style={{ alignItems: "end", gap: 64 }}>
          <div>
            <p className="eyebrow">Invertir en pozo</p>
            <h1 className="h-page">Comprá hoy. Pagá mientras se construye.</h1>
          </div>
          <div>
            <p className="lead muted">
              Comprar en pozo es reservar un departamento antes de que el edificio esté terminado, a valor de obra, y pagarlo en cuotas durante la construcción.
            </p>
            <div className="btn-row">
              <WaBoton mensaje="Hola NEO, quiero saber cómo comprar un departamento en pozo." variante="dark">
                Hablar con un asesor
              </WaBoton>
              <Link className="btn btn-outline" href={venta ? `/${venta.slug}` : "/obras"}>
                Ver edificios en venta
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="dark" style={{ padding: "64px 0" }}>
        <div className="wrap figs">
          <div>
            <b>{entregados.length}</b>
            <span>edificios entregados en Santa Fe</span>
          </div>
          <div>
            <b>2000</b>
            <span>construimos desde comienzos de la década</span>
          </div>
          <div>
            <b>1</b>
            <span>solo equipo: proyecta, construye y entrega</span>
          </div>
          <div>
            <b>$</b>
            <span>cuotas en pesos durante la obra</span>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap grid-2" style={{ gap: 64, alignItems: "start" }}>
          <div>
            <p className="eyebrow accent">Paso a paso</p>
            <h2 className="h-sec">Cómo se compra un NEO en pozo.</h2>
          </div>
          <ol className="steps-list">
            {pasos.map(([t, d]) => (
              <li key={t}>
                <div>
                  <h3>{t}</h3>
                  <p className="muted" style={{ margin: 0 }}>
                    <Txt>{d}</Txt>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="soft">
        <div className="wrap grid-2" style={{ alignItems: "center", gap: 64 }}>
          <div className="ph d r-16x9" role="img" aria-label="Testimonio en video de un propietario, con su autorización por escrito">
            <span className="ph-what">Testimonio en video de un propietario, con su autorización por escrito</span>
            <span className="ph-sign">Video: NEO</span>
          </div>
          <div>
            <p className="eyebrow accent">Testimonio</p>
            <p className="statement" style={{ fontSize: "clamp(24px,2.6vw,34px)" }}>
              <span className="fill">[Frase del propietario sobre su experiencia comprando en pozo con NEO]</span>
            </p>
            <p className="muted" style={{ marginTop: 16 }}>
              <span className="fill">[Nombre]</span> · Propietario en <span className="fill">[edificio]</span>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap grid-2" style={{ gap: 64, alignItems: "start" }}>
          <div>
            <p className="eyebrow accent">Preguntas frecuentes</p>
            <h2 className="h-sec">Lo que todos preguntan antes de comprar.</h2>
          </div>
          <div className="faq">
            {preguntas.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p className="muted">
                  <Txt>{a}</Txt>
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="band-accent">
        <div className="wrap">
          <h2>Un asesor te arma el plan de pagos de la unidad que elijas.</h2>
          <WaBoton mensaje="Hola NEO, quiero que me armen un plan de pagos." variante="dark">
            Armar mi plan de pagos
          </WaBoton>
        </div>
      </section>
    </Pagina>
  );
}
