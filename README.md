# NEO · Construimos futuro

Sitio de neo-inversiones.com hecho con Next.js (React + TypeScript), publicado en Vercel.

## Trabajar en el sitio

```bash
npm install      # la primera vez
npm run dev      # sitio en http://localhost:3000, se actualiza al guardar
npm run build    # verifica que todo compile antes de publicar
npm run fotos    # lista qué fotos faltan y actualiza docs/FOTOS.md
```

Cada push a `main` se publica solo en Vercel.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Edificios (catálogo, fichas, mapa) | `data/edificios.ts` |
| Entradas de la bitácora | `data/bitacora.ts` |
| WhatsApp, mail, dirección, menú | `data/sitio.ts` |
| Fotos fijas del Inicio y Cómo trabajamos | `data/paginas.ts` |
| Páginas | `app/` (una carpeta por ruta; `app/[slug]` arma la ficha de cada edificio) |
| Piezas reutilizables | `components/` |
| Estilos | `app/globals.css` |
| Fotos | `public/img/` (ver [docs/FOTOS.md](docs/FOTOS.md)) |

## Sumar un edificio

1. En `data/edificios.ts`, agregá un objeto a la lista `edificios`. Para uno entregado alcanza con `entregado(21, x, y, { direccion: "...", barrio: "..." })`, donde `x` e `y` son la posición en el mapa en %.
2. Aparece solo en Obras (lista, imágenes y mapa), en el Inicio si está en venta, y en el pie.
3. Para que tenga página propia en `/<slug>`, cargale `fichaVenta` (plantilla de NEO ALEM Torre) o `fichaLibro` (plantilla de NEO 18). La página y el sitemap se generan solos.
4. Poné sus fotos en `public/img/edificios/<slug>/` con los nombres de `docs/FOTOS.md`.

## Para completar
- Lo que está **[entre corchetes]** en los datos se ve resaltado en el sitio como dato pendiente.
- Las fotos `*.stock.jpg` son provisorias (no son obras de NEO) y se marcan "Imagen ilustrativa". Una foto propia con el mismo nombre sin `.stock` las reemplaza sola.
- Imagen para compartir en redes: `public/og-imagen.jpg` (1200 × 630), todavía falta.
- Formulario: mientras no se conecte Formspree o Web3Forms, envía la consulta por WhatsApp. Para conectarlo, completar `ACCION` en `components/FormContacto.tsx`.

## Tipografía
La marca usa Sofia Pro (licencia paga). Mientras no esté la licencia web se usa Outfit (SIL Open Font License), incluida en `public/fonts/`. Para cambiarla, reemplazar los archivos y las reglas `@font-face` al principio de `app/globals.css`.
