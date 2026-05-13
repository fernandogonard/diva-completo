import { useHeadMetadata } from '../hooks';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { WHATSAPP_URLS } from '../constants';

function ContactPage() {
  useHeadMetadata({
    title: 'Contacto | Hotel Diva',
    description: 'Ponte en contacto con Hotel Diva. WhatsApp, teléfono, correo y ubicación en Mar del Plata.',
    keywords: ['contacto', 'teléfono', 'email', 'ubicación'],
    ogImage: '/images/contact-og.webp',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Contacto - Hotel Diva',
      description: 'Información de contacto',
    },
  });

  return (
    <main className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
            Contactanos
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Estamos aquí para responder todas tus preguntas. Ponte en contacto con nosotros por tu medio preferido.
          </p>
        </motion.div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* WhatsApp */}
          <motion.a
            href={WHATSAPP_URLS.general()}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-secondary-800 mb-2">WhatsApp</h3>
            <p className="text-green-600 font-semibold">+54 9 223 503-3585</p>
            <p className="text-gray-600 text-sm mt-2">Disponible 24/7</p>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:matias@hoteldiva.com.ar"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-secondary-800 mb-2">Email</h3>
            <p className="text-blue-600 font-semibold">matias@hoteldiva.com.ar</p>
            <p className="text-gray-600 text-sm mt-2">Respuesta en 24 horas</p>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+542235033585"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-purple-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-secondary-800 mb-2">Teléfono</h3>
            <p className="text-purple-600 font-semibold">+54 223 503-3585</p>
            <p className="text-gray-600 text-sm mt-2">Lunes a Viernes 9-18hs</p>
          </motion.a>

          {/* Location */}
          <motion.a
            href="https://maps.google.com/?q=Calle+Garay+1630,+Mar+del+Plata"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-red-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-secondary-800 mb-2">Ubicación</h3>
            <p className="text-red-600 font-semibold">Calle Garay 1630</p>
            <p className="text-gray-600 text-sm mt-2">Mar del Plata, Argentina</p>
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
            <h3 className="text-2xl font-bold text-secondary-800">Horarios de Atención</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-secondary-700 mb-2">Recepción</p>
              <p className="text-gray-600">Lunes a Domingo: 8:00 - 22:00 hs</p>
              <p className="text-gray-600">Consultas urgentes 24/7</p>
            </div>
            <div>
              <p className="font-semibold text-secondary-700 mb-2">Desayuno</p>
              <p className="text-gray-600">Lunes a Viernes: 7:00 - 10:30 hs</p>
              <p className="text-gray-600">Sábado y Domingo: 8:00 - 11:00 hs</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default ContactPage;
