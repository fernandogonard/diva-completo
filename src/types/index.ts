/**
 * Tipos globales compartidos en toda la aplicación
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  canonical?: string;
  noindex?: boolean;
  schema?: Record<string, unknown>;
}

export interface Room {
  id: 'matrimonial' | 'twin' | 'triple' | 'cuadruple';
  name: string;
  capacity: number;
  beds: string;
  amenities: string[];
  description: string;
  image: string;
  images?: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface HotelInfo {
  name: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  website: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type NavItemType = 'page' | 'section' | 'external';

export interface NavItem {
  name: string;
  href: string;
  type: NavItemType;
}

export interface Amenity {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}
