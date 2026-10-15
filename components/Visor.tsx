"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Txt } from "./Txt";

export type FotoVisor = { que: string; firma?: string; url: string | null; ilustrativa: boolean };

/** Libro de una obra entregada: texto a la izquierda, foto grande a la derecha y miniaturas abajo. */
export function Visor({ fotos, children }: { fotos: FotoVisor[]; children: ReactNode }) {
  const [i, setI] = useState(0);
  const total = fotos.length;
  const ir = (n: number) => setI(((n % total) + total) % total);
  const f = fotos[i];
  const contador = `${String(i + 1).padStart(2, "0")} / ${total}`;

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setI((x) => (x - 1 + total) % total);
      if (e.key === "ArrowRight") setI((x) => (x + 1) % total);
    };
    document.addEventListener("keydown", tecla);
    return () => document.removeEventListener("keydown", tecla);
  }, [total]);

  return (
    <>
      <div className="book">
        <div className="book-text">
          {children}
          <div className="viewer-ctl">
            <button className="circle" aria-label="Foto anterior" onClick={() => ir(i - 1)}>
              ‹
            </button>
            <span>{contador}</span>
            <button className="circle" aria-label="Foto siguiente" onClick={() => ir(i + 1)}>
              ›
            </button>
          </div>
        </div>
        <div className="book-img">
          <div className={f.url ? "ph d has-img" : "ph d"} role="img" aria-label={f.que}>
            {f.url && <img key={f.url} className="ph-img" src={f.url} alt="" />}
            <span className="ph-what">{f.que}</span>
            {f.ilustrativa ? (
              <span className="ph-sign ilustrativa">Imagen ilustrativa</span>
            ) : (
              f.firma && (
                <span className="ph-sign">
                  <Txt>{f.firma}</Txt>
                </span>
              )
            )}
          </div>
        </div>
      </div>
      <section style={{ padding: "56px 0" }}>
        <div className="wrap">
          <p className="eyebrow">Interiores y detalles</p>
          <div className="thumbs">
            {fotos.map((t, k) => (
              <button key={k} aria-label={`Foto ${k + 1}: ${t.que}`} aria-current={k === i} onClick={() => ir(k)}>
                {t.url ? <img src={t.url} alt="" loading="lazy" /> : String(k + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
