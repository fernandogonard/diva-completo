import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useHeadMetadata } from './useHeadMetadata'

describe('useHeadMetadata', () => {
  beforeEach(() => {
    // Limpiar meta tags antes de cada test
    document.querySelectorAll('meta[name], meta[property]').forEach(el => {
      el.remove()
    })
  })

  afterEach(() => {
    // Cleanup
    document.querySelectorAll('meta[name], meta[property]').forEach(el => {
      el.remove()
    })
  })

  it('debería actualizar document.title', () => {
    // Arrange
    const metadata = {
      title: 'Test Page | Hotel Diva',
      description: 'Test description',
    }

    // Act
    renderHook(() => useHeadMetadata(metadata))

    // Assert
    expect(document.title).toBe('Test Page | Hotel Diva')
  })

  it('debería actualizar meta description', () => {
    // Arrange
    const metadata = {
      title: 'Test',
      description: 'Test meta description',
    }

    // Act
    renderHook(() => useHeadMetadata(metadata))

    // Assert
    const metaDescription = document.querySelector('meta[name="description"]')
    expect(metaDescription?.getAttribute('content')).toBe('Test meta description')
  })

  it('debería actualizar keywords', () => {
    // Arrange
    const metadata = {
      title: 'Test',
      description: 'Test',
      keywords: ['hotel', 'mar del plata', 'alojamiento'],
    }

    // Act
    renderHook(() => useHeadMetadata(metadata))

    // Assert
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    expect(metaKeywords?.getAttribute('content')).toBe('hotel, mar del plata, alojamiento')
  })

  it('debería actualizar og:image cuando se proporciona', () => {
    // Arrange
    const metadata = {
      title: 'Hotel Diva',
      description: 'Descripción del hotel',
      ogImage: '/images/og-image.webp',
    }

    // Act
    renderHook(() => useHeadMetadata(metadata))

    // Assert
    const ogImage = document.querySelector('meta[property="og:image"]')
    expect(ogImage?.getAttribute('content')).toBe('/images/og-image.webp')
  })

  it('debería actualizar canonical URL', () => {
    // Arrange
    const metadata = {
      title: 'Test',
      description: 'Test',
      canonical: 'https://hoteldiva.com.ar/habitaciones',
    }

    // Act
    renderHook(() => useHeadMetadata(metadata))

    // Assert
    const canonical = document.querySelector('link[rel="canonical"]')
    expect(canonical?.getAttribute('href')).toBe('https://hoteldiva.com.ar/habitaciones')
  })

  it('debería establecer robots noindex cuando noindex es true', () => {
    // Arrange
    const metadata = {
      title: 'Test',
      description: 'Test',
      noindex: true,
    }

    // Act
    renderHook(() => useHeadMetadata(metadata))

    // Assert
    const robotsMeta = document.querySelector('meta[name="robots"]')
    expect(robotsMeta?.getAttribute('content')).toContain('noindex')
  })

  it('debería permitir actualizar metadata múltiples veces', () => {
    // Arrange
    const metadata1 = {
      title: 'Page 1',
      description: 'Description 1',
    }
    const metadata2 = {
      title: 'Page 2',
      description: 'Description 2',
    }

    // Act
    const { rerender } = renderHook(
      ({ meta }) => useHeadMetadata(meta),
      { initialProps: { meta: metadata1 } }
    )

    expect(document.title).toBe('Page 1')

    rerender({ meta: metadata2 })

    // Assert
    expect(document.title).toBe('Page 2')
    const metaDescription = document.querySelector('meta[name="description"]')
    expect(metaDescription?.getAttribute('content')).toBe('Description 2')
  })
})
