import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { HOTEL_DIVA } from '@ecosystem/shared-constants';

export function SSHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <div className="text-lg font-bold text-gray-800">Hotel Diva</div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <a href="/" className="text-gray-700 hover:text-blue-500">
            Inicio
          </a>
          <a href="/#habitaciones" className="text-gray-700 hover:text-blue-500">
            Habitaciones
          </a>
          <a href="/#galeria" className="text-gray-700 hover:text-blue-500">
            Galería
          </a>
        </nav>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${HOTEL_DIVA.whatsappNumber}?text=Hola%2C%20me%20interesa%20el%20paquete%20Semana%20Santa%202026`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition"
        >
          <MessageCircle size={20} />
          WhatsApp
        </a>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden border-t border-gray-100 px-4 py-3 bg-gray-50">
          <a href="/" className="block py-2 text-gray-700 hover:text-blue-500">
            Inicio
          </a>
          <a href="/#habitaciones" className="block py-2 text-gray-700 hover:text-blue-500">
            Habitaciones
          </a>
          <a href="/#galeria" className="block py-2 text-gray-700 hover:text-blue-500">
            Galería
          </a>
          <a
            href={`https://wa.me/${HOTEL_DIVA.whatsappNumber}?text=Hola%2C%20me%20interesa%20el%20paquete%20Semana%20Santa%202026`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-center transition"
          >
            WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
