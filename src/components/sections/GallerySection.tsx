import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { LazyImage } from '../common';
import { useReducedMotion } from '../../hooks';
import type { GalleryImage } from '../../types';

function GallerySection() {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Focus management for modal accessibility
  useEffect(() => {
    if (selectedImage && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [selectedImage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  const galleryImages: GalleryImage[] = [
    { id: '1', src: '/images/gallery/gallery-1.jpg', alt: 'Recepción y lobby del Hotel Diva - Primera impresión', category: 'General' },
    { id: '2', src: '/images/gallery/gallery-2.jpg', alt: 'Área común y sala de estar - Espacio de descanso', category: 'General' },
    { id: '3', src: '/images/gallery/gallery-3.jpg', alt: 'Comedor y desayunador - Servicio gastronómico', category: 'General' },
    { id: '4', src: '/images/gallery/gallery-4.jpg', alt: 'Terraza exterior - Vista y esparcimiento', category: 'General' },
    { id: '5', src: '/images/gallery/gallery-5.jpg', alt: 'Escaleras y pasillos - Acceso a habitaciones', category: 'General' },
    { id: '6', src: '/images/gallery/gallery-6.jpg', alt: 'Detalles decorativos - Diseño interior', category: 'General' },
    { id: '7', src: '/images/gallery/gallery-7.jpg', alt: 'Hotel iluminado de noche - Ambiente nocturno', category: 'General' },
    { id: '8', src: '/images/gallery/gallery-8.jpg', alt: 'Entrada principal del Hotel Diva - Fachada', category: 'General' },
  ];

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    setSelectedImage(galleryImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(galleryImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          aria-label="Galería de instalaciones del hotel"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-800 mb-6">
            Conoce Nuestras Instalaciones
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Explora cada rincón de Hotel Diva y descubre la elegancia y confort que ofrecemos
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto"
          role="region"
          aria-label="Galería de fotos del hotel"
        >
          {galleryImages.map((image, index) => {
            const delay = prefersReducedMotion ? 0 : index * 0.08;

            return (
              <motion.button
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-xl cursor-pointer group h-48 border-0 p-0"
                onClick={() => handleImageClick(image, index)}
                aria-label={`Ver ${image.alt} en pantalla completa`}
              >
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                  priority={index === 0}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <p className="text-white font-semibold text-center px-2">
                    {image.alt}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
              role="dialog"
              aria-modal="true"
              aria-label="Visor de galería"
            >
              <div
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <motion.button
                  ref={closeButtonRef}
                  className="absolute -top-10 right-0 text-white hover:text-primary-400"
                  onClick={() => setSelectedImage(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Cerrar galería"
                >
                  <X className="w-8 h-8" />
                </motion.button>

                {/* Image */}
                <motion.div
                  key={selectedImage.id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                >
                  <LazyImage
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    title={selectedImage.alt}
                    width={1200}
                    height={800}
                    className="w-full rounded-lg"
                    priority
                  />
                </motion.div>

                {/* Navigation */}
                <motion.button
                  onClick={handlePrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-white hover:text-primary-400"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-10 h-10" />
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-white hover:text-primary-400"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="w-10 h-10" />
                </motion.button>

                {/* Counter */}
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm"
                  aria-live="polite"
                >
                  {currentIndex + 1} / {galleryImages.length}
                </div>

                {/* Caption */}
                <div className="absolute -bottom-10 left-0 right-0 text-center text-white">
                  <p className="font-semibold">{selectedImage.alt}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default GallerySection;
