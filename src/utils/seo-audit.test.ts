import { afterEach, describe, expect, it, vi } from 'vitest';
import { performSEOAudit } from './seo-audit';

afterEach(() => {
  vi.unstubAllGlobals();
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  document.documentElement.lang = '';
});

describe('performSEOAudit', () => {
  it('includes robots and sitemap checks before calculating the report', async () => {
    document.head.innerHTML = `
      <title>Hotel Diva</title>
      <meta name="description" content="Hotel en Mar del Plata">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="canonical" href="https://diva-hotel-mar-del-plata.netlify.app/">
      <meta property="og:title" content="Hotel Diva">
      <meta property="og:image" content="https://diva-hotel-mar-del-plata.netlify.app/images/hero.webp">
      <script type="application/ld+json">{}</script>
    `;
    document.body.innerHTML = '<h1>Hotel Diva</h1><img alt="Fachada del hotel">';
    document.documentElement.lang = 'es-AR';
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);

    const report = await performSEOAudit();

    expect(report.results).toHaveLength(11);
    expect(report.results.find((result) => result.category === 'Robots.txt')?.passed).toBe(true);
    expect(report.results.find((result) => result.category === 'Sitemap.xml')?.passed).toBe(true);
    expect(report.score).toBe(100);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('reports network errors rather than silently treating checks as successful', async () => {
    document.head.innerHTML = '<title>Hotel Diva</title>';
    vi.stubGlobal(
      'fetch',
      vi.fn()
        .mockRejectedValueOnce(new Error('offline'))
        .mockResolvedValueOnce({ ok: true, status: 200 }),
    );

    const report = await performSEOAudit();

    expect(report.results.find((result) => result.category === 'Robots.txt')).toMatchObject({
      passed: false,
      message: 'Could not verify /robots.txt: offline',
    });
    expect(report.summary.warnings).toBeGreaterThan(0);
  });
});
