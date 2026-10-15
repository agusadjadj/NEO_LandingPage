// Catálogo de edificios NEO.
//
// Para sumar un edificio: agregá un objeto a la lista `edificios`. Aparece solo en
// Obras (lista, imágenes y mapa), en el Inicio si está en venta, y en el sitemap.
// Si le cargás `fichaVenta` o `fichaLibro`, además se genera su página en /<slug>.
//
// Fotos: `src` es la ruta dentro de public/img, sin extensión (jpg, webp o png).
// Ver docs/FOTOS.md.
//
// Lo que va [entre corchetes] se muestra resaltado como dato a completar.

export type Foto = {
  src: string;
  /** Qué foto va: se muestra en el recuadro mientras falta y como texto alternativo. */
  que: string;
  /** Firma de la imagen, por ejemplo "Render: NEO · v3 · mar 2026". */
  firma?: string;
};

export type Picto = "torre" | "barra" | "bloque";
export type Dato = [titulo: string, valor: string];

export type FichaVenta = {
  portada: Foto;
  /** Datos de la franja bajo el título. El último se resalta. */
  claves: string[];
  proyecto: { titulo: string; texto: string };
  datos: Dato[];
  capitulos: { titulo: string; texto: string; foto: Foto }[];
  tipologias: { nombre: string; foto: Foto; superficie: string; disponibles: string }[];
  plantasPdf?: string;
  terminaciones: { foto: Foto; datos: Dato[] };
  avance: {
    porcentaje: number | null;
    actualizado: string;
    hitos: { fecha: string; texto: string; foto: Foto }[];
  };
  financiacion: Dato[];
  cercania: Dato[];
  creditos: string;
};

export type FichaLibro = {
  descripcion: string;
  datos: Dato[];
  /** Fotos del visor. La primera es la portada del libro. */
  fotos: Foto[];
};

export type Edificio = {
  slug: string;
  /** Lo que se ve como número en el catálogo: "AT", "20", "07"… */
  codigo: string;
  nombre: string;
  /** Para títulos en dos líneas: ["NEO ALEM", "Torre"]. */
  nombreLineas?: string[];
  estado: "venta" | "entregado";
  enObra?: boolean;
  resumen: string;
  direccion: string;
  barrio: string;
  pisos: string;
  /** Año de entrega, o fecha prevista si está en obra. */
  anio: string;
  picto: Picto;
  /** Posición en el mapa ilustrativo, en % (x desde la izquierda, y desde arriba). */
  mapa: { x: number; y: number };
  /** Foto vertical para la vista Imagen de Obras. */
  fachada: Foto;
  /** Foto para la tarjeta del Inicio (solo edificios en venta). */
  tarjeta?: Foto;
  /** Texto largo para la tarjeta del Inicio. */
  tarjetaTexto?: string;
  fichaVenta?: FichaVenta;
  fichaLibro?: FichaLibro;
};

const img = (slug: string, archivo: string) => `edificios/${slug}/${archivo}`;

const fachada = (slug: string, nombre: string): Foto => ({
  src: img(slug, "fachada"),
  que: `Fachada entera de ${nombre}, sin recortar el remate`,
  firma: "Foto: NEO",
});

/** Un edificio entregado que todavía no tiene datos cargados. */
function entregado(n: number, x: number, y: number, extra: Partial<Edificio> = {}): Edificio {
  const codigo = String(n).padStart(2, "0");
  const slug = `neo-${codigo}`;
  const nombre = `NEO ${codigo}`;
  return {
    slug,
    codigo,
    nombre,
    estado: "entregado",
    resumen: "[Frase-resumen]",
    direccion: "[Dirección]",
    barrio: "[Barrio]",
    pisos: "[n]",
    anio: "[Año]",
    picto: "bloque",
    mapa: { x, y },
    fachada: fachada(slug, nombre),
    ...extra,
  };
}

export const edificios: Edificio[] = [
  {
    slug: "neo-alem-torre",
    codigo: "AT",
    nombre: "NEO ALEM Torre",
    nombreLineas: ["NEO ALEM", "Torre"],
    estado: "venta",
    enObra: true,
    resumen: "Vivir frente al puerto, en Barrio Candioti.",
    tarjetaTexto:
      "Vivir frente al puerto, en Barrio Candioti. Sarmiento 2739 · 16 pisos + 3 niveles de cocheras · 1, 2 y 3 dormitorios.",
    direccion: "Sarmiento 2739",
    barrio: "Candioti",
    pisos: "16 + 3",
    anio: "[Entrega]",
    picto: "torre",
    mapa: { x: 62, y: 38 },
    fachada: fachada("neo-alem-torre", "NEO ALEM Torre"),
    tarjeta: {
      src: img("neo-alem-torre", "portada"),
      que: "Render de la torre completa vista desde el Dique",
      firma: "Render: NEO · [versión y fecha]",
    },
    fichaVenta: {
      portada: {
        src: img("neo-alem-torre", "portada"),
        que: "Render de la torre entera vista desde el Dique",
        firma: "Render: NEO · [versión y fecha]",
      },
      claves: [
        "Sarmiento 2739 · Candioti, Santa Fe",
        "16 pisos + 3 niveles de cocheras",
        "1, 2 y 3 dormitorios",
        "Entrega [mes/año]",
      ],
      proyecto: {
        titulo: "Una torre frente al puerto, dentro de un barrio que ya se vive.",
        texto:
          "NEO ALEM Torre forma parte del desarrollo NEO ALEM en Barrio Candioti, junto a NEO ALEM Barra y un paseo peatonal y comercial. Proyecto, obra y entrega a cargo del mismo equipo NEO.",
      },
      datos: [
        ["Ubicación", "Sarmiento 2739"],
        ["Barrio", "Candioti"],
        ["Estado", "En obra"],
        ["Entrega", "[mes/año]"],
        ["Pisos", "16 + 3 cocheras"],
        ["Unidades", "[n]"],
        ["Tipologías", "1, 2 y 3 dorm."],
        ["Superficies", "[desde – hasta m²]"],
        ["Proyecto y obra", "NEO"],
      ],
      capitulos: [
        {
          titulo: "Vistas al puerto",
          texto: "Desde los pisos altos, el Dique y el puerto de Santa Fe como paisaje propio.",
          foto: { src: img("neo-alem-torre", "vista-puerto"), que: "Vista real desde un piso alto hacia el puerto", firma: "Foto: dron NEO" },
        },
        {
          titulo: "Balcones vidriados con asador",
          texto: "Un balcón que se usa todo el año: cerramiento vidriado y asador propio.",
          foto: { src: img("neo-alem-torre", "balcon"), que: "Render del balcón vidriado con asador", firma: "Render: NEO · [versión]" },
        },
        {
          titulo: "Un paseo peatonal y comercial",
          texto: "Todo el desarrollo queda comunicado por un paseo con locales, parquización, cámaras y seguridad privada.",
          foto: { src: img("neo-alem-torre", "paseo"), que: "Render del paseo peatonal", firma: "Render: NEO · [versión]" },
        },
        {
          titulo: "Piscina",
          texto: "Amenities en el edificio para no tener que salir: piscina y [otros amenities].",
          foto: { src: img("neo-alem-torre", "piscina"), que: "Render de la piscina", firma: "Render: NEO · [versión]" },
        },
      ],
      tipologias: [1, 2, 3].map((d) => ({
        nombre: d === 1 ? "1 dormitorio" : `${d} dormitorios`,
        foto: { src: img("neo-alem-torre", `planta-${d}d`), que: `Planta de ${d === 1 ? "1 dormitorio" : `${d} dormitorios`}, limpia, fondo blanco` },
        superficie: "[m²]",
        disponibles: "[n]",
      })),
      terminaciones: {
        foto: { src: img("neo-alem-torre", "terminaciones"), que: "Detalle de abertura y porcelanato, luz rasante", firma: "Foto: NEO" },
        datos: [
          ["Aberturas", "[marca y línea]"],
          ["Pisos", "[porcelanato, medida]"],
          ["Cocina", "[mesada y muebles]"],
          ["Baños", "[griferías y sanitarios]"],
          ["Climatización", "[sistema]"],
          ["Seguridad", "Cámaras y seguridad privada en el paseo"],
        ],
      },
      avance: {
        porcentaje: null,
        actualizado: "[fecha]",
        hitos: [
          { fecha: "Ene 2026", texto: "Pilotaje terminado: empieza la excavación del subsuelo.", foto: { src: img("neo-alem-torre", "avance-1"), que: "Toma de dron sobre la excavación del subsuelo", firma: "Foto: dron NEO" } },
          { fecha: "[Mes]", texto: "[Hito de obra]", foto: { src: img("neo-alem-torre", "avance-2"), que: "Toma de dron del mes siguiente, mismo punto", firma: "Foto: dron NEO" } },
          { fecha: "[Mes]", texto: "[Hito de obra]", foto: { src: img("neo-alem-torre", "avance-3"), que: "Toma de dron del último mes, mismo punto", firma: "Foto: dron NEO" } },
        ],
      },
      financiacion: [
        ["Seña de reserva", "[monto]"],
        ["Anticipo", "[%]"],
        ["Cuotas", "[cantidad]"],
        ["Ajuste", "[índice]"],
        ["Saldo", "[condición]"],
        ["Moneda", "Cuotas en pesos"],
      ],
      cercania: [
        ["Puerto / Dique", "[distancia]"],
        ["Costanera", "[distancia]"],
        ["Centro", "[distancia]"],
        ["Bulevar Gálvez", "[distancia]"],
      ],
      creditos: "Proyecto, dirección y construcción: NEO. Comercializan: [inmobiliarias]. Renders: NEO, [versión y fecha].",
    },
  },
  {
    slug: "neo-alem-barra",
    codigo: "AB",
    nombre: "NEO ALEM Barra",
    nombreLineas: ["NEO ALEM", "Barra"],
    estado: "venta",
    enObra: true,
    resumen: "Tres bloques con hall propio.",
    tarjetaTexto: "Tres bloques con hall propio. Candioti · Entrega [mes/año].",
    direccion: "[Dirección]",
    barrio: "Candioti",
    pisos: "5",
    anio: "[Entrega]",
    picto: "barra",
    mapa: { x: 66, y: 44 },
    fachada: fachada("neo-alem-barra", "NEO ALEM Barra"),
    tarjeta: { src: img("neo-alem-barra", "portada"), que: "Interior de una unidad de NEO ALEM Barra", firma: "Foto o render: NEO" },
    // Para publicar su ficha, copiar la `fichaVenta` de NEO ALEM Torre y adaptarla.
  },
  entregado(20, 48, 30),
  entregado(19, 58, 56, { resumen: "Vistas panorámicas al puerto.", direccion: "Juan de Garay", barrio: "cerca de Av. Alem" }),
  entregado(18, 54, 48, {
    direccion: "Ituzaingó 1825",
    barrio: "Candioti Sur",
    pisos: "8",
    fichaLibro: {
      descripcion:
        "[Dos o tres líneas que cuenten el edificio: qué lo distingue, cómo es vivir ahí, qué había antes en el terreno.]",
      datos: [
        ["Plantas", "8"],
        ["Unidades", "[n]"],
        ["Tipologías", "[1 y 2 dormitorios]"],
        ["Proyecto y obra", "NEO"],
      ],
      fotos: [
        "Fachada entera, con la vereda y la gente, sin recortar el remate",
        "Hall de entrada",
        "Cocina",
        "Living con balcón",
        "Dormitorio principal",
        "Baño",
        "Detalle de abertura",
        "Detalle de terminaciones",
        "Palier",
        "Vista desde el balcón",
        "Fachada de noche",
        "Detalle de fachada",
      ].map((que, i) => ({
        src: img("neo-18", `foto-${String(i + 1).padStart(2, "0")}`),
        que,
        firma: i === 0 ? "Foto: dron NEO · NEO 18" : "Foto: NEO · NEO 18",
      })),
    },
  }),
  entregado(17, 49, 25),
  entregado(16, 62, 66),
  entregado(15, 25, 43),
  entregado(14, 38, 20),
  entregado(13, 51, 61),
  entregado(12, 64, 38),
  entregado(11, 27, 79),
  entregado(10, 40, 56),
  entregado(9, 53, 33),
  entregado(8, 66, 74),
  entregado(7, 29, 51),
  entregado(6, 42, 28),
  entregado(5, 55, 69),
  entregado(4, 68, 46),
  entregado(3, 31, 23),
  entregado(2, 44, 64),
  entregado(1, 57, 41),
];

export const enVenta = edificios.filter((e) => e.estado === "venta");
export const entregados = edificios.filter((e) => e.estado === "entregado");
export const conFicha = edificios.filter((e) => e.fichaVenta || e.fichaLibro);

export const tieneFicha = (e: Edificio) => Boolean(e.fichaVenta || e.fichaLibro);
export const hrefEdificio = (e: Edificio) => (tieneFicha(e) ? `/${e.slug}` : null);
export const buscarEdificio = (slug: string) => edificios.find((e) => e.slug === slug);
