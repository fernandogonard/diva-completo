import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Bed, Wifi, Tv, Shield, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { ROOM_TYPES, WHATSAPP_URLS } from '../../constants';
import { openWhatsApp } from '../../utils';
import { LazyImage } from '../common';
import { useReducedMotion } from '../../hooks';

function RoomsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeImages, setActiveImages] = useState<Record<string, number>>({});

  const handleRoomContact = (roomType: string) => {
    openWhatsApp(WHATSAPP_URLS.room(roomType));
  };

  const roomsArray = Object.values(ROOM_TYPES);

  const getActiveIdx = (roomId: string) => activeImages[roomId] ?? 0;
  const setRoomImage = (roomId: string, idx: number) =>
    setActiveImages(prev => ({ ...prev, [roomId]: idx }));

  return (
    <section id="rooms" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-800 mb-4">
            Nuestras Habitaciones
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Espacios diseÃ±ados para tu descanso y comodidad
          </p>
        </motion.div>

        {/* Rooms List */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {roomsArray.map((room, index) => {
            const images = room.images ?? [room.image];
            const activeIdx = getActiveIdx(room.id);
            const delay = prefersReducedMotion ? 0 : index * 0.1;

            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row">

                  {/* â”€â”€ Imagen â”€â”€ */}
                  <div className="relative md:w-2/5 h-60 md:h-auto flex-shrink-0 bg-primary-100">
                    <LazyImage
                      src={images[activeIdx]}
                      alt={`${room.name} - Hotel Diva Mar del Plata`}
                      title={room.name}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      priority={index === 0}
                    />

                    {/* Flechas */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setRoomImage(room.id, (activeIdx - 1 + images.length) % images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/65 text-white rounded-full p-1.5 transition-colors"
                          aria-label="Foto anterior"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setRoomImage(room.id, (activeIdx + 1) % images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/65 text-white rounded-full p-1.5 transition-colors"
                          aria-label="Foto siguiente"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setRoomImage(room.id, i)}
                              className={`h-2 rounded-full transition-all duration-200 ${
                                i === activeIdx ? 'w-5 bg-white' : 'w-2 bg-white/55 hover:bg-white/80'
                              }`}
                              aria-label={`Foto ${i + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Capacidad badge */}
                    <div className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                      <Users className="w-3 h-3" aria-hidden="true" />
                      <span>{room.capacity} {room.capacity <= 2 ? 'personas' : 'personas'}</span>
                    </div>

                    {/* Contador fotos */}
                    {images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/45 text-white text-xs px-2 py-0.5 rounded-full">
                        {activeIdx + 1}/{images.length}
                      </div>
                    )}
                  </div>

                  {/* â”€â”€ Contenido â”€â”€ */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-secondary-800 mb-1">
                        {room.name}
                      </h3>

                      <p className="text-secondary-500 text-sm flex items-center gap-1.5 mb-4">
                        <Bed className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
                        {room.beds}
                      </p>

                      <p className="text-secondary-600 mb-5 leading-relaxed">
                        {room.description}
                      </p>

                      {/* Amenities */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                        {room.amenities.map((amenity, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-secondary-700">
                            {amenity.includes('Wi-Fi') && (
                              <Wifi className="w-4 h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
                            )}
                            {amenity.includes('TV') && (
                              <Tv className="w-4 h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
                            )}
                            {!amenity.includes('Wi-Fi') && !amenity.includes('TV') && (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" aria-hidden="true" />
                            )}
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRoomContact(room.name)}
                      className="w-full bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                      aria-label={`Consultar disponibilidad de ${room.name} por WhatsApp`}
                    >
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
                      Consultar por WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Servicios incluidos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-md max-w-4xl mx-auto">
            <h3 className="text-xl font-display font-bold text-secondary-800 mb-6">
              Todas las habitaciones incluyen
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Wifi, text: 'Wi-Fi Gratuito' },
                { icon: Shield, text: 'Caja de Seguridad' },
                { icon: Bed, text: 'Ropa de Cama' },
                { icon: Users, text: 'Limpieza Diaria' },
              ].map((service, i) => (
                <div key={i} className="text-center">
                  <service.icon className="w-8 h-8 text-primary-500 mx-auto mb-2" aria-hidden="true" />
                  <p className="text-secondary-600 font-medium text-sm">{service.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default RoomsSection;
