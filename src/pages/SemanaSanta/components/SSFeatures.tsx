import { Wifi, Wind, Tv, Lock, Bell, Users, MapPin, Heart } from 'lucide-react';

const amenities = [
  { icon: Wifi, label: 'WiFi Premium', description: 'Conexión de alta velocidad' },
  { icon: Wind, label: 'Aire Acondicionado', description: 'Temperatura controlada 24/7' },
  { icon: Tv, label: 'Smart TV 50"', description: 'Entretenimiento full HD' },
  { icon: Lock, label: 'Safe Box', description: 'Seguridad para tus valores' },
  { icon: Bell, label: 'Room Service', description: 'Servicio a tu habitación' },
  { icon: Users, label: 'Recepción 24hs', description: 'Atención día y noche' },
];

export function SSFeatures() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Amenidades Incluidas
          </h2>
          <p className="text-gray-600">Todas las comodidades que necesitas para un descanso perfecto</p>
        </div>

        {/* Grid de amenities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {amenities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.label}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location info */}
        <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-600">
          <div className="flex gap-4">
            <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ubicación Privilegiada
              </h3>
              <p className="text-gray-700">
                Calle Garay 1630, Mar del Plata. A solo 2 cuadras de la playa y a minutos 
                de los mejores restaurantes, bares y atractivos turísticos de la ciudad.
              </p>
            </div>
          </div>
        </div>

        {/* Why us */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-600">
          <div className="flex gap-4 items-start">
            <Heart className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Por qué Hotel Diva?
              </h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>✓ 20+ años de experiencia en hotelería</li>
                <li>✓ Atención personalizada y profesional</li>
                <li>✓ Ubicación céntrica con vistas al mar</li>
                <li>✓ Desayuno buffet variado y abundante</li>
                <li>✓ Personal trilingüe (español, inglés, francés)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
