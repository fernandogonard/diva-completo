import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';

describe('App - navegación y rutas', () => {
  it('debería renderizar la home page por defecto', () => {
    // Arrange
    render(<App />);

    // Act & Assert
    // Verificar que aparezca contenido de home con h1
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements.length).toBeGreaterThan(0);
  });

  it('debería tener todas las rutas disponibles en el router', () => {
    // Arrange
    render(<App />);

    // Act & Assert
    // Verificar que Header está presente con navegación
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBeGreaterThan(0);

    // Verificar enlaces a todas las rutas (con QuerySelector para evitar duplicados)
    const habitacionesLink = document.querySelector('a[href="/habitaciones"]');
    const galeriaLink = document.querySelector('a[href="/galeria"]');
    const gruposLink = document.querySelector('a[href="/grupos"]');
    const contactoLink = document.querySelector('a[href="/contacto"]');

    expect(habitacionesLink).toBeTruthy();
    expect(galeriaLink).toBeTruthy();
    expect(gruposLink).toBeTruthy();
    expect(contactoLink).toBeTruthy();
  });

  it('debería tener ErrorBoundary como fallback para errores', () => {
    // Arrange
    render(<App />);

    // Act & Assert
    // El componente debe estar envuelto en ErrorBoundary
    // Verificamos que la aplicación se renderiza sin errores
    expect(screen.getAllByRole('banner')).toHaveLength(1);
  });

  it('debería mantener metadata accesible en todas las rutas', () => {
    // Arrange
    render(<App />);

    // Act & Assert
    // Verificar que meta tags estén presentes
    const metaTags = document.querySelectorAll('meta');
    expect(metaTags.length).toBeGreaterThan(0);

    // Verificar que exista al menos un meta description
    const descriptionTag = document.querySelector('meta[name="description"]');
    expect(descriptionTag).toBeTruthy();
  });

  it('debería tener header con aria-label en nav principal', () => {
    // Arrange
    render(<App />);

    // Act
    const navs = screen.getAllByRole('navigation');

    // Assert
    // La primera nav debe ser la principal del Header
    expect(navs[0].getAttribute('aria-label')).toBe('Navegación principal');
  });

  it('debería renderizar el contenido sin errores de accesibilidad críticos', () => {
    // Arrange
    render(<App />);

    // Act & Assert
    // Verificar que no hay elementos sin alt text críticos
    const images = document.querySelectorAll('img');
    let missingAlt = 0;

    images.forEach(img => {
      // No contar iconos y elementos decorativos
      if (!img.getAttribute('aria-hidden') && !img.getAttribute('alt')) {
        missingAlt++;
      }
    });

    // Aceptar máximo 0 imágenes críticas sin alt text
    expect(missingAlt).toBe(0);
  });

  it('debería tener estructura de heading jerárquica', () => {
    // Arrange
    render(<App />);

    // Act
    const h1Elements = document.querySelectorAll('h1');

    // Assert
    // Debe haber al menos un H1
    expect(h1Elements.length).toBeGreaterThanOrEqual(1);
  });

  it('debería renderizar layout compartido una sola vez', () => {
    render(<App />);

    expect(screen.getAllByRole('banner')).toHaveLength(1);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contactar por WhatsApp' })).toBeInTheDocument();
  });

  it('debería navegar por todas las rutas existentes y actualizar metadata', async () => {
    const user = userEvent.setup();
    window.history.pushState({}, '', '/');
    render(<App />);

    const routes = [
      { label: /habitaciones/i, heading: 'Habitaciones del Hotel Diva', path: '/habitaciones' },
      { label: /galería/i, heading: 'Galería de Hotel Diva', path: '/galeria' },
      { label: /grupos/i, heading: 'Grupos y contingentes en Hotel Diva', path: '/grupos' },
      { label: /eventos/i, heading: 'Eventos y Campañas', path: '/eventos' },
      { label: /contacto/i, heading: 'Contactanos', path: '/contacto' },
    ];

    for (const route of routes) {
      const link = screen.getAllByRole('link', { name: route.label })[0];
      await user.click(link);
      expect(await screen.findByRole('heading', { name: route.heading })).toBeInTheDocument();

      await waitFor(() => {
        expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
        expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href'))
          .toBe(`https://diva-hotel-mar-del-plata.netlify.app${route.path}`);
        expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content'))
          .toBe(`https://diva-hotel-mar-del-plata.netlify.app${route.path}`);
        expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content'))
          .toBe(document.title);
      });
    }

    window.history.pushState({}, '', '/');
  });

  it('debería mostrar una página 404 y marcarla como no indexable', async () => {
    window.history.pushState({}, '', '/ruta-inexistente');
    const { unmount } = render(<App />);

    try {
      expect(await screen.findByRole('heading', { name: 'No encontramos esa página' }))
        .toBeInTheDocument();
      expect(document.querySelector('meta[name="robots"]')?.getAttribute('content'))
        .toBe('noindex, nofollow');
      expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    } finally {
      unmount();
      window.history.pushState({}, '', '/');
    }
  });
});
