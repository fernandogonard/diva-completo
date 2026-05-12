import { motion } from 'framer-motion';
import { ExternalLink, Calendar, MapPin } from 'lucide-react';
import { useHeadMetadata } from '../hooks';

const CAMPAIGN_CARDS = [
  {
    id: 'filapi-2026',
    name: 'FILAPI 2026',
    subtitle: 'Congreso Latinoamericano de Apicultura',
    description:
      'El congreso de apicultura más importante de Latinoamérica llega a Mar del Plata. Paquetes de 3, 5 y 6 noches con desayuno buffet incluido. Cupos limitados.',
    dates: '31 de agosto — 6 de septiembre 2026',
    location: 'Mar del Plata, Buenos Aires',
    url: 'https://hoteldiva-filapi2026.netlify.app/',
    emoji: '🐝',
    badge: 'Nuevo',
    badgeClass: 'bg-amber-100 text-amber-800',
    borderClass: 'border-amber-400',
    highlight: true,
  },
  {
    id: 'cosapro-2026',
    name: 'Evento COSAPRO 2026',
    subtitle: 'Congreso Provincial de Salud',
    description:
      'Alojamiento y paquetes especiales para los asistentes del Congreso Provincial de Salud en Mar del Plata. Tarifas diferenciales para delegaciones.',
    dates: '2026',
    location: 'Mar del Plata, Buenos Aires',
    url: 'https://cosapro-hoteldiva.netlify.app/',
    emoji: '🏥',
    badge: 'Disponible',
    badgeClass: 'bg-blue-100 text-blue-800',
    borderClass: 'border-blue-400',
    highlight: false,
  },
  {
    id: 'semana-santa-2026',
    name: 'Semana Santa 2026',
    subtitle: 'Escapada de 3 noches con desayuno',
    description:
      'Paquete especial para disfrutar Mar del Plata en Semana Santa. 3 noches con desayuno incluido y atención personalizada.',
    dates: 'Semana Santa 2026',
    location: 'Mar del Plata, Buenos Aires',
    url: 'https://hotel-diva-semana-santa.netlify.app/',
    emoji: '🌊',
    badge: 'Disponible',
    badgeClass: 'bg-teal-100 text-teal-800',
    borderClass: 'border-teal-400',
    highlight: false,
  },
];

function EventosPage() {
  useHeadMetadata({
    title: 'Eventos y Campañas | Hotel Diva Mar del Plata',
    description:
      'Paquetes y eventos especiales de Hotel Diva en Mar del Plata: FILAPI 2026, COSAPRO y Semana Santa. Reservá tu lugar.',
    keywords: ['eventos', 'campañas', 'FILAPI 2026', 'COSAPRO', 'Semana Santa', 'paquetes hotel'],
    ogImage: '/images/hero.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Eventos y Campañas - Hotel Diva',
      description: 'Paquetes y eventos especiales de Hotel Diva en Mar del Plata',
    },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-secondary-800 text-white pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary-400 font-semibold uppercase tracking-widest text-sm mb-3"
          >
            Hotel Diva · Mar del Plata
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Eventos y Campañas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-secondary-200 text-lg max-w-2xl mx-auto"
          >
            Paquetes especiales para los eventos más importantes del año.
            Reservá tu lugar con tarifas exclusivas y desayuno incluido.
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CAMPAIGN_CARDS.map((campaign, i) => (
            <motion.article
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-white rounded-2xl shadow-md border-t-4 ${campaign.borderClass} flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Card Header */}
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl" role="img" aria-hidden="true">
                    {campaign.emoji}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${campaign.badgeClass}`}
                  >
                    {campaign.badge}
                  </span>
                </div>

                <h2 className="text-xl font-display font-bold text-secondary-800 mb-1">
                  {campaign.name}
                </h2>
                <p className="text-sm text-secondary-500 font-medium mb-3">
                  {campaign.subtitle}
                </p>
                <p className="text-secondary-600 text-sm leading-relaxed mb-4">
                  {campaign.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-secondary-500 text-sm">
                    <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span>{campaign.dates}</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary-500 text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span>{campaign.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <a
                  href={campaign.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label={`Ver paquete ${campaign.name}`}
                >
                  Ver paquete
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-50 border-t border-primary-100 py-12 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-display font-bold text-secondary-800 mb-3">
            ¿No encontrás lo que buscás?
          </h2>
          <p className="text-secondary-600 mb-6">
            Escribinos por WhatsApp y te armamos un paquete a medida según tus
            fechas y necesidades.
          </p>
          <a
            href={`https://wa.me/5492235033585?text=${encodeURIComponent(
              '¡Hola! Me gustaría consultar sobre paquetes y eventos especiales en Hotel Diva. ¡Gracias!'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Consultar por WhatsApp"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

export default EventosPage;
