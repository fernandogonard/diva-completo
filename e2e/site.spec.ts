import { expect, test } from '@playwright/test';

const canonicalOrigin = 'https://hotel-diva-mar-del-plata.netlify.app';
const validRoutes = [
  { path: '/', heading: /Hotel Diva/i },
  { path: '/habitaciones', heading: 'Habitaciones del Hotel Diva' },
  { path: '/galeria', heading: 'Galería de Hotel Diva' },
  { path: '/grupos', heading: 'Grupos y contingentes en Hotel Diva' },
  { path: '/eventos', heading: 'Eventos y Campañas' },
  { path: '/contacto', heading: 'Contactanos' },
];

test.describe('rutas, SEO y recursos', () => {
  for (const route of validRoutes) {
    test(`${route.path} responde y publica metadata canónica`, async ({ page }) => {
      const response = await page.goto(route.path);

      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
      expect(await page.title()).not.toContain('Premium');
      if (route.path === '/') {
        expect(await page.title()).toBe('Hotel Diva | Mar del Plata');
      }
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${canonicalOrigin}${route.path === '/' ? '/' : route.path}`,
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        'content',
        `${canonicalOrigin}${route.path === '/' ? '/' : route.path}`,
      );
      await expect(page.locator('meta[name="description"]')).not.toHaveAttribute('content', '');
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        new RegExp(`^${canonicalOrigin}/images/`),
      );
      await expect(page.locator('meta[name="twitter:url"]')).toHaveAttribute(
        'content',
        `${canonicalOrigin}${route.path === '/' ? '/' : route.path}`,
      );
      await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', await page.title());
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        'content',
        new RegExp(`^${canonicalOrigin}/images/`),
      );
      if (route.path === '/') {
        const schemaText = await page.locator('script[type="application/ld+json"]').first().textContent();
        const schema: { '@id'?: string; url?: string; image?: string } = JSON.parse(schemaText ?? '{}');
        expect(schema['@id']).toBe(`${canonicalOrigin}/`);
        expect(schema.url).toBe(canonicalOrigin);
        expect(schema.image).toBe(`${canonicalOrigin}/images/hero.webp`);
      }
    });
  }

  test('rutas inexistentes tienen status HTTP 404 y página no indexable', async ({ page }) => {
    const response = await page.goto('/ruta-inexistente-e2e');

    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'No encontramos esa página' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });

  test('robots, sitemap y catálogo usan el dominio canónico y recursos existentes', async ({ request }) => {
    const robotsResponse = await request.get('/robots.txt');
    const sitemapResponse = await request.get('/sitemap.xml');
    const catalogResponse = await request.get('/ai-catalog.json');
    const llmsResponse = await request.get('/llms.txt');

    expect(robotsResponse.status()).toBe(200);
    expect(await robotsResponse.text()).toContain(`Sitemap: ${canonicalOrigin}/sitemap.xml`);

    expect(sitemapResponse.status()).toBe(200);
    const sitemap = await sitemapResponse.text();
    const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    expect(locations).toHaveLength(6);
    expect(locations.map((location) => new URL(location).pathname).sort()).toEqual(
      validRoutes.map(({ path }) => path).sort(),
    );
    for (const location of locations) {
      expect(location.startsWith(canonicalOrigin)).toBe(true);
    }

    expect(catalogResponse.status()).toBe(200);
    const catalog = await catalogResponse.json();
    expect(catalog.url).toBe(`${canonicalOrigin}/`);
    expect(catalog.resources.every((resource: { url: string }) => resource.url.startsWith(canonicalOrigin))).toBe(true);

    expect(llmsResponse.status()).toBe(200);
    expect(await llmsResponse.text()).toContain(`${canonicalOrigin}/habitaciones`);

    const imagePaths = [...sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)]
      .map((match) => new URL(match[1]).pathname);
    const referencedAssets = [
      '/images/favicon.ico',
      '/images/logo.png',
      '/images/logo.webp',
      '/images/hero.webp',
      ...imagePaths,
    ];
    for (const imagePath of new Set(referencedAssets)) {
      expect((await request.get(imagePath)).status(), imagePath).toBe(200);
    }
  });

  test('las rutas con barra final conservan la metadata de la URL canónica', async ({ page }) => {
    const response = await page.goto('/habitaciones/');

    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1, name: 'Habitaciones del Hotel Diva' })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${canonicalOrigin}/habitaciones`,
    );
  });

  test('los enlaces internos apuntan a rutas registradas', async ({ page }) => {
    const knownPaths = new Set(validRoutes.map(({ path }) => path));
    await page.goto('/');

    const hrefs = await page.locator('a[href^="/"]').evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute('href') ?? ''),
    );
    for (const href of hrefs) {
      expect(knownPaths.has(new URL(href, page.url()).pathname), href).toBe(true);
    }
  });
});

test.describe('navegación, contenido y responsive', () => {
  test('la navegación móvil abre el menú y llega a una página válida', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    const mobileMenu = page.getByRole('group', { name: 'Menú móvil' });
    await expect(mobileMenu).toBeVisible();
    await mobileMenu.getByRole('link', { name: 'Habitaciones' }).click();
    await expect(page).toHaveURL(/\/habitaciones$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Habitaciones del Hotel Diva' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
  });

  test('no hay formularios de huéspedes y el contacto deriva a WhatsApp', async ({ page }) => {
    await page.goto('/contacto');

    await expect(page.locator('form')).toHaveCount(0);
    await expect(page.locator('a[href^="https://wa.me/"]').first()).toBeVisible();
  });

  test('el botón flotante muestra el logotipo verde oficial y mantiene su etiqueta accesible', async ({ page }) => {
    await page.goto('/');

    const whatsappButton = page.getByRole('button', { name: 'Contactar por WhatsApp' });
    await expect(whatsappButton).toBeVisible();
    await expect(whatsappButton.locator('svg')).toHaveAttribute('viewBox', '0 0 448 512');
    await expect(whatsappButton).toHaveCSS('background-color', 'rgb(37, 211, 102)');
  });

  test('las vistas desktop, tablet y móvil no generan desbordamiento horizontal', async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }));

      expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
    }
  });

  test('el hero no recorta su contenido en una ventana de poca altura', async ({ page }) => {
    await page.setViewportSize({ width: 946, height: 466 });
    await page.goto('/');

    const heading = page.getByRole('heading', { level: 1, name: 'Hotel Diva' });
    const badge = page.getByText('Nuestras únicas estrellas son nuestros huéspedes');
    await expect(heading).toBeVisible();
    await expect(badge).toBeVisible();
    const headingBox = await heading.boundingBox();
    const heroBox = await page.locator('#home').boundingBox();
    const headerBox = await page.locator('header').boundingBox();
    const badgeBox = await badge.boundingBox();

    expect(headingBox).not.toBeNull();
    expect(heroBox).not.toBeNull();
    expect(headerBox).not.toBeNull();
    expect(badgeBox).not.toBeNull();
    if (!headingBox || !heroBox || !headerBox || !badgeBox) {
      throw new Error('No se pudieron medir los elementos del encabezado y el hero.');
    }

    expect(headingBox.y).toBeGreaterThanOrEqual(heroBox.y);
    expect(headingBox.y + headingBox.height).toBeLessThanOrEqual(heroBox.y + heroBox.height);
    expect(badgeBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height);
  });
});

test('Netlify aplica headers defensivos y revalidación a los recursos', async ({ request }) => {
  const pageResponse = await request.get('/');
  expect(pageResponse.status()).toBe(200);
  const headers = pageResponse.headers();
  expect(headers['content-security-policy']).toContain("object-src 'none'");
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(headers['permissions-policy']).toContain('geolocation=()');

  const html = await pageResponse.text();
  const assetPath = html.match(/src="(\/assets\/[^"]+\.js)"/)?.[1];
  expect(assetPath).toBeDefined();
  if (!assetPath) {
    throw new Error('No se encontró un bundle JavaScript con hash en el HTML publicado.');
  }
  const assetResponse = await request.get(assetPath);
  expect(assetResponse.status()).toBe(200);
  expect(assetResponse.headers()['cache-control']).toMatch(/(?:no-cache|max-age=0)/);
});
