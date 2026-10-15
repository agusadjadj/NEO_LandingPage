import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WaBarra } from "./WhatsApp";

const MENSAJE = "Hola NEO, quiero conocer los edificios en venta.";

/** Armazón de las páginas: encabezado, contenido, pie y barra de WhatsApp en celular. */
export function Pagina({ children, mensajeWa = MENSAJE }: { children: ReactNode; mensajeWa?: string }) {
  return (
    <>
      <Header mensajeWa={mensajeWa} />
      <main>{children}</main>
      <Footer />
      <WaBarra mensaje={mensajeWa} />
    </>
  );
}
