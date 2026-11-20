import { useHeadMetadata } from '../hooks';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { HOTEL_INFO, WHATSAPP_URLS } from '../constants';

function ContactPage() {
  useHeadMetadata({
    title: 'Contacto | Hotel Diva',
    description: 'Ponete en contacto con Hotel Diva. WhatsApp, teléfono, correo y ubicación en Mar del Plata.',
    keywords: ['contacto', 'teléfono', 'email', 'ubicación'],
    ogImage: '/images/hero.webp',
    canonical: '/contacto',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Contacto - Hotel Diva',
      description: 'Información de contacto',
    },
  });

  return (
    <main id="main-content" tabIndex={-1} className="py-20 bg-brand-sky">
      <div id="contact" className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
            Contactanos
          </h1>
          <p className="text-xl text-brand-night max-w-2xl mx-auto">
            Estamos para responder todas tus preguntas. Ponete en contacto por tu medio preferido.
          </p>
        </motion.div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
          >
            <div className="w-16 h-16 bg-brand-sea rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-brand-night" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold text-secondary-800 mb-2">WhatsApp</h2>
            <div className="flex flex-col gap-2">
              <a
                href={WHATSAPP_URLS.base}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-night underline underline-offset-2"
              >
                {HOTEL_INFO.phone}
              </a>
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsappNumberSecondary}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-night underline underline-offset-2"
              >
                {HOTEL_INFO.phoneSecondary}
              </a>
            </div>
            <p className="text-brand-night text-sm mt-2">Disponible 24/7</p>
          </motion.div>

          {/* Email */}
          <motion.a
            href="mailto:matias@hoteldiva.com.ar"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
          >
            <div className="w-16 h-16 bg-brand-sky rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-brand-diva" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold text-secondary-800 mb-2">Email</h2>
            <p className="text-brand-diva font-semibold">matias@hoteldiva.com.ar</p>
            <p className="text-brand-night text-sm mt-2">Respuesta en 24 horas</p>
          </motion.a>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
          >
            <div className="w-16 h-16 bg-brand-sun rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-brand-night" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold text-secondary-800 mb-2">Teléfono</h2>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${HOTEL_INFO.phone.replace(/[^\d+]/g, '')}`}
                className="text-brand-night font-semibold underline underline-offset-2"
              >
                {HOTEL_INFO.phone}
              </a>
              <a
                href={`tel:${HOTEL_INFO.phoneSecondary.replace(/[^\d+]/g, '')}`}
                className="text-brand-night font-semibold underline underline-offset-2"
              >
                {HOTEL_INFO.phoneSecondary}
              </a>
            </div>
            <p className="text-brand-night text-sm mt-2">Lunes a Viernes 9-18hs</p>
          </motion.div>

          {/* Location */}
          <motion.a
            href="https://maps.google.com/?q=Calle+Garay+1630,+Mar+del+Plata"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
          >
            <div className="w-16 h-16 bg-brand-coral rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-brand-night" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold text-secondary-800 mb-2">Ubicación</h2>
            <p className="text-brand-night font-semibold">Calle Garay 1630</p>
            <p className="text-brand-night text-sm mt-2">Mar del Plata, Argentina</p>
          </motion.a>
        </div>

        {/* Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary-600" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-800">Horarios de Atención</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-secondary-700 mb-2">Recepción</p>
              <p className="text-brand-night">Lunes a Domingo: 8:00 - 22:00 hs</p>
              <p className="text-brand-night">Consultas urgentes 24/7</p>
            </div>
            <div>
              <p className="font-semibold text-secondary-700 mb-2">Desayuno</p>
              <p className="text-brand-night">Lunes a Viernes: 7:00 - 10:30 hs</p>
              <p className="text-brand-night">Sábado y Domingo: 8:00 - 11:00 hs</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default ContactPage;
