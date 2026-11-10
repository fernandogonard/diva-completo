# Hotel Diva 2026

Sitio web de Hotel Diva, en Mar del Plata, desarrollado con React, TypeScript y Vite.

## 📋 Descripción

El sitio presenta habitaciones, servicios para grupos, eventos y datos de contacto. Las consultas y reservas se derivan a WhatsApp.

**Ubicación:** Mar del Plata, Argentina  
**Dirección:** Calle Garay 1630  
**Teléfono:** +54 9 223 503-3585  
**Email:** matias@hoteldiva.com.ar

---

## 🎯 Características Principales

### ✨ Experiencia de Usuario
- **Diseño Responsive:** Totalmente adaptable a dispositivos móviles, tablets y desktop
- **Animaciones Fluidas:** Transiciones suaves con Framer Motion
- **Navegación Intuitiva:** React Router v7 con lazy loading

### ⚡ Performance
- **Code Splitting:** Carga diferida de rutas
- **Imágenes:** WebP y dimensiones declaradas para reducir transferencias y saltos de layout
- **Web Vitals:** Medición en modo desarrollo; no se envían a un servicio de analítica

### 🔍 SEO
- Metadatos canónicos, Open Graph y Twitter actualizados al navegar entre rutas
- Schema.org `Hotel` con datos del proyecto; coordenadas, precios y valoraciones no se publican sin verificar
- `robots.txt` y `sitemap.xml` para el dominio Netlify configurado

### 🏗️ Arquitectura
- TypeScript en modo estricto
- Layout compartido, rutas lazy-loaded, componentes reutilizables y Error Boundary
- Página 404 para rutas inexistentes

### 🧪 Testing
- Vitest y React Testing Library para hooks, componentes y navegación en jsdom

---

## 🚀 Stack Tecnológico

| Categoría | Tecnologías |
|-----------|------------|
| **Core** | React 19, TypeScript 5.9.3, Vite 7.2.4, React Router 7.10 |
| **Styling** | Tailwind CSS 3.4, Framer Motion 12.23 |
| **Icons** | Lucide React |
| **Testing** | Vitest 4.0.15, React Testing Library, jsdom |
| **Performance** | web-vitals 5.1.0 |
| **SEO** | Schema.org JSON-LD |

---

## 📦 Instalación Rápida

```bash
# Clonar repositorio
git clone https://github.com/fernandogonard/diva-completo.git
cd diva-completo

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Build para producción
npm run build
```

---

## 📖 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Vista previa del build
npm test             # Tests en modo watch
npm run test:ui      # Interfaz visual de tests
npm run test:coverage # Cobertura de tests
npm run lint         # Validar código
```

---

## Verificación local

Ejecutar `npm run lint`, `npm test -- --run` y `npm run build` antes de publicar. Las métricas de rendimiento deben medirse en el entorno desplegado; no se garantiza una puntuación fija de Lighthouse ni de SEO.

---

## 🚀 Deployment en Netlify

### 1. Conectar Git
```bash
git add .
git commit -m "feat: Hotel Diva 2026 - Complete audit TIER 1-4"
git push origin main
```

### 2. En Netlify
- Ir a [netlify.com](https://netlify.com) → New site from Git
- Seleccionar repositorio
- Build command: `npm run build`
- Publish directory: `dist`
- Deploy

### 3. Configuración (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

### Límite SEO de la SPA

El HTML inicial contiene metadatos y el schema del inicio. Los títulos, descripciones, canonical y contenido de las otras rutas se actualizan en el cliente después de ejecutar JavaScript; algunos crawlers y extractores de redes sociales pueden no procesarlos. Si el posicionamiento o las vistas previas por ruta son prioritarios, conviene evaluar prerenderizado estático para las rutas públicas o SSR. No se requiere migrar de framework para aplicar esa mejora, y esta configuración no afirma que ya exista.

---

## 📁 Estructura del Proyecto

```
src/
├── app/              # Rutas y configuración app
├── components/       # Componentes React
├── pages/            # Páginas principales
├── hooks/            # 4 custom hooks
├── utils/            # Utilidades + SEO/Performance
├── constants/        # Constantes globales
└── types/            # TypeScript types
```

---

## 👨‍💼 Contacto

📞 +54 9 223 503-3585  
📧 matias@hoteldiva.com.ar  
📍 Calle Garay 1630, Mar del Plata

---

**Dominio canónico configurado:** `https://diva-hotel-mar-del-plata.netlify.app`. Confirmar el dominio de producción antes de cambiarlo en metadatos, sitemap y robots.
