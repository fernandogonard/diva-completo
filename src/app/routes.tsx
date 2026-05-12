import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages';

// Lazy load pages para code splitting
const RoomsPage = lazy(() => import('../pages/RoomsPage'));
const GalleryPage = lazy(() => import('../pages/GalleryPage'));
const GroupsPage = lazy(() => import('../pages/GroupsPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const EventosPage = lazy(() => import('../pages/EventosPage'));

// Loading fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
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
        {/* 404 - Redirect to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}
