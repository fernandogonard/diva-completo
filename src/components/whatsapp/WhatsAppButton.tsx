import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHATSAPP_URLS } from '../../constants';
import { openWhatsApp } from '../../utils';

interface WhatsAppButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'floating' | 'inline';
  message?: string;
}

function WhatsAppButton({ 
  className = '', 
  size = 'md',
  variant = 'floating',
  message 
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const url = message ? 
      `${WHATSAPP_URLS.base}?text=${encodeURIComponent(message)}` : 
      WHATSAPP_URLS.general();
    openWhatsApp(url);
  };

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg'
  };

  const baseClasses = `
    ${sizeClasses[size]}
    bg-green-700 hover:bg-green-800
    text-white rounded-full 
    flex items-center justify-center
    transition-all duration-300 ease-in-out
    hover:scale-110 shadow-lg hover:shadow-xl
    cursor-pointer z-50
    ${className}
  `;

  const floatingClasses = variant === 'floating' 
    ? 'fixed bottom-6 right-6 animate-bounce-gentle' 
    : '';

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={`${baseClasses} ${floatingClasses} focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300 focus-visible:ring-offset-2`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: variant === 'floating' ? 2 : 0,
        duration: 0.5,
        type: "spring",
        stiffness: 260,
        damping: 20 
      }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-full h-full p-2" aria-hidden="true" />
    </motion.button>
  );
}

export default WhatsAppButton;