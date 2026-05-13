import { useHeadMetadata } from '../hooks';
import { RoomsSection } from '../components/sections';

function RoomsPage() {
  useHeadMetadata({
    title: 'Habitaciones | Hotel Diva Mar del Plata',
    description: 'Descubre nuestras habitaciones cómodas y modernas en Hotel Diva. Matrimonial, twin, triple y cuádruple. Todas con wifi gratuito y estacionamiento.',
    keywords: ['habitaciones', 'hotel', 'mar del plata', 'alojamiento'],
    ogImage: '/images/rooms-og.webp',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Habitaciones - Hotel Diva',
      description: 'Nuestras habitaciones modernas y cómodas',
    },
  });

  return (
    <main>
      <RoomsSection />
    </main>
  );
}

export default RoomsPage;
