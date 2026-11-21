import { readFileSync } from "node:fs";
import { categories } from "../data/blog";
import { cityZones, interiorCities } from "../data/coverage";
import { faqs } from "../data/faq";
import { landings } from "../data/landings";
import { services } from "../data/services";
import { absoluteUrl, homeDescription, site, siteSummary } from "../config/site";
import { isNoindexPath } from "../config/indexing.mjs";
import { getPublishedPosts, type BlogPost } from "./posts";

function link(label: string, path: string, note: string): string {
  const text = note.replace(/\s+/g, " ").trim();
  return `- [${label}](${absoluteUrl(path)}): ${text}`;
}

function postMarkdown(post: BlogPost): string {
  const entry = post as BlogPost & { body?: string; filePath?: string };
  if (typeof entry.body === "string" && entry.body.trim()) return entry.body.trim();
  if (!entry.filePath) throw new Error(`El artículo ${post.id} no tiene texto para llms-full.txt.`);
  const raw = readFileSync(entry.filePath, "utf8");
  return raw.replace(/^---[\s\S]*?---\s*/, "").trim();
}

function absolutize(markdown: string): string {
  return markdown.replace(/\]\((\/[^)\s]+)\)/g, (_match, path: string) => `](${absoluteUrl(path)})`);
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Las rutas en noindex no se anuncian. Con la lista vacía, las tres landings sí. */
function listedServices() {
  return services.filter((service) => !isNoindexPath(`/servicios/${service.slug}`));
}

function landingLines(slug: string): string[] {
  const landing = landings.find((item) => item.service.slug === slug);
  if (!landing) return [];
  const lines: string[] = [];
  for (const section of landing.sections) {
    if (section.type === "faq") {
      lines.push(`## ${section.heading}`, "");
      for (const item of section.items) lines.push(`### ${item.question}`, "", item.answer, "");
      continue;
    }
    if (!("heading" in section)) continue;
    lines.push(`## ${section.heading}`, "");
    if ("paragraphs" in section && section.paragraphs) {
      for (const paragraph of section.paragraphs) lines.push(paragraph, "");
    }
    if ("description" in section && section.description) lines.push(section.description, "");
    if (section.type === "cards") {
      for (const card of section.cards) lines.push(`**${card.title}.** ${card.body}`, "");
    }
    if (section.type === "industries") {
      for (const item of section.items) {
        lines.push(`### ${item.title}`, "", item.body, "", item.examplesLabel, "");
        for (const example of item.examples) lines.push(`- ${example}`);
        lines.push("");
        if (item.note) lines.push(item.note, "");
      }
    }
    if (section.type === "points" || section.type === "types") {
      for (const item of section.items) lines.push(`**${item.title}.** ${item.body}`, "");
    }
    if (section.type === "steps") {
      for (const step of section.steps) lines.push(`**${step.title}.** ${step.body}`, "");
    }
    if ("note" in section && section.note) lines.push(section.note, "");
  }
  return lines;
}

/**
 * /llms.txt — índice en el formato de https://llmstxt.org
 * H1, cita, datos y secciones de enlaces con una línea de descripción.
 */
export async function renderLlmsTxt(): Promise<string> {
  const posts = await getPublishedPosts();
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${siteSummary()}`,
    "",
    `${site.legalName} opera ${site.name}. ${site.positioning} No es una app de pedidos de comida al consumidor. La mensajería urbana es en moto. El panel o el camión se usa cuando la carga no cabe en una moto o la ruta va al interior.`,
    "",
    `- Nombre comercial: ${site.name}`,
    `- Razón social: ${site.legalName}`,
    `- Sitio: ${site.url}`,
    `- Ciudad: ${site.city}, ${site.country}`,
    `- Área de servicio: ${site.city} y sus afueras (${cityZones.map((zone) => zone.name).join(", ")}). Interior, en panel o camión: ${interiorCities.join(", ")}.`,
    `- Idioma: español (Panamá)`,
    `- WhatsApp: ${site.whatsappDisplay} (https://wa.me/${site.whatsappE164})`,
    `- Teléfono: ${site.phoneDisplay}`,
    `- Instagram: ${site.social.instagram}`,
    `- Facebook: ${site.social.facebook}`,
    `- LinkedIn: ${site.social.linkedin}`,
    "- Correo: no publicado en el sitio",
    `- Dirección de calle: no publicada. Solo consta ${site.city}.`,
    `- Horario de la mensajería corporativa: ${site.serviceHours}`,
    `- Misión: ${site.mission}`,
    `- Visión: ${site.vision}`,
  ];

  lines.push(
    "",
    "## Servicios",
    "",
    ...listedServices().map((service) => link(service.name, `/servicios/${service.slug}`, service.summary)),
    link(
      "ZappyPoints",
      "/zappypoints",
      "Programa de lealtad: por cada 100 puntos, una entrega gratis. Aplican restricciones y el reglamento no está publicado.",
    ),
    "",
    "## Páginas",
    "",
    link("Inicio", "/", homeDescription()),
    link(
      "Servicios",
      "/servicios",
      "Mensajería corporativa, bancaria y para comercios, más Zappy Express y Zappy Business.",
    ),
    link(
      "Empresas",
      "/empresas",
      "Mensajería corporativa y última milla para empresas en Ciudad de Panamá, con misión, visión y tablero de operación.",
    ),
    link(
      "Cobertura",
      "/cobertura",
      `Zonas en ${site.city}: ${cityZones.map((zone) => zone.name.replace("Panamá ", "")).join(", ")}. Interior: ${interiorCities.join(", ")}.`,
    ),
    link(
      "Contacto",
      "/contacto",
      `WhatsApp ${site.whatsappDisplay} y teléfono ${site.phoneDisplay}. El formulario abre el chat y no guarda datos en el sitio.`,
    ),
    link(
      "Preguntas frecuentes",
      "/preguntas-frecuentes",
      "Cobertura, mensajería, envíos al interior, Zappy Express, ZappyPoints, seguro y contacto.",
    ),
    link(
      "Blog",
      "/blog",
      "Guías para empresas que contratan mensajería en Panamá.",
    ),
    link(
      "Texto completo",
      "/llms-full.txt",
      "Servicios, preguntas frecuentes, cobertura y artículos en un solo archivo.",
    ),
    "",
    "## Blog",
    "",
    ...posts.map((post) => link(post.data.title, `/blog/${post.id}`, post.data.description)),
    "",
    "## Optional",
    "",
    ...Object.entries(categories).map(([slug, meta]) =>
      link(meta.label, `/blog/categoria/${slug}`, meta.description),
    ),
    link(
      "Términos y condiciones",
      "/terminos-y-condiciones",
      `Condiciones de ${site.legalName} para el transporte. Póliza publicada hasta 100 dólares y efectivo contra entrega hasta 50 dólares, avisado antes.`,
    ),
    link(
      "Aviso de privacidad",
      "/aviso-de-privacidad",
      `Aviso de ${site.legalName} sobre el tratamiento de datos de clientes. El formulario de este sitio no envía los datos a un servidor: abre WhatsApp.`,
    ),
    "",
  );

  return lines.join("\n");
}

/** /llms-full.txt — texto de servicios, FAQ y páginas principales, generado de los mismos datos. */
export async function renderLlmsFullTxt(): Promise<string> {
  const posts = await getPublishedPosts();
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${siteSummary()}`,
    "",
    `Texto ampliado para asistentes. Repite el contenido publicado de los servicios, las preguntas frecuentes y la cobertura. No agrega montos de tarifa, dirección de calle ni reseñas que ${site.name} no publica. El horario de la mensajería corporativa es de ${site.serviceHours}`,
    "",
    `- Sitio: ${site.url}`,
    `- Índice: ${absoluteUrl("/llms.txt")}`,
    `- Razón social: ${site.legalName}`,
    `- WhatsApp: ${site.whatsappDisplay} (https://wa.me/${site.whatsappE164})`,
    `- Teléfono: ${site.phoneDisplay}`,
    `- Ciudad: ${site.city}, ${site.country}`,
    "",
    "## Empresas",
    "",
    absoluteUrl("/empresas"),
    "",
    site.positioning,
    "",
    `Misión: ${site.mission}`,
    "",
    `Visión: ${site.vision}`,
    "",
    "## Servicios",
    "",
  ];

  for (const service of listedServices()) {
    lines.push(
      `### ${service.h1}`,
      "",
      absoluteUrl(`/servicios/${service.slug}`),
      "",
      service.intro,
      "",
    );
    for (const point of service.points) {
      lines.push(`**${point.title}.** ${point.body}`, "");
    }
    if (service.dedicated) lines.push(...landingLines(service.slug));
    if (service.extra) lines.push(service.extra, "");
  }

  lines.push(
    "## ZappyPoints",
    "",
    absoluteUrl("/zappypoints"),
    "",
    "Programa de lealtad. Por cada 100 puntos, una entrega gratis. Aplican restricciones. Los puntos se acumulan al programar entregas. El sitio no publica una tabla de puntos por tipo de envío ni el reglamento completo.",
    "",
    "## Cobertura",
    "",
    absoluteUrl("/cobertura"),
    "",
    `La mensajería en moto cubre ${site.city} y sus afueras. El interior va en panel o camión.`,
    "",
  );
  for (const zone of cityZones) {
    lines.push(`- **${zone.name}.** ${zone.body}`);
  }
  lines.push(
    "",
    `Ciudades del interior que el sitio nombra para rutas en panel o camión: ${interiorCities.join(", ")}. No hay calendario público de salidas ni tiempo de tránsito.`,
    "",
    "## Preguntas frecuentes",
    "",
    absoluteUrl("/preguntas-frecuentes"),
    "",
  );
  for (const item of faqs) {
    lines.push(`### ${item.question}`, "", item.answer, "");
  }

  lines.push(
    "## Contacto",
    "",
    absoluteUrl("/contacto"),
    "",
    `El canal principal es WhatsApp al ${site.whatsappDisplay}. El teléfono de negocio publicado es ${site.phoneDisplay}. No hay correo ni dirección de calle publicados. El horario de la mensajería corporativa es de ${site.serviceHours} El formulario del sitio arma el mensaje y abre WhatsApp; no guarda datos en el servidor.`,
    "",
    "## Blog",
    "",
  );

  for (const post of posts) {
    const modified = post.data.updatedDate ?? post.data.pubDate;
    lines.push(
      `### ${post.data.title}`,
      "",
      absoluteUrl(`/blog/${post.id}`),
      "",
      `Publicado: ${isoDate(post.data.pubDate)}. Actualizado: ${isoDate(modified)}.`,
      "",
      post.data.description,
      "",
      absolutize(postMarkdown(post)),
      "",
    );
  }

  return `${lines.join("\n").trimEnd()}\n`;
}
