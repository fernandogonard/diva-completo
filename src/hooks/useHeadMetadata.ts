import { useEffect } from 'react';
import { SITE_URL } from '../constants';
import type { PageMetadata } from '../types';

/**
 * Hook para manejar metadata dinámicamente
 * Actualiza title, meta tags y schema markup
 * 
 * @example
 * useHeadMetadata({
 *   title: 'Habitaciones | Hotel Diva',
 *   description: 'Descubre nuestras habitaciones...',
 *   ogImage: '/images/rooms/matrimonial-1.webp',
 *   schema: { "@type": "Room", ... }
 * })
 */
export function useHeadMetadata(metadata: PageMetadata) {
  const keywords = metadata.keywords?.join(', ');
  const schema = metadata.schema ? JSON.stringify(metadata.schema) : undefined;

  useEffect(() => {
    document.title = metadata.title;
    document.documentElement.lang = 'es-AR';

    const setMeta = (
      selector: string,
      attribute: 'name' | 'property',
      key: string,
      content: string,
    ) => {
      const matches = document.head.querySelectorAll<HTMLMetaElement>(selector);
      let element = matches[0];
      matches.forEach((duplicate, index) => {
        if (index > 0) duplicate.remove();
      });
      if (!content) {
        element?.remove();
        return;
      }
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    const canonicalUrl = metadata.canonical
      ? new URL(metadata.canonical, SITE_URL).href
      : undefined;
    const imageUrl = new URL(metadata.ogImage || '/images/hero.webp', SITE_URL).href;
    const pageTitle = metadata.title;
    const pageDescription = metadata.description;
    const pageType = metadata.ogType || 'website';

    setMeta('meta[name="description"]', 'name', 'description', pageDescription);
    setMeta('meta[name="keywords"]', 'name', 'keywords', keywords || '');
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      metadata.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    );

    setMeta('meta[property="og:type"]', 'property', 'og:type', pageType);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'es_AR');
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Hotel Diva');
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', pageDescription);
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl || '');
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', 'Hotel Diva en Mar del Plata');

    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', pageDescription);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
    setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', canonicalUrl || '');

    const canonicals = document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
    let canonical = canonicals[0];
    canonicals.forEach((duplicate, index) => {
      if (index > 0) duplicate.remove();
    });
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    } else {
      canonical?.remove();
    }

    const schemaScripts = document.head.querySelectorAll<HTMLScriptElement>(
      'script[type="application/ld+json"][data-page-schema]',
    );
    let schemaScript = schemaScripts[0];
    schemaScripts.forEach((duplicate, index) => {
      if (index > 0) duplicate.remove();
    });
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.dataset.pageSchema = 'true';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = schema;
    } else {
      schemaScript?.remove();
    }

    window.scrollTo(0, 0);
  }, [
    metadata.canonical,
    metadata.description,
    metadata.noindex,
    metadata.ogImage,
    metadata.ogType,
    metadata.title,
    keywords,
    schema,
  ]);
}
