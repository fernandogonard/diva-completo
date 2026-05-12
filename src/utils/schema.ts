/**
 * Schema.org JSON-LD Utilities
 * Implementación de structured data para SEO
 */

export interface SchemaOrganization {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[];
  logo: string;
}

export interface SchemaBreadcrumb {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface SchemaLocalBusiness {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string;
  telephone: string;
  priceRange: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    "@type": string;
    latitude: number;
    longitude: number;
  };
  url: string;
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    reviewCount: string;
  };
}

/**
 * Crear schema de Organización
 */
export function createOrganizationSchema(): SchemaOrganization {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hotel Diva",
    description:
      "Hotel en Mar del Plata especializado en turismo, grupos deportivos y eventos. Cocina propia, atención 24hs.",
    url: "https://diva-hotel-mar-del-plata.netlify.app",
    telephone: "+54 9 2235 03-3585",
    email: "matias@hoteldiva.com.ar",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Garay 1630",
      addressLocality: "Mar del Plata",
      addressRegion: "Buenos Aires",
      postalCode: "7600",
      addressCountry: "AR",
    },
    sameAs: [
      "https://www.facebook.com/p/Hotel-Diva-MDP-100076003113878/",
      "https://www.instagram.com/hoteldivamdp/",
    ],
    logo: "https://diva-hotel-mar-del-plata.netlify.app/images/logo.png",
  };
}

/**
 * Crear schema de Local Business (Hotel)
 */
export function createLocalBusinessSchema(): SchemaLocalBusiness {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Hotel Diva",
    description:
      "Hotel en Mar del Plata con habitaciones para turismo, grupos deportivos, contingentes y eventos. Cocina propia, desayuno buffet y atención personalizada.",
    image: "https://diva-hotel-mar-del-plata.netlify.app/images/hero.jpg",
    telephone: "+54 9 2235 03-3585",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Garay 1630",
      addressLocality: "Mar del Plata",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -38.0036,
      longitude: -57.5599,
    },
    url: "https://diva-hotel-mar-del-plata.netlify.app",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.4",
      reviewCount: "128",
    },
  };
}

/**
 * Crear schema de Breadcrumb Navigation
 */
export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
): SchemaBreadcrumb {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Inyectar schema JSON-LD en el documento
 */
export function injectSchema(
  schema: SchemaOrganization | SchemaLocalBusiness | SchemaBreadcrumb,
  id?: string,
) {
  // Remover schema anterior si existe
  if (id) {
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id || `schema-${Date.now()}`;
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Inyectar múltiples schemas
 */
export function injectSchemas(
  schemas: Array<{
    schema: SchemaOrganization | SchemaLocalBusiness | SchemaBreadcrumb;
    id?: string;
  }>,
) {
  schemas.forEach(({ schema, id }) => {
    injectSchema(schema, id);
  });
}
