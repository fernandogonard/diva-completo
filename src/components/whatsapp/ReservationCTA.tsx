import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MessageCircle } from 'lucide-react';
import { WHATSAPP_URLS } from '../../constants';
import { openWhatsApp } from '../../utils';

interface ReservationCTAProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const ReservationCTA: React.FC<ReservationCTAProps> = ({
  title = "¿Listo para tu estadía perfecta?",
  subtitle = "Contactanos por WhatsApp y reservá tu habitación ahora",
  className = ""
}) => {
  const handleReservation = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const checkinDate = today.toLocaleDateString('es-AR');
    const checkoutDate = tomorrow.toLocaleDateString('es-AR');
    
    const url = WHATSAPP_URLS.reservation(checkinDate, checkoutDate, 2);
    openWhatsApp(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white text-center ${className}`}
    >
      <motion.h3 
        className="text-2xl md:text-3xl font-display mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-white/90 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <div className="flex items-center gap-2 text-white/90">
          <Calendar className="w-5 h-5" />
          <span>Disponibilidad inmediata</span>
        </div>
        
        <div className="flex items-center gap-2 text-white/90">
          <Users className="w-5 h-5" />
          <span>Atención personalizada</span>
        </div>
      </motion.div>

      <motion.button
        onClick={handleReservation}
        className="mt-8 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-all duration-300 flex items-center gap-3 mx-auto group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
        Reservar por WhatsApp
      </motion.button>
    </motion.div>
  );
};

export default ReservationCTA;