"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/** Fila de tabla que lleva a la ficha del edificio. */
export function FilaLink({ href, cat, children }: { href: string | null; cat: string; children: ReactNode }) {
  const router = useRouter();
  return (
    <tr data-cat={cat} data-href={href ?? undefined} onClick={href ? () => router.push(href) : undefined}>
      {children}
    </tr>
  );
}

type Opcion = { id: string; texto: string; cantidad?: number };

/** Botones de filtro: ocultan los elementos [data-cat] de `objetivo` que no coinciden. */
export function Filtros({ objetivo, opciones, estilo = "chips" }: { objetivo: string; opciones: Opcion[]; estilo?: "chips" | "lista" }) {
  const [activo, setActivo] = useState("all");
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(`${objetivo} [data-cat]`).forEach((el) => {
      el.hidden = !(activo === "all" || (el.dataset.cat ?? "").split(" ").includes(activo));
    });
  }, [activo, objetivo]);
  return (
    <div className={estilo === "chips" ? "chips" : "blog-filter"}>
      {opciones.map((o) => (
        <button key={o.id} className={estilo === "chips" ? "chip" : undefined} aria-pressed={activo === o.id} onClick={() => setActivo(o.id)}>
          {o.texto}
          {o.cantidad !== undefined && <span>{o.cantidad}</span>}
        </button>
      ))}
    </div>
  );
}

/** Selector Imagen / Lista / Mapa: muestra la vista (.view) con ese id. */
export function Vistas({ opciones, inicial }: { opciones: { id: string; texto: string }[]; inicial: string }) {
  const [activa, setActiva] = useState(inicial);
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".view").forEach((v) => v.classList.toggle("on", v.id === activa));
  }, [activa]);
  return (
    <div className="seg">
      {opciones.map((o) => (
        <button key={o.id} aria-pressed={activa === o.id} onClick={() => setActiva(o.id)}>
          {o.texto}
        </button>
      ))}
    </div>
  );
}
