import { describe, expect, it } from 'vitest';
import { HOTEL_INFO, SITE_URL } from '../constants';
import { createHotelSchema, createOrganizationSchema } from './schema';

describe('Hotel structured data', () => {
  it('uses the verified site, contact, and address without unverified claims', () => {
    const schema = createHotelSchema();

    expect(schema).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Hotel',
      '@id': `${SITE_URL}/`,
      name: HOTEL_INFO.name,
      url: SITE_URL,
      image: `${SITE_URL}/images/hero.webp`,
      telephone: '+542235033585',
      email: HOTEL_INFO.email,
      address: {
        streetAddress: 'Calle Garay 1630',
        addressLocality: 'Mar del Plata',
        addressRegion: 'Buenos Aires',
        postalCode: '7600',
        addressCountry: 'AR',
      },
    });
    expect(schema).not.toHaveProperty('geo');
    expect(schema).not.toHaveProperty('aggregateRating');
    expect(schema).not.toHaveProperty('priceRange');
  });

  it('keeps Organization metadata on the same canonical domain', () => {
    expect(createOrganizationSchema()).toMatchObject({
      '@type': 'Organization',
      url: SITE_URL,
      telephone: '+542235033585',
      email: HOTEL_INFO.email,
    });
  });
});
