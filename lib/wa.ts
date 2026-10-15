import { sitio } from "@/data/sitio";

export const waHref = (mensaje: string) => `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(mensaje)}`;
