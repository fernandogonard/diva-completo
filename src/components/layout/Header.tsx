import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { NAVIGATION_ITEMS, CAMPAIGNS, HOTEL_INFO } from '../../constants';
import { formatPhoneDisplay } from '../../utils';
import { useSmoothScroll } from '../../hooks';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const scroll = useSmoothScroll();

  // En páginas internas el header siempre muestra fondo blanco
  const isHomePage = location.pathname === '/';
  const showSolid = !isHomePage || isScrolled;

  useEffect(() => {
    // Resetear scroll state al cambiar de página
    setIsScrolled(window.scrollY > 50);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

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
        showSolid ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
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
              src="/images/logo.webp"
              alt="Hotel Diva - Alojamiento en Mar del Plata"
              width={48}
              height={48}
              className="h-10 lg:h-12 w-auto object-contain transition-all duration-300"
              style={showSolid ? {} : { filter: 'brightness(0) invert(1)' }}
            />
            <span
              className={`hidden sm:block text-2xl lg:text-3xl font-display font-bold transition-colors duration-300 ${
                showSolid ? 'text-primary-600' : 'text-white'
              }`}
            >
              Hotel Diva
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Nav principal */}
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavClick(item.href, item.path)}
                className={`relative group px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  showSolid
                    ? 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                } ${
                  location.pathname === item.path
                    ? showSolid
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-white bg-white/10'
                    : ''
                }`}
              >
                {item.name}
                {/* underline indicator */}
                <span
                  className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full transition-all duration-200 origin-left scale-x-0 group-hover:scale-x-100 ${
                    showSolid ? 'bg-primary-500' : 'bg-white'
                  } ${location.pathname === item.path ? 'scale-x-100' : ''}`}
                />
              </Link>
            ))}

            {/* Separator */}
            <div className={`mx-2 h-6 w-px flex-shrink-0 ${showSolid ? 'bg-secondary-200' : 'bg-white/20'}`} />

            {/* Campaigns — pills pequeñas */}
            {CAMPAIGNS.map((campaign) => {
              const isExternal = campaign.url.startsWith('http');
              const pillClass = `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 whitespace-nowrap ${
                showSolid
                  ? 'bg-primary-100 text-primary-700 hover:bg-primary-600 hover:text-white'
                  : 'bg-white/15 text-white hover:bg-white/30'
              }`;
              return isExternal ? (
                <a
                  key={campaign.name}
                  href={campaign.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pillClass}
                  aria-label={`Ir a ${campaign.name}`}
                  title={campaign.description}
                >
                  {campaign.name}
                </a>
              ) : (
                <Link
                  key={campaign.name}
                  to={campaign.url}
                  className={pillClass}
                  title={campaign.description}
                >
                  {campaign.name}
                </Link>
              );
            })}

            {/* Separator */}
            <div className={`mx-2 h-6 w-px flex-shrink-0 ${showSolid ? 'bg-secondary-200' : 'bg-white/20'}`} />

            {/* Teléfono */}
            <motion.a
              href={`tel:${HOTEL_INFO.phone}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 whitespace-nowrap ${
                showSolid
                  ? 'border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white'
                  : 'border-white/80 text-white hover:bg-white hover:text-primary-600'
              }`}
              aria-label={`Llamar a Hotel Diva: ${formatPhoneDisplay(HOTEL_INFO.phone)}`}
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{formatPhoneDisplay(HOTEL_INFO.phone)}</span>
            </motion.a>
          </div>

          {/* Mobile Button */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                showSolid ? 'text-secondary-700' : 'text-white'
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

                {/* Campaign Links Mobile */}
                <div className="px-4 py-3 border-t border-secondary-200">
                  <p className="text-xs uppercase text-secondary-500 font-semibold mb-2">Campañas</p>
                  {CAMPAIGNS.map((campaign) => {
                    const isExternal = campaign.url.startsWith('http');
                    return isExternal ? (
                      <a
                        key={campaign.name}
                        href={campaign.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-2 py-2 text-sm text-secondary-700 hover:text-primary-600 hover:bg-primary-50"
                        aria-label={`Ir a ${campaign.name}`}
                      >
                        → {campaign.name}
                      </a>
                    ) : (
                      <Link
                        key={campaign.name}
                        to={campaign.url}
                        onClick={() => setIsOpen(false)}
                        className="block px-2 py-2 text-sm text-secondary-700 hover:text-primary-600 hover:bg-primary-50"
                      >
                        → {campaign.name}
                      </Link>
                    );
                  })}
                </div>

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
