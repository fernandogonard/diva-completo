import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages';

// Lazy load pages para code splitting
const RoomsPage = lazy(() => import('../pages/RoomsPage'));
const GalleryPage = lazy(() => import('../pages/GalleryPage'));
const GroupsPage = lazy(() => import('../pages/GroupsPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const EventosPage = lazy(() => import('../pages/EventosPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Loading fallback
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center" role="status" aria-label="Cargando página">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <span className="sr-only">Cargando página</span>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/habitaciones" element={<RoomsPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/grupos" element={<GroupsPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
