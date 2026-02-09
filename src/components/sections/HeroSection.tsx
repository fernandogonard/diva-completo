import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import { ReservationCTA } from '../whatsapp';
import { useHeadMetadata, useReducedMotion } from '../../hooks';

function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  useHeadMetadata({
    title: 'Hotel Diva - Alojamiento Premium en Mar del Plata',
    description:
      'Descubre la perfecta combinación de elegancia y comodidad en Hotel Diva, Mar del Plata. Habitaciones matrimonial, twin, triple y cuádruple.',
    ogImage: '/images/hero.jpg',
    keywords: ['hotel mar del plata', 'alojamiento', 'hospedaje'],
  });

  const duration = prefersReducedMotion ? 0 : 0.8;
  const delay = prefersReducedMotion ? 0 : 0.2;

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image (LCP) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpg"
          alt="Hotel Diva Mar del Plata, fachada del hotel"
          width={1920}
          height={1080}
          fetchpriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-black/50"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-lg font-medium text-white">
              Hotel de Excelencia
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4">
            Hotel{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Diva
            </span>
          </h1>

          {/* FIX heading order */}
          <h2 className="sr-only">
            Alojamiento en Mar del Plata
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay }}
          className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed"
        >
          Descubre la perfecta combinación de elegancia y comodidad en el corazón de Mar del Plata
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: delay * 2 }}
          className="flex items-center justify-center gap-2 mb-12 text-lg text-white/90"
        >
          <MapPin className="w-5 h-5 text-yellow-300" aria-hidden="true" />
          <span>Mar del Plata, Buenos Aires</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: delay * 3 }}
          className="max-w-2xl mx-auto"
        >
          <ReservationCTA
            title="¡Bienvenido a tu hogar lejos de casa!"
            subtitle="Reservá ahora y viví una experiencia inolvidable"
            className="bg-white/10 backdrop-blur-md border border-white/20"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
