import { motion } from 'framer-motion';
import { Trophy, Users, Zap, UtensilsCrossed, MessageCircle } from 'lucide-react';
import { GROUP_SERVICES, WHATSAPP_URLS } from '../../constants';
import { useReducedMotion } from '../../hooks';

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-12 h-12" aria-hidden="true" />,
  Users: <Users className="w-12 h-12" aria-hidden="true" />,
  Zap: <Zap className="w-12 h-12" aria-hidden="true" />,
  UtensilsCrossed: <UtensilsCrossed className="w-12 h-12" aria-hidden="true" />,
};

export function GroupsSection() {
  const prefersReducedMotion = useReducedMotion();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6 },
    },
  };

  return (
    <section id="groups" className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Grupos y <span className="text-primary-600">Contingentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Somos especialistas en alojar y alimentar equipos deportivos, delegaciones sindicales y eventos masivos en Mar del Plata.
          </p>
        </motion.div>

        {/* Grid de Servicios */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {GROUP_SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Icon Background */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 text-white">
                <div className="flex justify-center">
                  {iconMap[service.icon]}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {service.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {service.highlights.map((highlight, idx) => (
                    <li key={`${service.id}-highlight-${idx}`} className="flex items-center text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2" aria-hidden="true"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.a
                  href={WHATSAPP_URLS.group(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Consultar
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sección de Ventajas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ¿Por qué elegirnos?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary-600" aria-hidden="true" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Experiencia Comprobada
              </h4>
              <p className="text-gray-600">
                Décadas de experiencia alojando contingentes de los principales eventos deportivos del país.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-8 h-8 text-primary-600" aria-hidden="true" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Cocina Propia
              </h4>
              <p className="text-gray-600">
                Preparamos desayunos y comidas personalizadas según las necesidades de cada grupo.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" aria-hidden="true" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Atención Personalizada
              </h4>
              <p className="text-gray-600">
                Coordinación directa con los responsables para garantizar la mejor experiencia.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            ¿Organizas un contingente? Consulta nuestras tarifas y disponibilidad.
          </p>
          <motion.a
            href={WHATSAPP_URLS.general()}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
          >
            <MessageCircle className="w-5 h-5" />
            Contactar por WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
