/**
 * Datos de entidad tomados del sitio publicado en zappydelivery.com
 * (consulta de noviembre de 2026) y, donde se indica, de la ficha
 * pública de la app en Google Play.
 */
export const site = {
  name: "Zappy Delivery",
  legalName: "Soluciones Operativas, S.A.",
  url: "https://www.zappydelivery.com",
  locale: "es-PA",
  ogLocale: "es_PA",
  lang: "es-PA",
  city: "Ciudad de Panamá",
  country: "Panamá",
  countryCode: "PA",
  tagline: "Mensajería y última milla para empresas en Panamá.",
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
   * TODO: el sitio solo dice "Ciudad de Panamá". No hay calle ni horario.
   */
  streetAddress: null as string | null,
  addressTodo:
    "TODO: publicar la dirección de la oficina. El sitio actual solo indica Ciudad de Panamá.",
  hoursTodo:
    "TODO: confirmar y publicar el horario de atención. No aparece en zappydelivery.com.",
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
