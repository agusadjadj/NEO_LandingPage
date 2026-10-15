import type { CSSProperties } from "react";
import type { Foto as FotoDatos } from "@/data/edificios";
import { resolverFoto } from "@/lib/fotos";
import { Txt } from "./Txt";

type Props = {
  foto: FotoDatos;
  ratio?: "16x9" | "4x3" | "3x4" | "1x1";
  /** Fondo oscuro mientras falta la foto. */
  oscuro?: boolean;
  /** Para la foto de arriba de todo: carga sin esperar. */
  prioridad?: boolean;
  style?: CSSProperties;
};

/** Recuadro de foto: muestra la imagen si está en public/img, o dice qué foto va. */
export function Foto({ foto, ratio, oscuro, prioridad, style }: Props) {
  const r = resolverFoto(foto.src);
  const clases = ["ph", oscuro && "d", ratio && `r-${ratio}`, r && "has-img"].filter(Boolean).join(" ");
  return (
    <div className={clases} role="img" aria-label={foto.que} style={style}>
      {r && <img className="ph-img" src={r.url} alt="" loading={prioridad ? "eager" : "lazy"} decoding="async" />}
      <span className="ph-what">{foto.que}</span>
      <Firma foto={foto} ilustrativa={r?.ilustrativa} />
    </div>
  );
}

export function Firma({ foto, ilustrativa }: { foto: FotoDatos; ilustrativa?: boolean }) {
  if (ilustrativa) return <span className="ph-sign ilustrativa">Imagen ilustrativa</span>;
  if (!foto.firma) return null;
  return (
    <span className="ph-sign">
      <Txt>{foto.firma}</Txt>
    </span>
  );
}
