/**
 * Datos de entidad tomados del sitio publicado en zappydelivery.com
 * (consulta de noviembre de 2026) y, donde se indica, de la ficha
 * pública de la app en Google Play.
 */
export const site = {
  name: "Zappy Delivery",
  legalName: "Soluciones Operativas, S.A.",
  url: "https://zappydelivery.com",
  locale: "es-PA",
  ogLocale: "es_PA",
  lang: "es-PA",
  city: "Ciudad de Panamá",
  country: "Panamá",
  countryCode: "PA",
  tagline: "Mensajería y última milla para empresas en Panamá.",
  /**
   * Título de la portada. El layout no añade la marca: este texto es el <title>.
   * 59 caracteres. Incluye B2B y última milla.
   */
  homeTitle: "Mensajería corporativa B2B y última milla en Panamá | Zappy",
  /**
   * Misión y visión publicadas en /empresas.
   */
  mission:
    "Trabajar de la mano con los clientes, con soluciones logísticas que les generan ahorros y satisfacción de sus propios clientes por encima de la competencia.",
  vision: "Ser el proveedor número uno en Panamá para entregas de última milla.",
  positioning:
    "Zappy es gestión de transporte y carga de última milla para uso comercial. En la ciudad la flota es de mensajeros en moto. Distribuye inventario, mueve mercancía entre sucursales y entrega puerta a puerta para e-commerce.",
  /**
   * Número del enlace wa.me del botón de WhatsApp en zappydelivery.com
   * (barra social del sitio): https://wa.me/+50766009480
   */
  whatsappE164: "50766009480",
  whatsappDisplay: "+507 6600-9480",
  /**
   * Campo businessPhone del modelo del sitio Wix de zappydelivery.com.
   */
  phoneE164: "+5072155583",
  phoneDisplay: "+507 215-5583",
  /**
   * TODO: zappydelivery.com no publica un correo. La ficha de Google Play
   * de la app "Zappy Delivery" (mismo teléfono +507 6600-9480) lista
   * info@zappymail.com. Confirmar antes de mostrarlo como canal oficial.
   */
  email: null as string | null,
  emailTodo:
    "TODO: confirmar el correo público. No aparece en zappydelivery.com. La ficha de Google Play de la app lista info@zappymail.com.",
  /**
   * TODO: el sitio solo dice "Ciudad de Panamá". No hay calle.
   */
  streetAddress: null as string | null,
  addressTodo:
    "TODO: publicar la dirección de la oficina. El sitio actual solo indica Ciudad de Panamá.",
  /**
   * Horario de la mensajería corporativa, confirmado por la empresa.
   * Termina en «p.m.»: no agregar otro punto después.
   */
  serviceHours: "lunes a sábado, de 8:00 a.m. a 5:00 p.m.",
  whatsappMessage:
    "Hola, quiero información sobre el servicio de mensajería de Zappy Delivery para mi empresa.",
  social: {
    instagram: "https://instagram.com/zappydelivery",
    facebook: "https://m.facebook.com/ZappyDelivery-171078344488154/",
    linkedin: "https://www.linkedin.com/in/zappy-delivery-7520ba205",
  },
  /**
   * Colores muestreados del logotipo publicado en zappydelivery.com
   * (archivo «LOGOTIPO ZAPPY DEGRADADOS»). No hay manual de marca público.
   * Mediana de píxeles saturados del wordmark, del ala y de «DELIVERY».
   */
  colors: {
    navy: "#21397A",
    sky: "#008BCE",
    orange: "#EB6935",
    linen: "#F3F3F1",
    ink: "#000000",
  },
} as const;

export function whatsappHref(message: string = site.whatsappMessage): string {
  return `https://wa.me/${site.whatsappE164}?text=${encodeURIComponent(message)}`;
}

/**
 * Dos oraciones citables: quién es Zappy, qué hace, dónde y cómo contactarlo.
 * Usa solo datos publicados (sin correo, calle ni tarifas).
 * El horario de la mensajería corporativa está en serviceHours.
 */
export function siteSummary(): string {
  return `Zappy Delivery es una empresa de mensajería corporativa y mensajería en moto en ${site.city}, ${site.country}. Atiende tarjetas bancarias, documentos y entregas de tiendas por WhatsApp al ${site.whatsappDisplay}; si la carga no cabe en moto, hay panel o camión hasta el interior.`;
}

/** Meta description de la portada. 144 caracteres. Incluye B2B y última milla. */
export function homeDescription(): string {
  return "Mensajería corporativa B2B y última milla en Panamá: tarjetas, documentos y entregas para tiendas en moto. Panel o camión al interior. WhatsApp.";
}

export function absoluteUrl(path: string): string {
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");
  return new URL(normalized, site.url).href;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-PA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
