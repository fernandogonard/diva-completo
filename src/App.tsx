import './App.css';
import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@components/common';
import { AppRoutes } from '@/app/routes';
import { Footer, Header } from '@components/layout';
import { WhatsAppButton } from '@components/whatsapp';
import { initWebVitals, logWebVitalsSummary } from '@utils/performance';

function App() {
  useEffect(() => {
    // Inicializar medición de Web Vitals
    if (import.meta.env.DEV) {
      initWebVitals();
      
      // Log resumen después de 10 segundos (cuando la mayoría de métricas están disponibles)
      const timer = setTimeout(() => {
        logWebVitalsSummary();
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <MotionConfig reducedMotion="user">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-secondary-900 focus:ring-2 focus:ring-primary-700"
          >
            Saltar al contenido
          </a>
          <Header />
          <AppRoutes />
          <Footer />
          <WhatsAppButton variant="floating" />
        </MotionConfig>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
