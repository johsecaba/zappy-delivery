import { site, absoluteUrl, siteSummary } from "../config/site";
import { interiorCities } from "../data/coverage";
import type { FaqItem } from "../data/faq";
import { services, type Service } from "../data/services";

export const organizationId = `${site.url}/#organization`;
const catalogId = `${site.url}/#offer-catalog`;

/**
 * schema.org no define un tipo CourierService. La entidad es LocalBusiness
 * (empresa local de mensajería) más Organization.
 */
function countryNode() {
  return { "@type": "Country", name: site.country };
}

function cityNode(name: string) {
  return {
    "@type": "City",
    name,
    containedInPlace: countryNode(),
  };
}

function areaServed(scope: "urban" | "national") {
  const cities = scope === "national" ? [site.city, ...interiorCities] : [site.city];
  return [...cities.map((city) => cityNode(city)), countryNode()];
}

function scopeFor(slug: string): "urban" | "national" {
  return slug === "traslados-panel-camion" ? "national" : "urban";
}

/** Lunes a sábado, 8:00 a.m. a 5:00 p.m. Confirmado para la mensajería corporativa. */
const openingHoursSpecification = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "08:00",
  closes: "17:00",
};

function serviceEntity(service: Service) {
  const corporate = service.slug === "mensajeria-corporativa";
  return {
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    ...(corporate ? { alternateName: "Mensajería empresarial" } : {}),
    description: service.description,
    url: absoluteUrl(`/servicios/${service.slug}`),
    provider: { "@id": organizationId },
    areaServed: corporate ? cityNode(site.city) : areaServed(scopeFor(service.slug)),
    ...(corporate
      ? {
          hoursAvailable: openingHoursSpecification,
          openingHoursSpecification,
        }
      : {}),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `https://wa.me/${site.whatsappE164}`,
      servicePhone: `+${site.whatsappE164}`,
    },
  };
}

export function organizationNode() {
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": organizationId,
    name: site.name,
    legalName: site.legalName,
    description: siteSummary(),
    url: site.url,
    image: absoluteUrl("/og-zappy.jpg"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/favicon-192.png"),
    },
    telephone: site.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: "Panamá",
      addressCountry: site.countryCode,
    },
    areaServed: areaServed("national"),
    openingHours: "Mo-Sa 08:00-17:00",
    openingHoursSpecification,
    knowsLanguage: "es",
    slogan: site.tagline,
    sameAs: [site.social.instagram, site.social.facebook, site.social.linkedin],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+${site.whatsappE164}`,
        contactType: "customer service",
        url: `https://wa.me/${site.whatsappE164}`,
        availableLanguage: ["es"],
        areaServed: site.countryCode,
      },
      {
        "@type": "ContactPoint",
        telephone: site.phoneE164,
        contactType: "customer service",
        availableLanguage: ["es"],
        areaServed: site.countryCode,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "@id": catalogId,
      name: "Servicios de mensajería y última milla",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Offer",
          name: service.name,
          url: absoluteUrl(`/servicios/${service.slug}`),
          itemOffered: serviceEntity(service),
        },
      })),
    },
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: siteSummary(),
    inLanguage: site.locale,
    publisher: { "@id": organizationId },
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceNode(service: Service) {
  return serviceEntity(service);
}

export function faqNode(items: FaqItem[], path?: string) {
  return {
    "@type": "FAQPage",
    ...(path
      ? {
          "@id": `${absoluteUrl(path)}#faq`,
          url: absoluteUrl(path),
          inLanguage: site.locale,
          isPartOf: { "@id": `${site.url}/#website` },
        }
      : {}),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleNode(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  const image = input.image
    ? input.image.startsWith("http")
      ? input.image
      : absoluteUrl(input.image)
    : absoluteUrl("/og-zappy.jpg");
  return {
    "@type": "Article",
    headline: input.title,
    description: input.description,
    inLanguage: site.locale,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    image,
  };
}

export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
