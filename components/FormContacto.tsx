"use client";

import type { FormEvent } from "react";
import { sitio } from "@/data/sitio";
import { waHref } from "@/lib/wa";
import { Txt } from "./Txt";

// Mientras no se conecte Formspree o Web3Forms, la consulta sale por WhatsApp.
// Para conectarlo, completar ACCION con la URL del servicio (por ejemplo "https://formspree.io/f/XXXX").
const ACCION = "";

export function FormContacto({ opciones }: { opciones: string[] }) {
  const enviar = (e: FormEvent<HTMLFormElement>) => {
    if (ACCION) return;
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg =
      `Hola NEO, soy ${d.get("nombre")} (tel. ${d.get("telefono")}). ` + `Me interesa ${d.get("edificio")}. ` + (d.get("mensaje") || "");
    window.open(waHref(msg), "_blank", "noopener");
  };

  return (
    <form className="form" onSubmit={enviar} action={ACCION || undefined} method={ACCION ? "POST" : undefined}>
      <p className="eyebrow">O dejanos tus datos</p>
      <label>
        Nombre
        <input name="nombre" required autoComplete="name" />
      </label>
      <label>
        Teléfono
        <input name="telefono" type="tel" required autoComplete="tel" />
      </label>
      <label>
        Edificio que te interesa
        <select name="edificio">
          {opciones.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label>
        Mensaje
        <textarea name="mensaje" />
      </label>
      <button className="btn btn-dark" type="submit">
        Enviar consulta
      </button>
      <p className="small">
        Te respondemos en <Txt>{sitio.tiempoRespuesta}</Txt>.
      </p>
    </form>
  );
}
