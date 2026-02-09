import { useState } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
}

/**
 * LazyImage optimizado para Lighthouse 100/100
 * - width / height obligatorios (CLS + LCP)
 * - fetchPriority inteligente
 * - Skeleton estable (sin layout shift)
 * - Framer Motion deshabilitado para imágenes críticas
 * - Compatible con SEO y Core Web Vitals
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  title,
  className = '',
  priority = false,
  onLoad,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const Wrapper: any = priority ? 'div' : motion.div;

  return (
    <Wrapper
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      {...(!priority && {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      })}
    >
      {/* Skeleton */}
      {!isLoaded && !error && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Imagen */}
      {!error ? (
        <img
          src={src}
          alt={alt}
          title={title || alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          onLoad={handleLoad}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        /* Error fallback */
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <span className="text-gray-400 text-sm">Imagen no disponible</span>
        </div>
      )}
    </Wrapper>
  );
}
