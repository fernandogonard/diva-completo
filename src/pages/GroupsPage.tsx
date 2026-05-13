import { useHeadMetadata } from '../hooks';
import { GroupsSection } from '../components/sections';

function GroupsPage() {
  useHeadMetadata({
    title: 'Grupos y Contingentes | Hotel Diva',
    description: 'Especialistas en alojamiento de equipos deportivos, delegaciones y eventos masivos en Mar del Plata. Cocina propia y atención personalizada.',
    keywords: ['grupos', 'contingentes', 'eventos', 'equipos deportivos'],
    ogImage: '/images/groups-og.webp',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Grupos y Contingentes - Hotel Diva',
      description: 'Servicios especializados para grupos',
    },
  });

  return (
    <main>
      <GroupsSection />
    </main>
  );
}

export default GroupsPage;
