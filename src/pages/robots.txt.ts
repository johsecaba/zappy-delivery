import type { APIRoute } from "astro";
import { site } from "../config/site";

/**
 * Crawlers de buscadores y asistentes de IA. Los nombres son los que publica
 * cada empresa. Google AI Overviews usa Googlebot, cubierto por User-agent: *.
 * Google-Extended controla el uso para entrenar Gemini.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
  "FacebookBot",
  "CCBot",
  "Bytespider",
  "cohere-ai",
  "DuckAssistBot",
  "YouBot",
  "Diffbot",
];

export const GET: APIRoute = ({ site: origin }) => {
  const base = origin ?? new URL(site.url);
  const sitemap = new URL("sitemap-index.xml", base).href;
  const llms = new URL("llms.txt", base).href;
  const full = new URL("llms-full.txt", base).href;
  const body = [
    `# ${site.name}. El contenido es público para buscadores y asistentes.`,
    `# Resumen para modelos: ${llms}`,
    `# Texto ampliado de servicios y preguntas frecuentes: ${full}`,
    "# Google AI Overviews rastrea con Googlebot, permitido abajo en User-agent: *.",
    "",
    ...aiCrawlers.map((name) => `User-agent: ${name}`),
    "Allow: /",
    "",
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${sitemap}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
