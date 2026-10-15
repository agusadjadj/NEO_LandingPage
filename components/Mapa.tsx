"use client";

import Link from "next/link";
import { useState } from "react";
import { Txt } from "./Txt";

export type Punto = { nombre: string; info: string; href: string | null; venta: boolean; x: number; y: number };

/** Mapa ilustrativo de obras. Se reemplaza por Google My Maps con las ubicaciones reales. */
export function Mapa({ puntos }: { puntos: Punto[] }) {
  const [sel, setSel] = useState<Punto | null>(null);
  return (
    <div className="map">
      <svg className="streets" viewBox="0 0 160 90" preserveAspectRatio="none" aria-hidden="true">
        <path className="river" d="M110 0 C120 20 112 40 124 60 S130 90 132 90 L160 90 L160 0Z" />
        <g className="street">
          <line x1="0" y1="22" x2="112" y2="22" />
          <line x1="0" y1="46" x2="118" y2="46" />
          <line x1="0" y1="70" x2="126" y2="70" />
          <line x1="30" y1="0" x2="30" y2="90" />
          <line x1="62" y1="0" x2="62" y2="90" />
          <line x1="94" y1="0" x2="94" y2="90" />
        </g>
      </svg>
      {puntos.map((p) => (
        <button
          key={p.nombre}
          className={p.venta ? "pin sale" : "pin"}
          style={{ left: p.x + "%", top: p.y + "%" }}
          aria-label={p.nombre}
          onClick={() => setSel(p)}
        />
      ))}
      {sel && (
        <div className="map-card">
          <b>{sel.nombre}</b>
          <Txt>{sel.info}</Txt>
          {sel.href && (
            <>
              <br />
              <Link className="link" href={sel.href}>
                Ver edificio
              </Link>
            </>
          )}
        </div>
      )}
      <span className="note">Mapa ilustrativo · se reemplaza por Google My Maps con las ubicaciones reales</span>
    </div>
  );
}
