import { ArrowRight, Calendar } from 'lucide-react';
import { HOTEL_DIVA } from '@ecosystem/shared-constants';

export function SSHero() {
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${HOTEL_DIVA.whatsappNumber}?text=Hola%2C%20quisiera%20reservar%20el%20paquete%20Semana%20Santa%202026`,
      '_blank'
    );
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1631049307038-da0ec9d70304?w=1920&q=80)',
          backgroundPosition: 'center 40%',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-2xl">
          {/* Date badge */}
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 text-white border border-white border-opacity-30">
            <Calendar size={16} />
            <span className="text-sm font-semibold">16-19 de Abril, 2026</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Semana Santa en <span className="text-blue-300">Hotel Diva</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-100 mb-8">
            Vive una experiencia inolvidable en la costa de Mar del Plata. Desayuno buffet, 
            vista al mar y momentos de pura relajación.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105"
            >
              Reservar por WhatsApp
              <ArrowRight size={20} />
            </button>
            <a
              href="#paquetes"
              className="inline-flex items-center justify-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-3 rounded-lg font-semibold backdrop-blur-sm border border-white border-opacity-30 transition"
            >
              Ver detalles
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
