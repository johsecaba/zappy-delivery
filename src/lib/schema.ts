import { site, absoluteUrl } from "../config/site";
import type { FaqItem } from "../data/faq";
import type { Service } from "../data/services";

export const organizationId = `${site.url}/#organization`;

export function organizationNode() {
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": organizationId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    image: absoluteUrl("/og-zappy.jpg"),
    logo: absoluteUrl("/favicon-192.png"),
    telephone: site.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: site.countryCode,
    },
    areaServed: {
      "@type": "Country",
      name: site.country,
    },
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
    ],
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
  return {
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: absoluteUrl(`/servicios/${service.slug}`),
    provider: { "@id": organizationId },
    areaServed: {
      "@type": "Country",
      name: site.country,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `https://wa.me/${site.whatsappE164}`,
      servicePhone: `+${site.whatsappE164}`,
    },
  };
}

export function faqNode(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
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
