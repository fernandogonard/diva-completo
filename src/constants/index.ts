// Información del Hotel
export const HOTEL_INFO = {
  name: 'Hotel Diva',
  phone: '+54 9 223 503-3585',
  whatsappNumber: '5492235033585', // Formato para WhatsApp API
  email: 'matias@hoteldiva.com.ar',
  address: 'Calle Garay 1630, Mar del Plata, Buenos Aires',
  website: 'https://hoteldiva.com.ar',
} as const;

// URLs de WhatsApp
export const WHATSAPP_URLS = {
  base: `https://wa.me/${HOTEL_INFO.whatsappNumber}`,
  reservation: (checkin: string, checkout: string, guests: number) => {
    // Validación de inputs
    if (!checkin || !checkout || typeof guests !== 'number' || guests < 1) {
      console.warn('❌ SEGURIDAD: Parámetros inválidos en reservation URL');
      return WHATSAPP_URLS.base;
    }
    
    return `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
      `¡Hola! Quiero consultar disponibilidad en Hotel Diva:\n\n` +
      `📅 Check-in: ${checkin}\n` +
      `📅 Check-out: ${checkout}\n` +
      `👥 Huéspedes: ${guests}\n\n` +
      `¡Gracias!`
    )}`;
  },
  room: (roomType: string) => {
    // VALIDACIÓN CRÍTICA DE SEGURIDAD
    if (!roomType || typeof roomType !== 'string') {
      console.warn('❌ SEGURIDAD: roomType inválido en room URL');
      return WHATSAPP_URLS.base;
    }
    
    // Permitir solo tipos de habitaciones conocidos
    const validRoomTypes = Object.keys(ROOM_TYPES);
    const sanitizedType = roomType.toLowerCase().trim();
    
    // Si roomType no es válido, usar genérico
    const displayType = validRoomTypes.some(rt => rt === sanitizedType)
      ? roomType
      : 'una habitación';
    
    return `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
      `¡Hola! Me interesa la ${displayType} del Hotel Diva. ¿Podrían darme más información sobre disponibilidad y precios?`
    )}`;
  },
  general: () =>
    `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
      `¡Hola! Me gustaría obtener más información sobre Hotel Diva. ¡Gracias!`
    )}`,
} as const;

// Tipos de habitaciones
export const ROOM_TYPES = {
  matrimonial: {
    id: 'matrimonial',
    name: 'Habitación Matrimonial',
    capacity: 2,
    beds: 'Cama matrimonial',
    amenities: ['Baño completo', 'Espacio de escritorio', 'TV LED', 'Wi-Fi gratuito'],
    description: 'Perfecta para parejas, con todas las comodidades que necesitas.',
    image: '/images/rooms/matrimonial-1.webp',
    images: ['/images/rooms/matrimonial-1.webp', '/images/rooms/matrimonial-2.webp', '/images/rooms/matrimonial-3.webp'],
  },
  twin: {
    id: 'twin',
    name: 'Habitación Twin',
    capacity: 2,
    beds: '2 camas de una plaza',
    amenities: ['Baño completo', 'Espacio de escritorio', 'TV LED', 'Wi-Fi gratuito'],
    description: 'Ideal para amigos o familiares que prefieren camas separadas.',
    image: '/images/rooms/twin-1.webp',
    images: ['/images/rooms/twin-1.webp', '/images/rooms/twin-2.webp', '/images/rooms/twin-3.webp'],
  },
  triple: {
    id: 'triple',
    name: 'Habitación Triple',
    capacity: 3,
    beds: '3 camas de una plaza o 1 matrimonial + 1 de una plaza',
    amenities: ['Baño completo', 'Espacio de escritorio', 'TV LED', 'Wi-Fi gratuito', 'Mayor espacio'],
    description: 'Perfecta para familias pequeñas o grupos de 3 personas.',
    image: '/images/rooms/triple-1.webp',
    images: ['/images/rooms/triple-1.webp'],
  },
  cuadruple: {
    id: 'cuadruple',
    name: 'Habitación Cuádruple',
    capacity: 4,
    beds: '1 matrimonial + 2 de una plaza o 4 camas de una plaza',
    amenities: ['Baño completo', 'Espacio de escritorio', 'TV LED', 'Wi-Fi gratuito', 'Amplio espacio compartido'],
    description: 'Ideal para familias o grupos de 4 personas con máxima comodidad.',
    image: '/images/rooms/cuadruple-1.webp',
    images: ['/images/rooms/cuadruple-1.webp'],
  },
} as const;

// Servicios del hotel
export const HOTEL_SERVICES = [
  {
    id: 'wifi',
    name: 'Wi-Fi Gratuito',
    icon: 'Wifi',
    description: 'Internet de alta velocidad en todo el hotel',
  },
  {
    id: 'parking',
    name: 'Estacionamiento',
    icon: 'Car',
    description: 'Espacios seguros para tu vehículo',
  },
  {
    id: 'reception',
    name: 'Recepción 24hs',
    icon: 'Clock',
    description: 'Atención personalizada las 24 horas',
  },
  {
    id: 'cleaning',
    name: 'Limpieza Diaria',
    icon: 'Sparkles',
    description: 'Servicio de housekeeping todos los días',
  },
] as const;

// Servicios para Grupos y Contingentes
export const GROUP_SERVICES = [
  {
    id: 'deportivos',
    title: 'Contingentes Deportivos',
    icon: 'Trophy',
    description: 'Equipos de fútbol, rugby, handball y más. Expertos en eventos deportivos de todo nivel.',
    highlights: ['Bonaerenses', 'Diablo Nacional', 'Finales Nacionales', 'Torneos Internacionales'],
  },
  {
    id: 'sindicales',
    title: 'Acuerdos Sindicales',
    icon: 'Users',
    description: 'Paquetes especiales para delegaciones sindicales y eventos corporativos.',
    highlights: ['Grupos reducidos', 'Tarifas especiales', 'Coordinación directa', 'Servicios personalizados'],
  },
  {
    id: 'eventos',
    title: 'Eventos Masivos',
    icon: 'Zap',
    description: 'Hospedaje coordinado para grandes contingentes durante eventos en la ciudad.',
    highlights: ['Juegos EVE', 'Eventos nacionales', 'Congresos', 'Encuentros masivos'],
  },
  {
    id: 'gastronomia',
    title: 'Soluciones Gastronómicas',
    icon: 'UtensilsCrossed',
    description: 'Cocina propia en el hotel con servicios de catering y alimentación para grupos.',
    highlights: ['Menú personalizado', 'Desayunos grupales', 'Servicios de catering', 'Opciones variadas'],
  },
] as const;

// Navegación
export const NAVIGATION_ITEMS = [
  { name: 'Inicio', href: '#home', path: '/' },
  { name: 'Habitaciones', href: '#rooms', path: '/habitaciones' },
  { name: 'Galería', href: '#gallery', path: '/galeria' },
  { name: 'Grupos', href: '#groups', path: '/grupos' },
  { name: 'Eventos', href: '/eventos', path: '/eventos' },
  { name: 'Contacto', href: '#contact', path: '/contacto' },
] as const;

// Campañas externas
export const CAMPAIGNS = [
  {
    name: 'Semana Santa 2026',
    url: 'https://hotel-diva-semana-santa.netlify.app/',
    description: 'Paquete especial de 3 noches con desayuno incluido',
  },
  {
    name: 'Evento COSAPRO 2026',
    url: 'https://cosapro-hoteldiva.netlify.app/',
    description: 'Alojamiento para asistentes del Congreso Provincial de Salud',
  },
  {
    name: 'FILAPI 2026',
    url: 'https://hoteldiva-filapi2026.netlify.app/',
    description: 'Congreso Latinoamericano de Apicultura · 31 ago – 6 sep 2026',
  },
] as const;