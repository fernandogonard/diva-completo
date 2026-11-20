# Auditoría de experiencia, SEO, accesibilidad y rendimiento — Hotel Diva

**Alcance:** fase 3 de validación local. Se autorizó una rama y PR para generar un Deploy Preview; no se hizo merge ni deploy de producción. Las pruebas no enviaron mensajes ni consultas reales.

## Resumen ejecutivo

Se revisaron las seis rutas públicas en escritorio, tablet y móvil. Se corrigieron los metadatos que todavía presentaban el hotel como “alojamiento premium”, se cambió el icono del acceso flotante de WhatsApp por su glifo reconocible en verde de marca y se aplicaron ajustes puntuales de contraste, nombre accesible y tamaño de objetivos táctiles.

Las comprobaciones de lint, 48 pruebas unitarias, build, 16 pruebas E2E y las auditorías de dependencias finalizaron correctamente. Lighthouse otorgó 100 en Accesibilidad, Best Practices y SEO para las siete mediciones; en móvil, Performance quedó entre 89 y 93. El LCP de laboratorio móvil fue de 2,9 a 3,6 s y quedó aceptado por el hotel. Son mediciones locales simuladas, no métricas de usuarios reales ni una evaluación del deploy hospedado.

**Decisión: NO-GO / PENDIENTE DE VALIDACIÓN.** La medida del logo quedó cerrada mediante excepción aprobada sin modificar HTML ni estilos. Los datos comerciales fueron confirmados verbalmente y el LCP móvil fue aceptado. Continúa pendiente validar HTTPS, headers, rutas y rollback en un Deploy Preview/Netlify real.

## 1. Inspección visual y responsive

Se recorrieron `/`, `/habitaciones`, `/galeria`, `/grupos`, `/eventos` y `/contacto` en 1440 px, 768 px y 390 px. Las capturas de la inspección local están en `files/phase3-final-visual/` del directorio de sesión, fuera del repositorio.

| Control | Resultado |
|---|---|
| Navegación, contenido, imágenes y CTA en las seis rutas | PASS en la inspección local |
| Escritorio, tablet y móvil | PASS; sin overflow horizontal |
| Encabezados principales | Un H1 por ruta |
| Imágenes | No se detectaron imágenes sin texto alternativo ni recursos de imagen faltantes |
| Enlaces internos | No se detectaron destinos internos rotos |
| Páginas de error | La ruta inexistente se presenta como 404; HTTP 404 local se verificó en la fase pre-deploy |
| Logo institucional del encabezado | EXCEPCIÓN APROBADA: se mantiene a 48 px. No se modifica HTML ni estilos |

El usuario aprobó mantener el logo institucional del encabezado en su medida actual como excepción al mínimo de 150 px indicado por el manual. No se realizaron cambios en HTML, CSS ni componentes para este bloqueo. El logo del hero móvil se presenta a 150 px.

## 2. Accesibilidad

### Evidencia comprobada

- Lighthouse: Accesibilidad 100/100 en las seis mediciones móviles y la medición de Home de escritorio.
- Axe se ejecutó en 18 combinaciones de ruta y tamaño. Una detección de contraste en Galería fue intermitente; el escaneo dirigido repetido, con animaciones reducidas y tras estabilizar la página, no la reprodujo.
- Teclado, probado localmente: el primer Tab muestra y enfoca “Saltar al contenido”; el diálogo de Galería recibe foco inicial, mantiene el ciclo con Tab/Shift+Tab, cierra con Escape y devuelve el foco a la imagen que lo abrió.
- Se verificaron jerarquía de encabezados, textos alternativos, enlaces y controles de las rutas revisadas.
- Contacto no contiene un formulario de huéspedes: las consultas se derivan a canales externos del hotel.
- Se corrigieron los objetivos táctiles de los indicadores del carrusel de habitaciones a 24 × 24 px, manteniendo su presentación visual.

### Límites

Estos resultados no equivalen a una certificación WCAG 2.2 AA. La medición de Lighthouse/Axe no sustituye pruebas completas con lector de pantalla, sistemas operativos y navegadores distintos, ni la verificación de contraste en todas las condiciones reales. La detección intermitente de Galería debe volver a comprobarse en un Deploy Preview.

## 3. Lighthouse y rendimiento

Lighthouse CLI 12.8.2 se ejecutó contra el sitio local ya compilado. Los perfiles móviles son simulaciones de laboratorio; no representan mediciones de campo ni producción.

| Ruta / perfil | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Inicio — móvil | 93 | 100 | 100 | 100 | 2,0 s | 3,0 s | 30 ms | 0,01 |
| Habitaciones — móvil | 89 | 100 | 100 | 100 | 2,1 s | 3,6 s | 20 ms | 0 |
| Galería — móvil | 91 | 100 | 100 | 100 | 2,1 s | 3,2 s | 20 ms | 0 |
| Grupos — móvil | 93 | 100 | 100 | 100 | 2,1 s | 2,9 s | 30 ms | 0 |
| Eventos — móvil | 92 | 100 | 100 | 100 | 2,1 s | 3,1 s | 30 ms | 0 |
| Contacto — móvil | 92 | 100 | 100 | 100 | 2,1 s | 3,0 s | 40 ms | 0 |
| Inicio — escritorio | 100 | 100 | 100 | 100 | 0,5 s | 0,7 s | 0 ms | 0,001 |

**Interpretación:** el CLS y TBT de laboratorio son bajos. El LCP móvil de 2,9–3,6 s supera el umbral de 2,5 s usado como referencia de “bueno” para LCP, por lo que la oportunidad principal de rendimiento es priorizar/optimizar el elemento LCP de las rutas móviles. No se midió INP de usuarios reales; las puntuaciones de laboratorio no certifican Core Web Vitals de campo. Se recomienda repetir Lighthouse sobre Deploy Preview después de cualquier optimización.

## 4. SEO y enlaces

| Control | Resultado |
|---|---|
| Dominio canónico | PASS: `https://hotel-diva-mar-del-plata.netlify.app/` |
| Referencia al dominio anterior | PASS: búsqueda en el repositorio sin coincidencias |
| Frase “alojamiento premium” | PASS: no aparece en las fuentes activas del sitio ni en sus metadatos |
| Title y description por ruta | PASS según E2E |
| Canonical, Open Graph y Twitter Cards | PASS según E2E |
| Schema.org | PASS en la verificación de `@id`, URL e imagen del establecimiento |
| Sitemap, robots.txt y recursos referenciados | PASS en las pruebas locales |
| Lighthouse SEO | 100/100 en las siete mediciones |
| Enlaces internos y recursos | No se detectaron enlaces internos rotos ni imágenes faltantes en la inspección |

El resultado corresponde a código y recursos locales. La indexación efectiva, HTTPS, cabeceras servidas y comportamiento de CDN requieren una verificación del sitio hospedado.

## 5. Funcionalidad comercial

- Se verificaron los CTA y la navegación entre las páginas.
- Los enlaces de WhatsApp se comprobaron sin abrir un envío real ni enviar mensajes; las aperturas externas se interceptaron durante las pruebas.
- No se enviaron correos, consultas ni reservas.
- Contacto utiliza enlaces `tel:`, `mailto:`, WhatsApp y Maps; se verificaron como destinos de navegación, no como una comunicación real.
- Se comprobó el nombre accesible del botón flotante de WhatsApp y el uso de su glifo blanco sobre el verde `#25D366`.

## 6. Datos comerciales confirmados

Los siguientes datos fueron confirmados por el usuario y aplicados al sitio. Conviene conservar una autorización documental formal antes de publicar.

| Ubicación | Texto/dato publicado que requiere confirmación |
|---|---|
| `src/components/whatsapp/ReservationCTA.tsx` | “Disponibilidad inmediata” |
| `src/pages/ContactPage.tsx` | WhatsApp disponible 24/7; recepción de lunes a domingo 8:00–22:00; consultas urgentes 24/7 |
| `src/pages/ContactPage.tsx` | Teléfono de lunes a viernes 9:00–18:00; respuesta al email en 24 horas |
| `src/pages/ContactPage.tsx` | Horarios de desayuno: lunes a viernes 7:00–10:30 y fines de semana 8:00–11:00 |
| `src/pages/ContactPage.tsx` | Teléfonos: +54 9 223 503-3585 y +54 9 223 520-3369; email y dirección Calle Garay 1630 |
| `src/components/sections/RoomsSection.tsx` y `src/pages/RoomsPage.tsx` | Wi-Fi gratuito, caja de seguridad, ropa de cama, limpieza diaria, desayuno buffet, TV plasma y TV por cable |
| `src/components/sections/GroupsSection.tsx` | Experiencia con contingentes, cocina propia, desayunos y comidas personalizadas y atención/coordinación de grupos |
| `src/pages/EventosPage.tsx` | Preventa Verano 2027: “Pagás 6 noches, te alojás 7”, confirmada por el hotel |
| `src/pages/EventosPage.tsx` | El llamado a consultas anticipadas de COSAPRO 2027 continúa publicado |

## 7. Netlify, producción y rollback

El proxy local de Netlify verificó rutas válidas con HTTP 200 y una ruta inexistente con HTTP 404 en la fase pre-deploy. También se probaron localmente headers de seguridad y navegación.

Queda pendiente en Deploy Preview hospedado: HTTP 404 de origen, rutas directas válidas, HTTPS/HSTS, CSP y demás headers efectivos, redirects, caché/CDN, carga de recursos y configuración real de publicación. No se modificó ninguna configuración remota.

El ID del último deploy estable y el procedimiento real de rollback no están confirmados. Antes de publicar, el responsable de Netlify debe confirmar ambos y documentar cómo restaurar esa versión. No se hizo rollback.

## 8. Validaciones ejecutadas

| Control | Resultado |
|---|---|
| `npm run lint` | PASS |
| `npm run test -- --run` | PASS — 48 pruebas |
| `npm run build` | PASS |
| `npm run test:e2e -- --workers=1` | PASS — 16 pruebas |
| `npm audit` | PASS — 0 vulnerabilidades reportadas |
| `npm audit --omit=dev` | PASS — 0 vulnerabilidades reportadas |
| Node | PASS en la validación previa con Node 20.20.2 real |
| Lighthouse | PASS en 7 informes; métricas detalladas arriba |
| Teclado y foco del diálogo | PASS en prueba local dirigida |
| HTTPS, headers y rutas del Deploy Preview | PENDIENTE — no se publicó un preview |

Los informes JSON de Lighthouse y las capturas visuales se guardaron en el directorio de sesión, no como recursos del sitio. No se añadieron dependencias para estas comprobaciones.

## 9. Archivos modificados en esta fase

- `index.html`
- `src/components/sections/HeroSection.tsx`
- `src/components/whatsapp/WhatsAppButton.tsx`
- `src/components/sections/RoomsSection.tsx`
- `src/pages/EventosPage.tsx`
- `src/pages/EventosPage.test.tsx`
- `src/components/layout/Footer.tsx`
- `e2e/site.spec.ts`

Los informes solicitados son `AUDITORIA-EXPERIENCIA-SEO-ACCESIBILIDAD.md` y la actualización de `AUDITORIA-PRE-DEPLOY-FINAL.md`. El manual de marca no se modificó.

## 10. Matriz GO / NO-GO

| Control | Resultado |
|---|---|
| Inspección visual desktop/tablet/móvil | PASS local; logo del encabezado mantenido por excepción aprobada |
| Accesibilidad automatizada | PASS en Lighthouse; discrepancia transitoria de contraste en Galería no reproducida |
| Teclado y foco | PASS en comprobación dirigida |
| Rendimiento móvil | ACEPTADO por el hotel: LCP local 2,9–3,6 s |
| SEO y dominio canónico | PASS local |
| CTA y navegación | PASS sin enviar comunicaciones |
| Datos comerciales | PASS para horarios, teléfonos, servicios y campañas confirmados; pendiente obtener una confirmación documental formal |
| HTTP 404 y headers en Netlify alojado | PENDIENTE de Deploy Preview |
| Rollback real | PENDIENTE de confirmar deploy estable e ID |
| Rama y PR de preview | AUTORIZADOS; sin merge ni deploy de producción |

**Decisión final: NO-GO / PENDIENTE DE VALIDACIÓN.** La publicación debe esperar a verificar los controles que solo puede acreditar un Deploy Preview alojado y completar el procedimiento real de rollback. El logo, los datos comerciales y el LCP móvil quedaron definidos.
