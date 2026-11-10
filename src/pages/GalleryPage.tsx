import { useHeadMetadata } from '../hooks';
import { GallerySection } from '../components/sections';

function GalleryPage() {
  useHeadMetadata({
    title: 'Galería | Hotel Diva Mar del Plata',
    description: 'Visualiza las instalaciones de Hotel Diva. Habitaciones, áreas comunes, terraza y vistas panorámicas de Mar del Plata.',
    keywords: ['galería', 'fotos', 'hotel', 'instalaciones'],
    ogImage: '/images/gallery/gallery-1.webp',
    canonical: '/galeria',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Galería - Hotel Diva',
      description: 'Fotos de nuestras instalaciones',
    },
  });

  return (
    <main id="main-content" tabIndex={-1}>
      <h1 className="sr-only">Galería de Hotel Diva</h1>
      <GallerySection />
    </main>
  );
}

export default GalleryPage;
