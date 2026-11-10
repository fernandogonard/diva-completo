import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import GallerySection from './GallerySection';

describe('GallerySection', () => {
  it('supports opening, keyboard navigation, closing, and focus restoration', async () => {
    const user = userEvent.setup();
    render(<GallerySection />);

    const firstImageButton = screen.getByRole('button', {
      name: /ver recepción y lobby del hotel diva/i,
    });
    await user.click(firstImageButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cerrar galería' })).toHaveFocus();
    expect(screen.getByText('1 / 8')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(await screen.findByText('2 / 8')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(firstImageButton).toHaveFocus();
  });
});
