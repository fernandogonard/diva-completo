import { motion } from 'framer-motion';
import { ExternalLink, Calendar, MapPin } from 'lucide-react';
import { useHeadMetadata } from '../hooks';
import { PREVENTA_VERANO_2027_URL, WHATSAPP_URLS } from '../constants';

const VERANO_2027_WHATSAPP_URL = `${WHATSAPP_URLS.base}?text=${encodeURIComponent(
  'Hola, quiero consultar disponibilidad y condiciones de la Preventa Verano 2027 de Hotel Diva. Pagás 6 noches, te alojás 7.',
)}`;
const VERANO_2027_CTA_URL = PREVENTA_VERANO_2027_URL || VERANO_2027_WHATSAPP_URL;
const COSAPRO_2027_WHATSAPP_URL = `${WHATSAPP_URLS.base}?text=${encodeURIComponent(
  'Hola, quiero que me tengan en cuenta para COSAPRO 2027. Me interesa recibir información sobre las opciones de alojamiento para el evento cuando esté disponible.',
)}`;

const CAMPAIGN_CARDS = [
  {
    id: 'verano-2027',
    name: 'PREVENTA VERANO 2027 — HOTEL DIVA',
    subtitle: 'Beneficio por reservar con anticipación',
    description:
      'Pagás 6 noches, te alojás 7. Consultá disponibilidad y condiciones directamente con el hotel.',
    dates: 'Verano 2027 · preventa anticipada',
    location: 'Mar del Plata, Buenos Aires',
    url: VERANO_2027_CTA_URL,
    badge: 'Preventa anticipada',
    badgeClass: 'bg-amber-100 text-amber-800',
    borderClass: 'border-amber-400',
    highlight: true,
  },
  {
    id: 'cosapro-2027',
    name: 'COSAPRO 2027',
    subtitle: 'Congreso Provincial de Salud',
    description:
      'La edición 2026 ya finalizó y empezamos a prepararnos para la próxima. Contactanos para que podamos tenerte en cuenta y consultá por el paquete de alojamiento cuando haya novedades.',
    dates: 'Próxima edición · 2027',
    location: 'Mar del Plata, Buenos Aires',
    url: COSAPRO_2027_WHATSAPP_URL,
    emoji: '🏥',
    badge: 'Próxima edición',
    badgeClass: 'bg-blue-100 text-blue-800',
    borderClass: 'border-blue-400',
    highlight: false,
  },
];

function EventosPage() {
  useHeadMetadata({
    title: 'Campañas 2027: Verano y COSAPRO | Hotel Diva',
    description:
      'Conocé la Preventa Verano 2027 y prepará tu paquete para COSAPRO 2027. Contactanos para consultar y que te tengamos en cuenta.',
    keywords: ['preventa verano 2027', 'COSAPRO 2027', 'hotel', 'Mar del Plata', 'eventos'],
    ogImage: '/images/hero.webp',
    canonical: '/eventos',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Campañas 2027: Verano y COSAPRO - Hotel Diva',
      description:
        'Preventa Verano 2027 y consulta anticipada de alojamiento para COSAPRO 2027 en Hotel Diva.',
    },
  });

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50">
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
            Conocé la Preventa Verano 2027 y empezá a planificar tu estadía para
            COSAPRO 2027. Contactanos para más información.
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
                  {campaign.emoji && (
                    <span className="text-4xl" role="img" aria-hidden="true">
                      {campaign.emoji}
                    </span>
                  )}
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
                  aria-label={
                    campaign.id === 'verano-2027'
                      ? PREVENTA_VERANO_2027_URL
                        ? 'Ver campaña Preventa Verano 2027 de Hotel Diva'
                        : 'Consultar disponibilidad y condiciones de la Preventa Verano 2027 por WhatsApp'
                      : 'Contactar por WhatsApp para COSAPRO 2027'
                  }
                >
                  {campaign.id === 'verano-2027'
                    ? PREVENTA_VERANO_2027_URL
                      ? 'Ver campaña'
                      : 'Consultar disponibilidad y condiciones'
                    : 'Quiero que me tengan en cuenta'}
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
            ¿Te interesa COSAPRO 2027?
          </h2>
          <p className="text-secondary-600 mb-6">
            Contactanos para que podamos tenerte en cuenta y consultá por las
            opciones de alojamiento cuando haya novedades.
          </p>
          <a
            href={COSAPRO_2027_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green-700 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            aria-label="Contactar por WhatsApp para que me tengan en cuenta para COSAPRO 2027"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

export default EventosPage;
