# NEO · Construimos futuro

Sitio estático (HTML + CSS + JS, sin build) para neo-inversiones.com, publicado en Vercel.

## Páginas
| Ruta | Archivo | Contenido |
|---|---|---|
| `/` | index.html | Inicio: portada, edificios en venta, catálogo, mapa, bitácora |
| `/obras` | obras.html | Catálogo numerado con filtros y vistas imagen/lista/mapa |
| `/neo-alem-torre` | neo-alem-torre.html | Ficha en venta (plantilla para cada edificio nuevo) |
| `/neo-18` | neo-18.html | Ficha de obra entregada en formato libro (plantilla para cada obra) |
| `/invertir` | invertir.html | Invertir en pozo: pasos, cifras, preguntas frecuentes |
| `/como-trabajamos` | como-trabajamos.html | Proceso, equipo, proveedores, historia |
| `/bitacora` | bitacora.html | Avance de obra mes a mes |
| `/contacto` | contacto.html | WhatsApp, datos, formulario, terreno |

## Para completar
- Los datos faltantes están marcados **[entre corchetes]** y se ven en color.
- Los recuadros grises dicen qué foto o render va en cada lugar y su firma.
- Fotos: van en `assets/img/<página>/` con el nombre que indica [assets/img/LEEME.md](assets/img/LEEME.md) (JPG, WebP o PNG; 2000 px de ancho, menos de 300 KB). Cada foto reemplaza sola su recuadro gris; si falta, el recuadro sigue.
- Imagen para compartir: `assets/og-imagen.jpg` (1200 × 630).
- Formulario: mientras no se conecte Formspree o Web3Forms, envía la consulta por WhatsApp. Para conectarlo, agregar `action="https://formspree.io/f/XXXX" method="POST"` al `<form>` de contacto.html.

## Tipografía
La marca usa Sofia Pro (licencia paga). Mientras no esté la licencia web, se usa Outfit (SIL Open Font License), incluida en `assets/fonts/`. Para cambiarla, reemplazar los archivos y las reglas `@font-face` en `assets/styles.css`.

## Publicación
Cada push a `main` se publica solo en Vercel. `vercel.json` activa las direcciones limpias (`/obras` en vez de `/obras.html`).
