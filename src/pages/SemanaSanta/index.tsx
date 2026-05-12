import { useEffect } from 'react';
import { SSHeader } from './components/SSHeader';
import { SSHero } from './components/SSHero';
import { SSCountdown } from './components/SSCountdown';
import { SSPackage } from './components/SSPackage';
import { SSFeatures } from './components/SSFeatures';
import { SSFooter } from './components/SSFooter';

export function SemanaSantaPage() {
  useEffect(() => {
    // Actualizar título de la página
    document.title = 'Semana Santa 2026 - Hotel Diva | Mar del Plata';
    
    // Actualizar/agregar meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Vive una experiencia inolvidable en Semana Santa 2026. Paquete especial en Hotel Diva con desayuno buffet, vista al mar y todas las comodidades. Desde $165.000.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SSHeader />
      <SSHero />
      <SSCountdown />
      <SSPackage />
      <SSFeatures />
      <SSFooter />
    </div>
  );
}
