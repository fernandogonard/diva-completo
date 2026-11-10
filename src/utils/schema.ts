/**
 * Schema.org JSON-LD utilities for the hotel's verified public information.
 */

import { HOTEL_INFO, SITE_URL } from '../constants';

interface PostalAddressSchema {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface SchemaOrganization {
  '@context': string;
  '@type': 'Organization';
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: PostalAddressSchema;
  sameAs: string[];
  logo: string;
}

export interface SchemaBreadcrumb {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface SchemaHotel {
  '@context': string;
  '@type': 'Hotel';
  '@id': string;
  name: string;
  description: string;
  image: string;
  telephone: string;
  email: string;
  address: PostalAddressSchema;
  sameAs: string[];
  url: string;
}

export type SchemaLocalBusiness = SchemaHotel;
export type SupportedSchema = SchemaOrganization | SchemaHotel | SchemaBreadcrumb;

const address: PostalAddressSchema = {
  '@type': 'PostalAddress',
  streetAddress: 'Calle Garay 1630',
  addressLocality: 'Mar del Plata',
  addressRegion: 'Buenos Aires',
  postalCode: '7600',
  addressCountry: 'AR',
};

const description =
  'Hotel en Mar del Plata especializado en turismo, grupos deportivos y eventos.';
const socialProfiles = ['https://www.instagram.com/hoteldivamdp/'];

export function createOrganizationSchema(): SchemaOrganization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: HOTEL_INFO.name,
    description,
    url: SITE_URL,
    telephone: '+542235033585',
    email: HOTEL_INFO.email,
    address,
    sameAs: socialProfiles,
    logo: `${SITE_URL}/images/logo.webp`,
  };
}

export function createHotelSchema(): SchemaHotel {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${SITE_URL}/`,
    name: HOTEL_INFO.name,
    description,
    image: `${SITE_URL}/images/hero.webp`,
    telephone: '+542235033585',
    email: HOTEL_INFO.email,
    address,
    sameAs: socialProfiles,
    url: SITE_URL,
  };
}

export function createLocalBusinessSchema(): SchemaLocalBusiness {
  return createHotelSchema();
}

export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
): SchemaBreadcrumb {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function injectSchema(schema: SupportedSchema, id?: string): void {
  if (id) {
    document.getElementById(id)?.remove();
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id || `schema-${Date.now()}`;
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function injectSchemas(
  schemas: Array<{ schema: SupportedSchema; id?: string }>,
): void {
  schemas.forEach(({ schema, id }) => injectSchema(schema, id));
}
