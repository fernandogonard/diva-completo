import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { HOTEL_DIVA } from '@ecosystem/shared-constants';

export function SSFooter() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Hotel Diva</h3>
            <p className="text-gray-400 text-sm">
              Tu destino perfecto para una Semana Santa inolvidable en Mar del Plata.
              Confort, naturaleza y ¡Mucho Mar!
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contacto</h3>
            <div className="space-y-3">
              <a
                href={`tel:${HOTEL_DIVA.phone}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
              >
                <Phone size={16} />
                {HOTEL_DIVA.phone}
              </a>
              <a
                href={`mailto:${HOTEL_DIVA.email}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
              >
                <Mail size={16} />
                {HOTEL_DIVA.email}
              </a>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={16} />
                {HOTEL_DIVA.address}
              </div>
            </div>
          </div>

          {/* Social + CTA */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Reserva Ahora</h3>
            <a
              href={`https://wa.me/${HOTEL_DIVA.whatsappNumber}?text=Hola%2C%20quisiera%20reservar%20el%20paquete%20Semana%20Santa%202026`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition mb-4"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <div className="flex gap-4 pt-2">
              {/* Social icons placeholder */}
              <a href="#" className="text-gray-400 hover:text-white transition">
                f
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                🔗
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2026 Hotel Diva. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="/" className="hover:text-white transition">
                Inicio
              </a>
              <a href="/" className="hover:text-white transition">
                Privacidad
              </a>
              <a href="/" className="hover:text-white transition">
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
