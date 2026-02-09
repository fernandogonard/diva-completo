import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { NAVIGATION_ITEMS, HOTEL_INFO } from '../../constants';
import { formatPhoneDisplay } from '../../utils';
import { useSmoothScroll } from '../../hooks';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const scroll = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (href: string, path: string) => {
      setIsOpen(false);
      if (location.pathname === path && href.startsWith('#')) {
        scroll(href);
      }
    },
    [scroll, location.pathname]
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 flex-shrink-0"
            onClick={(e) => {
              e.preventDefault();
              scroll('#home');
            }}
          >
            <img
              src="/images/logo.png"
              alt="Hotel Diva - Alojamiento en Mar del Plata"
              width={48}
              height={48}
              className="h-10 lg:h-12 w-auto object-contain"
            />
            <span
              className={`text-2xl lg:text-3xl font-display font-bold transition-colors duration-300 ${
                isScrolled ? 'text-primary-600' : 'text-white'
              }`}
            >
              Hotel Diva
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavClick(item.href, item.path)}
                className={`font-medium transition-colors duration-300 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1 ${
                  isScrolled ? 'text-secondary-700' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}

            <motion.a
              href={`tel:${HOTEL_INFO.phone}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                isScrolled
                  ? 'border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-primary-600'
              }`}
              aria-label={`Llamar a Hotel Diva: ${formatPhoneDisplay(
                HOTEL_INFO.phone
              )}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">
                {formatPhoneDisplay(HOTEL_INFO.phone)}
              </span>
            </motion.a>
          </div>

          {/* Mobile Button */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                isScrolled ? 'text-secondary-700' : 'text-white'
              }`}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-secondary-200"
              aria-label="Menú móvil"
            >
              <div className="py-4 space-y-2">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => handleNavClick(item.href, item.path)}
                    className="block px-4 py-3 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:bg-primary-50"
                  >
                    {item.name}
                  </Link>
                ))}

                <a
                  href={`tel:${HOTEL_INFO.phone}`}
                  className="flex items-center gap-2 px-4 py-3 text-primary-600 hover:bg-primary-50"
                  aria-label={`Llamar a Hotel Diva: ${formatPhoneDisplay(
                    HOTEL_INFO.phone
                  )}`}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span className="font-medium">
                    {formatPhoneDisplay(HOTEL_INFO.phone)}
                  </span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

export default Header;
