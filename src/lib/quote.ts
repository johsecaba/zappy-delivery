import { whatsappHref } from "../config/site";

export type QuoteCta = {
  label: string;
  kind: "quote";
  service: string;
  message: string;
};

export type WhatsAppCta = {
  label: string;
  kind: "whatsapp";
  message: string;
};

export type LinkCta = {
  label: string;
  kind: "link";
  href: string;
};

export type Cta = QuoteCta | WhatsAppCta | LinkCta;

export function quoteHref(service: string, message?: string): string {
  const params = new URLSearchParams();
  params.set("servicio", service);
  if (message) params.set("mensaje", message);
  return `/contacto?${params.toString()}`;
}

export function ctaHref(cta: Cta): string {
  if (cta.kind === "quote") return quoteHref(cta.service, cta.message);
  if (cta.kind === "whatsapp") return whatsappHref(cta.message);
  return cta.href;
}
