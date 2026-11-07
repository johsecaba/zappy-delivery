import { readFileSync } from "node:fs";
import { categories } from "../data/blog";
import { cityZones, interiorCities } from "../data/coverage";
import { faqs } from "../data/faq";
import {
  corporateCta,
  corporateFaqs,
  corporateIntro,
  corporatePath,
  corporateSections,
} from "../data/mensajeria-corporativa";
import { services } from "../data/services";
import { absoluteUrl, homeDescription, site, siteSummary } from "../config/site";
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

function corporateMarkdown(): string[] {
  const lines: string[] = [corporateIntro, ""];
  for (const section of corporateSections) {
    lines.push(`## ${section.heading}`, "");
    for (const paragraph of section.paragraphs ?? []) lines.push(absolutize(paragraph), "");
    if (section.bullets?.length) {
      for (const bullet of section.bullets) lines.push(`- ${absolutize(bullet)}`);
      lines.push("");
    }
    if (section.steps?.length) {
      section.steps.forEach((step, index) => {
        lines.push(`${index + 1}. ${absolutize(step)}`);
      });
      lines.push("");
    }
    for (const group of section.groups ?? []) {
      lines.push(`### ${group.heading}`, "");
      for (const paragraph of group.paragraphs) lines.push(absolutize(paragraph), "");
    }
  }
  lines.push("## Preguntas frecuentes", "");
  for (const item of corporateFaqs) {
    lines.push(`### ${item.question}`, "", item.answer, "");
  }
  lines.push(corporateCta, "");
  return lines;
}

/**
 * /llms.txt — índice en el formato de https://llmstxt.org
 * H1, cita, datos y secciones de enlaces con una línea de descripción.
 */
export async function renderLlmsTxt(): Promise<string> {
  const posts = await getPublishedPosts();
  const cards = services.find((service) => service.slug === "entrega-de-tarjetas-bancarias");
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
    `- Horario de la mensajería corporativa: de ${site.serviceHours} Los días de la semana no están publicados.`,
    `- Misión: ${site.mission}`,
    `- Visión: ${site.vision}`,
  ];

  if (cards) {
    const [time, rating] = cards.points;
    lines.push(
      `- Cifras publicadas, solo para la entrega de tarjetas bancarias: ${time.body} ${rating.body}`,
    );
  }

  lines.push(
    "",
    "## Servicios",
    "",
    ...services.map((service) => link(service.name, `/servicios/${service.slug}`, service.summary)),
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
      "Mensajería en moto en Panamá y traslados en panel o camión: tarjetas, comercios, diligencias, Zappy Express y Zappy Business.",
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
      "Cobertura, tarjetas bancarias, envíos al interior, Zappy Express, ZappyPoints, seguro y contacto.",
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
    `Texto ampliado para asistentes. Repite el contenido publicado de los servicios, las preguntas frecuentes y la cobertura. No agrega montos de tarifa, dirección de calle ni reseñas que ${site.name} no publica. El horario de la mensajería corporativa sí está, de ${site.serviceHours}, sin los días.`,
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

  for (const service of services) {
    if (service.slug === "mensajeria-corporativa") {
      lines.push(`### ${service.h1}`, "", absoluteUrl(corporatePath), "", ...corporateMarkdown());
      continue;
    }
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
    `Ciudades del interior nombradas en traslados en panel o camión: ${interiorCities.join(", ")}. No hay calendario público de salidas ni tiempo de tránsito.`,
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
    `El canal principal es WhatsApp al ${site.whatsappDisplay}. El teléfono de negocio publicado es ${site.phoneDisplay}. No hay correo ni dirección de calle publicados. El horario de la mensajería corporativa es de ${site.serviceHours} Los días no están publicados. El formulario del sitio arma el mensaje y abre WhatsApp; no guarda datos en el servidor.`,
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
