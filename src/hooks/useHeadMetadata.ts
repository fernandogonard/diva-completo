import { useEffect } from 'react';
import type { PageMetadata } from '../types';

/**
 * Hook para manejar metadata dinámicamente
 * Actualiza title, meta tags y schema markup
 * 
 * @example
 * useHeadMetadata({
 *   title: 'Habitaciones | Hotel Diva',
 *   description: 'Descubre nuestras habitaciones...',
 *   ogImage: '/images/rooms.webp',
 *   schema: { "@type": "Room", ... }
 * })
 */
export function useHeadMetadata(metadata: PageMetadata) {
  useEffect(() => {
    // Actualizar title
    document.title = metadata.title;

    // Actualizar o crear meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', metadata.description);

    // Actualizar meta keywords si existen
    if (metadata.keywords?.length) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute('content', metadata.keywords.join(', '));
    }

    // Actualizar Open Graph
    if (metadata.ogImage) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', metadata.ogImage);
    }

    if (metadata.ogType) {
      let ogType = document.querySelector('meta[property="og:type"]');
      if (!ogType) {
        ogType = document.createElement('meta');
        ogType.setAttribute('property', 'og:type');
        document.head.appendChild(ogType);
      }
      ogType.setAttribute('content', metadata.ogType);
    }

    // Actualizar canonical
    if (metadata.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', metadata.canonical);
    }

    // Actualizar noindex
    if (metadata.noindex) {
      let robots = document.querySelector('meta[name="robots"]');
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        document.head.appendChild(robots);
      }
      robots.setAttribute('content', 'noindex, nofollow');
    }

    // Actualizar schema markup
    if (metadata.schema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"][data-page-schema]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('data-page-schema', 'true');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(metadata.schema);
    }

    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [metadata]);
}
