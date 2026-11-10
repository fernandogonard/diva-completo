import { useHeadMetadata } from '../hooks';
import { GroupsSection } from '../components/sections';

function GroupsPage() {
  useHeadMetadata({
    title: 'Grupos y Contingentes | Hotel Diva',
    description: 'Especialistas en alojamiento de equipos deportivos, delegaciones y eventos masivos en Mar del Plata. Cocina propia y atención personalizada.',
    keywords: ['grupos', 'contingentes', 'eventos', 'equipos deportivos'],
    ogImage: '/images/hero.webp',
    canonical: '/grupos',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Grupos y Contingentes - Hotel Diva',
      description: 'Servicios especializados para grupos',
    },
  });

  return (
    <main id="main-content" tabIndex={-1}>
      <h1 className="sr-only">Grupos y contingentes en Hotel Diva</h1>
      <GroupsSection />
    </main>
  );
}

export default GroupsPage;
