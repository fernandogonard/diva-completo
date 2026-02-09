import { motion } from 'framer-motion';
import { Users, Bed, Wifi, Car } from 'lucide-react';
import { ROOM_TYPES, WHATSAPP_URLS } from '../../constants';
import { openWhatsApp } from '../../utils';
import { LazyImage } from '../common';
import { useReducedMotion } from '../../hooks';

function RoomsSection() {
  const prefersReducedMotion = useReducedMotion();

  const handleRoomContact = (roomType: string) => {
    const url = WHATSAPP_URLS.room(roomType);
    openWhatsApp(url);
  };

  const roomsArray = Object.values(ROOM_TYPES);

  return (
    <section id="rooms" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-800 mb-6">
            Nuestras Habitaciones
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Espacios diseñados para tu descanso y comodidad, con todas las amenidades que necesitas
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {roomsArray.map((room, index) => {
            const delay = prefersReducedMotion ? 0 : index * 0.15;

            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >

                {/* Room Image */}
                <div className="relative h-64 bg-gradient-to-br from-primary-200 to-primary-400 overflow-hidden">
                  <LazyImage
                    src={room.image}
                    alt={`${room.name} en Hotel Diva - Capacidad ${room.capacity} personas - ${room.beds}`}
                    title={`Habitación ${room.name}`}
                    width={800}
                    height={500}
                    className="w-full h-full"
                    priority={index === 0}
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      onClick={() => handleRoomContact(room.name)}
                      className="bg-white text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors"
                      whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                      whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
                    >
                      Consultar Disponibilidad
                    </motion.button>
                  </div>
                </div>

                {/* Room Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-display font-bold text-secondary-800">
                      {room.name}
                    </h3>

                    <div className="flex items-center gap-1 text-primary-600">
                      <Users className="w-5 h-5" aria-hidden="true" />
                      <span
                        className="font-semibold"
                        aria-label={`Capacidad: ${room.capacity} personas`}
                      >
                        {room.capacity}
                      </span>
                    </div>
                  </div>

                  <p className="text-secondary-600 mb-6">
                    {room.description}
                  </p>

                  {/* Room Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-secondary-700">
                      <Bed className="w-5 h-5 text-primary-500" aria-hidden="true" />
                      <span>{room.beds}</span>
                    </div>

                    {/* Amenities */}
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.map((amenity, amenityIndex) => (
                        <div
                          key={`${room.id}-${amenityIndex}`}
                          className="flex items-center gap-2 text-sm text-secondary-600"
                        >
                          {amenity.includes('Wi-Fi') && (
                            <Wifi className="w-4 h-4 text-primary-500" aria-hidden="true" />
                          )}

                          {amenity.includes('TV') && (
                            <Car className="w-4 h-4 text-primary-500" aria-hidden="true" />
                          )}

                          {!amenity.includes('Wi-Fi') && !amenity.includes('TV') && (
                            <span
                              className="w-2 h-2 bg-primary-500 rounded-full"
                              aria-hidden="true"
                            />
                          )}

                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => handleRoomContact(room.name)}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                    whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                    aria-label={`Consultar disponibilidad de ${room.name}`}
                  >
                    Consultar por WhatsApp
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-secondary-800 mb-4">
              Todas las habitaciones incluyen
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Wifi, text: 'Wi-Fi Gratuito' },
                { icon: Car, text: 'Estacionamiento' },
                { icon: Bed, text: 'Ropa de Cama' },
                { icon: Users, text: 'Limpieza Diaria' },
              ].map((service, index) => (
                <div key={`service-${index}`} className="text-center">
                  <service.icon
                    className="w-8 h-8 text-primary-500 mx-auto mb-2"
                    aria-hidden="true"
                  />
                  <p className="text-secondary-600 font-medium">
                    {service.text}
                  </p>
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
