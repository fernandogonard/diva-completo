# Auditoria pre-deploy final — Hotel Diva

**Fecha:** 19/11/2026
**Decision:** **NO-GO / PENDIENTE DE VALIDACION**
**Alcance:** cambios del sitio, build, dependencias, rutas con Netlify Dev, pruebas y vista local. Se autorizó commit/push de una rama y PR exclusivamente para Deploy Preview. No se hizo merge ni deploy de producción, migración ni cambio remoto de producción.

## 1. Resumen ejecutivo

Se corrigieron las referencias SEO al dominio canonico confirmado, se preparo una respuesta HTTP 404 para rutas desconocidas, se agregaron pruebas E2E con Playwright y se validaron las dependencias con Node 20.20.2. La inspeccion visual local tambien detecto que el contenido del hero se recortaba en ventanas de poca altura; el hero ahora puede crecer y reserva espacio debajo del encabezado.

Lint, 48 pruebas unitarias, build, 16 pruebas E2E y las auditorias de dependencias pasan. `npm audit` y `npm audit --omit=dev` reportan cero vulnerabilidades. Una revision de seguridad estatica independiente no encontro vulnerabilidades explotables en los cambios revisados.

No recomiendo publicar a producción todavia: falta la validacion de un Deploy Preview hospedado y confirmar el procedimiento de rollback en Netlify. El usuario aprobó mantener el logo del encabezado a 48 px como excepción al mínimo de 150 px del manual y aceptó el LCP movil local de 2,9 a 3,6 s. Los datos comerciales fueron confirmados verbalmente y aplicados. No se modificó HTML ni estilos del logo. La revision visual de las seis rutas y la comprobacion dirigida de teclado se completaron localmente. La rama/PR de preview está autorizada; no debe fusionarse a producción sin autorización.

## 2. Estado y trazabilidad

- **Rama:** `master`; HEAD observado: `92840af` (`Add AI discovery resources`).
- El arbol tiene cambios locales y archivos sin seguimiento, incluidos cambios previos de identidad visual. Se preservaron; no se descartaron ni se confirmaron.
- No se observaron archivos eliminados en el diff.
- No se ejecuto ningun comando de publicacion ni se modifico produccion.
- El manual oficial `Hotel-Diva-Manual-de-marca.pdf` permanecio intacto. SHA-256 verificado: `814D658AFEC62B77541D7091E20CB227C8F6366E49C2B18040A218A404897D35`.
- Se limpiaron artefactos generados por Netlify Dev y Playwright (`.netlify/`, `deno.lock` y `test-results/`).

## 3. Hallazgos, evidencia y estado

| ID | Nivel | Archivo / componente | Evidencia e impacto | Correccion / estado |
|---|---|---|---|---|
| H-01 | Alto original, resuelto localmente | `package.json`, `package-lock.json` | La linea base informaba vulnerabilidades criticas y altas en dependencias. | Se actualizaron dependencias de forma controlada. `npm audit` y `npm audit --omit=dev`: cero vulnerabilidades. |
| H-02 | Alto original, resuelto localmente | `netlify.toml`, `scripts/create-netlify-404.mjs`, rutas | El fallback SPA devolvia 200 para rutas inexistentes. | Netlify sirve las rutas validas y `404.html` con status 404 para rutas desconocidas. Playwright y el proxy Netlify local lo verifican. Falta validacion en Deploy Preview hospedado. |
| H-03 | Alto original, resuelto | `index.html`, `src/constants/index.ts`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `public/ai-catalog.json` | Habia referencias al dominio canonico anterior. | Las verificaciones E2E comprueban metadata, Schema.org, sitemap, robots, catalogo y recursos con el dominio confirmado. La busqueda final no encontro referencias activas al dominio retirado. |
| H-04 | Medio, resuelto con confirmacion verbal | `src/components/whatsapp/ReservationCTA.tsx`, `src/pages/ContactPage.tsx`, `src/components/sections/RoomsSection.tsx` | El hotel confirmó recepción, WhatsApp 24/7, desayuno, dos teléfonos, disponibilidad inmediata y servicios publicados. | Se añadieron ambos teléfonos, desayuno buffet, TV plasma, TV por cable y los servicios confirmados. Aun falta una confirmación documental formal antes de publicar. |
| H-05 | Medio, pendiente operativo | Netlify / procedimiento de rollback | El último deploy estable conocido fue el publicado el 10/11/2026 desde `master@92840af` como “Production: master@92840af”. | Conservar este identificador como rollback conocido; confirmar permisos y ejecutar restauración únicamente desde Netlify cuando el usuario autorice. |
| H-06 | Medio, resuelto por excepción | Todas las paginas; Header; Galeria | Se completaron inspeccion visual de las seis rutas en 1440, 768 y 390 px, Lighthouse y prueba dirigida de teclado. El logo del header se mantiene a 48 px. El usuario aprobó esta medida como excepción al mínimo de 150 px del manual. Un hallazgo inicial de contraste en Galeria no se reprodujo al repetir Axe con movimiento reducido y pagina estabilizada. | No modificar HTML ni estilos del logo. Repetir el contraste en Deploy Preview. La evidencia ampliada esta en `AUDITORIA-EXPERIENCIA-SEO-ACCESIBILIDAD.md`. |
| H-07 | Bajo, higiene de dependencias | `node_modules` / `sharp` | `npm ls --depth=0` termina con codigo 0, pero informa `@emnapi/runtime` y `@img/sharp-wasm32` como extraneous; son paquetes WASM opcionales de Sharp y no se usan en la prueba nativa de Windows. | No aparecieron vulnerabilidades asociadas. Revalidar una instalacion limpia cuando pueda ejecutarse sin un proceso local bloqueando Rollup. |

## 4. Arquitectura, seguridad y funcionalidad

- El proyecto validado es una SPA de React, TypeScript, Vite y React Router. No se encontraron backend propio, API, base de datos, autenticacion, pagos, webhooks ni persistencia de reservas.
- Las consultas y reservas abren WhatsApp; no se probaron operaciones de PMS porque no existen en esta aplicacion.
- La revision de seguridad estatica de los cambios no encontro vulnerabilidades explotables. Esto no equivale a una prueba de penetracion.
- Auditoria de dependencias: cero avisos en el total y en dependencias de produccion.
- Se verificaron headers locales: CSP, `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy`. El `Cache-Control` local revalida los recursos. HTTPS/HSTS y headers del deploy productivo no se volvieron a validar en esta fase.
- No hay formularios de huespedes: el E2E comprueba que Contacto derive a WhatsApp y que no se exponga un formulario inexistente.

## 5. Dominio, SEO, rutas y recursos

- Dominio canonico aplicado: `https://hotel-diva-mar-del-plata.netlify.app/`.
- E2E valida title/description, canonical, Open Graph y Twitter en las seis rutas publicas.
- Schema.org del inicio valida `@id`, URL e imagen.
- Sitemap: seis URLs de rutas registradas; robots y catalogo apuntan al dominio confirmado.
- E2E comprobo respuestas 200 para rutas validas y assets referenciados (favicon, logos e imagenes).
- En Netlify Dev local: `/` = 200, `/habitaciones` = 200, `/habitaciones/` = 200 con canonical sin barra, y una ruta inexistente = 404. No se agrego una redireccion de barra final porque Netlify normaliza esas rutas y la regla probada provocaba un bucle.
- El build genera `dist/404.html`. La respuesta 404 en el servicio hospedado sigue pendiente de Deploy Preview.

## 6. Validaciones ejecutadas

Todas las validaciones de codigo se ejecutaron con **Node v20.20.2 real**.

| Control | Comando / evidencia | Resultado |
|---|---|---|
| Runtime | `node --version`; `.nvmrc`; `netlify.toml` | PASS — Node 20.20.2 |
| Lint | `npm run lint` | PASS |
| Unit tests | `npm run test -- --run` | PASS — 11 archivos, 48 pruebas |
| Build | `npm run build` | PASS — TypeScript y Vite; se genero `dist/404.html` |
| E2E | `npm run test:e2e -- --workers=1` | PASS — 16/16, contra Netlify Dev y el build local |
| Dependencias | `npm audit` | PASS — 0 vulnerabilidades |
| Dependencias de produccion | `npm audit --omit=dev` | PASS — 0 vulnerabilidades |
| Sharp | Lectura de metadata de `public/images/hero.webp` | PASS — WebP, 1920 × 1080 |
| HTTP / rutas | Netlify Dev local | PASS — rutas validas 200; inexistente 404 |
| SEO y recursos | Escenarios E2E | PASS |
| Headers | Escenario E2E en Netlify Dev | PASS en entorno local |
| Responsive | E2E en 1440, 768 y 390 px; navegacion movil | PASS — sin overflow horizontal |
| Hero en ventana baja | E2E a 946 × 466; inspeccion visual local | PASS — contenido visible y sin solaparse con el header |
| Preview hospedado | No disponible sin publicar | PENDIENTE |
| Rollback real | Deploy estable/ID no confirmado | PENDIENTE |

`npm ci` se intento, pero Windows rechazo el borrado de un binario de Rollup bloqueado por un servidor Vite que ya estaba en ejecucion (`EPERM`). Se restauraron dependencias con `npm install --no-audit --no-fund`; lint, tests, build, E2E y auditorias pasaron despues de esa restauracion. Por lo tanto, no se declara validada una instalacion limpia con `npm ci`.

### Fase 3: experiencia, SEO, accesibilidad y rendimiento

- Se elimino de las fuentes activas del sitio y de sus metadatos la frase “alojamiento premium”. El titulo SEO queda “Hotel Diva | Mar del Plata”.
- El boton flotante muestra el glifo de WhatsApp en verde de marca y conserva su nombre accesible.
- La inspeccion visual cubrio las seis rutas publicas en escritorio, tablet y movil. No se encontro overflow horizontal, imagen sin `alt`, recurso de imagen faltante ni enlace interno roto.
- Se verifico por teclado el skip link y el ciclo de foco del dialogo de Galeria, su cierre con Escape y la devolucion del foco.
- Lighthouse local: siete informes; Performance movil de 89–93, escritorio Home 100, y 100 en Accesibilidad, Best Practices y SEO. LCP movil de 2,9–3,6 s; fue aceptado por el hotel. No representa metricas de campo.
- El chequeo Axe dirigido de contraste en Galeria no reprodujo el hallazgo intermitente al esperar a que la pagina y sus animaciones se estabilizaran.
- Los detalles, metricas por ruta, limitaciones, lista comercial y matriz de control estan en `AUDITORIA-EXPERIENCIA-SEO-ACCESIBILIDAD.md`.

## 7. Impacto, marca y rollback

- No hay cambios de esquema, datos, API, pagos ni reservas; no se requieren migraciones.
- El manual de marca no se modifico. La correccion del hero conserva las imagenes, colores y tipografias existentes.
- Rollback recomendado: desde Netlify, restaurar el ultimo deploy de produccion conocido como estable. El administrador debe confirmar el deploy ID, permisos y procedimiento exacto antes de publicar.
- No se verifico un deploy de preview hospedado, por lo que las reglas locales no prueban por si solas el comportamiento de CDN/Netlify en produccion.

## 8. Archivos modificados y preservados

### Cambios de SEO, seguridad, runtime y pruebas de esta fase

`.gitignore`, `.nvmrc`, `README.md`, `index.html`, `netlify.toml`, `package.json`, `package-lock.json`, `public/ai-catalog.json`, `public/llms.txt`, `public/robots.txt`, `public/sitemap.xml`, `src/app/App.test.tsx`, `src/constants/index.ts`, `src/hooks/useHeadMetadata.test.ts`, `src/utils/seo-audit.test.ts`, `vitest.config.ts`, `playwright.config.ts`, `e2e/site.spec.ts`, `scripts/create-netlify-404.mjs`, `AUDITORIA-PRE-DEPLOY.md` y este informe.

### Cambios de experiencia visual y accesibilidad realizados en la fase 3

`src/constants/index.ts`, `src/pages/ContactPage.tsx`, `src/components/sections/RoomsSection.tsx`, `src/pages/RoomsPage.tsx`, `src/app/App.test.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/whatsapp/WhatsAppButton.tsx`, `src/pages/EventosPage.tsx`, `src/pages/EventosPage.test.tsx`, `src/components/layout/Footer.tsx`, `e2e/site.spec.ts` y `AUDITORIA-EXPERIENCIA-SEO-ACCESIBILIDAD.md`.

### Cambios previos de identidad visual preservados

`src/components/common/ErrorBoundary.tsx`, `src/components/common/LazyImage.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/Header.tsx`, `src/components/sections/GallerySection.tsx`, `src/components/sections/GroupsSection.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/sections/RoomsSection.tsx`, `src/components/whatsapp/ReservationCTA.tsx`, `src/components/whatsapp/WhatsAppButton.tsx`, `src/index.css`, `src/pages/ContactPage.tsx`, `src/pages/EventosPage.tsx`, `src/pages/RoomsPage.tsx` y `tailwind.config.js`.

Se preservaron tambien `.vscode/settings.json` y `Hotel-Diva-Manual-de-marca.pdf`, que ya estaban sin seguimiento. El PDF no fue modificado.

## 9. Decision final

**NO-GO / PENDIENTE DE VALIDACION.** Los controles locales de codigo, build, dependencias, E2E, SEO, rutas y headers pasaron. Antes de autorizar publicacion quedan:

1. Confirmar y ensayar el rollback desde el deploy estable conocido `master@92840af`.
2. Obtener un Deploy Preview hospedado y repetir ahi las pruebas HTTP 404, rutas, headers y assets.
3. Repetir `npm ci` y las validaciones en una sesion donde no haya un proceso local bloqueando archivos de dependencias.

No se hizo merge ni deploy de producción. El commit/push de la rama y el PR de preview fueron autorizados explícitamente; la publicación en producción sigue requiriendo autorización del usuario.
