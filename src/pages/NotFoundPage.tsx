import { Link } from 'react-router-dom';
import { useHeadMetadata } from '../hooks';

function NotFoundPage() {
  useHeadMetadata({
    title: 'Página no encontrada | Hotel Diva',
    description: 'La página que buscás no existe. Volvé al inicio de Hotel Diva.',
    canonical: undefined,
    noindex: true,
  });

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen items-center justify-center px-4 py-24">
      <section className="max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-700">
          Error 404
        </p>
        <h1 className="mb-4 text-4xl font-bold text-secondary-900">
          No encontramos esa página
        </h1>
        <p className="mb-8 text-lg text-secondary-700">
          Puede que el enlace esté desactualizado o que la dirección se haya escrito mal.
        </p>
        <Link
          to="/"
          className="inline-flex rounded-lg bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
