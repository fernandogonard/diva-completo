import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import EventosPage from './EventosPage';

describe('EventosPage', () => {
  it('promotes Verano 2027 and no longer lists expired campaigns', async () => {
    render(<EventosPage />);

    expect(
      screen.getByRole('heading', { name: 'PREVENTA VERANO 2027 — HOTEL DIVA' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Pagás 6 noches, te alojás 7/)).toBeInTheDocument();
    expect(
      screen.queryByText(/FILAPI 2026|Semana Santa 2026|COSAPRO 2026/i),
    ).not.toBeInTheDocument();

    const campaignLink = screen.getByRole('link', {
      name: 'Consultar disponibilidad y condiciones de la Preventa Verano 2027 por WhatsApp',
    });
    expect(campaignLink.getAttribute('href')).toContain('https://wa.me/');
    expect(campaignLink).toHaveAttribute('target', '_blank');
    expect(campaignLink).toHaveAttribute('rel', 'noopener noreferrer');

    await waitFor(() => {
      expect(document.title).toBe('Campañas 2027: Verano y COSAPRO | Hotel Diva');
      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
        'COSAPRO 2027',
      );
    });

    expect(screen.getByRole('heading', { name: 'COSAPRO 2027' })).toBeInTheDocument();
    const cosaproLink = screen.getByRole('link', {
      name: 'Contactar por WhatsApp para COSAPRO 2027',
    });
    expect(cosaproLink.getAttribute('href')).toContain('https://wa.me/');
    expect(cosaproLink.getAttribute('href')).toContain('COSAPRO%202027');
    expect(screen.queryByText(/tarifa|precio|disponible/i)).not.toBeInTheDocument();
  });
});
