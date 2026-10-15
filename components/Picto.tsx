import type { CSSProperties } from "react";
import type { Picto as Tipo } from "@/data/edificios";

const lineas = (x1: number, x2: number, ys: number[]) => ys.map((y) => <line key={`${x1}-${y}`} x1={x1} x2={x2} y1={y} y2={y} />);

/** Pictograma del edificio: torre, barra (tres bloques) o bloque bajo. */
export function Picto({ tipo, style }: { tipo: Tipo; style?: CSSProperties }) {
  if (tipo === "torre")
    return (
      <svg className="picto" viewBox="0 0 28 44" aria-hidden="true" style={style}>
        <rect x="6" y="2" width="16" height="40" />
        {lineas(6, 22, [8, 12, 16, 20, 24, 28, 32, 36])}
        <line x1="2" x2="26" y1="42" y2="42" />
      </svg>
    );
  if (tipo === "barra")
    return (
      <svg className="picto" viewBox="0 0 44 44" aria-hidden="true" style={{ width: 44, ...style }}>
        {[2, 16, 30].map((x) => (
          <g key={x}>
            <rect x={x} y="20" width="12" height="22" />
            {lineas(x, x + 12, [27, 34])}
          </g>
        ))}
      </svg>
    );
  return (
    <svg className="picto" viewBox="0 0 28 44" aria-hidden="true" style={style}>
      <rect x="8" y="12" width="12" height="30" />
      {lineas(8, 20, [18, 23, 28, 33, 38])}
      <line x1="4" x2="24" y1="42" y2="42" />
    </svg>
  );
}
