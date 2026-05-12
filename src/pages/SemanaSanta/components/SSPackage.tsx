import { Check, Users, Calendar, DollarSign } from 'lucide-react';
import { HOTEL_DIVA } from '@ecosystem/shared-constants';

export function SSPackage() {
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${HOTEL_DIVA.whatsappNumber}?text=Hola%2C%20quisiera%20reservar%20el%20paquete%20Semana%20Santa%202026`,
      '_blank'
    );
  };

  const features = [
    'Habitación doble con vista al mar',
    'Desayuno buffet incluido',
    'WiFi de alta velocidad',
    'Air conditioning',
    'Smart TV 50 pulgadas',
    'Safe box',
    'Servicio de room service',
    'Check-out tardío (14hs)',
  ];

  return (
    <section id="paquetes" className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Paquete Especial Semana Santa
          </h2>
          <p className="text-gray-600">3 noches de lujo en la costa argentina</p>
        </div>

        {/* Package Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-2xl overflow-hidden">
          {/* Content */}
          <div className="p-8 md:p-12 text-white">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-5xl md:text-6xl font-bold mb-2">$165.000</div>
              <p className="text-blue-100 text-lg">por persona en habitación doble</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-blue-400">
              <div className="flex flex-col items-center text-center">
                <Calendar className="w-8 h-8 mb-2 text-blue-200" />
                <p className="text-sm text-blue-100">Período</p>
                <p className="text-lg font-semibold">16-19 Abril</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="w-8 h-8 mb-2 text-blue-200" />
                <p className="text-sm text-blue-100">Capacidad</p>
                <p className="text-lg font-semibold">Hasta 2 personas</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <DollarSign className="w-8 h-8 mb-2 text-blue-200" />
                <p className="text-sm text-blue-100">Incluye</p>
                <p className="text-lg font-semibold">Desayuno Buffet</p>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check size={20} className="text-green-300 flex-shrink-0" />
                  <span className="text-blue-50">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 text-lg"
            >
              Reservar Ahora por WhatsApp
            </button>

            {/* Note */}
            <p className="text-blue-100 text-sm text-center mt-4">
              Plazas limitadas. Confirma tu reserva cuanto antes.
            </p>
          </div>
        </div>

        {/* Payment info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-gray-700 text-center text-sm">
            <strong>Formas de pago:</strong> Transferencia bancaria, tarjeta de crédito, 
            efectivo en el hotel o por plataforma de pago.
          </p>
        </div>
      </div>
    </section>
  );
}
