import type { Metadata } from "next";
import { FormContacto } from "@/components/FormContacto";
import { Pagina } from "@/components/Pagina";
import { Txt } from "@/components/Txt";
import { WaBoton } from "@/components/WhatsApp";
import { enVenta } from "@/data/edificios";
import { sitio } from "@/data/sitio";

export const metadata: Metadata = {
  title: { absolute: "Contacto · Hablemos por WhatsApp | NEO" },
  description: `Contactá a NEO por WhatsApp al ${sitio.whatsappVisible}, por mail o en la oficina en Santa Fe. ¿Tenés un terreno? Lo desarrollamos juntos.`,
  alternates: { canonical: "/contacto" },
};

export default function Contacto() {
  return (
    <Pagina>
      <section>
        <div className="wrap contact">
          <div>
            <h1 className="h-page">Hablemos.</h1>
            <p className="lead muted" style={{ marginTop: 20 }}>
              La forma más rápida es WhatsApp. Te responde una persona del equipo comercial.
            </p>
            <WaBoton mensaje="Hola NEO, quiero hacer una consulta.">Escribir al {sitio.whatsappVisible}</WaBoton>
            <dl className="info-list">
              <div>
                <dt>Oficina</dt>
                <dd>
                  <Txt>{`${sitio.oficina}, Santa Fe`}</Txt>
                </dd>
              </div>
              <div>
                <dt>Horario</dt>
                <dd>
                  <Txt>{sitio.horario}</Txt>
                </dd>
              </div>
              <div>
                <dt>Correo</dt>
                <dd>
                  <Txt>{sitio.email}</Txt>
                </dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>
                  <a href={`https://instagram.com/${sitio.instagram}`} target="_blank" rel="noopener">
                    @{sitio.instagram}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <FormContacto opciones={[...enVenta.map((e) => e.nombre), "Invertir en pozo", "Otra consulta"]} />
        </div>
      </section>
      <div className="ph r-16x9" role="img" aria-label="Mapa de Google con la oficina de NEO">
        <span className="ph-what">Mapa de Google con la oficina de NEO</span>
        <span className="ph-sign">Mapa a conectar</span>
      </div>
      <section className="soft" style={{ padding: "72px 0" }}>
        <div className="wrap sec-head" style={{ margin: 0, alignItems: "center" }}>
          <h2 className="h-sec">¿Tenés un terreno? Lo desarrollamos juntos.</h2>
          <WaBoton mensaje="Hola NEO, tengo un terreno y quiero proponerles desarrollarlo." variante="dark">
            Proponer un terreno
          </WaBoton>
        </div>
      </section>
    </Pagina>
  );
}
