# Auditoría pre-push / pre-deploy — Hotel Diva

> **Informe de línea base.** Sus resultados describen el estado anterior a la Fase 2 y no representan el estado actual. Consultá [AUDITORIA-PRE-DEPLOY-FINAL.md](./AUDITORIA-PRE-DEPLOY-FINAL.md) para correcciones y validaciones vigentes.

**Fecha:** 2026-11-19  
**Decisión:** **NO-GO / PENDIENTE DE VALIDACIÓN**  
**Alcance:** auditoría estática del repositorio local, diff de normalización de marca, dependencias instaladas, build y rutas locales. No se realizó push, deploy, merge, migración ni cambio de configuración de producción.

## 1. Resumen ejecutivo

El proyecto es un sitio institucional frontend basado en React, TypeScript, Vite y React Router. No se encontraron backend, API propia, base de datos, autenticación, pagos ni operaciones de PMS. Los flujos de consulta y reserva conducen a WhatsApp y no escriben datos en el sitio.

Lint, las 47 pruebas unitarias/de componentes y el build pasan. Las rutas públicas y los recursos de descubrimiento responden localmente. Sin embargo, la auditoría de dependencias informa **27 avisos: 3 críticos, 16 altos, 7 moderados y 1 bajo**. Al excluir dependencias de desarrollo aún informa **6 avisos, incluidos 5 altos**. No se modificaron paquetes ni lockfile durante esta auditoría.

Además, el fallback de Netlify devuelve `index.html` con HTTP 200 para rutas inexistentes, el host canónico debe confirmarse y no hay pruebas E2E de navegador. Por estos motivos no se recomienda publicar todavía.

## 2. Estado del repositorio y trazabilidad

- **Rama:** `master`.
- **Base confirmada:** `92840af` (`Add AI discovery resources`), subida previamente a `origin/master`.
- **Cambios locales esperados del trabajo de marca:** 16 archivos modificados: `index.html`, `tailwind.config.js`, `src/index.css` y componentes/páginas de layout, contacto, eventos, habitaciones, grupos, inicio y estados de error.
- **Otros archivos sin seguimiento, preservados:** `.vscode/settings.json` y `Hotel-Diva-Manual-de-marca.pdf`. No fueron agregados ni modificados por esta auditoría.
- **Archivos eliminados:** ninguno en el diff actual.
- `package.json`, `package-lock.json`, `netlify.toml` y la configuración de base de datos/API no tienen cambios locales en este diff.
- El árbol no está limpio; las modificaciones locales no están confirmadas. No se descartó ningún cambio.
- `npm ls --depth=0` finalizó correctamente. Hay `package-lock.json`; no fue necesario instalar/restaurar dependencias.
- Runtime observado: Node `v22.18.0`, npm `10.3.0`; el proyecto fija Node `20.x` en `package.json`, `.nvmrc` y Netlify. Las pruebas locales corrieron con Node 22, por lo que queda pendiente repetirlas bajo Node 20, el runtime declarado.

## 3. Arquitectura y archivos inspeccionados

Se revisaron `src/`, recursos `public/`, configuración y manifiestos del proyecto, incluidas rutas, layout, páginas, componentes de WhatsApp, metadata/schema, CSS/Tailwind, tests, Vite, Vitest, ESLint, TypeScript, Netlify, `.env.example`, README y manual de marca.

- Aplicación SPA con páginas Inicio, Habitaciones, Galería, Grupos, Eventos, Contacto y fallback visual 404 (`src/app/routes.tsx:27-33`).
- No se encontraron servidor, endpoints propios, modelos, controladores, middleware, integración de MongoDB, Mercado Pago, SMTP o webhooks. Las pruebas de reservas, pagos y persistencia de PMS **no aplican a esta arquitectura**.
- La reserva crea un enlace a WhatsApp desde `src/components/whatsapp/ReservationCTA.tsx:18-26`; no consulta disponibilidad ni registra una reserva local.
- El repositorio incluye `scripts/convert-webp.mjs`, que procesa assets localmente; no es un servicio desplegado.

## 4. Hallazgos críticos y altos

### H-01 — Dependencias con avisos de seguridad pendientes — **ALTO / bloquea GO**

- **Evidencia:** `npm audit` reportó 27 avisos (3 críticos, 16 altos, 7 moderados y 1 bajo). Incluye `vitest`, `@vitest/ui`, `@vitest/coverage-v8`, `vite`, `react-router-dom`/`react-router`, `postcss`, `styled-components`, `sharp`, `rollup`, `ws` y otras transitivas. `npm audit --omit=dev` reportó 6 avisos, incluidos 5 altos.
- **Archivos:** `package.json:24-25,45-53`; versiones exactas resueltas en `package-lock.json`.
- **Impacto:** las alertas críticas de Vitest/UI afectan herramientas de desarrollo y pruebas; no prueban por sí solas que el bundle público sea explotable. No obstante, permanecen dependencias de producción marcadas con severidad alta, y el toolchain vulnerable requiere actualización controlada antes de un nuevo build/publicación.
- **Recomendación:** planificar actualización compatible y revisar changelogs; ejecutar de nuevo `npm audit`, lint, tests y build en Node 20. No se ejecutó `npm audit fix` ni se alteraron dependencias.

### H-02 — Rutas inexistentes tienen respuesta HTTP 200 — **ALTO**

- **Evidencia:** `netlify.toml:9-11` reescribe `/*` a `/index.html` con status 200. Las pruebas HTTP locales mostraron que `/ruta-inexistente` devuelve el documento de la SPA con HTTP 200; React representa una pantalla 404, pero el servidor no devuelve 404.
- **Impacto:** soft 404 para rastreadores, monitoreo y clientes HTTP; puede indexar URLs inexistentes como páginas válidas.
- **Recomendación:** definir una estrategia de 404 de Netlify compatible con las rutas SPA y comprobar el status HTTP real antes de desplegar. No se modificó Netlify.

## 5. Seguridad

### Hallazgos y controles observados

- **No se detectó** uso de `dangerouslySetInnerHTML`, `innerHTML` productivo, `eval`, `new Function`, almacenamiento de sesión o autenticación propia en el frontend. Los usos de `innerHTML` encontrados pertenecen a tests.
- Los enlaces externos abiertos en pestaña nueva del sitio usan `rel="noopener noreferrer"`.
- `.env.example` contiene únicamente datos públicos de ejemplo y placeholders; `.env` no aparece como archivo presente ni rastreado. `.gitignore` excluye `.env`.
- Los datos de teléfono, correo y WhatsApp en el bundle son información comercial pública, no secretos de autenticación.
- Una revisión independiente del diff local no encontró vulnerabilidades nuevas introducidas por los cambios revisados. Esa revisión no sustituye los avisos de `npm audit`.

### S-01 — No hay políticas explícitas de seguridad HTTP en Netlify — **MEDIO**

- **Evidencia:** `netlify.toml` define build y fallback, pero no declara CSP, `X-Content-Type-Options`, `Referrer-Policy` ni `Permissions-Policy`.
- **Impacto:** no queda evidencia versionada de una capa de headers defensivos. No se verificaron headers del deploy productivo en esta auditoría.
- **Recomendación:** evaluar y probar headers adecuados para las fuentes externas existentes (Google Fonts, WhatsApp y mapas) y comprobarlos en una URL de preview antes de producción.

## 6. Auditoría funcional

- `npm test -- --run`: **PASS**, 11 archivos y 47 pruebas.
- Las pruebas cubren rutas y metadata, navegación, header, galería/teclado, errores, campañas y hooks; no existe suite Playwright/Cypress ni script E2E.
- Smoke test local: `/`, `/habitaciones`, `/galeria`, `/grupos`, `/eventos`, `/contacto` y `/ruta-inexistente` responden HTTP 200 con HTML de la SPA. `/llms.txt` responde `text/plain`; `/ai-catalog.json` responde `application/json`.
- Esto verifica el servidor estático local, **no** completa flujos en navegador real, validación visual/responsive en varios dispositivos, links externos, entrega a WhatsApp ni comportamiento productivo de Netlify.
- No existen formularios con persistencia, login, CRUD ni operaciones de reservas/pagos que puedan probarse de extremo a extremo.

### F-01 — Datos de disponibilidad y horarios sin una fuente operativa — **MEDIO**

- **Evidencia:** el CTA presenta “Disponibilidad inmediata” (`src/components/whatsapp/ReservationCTA.tsx:64`), mientras que `src/pages/ContactPage.tsx:55,87` muestra WhatsApp “Disponible 24/7” y teléfono con horario de lunes a viernes. La reserva solo abre WhatsApp; no consulta inventario.
- **Impacto:** el visitante puede interpretar disponibilidad confirmada o recibir horarios que no coinciden con la atención real. No se pudo contrastar con una fuente operativa.
- **Recomendación:** confirmar esos mensajes con el hotel y distinguir claramente consulta por WhatsApp de disponibilidad confirmada.

## 7. Manual de marca y auditoría visual

- El PDF original está en la raíz y permanece sin cambios. SHA-256 observado: `814D658AFEC62B77541D7091E20CB227C8F6366E49C2B18040A218A404897D35`.
- El diff de marca incorpora Poppins/Caveat y tokens `#0F1B4C`, `#1565D8`, `#00A8E8`, `#EAF6FF`, `#FFC93C`, `#F99279`, además de eliminar gradientes en las áreas ajustadas.
- **V-01 — Variante final del logo pendiente de aprobación — BAJO / pendiente.** El header y el hero móvil usan `/images/logo.webp`; el isologo se conserva, no se recolorea ni se reemplaza. Falta comparar visualmente la variante aprobada del manual contra el asset usado en todas las superficies y aprobar su legibilidad sobre cada fondo.
- **Alcance visual:** se revisó código y configuración; no se completó una inspección visual real de escritorio y móvil en navegador. La conformidad visual integral queda pendiente de revisión humana antes del push.

## 8. SEO, dominio y producción

### P-01 — Host canónico sin alinear al corte de esta auditoría — **ALTO / corregido en Fase 2**

- **Evidencia al corte original:** canonical, Open Graph, schema, `SITE_URL`, sitemap, robots y catálogos de descubrimiento todavía usaban el hostname anterior de Netlify.
- **Impacto al corte original:** las URLs absolutas no coincidían con el dominio canónico luego confirmado por el propietario.
- **Resolución:** las referencias activas y sus pruebas se alinearon al dominio oficial; la validación correspondiente figura en el informe final.

### P-02 — SEO de SPA y sitemap — **MEDIO**

- **Evidencia:** los metadatos de rutas se actualizan con JavaScript (`src/hooks/useHeadMetadata.ts`); Netlify entrega el mismo `index.html` para rutas profundas. El sitemap lista URLs del dominio configurado.
- **Impacto:** bots que no ejecutan JavaScript pueden no ver metadata específica por ruta; el fallback de status 200 se relaciona con H-02.
- **Recomendación:** validar renderizado con herramientas de Google y compartir enlaces. Evaluar prerender estático para las rutas públicas si las pruebas demuestran necesidad. Confirmar que todas las URLs del sitemap existan en el dominio final.

## 9. Pruebas y validaciones

| Control | Resultado |
|---|---|
| `npm ls --depth=0` | PASS |
| `npm run lint` | PASS, exit code 0 |
| `npm test -- --run` | PASS, 47/47 |
| `npm run build` | PASS |
| `npm audit --omit=dev` | FAIL, 6 avisos (5 high, 1 moderate) |
| `npm audit` | FAIL, 27 avisos (3 critical, 16 high, 7 moderate, 1 low) |
| Smoke HTTP local | PASS para servir rutas SPA y recursos estáticos; no demuestra status 404 ni E2E |
| E2E/browser real | No disponible en scripts/config del repositorio |
| Build en Node 20 | Pendiente; validación ejecutada con Node 22.18.0 |
| Headers/respuestas del deploy actual | No verificados |

Avisos no bloqueantes de tooling: `baseline-browser-mapping` y `caniuse-lite` desactualizados. No se actualizaron.

## 10. Impacto y rollback

- No hay cambios de esquema, datos, API, backend, pagos ni reservas; no se requiere migración de base de datos para el diff actual.
- No se probó tráfico, headers, formularios Netlify ni configuración interna de producción.
- El rollback recomendado es republicar el deploy de producción previamente conocido como estable desde Netlify; confirmar el deploy ID y probarlo antes de promover. Esa estrategia debe ser verificada por quien administra el sitio.
- Los cambios de UI son reversibles en Git al confirmar el diff. **No se hicieron commit, push, merge ni deploy.**

## 11. Correcciones recomendadas antes de pedir GO

1. Resolver y reauditar las dependencias con avisos, especialmente las dependencias runtime y el toolchain de Vite/Vitest.
2. Corregir la respuesta HTTP de rutas inexistentes y verificar 404 reales en Netlify preview.
3. Alinear metadata, schema, robots, sitemap, Search Console y catálogos con el dominio canónico confirmado `https://hotel-diva-mar-del-plata.netlify.app/`.
4. Confirmar horarios, disponibilidad y texto del CTA con el hotel.
5. Inspeccionar manualmente el sitio en navegador real en desktop y móvil, incluidos footer, menú, WhatsApp y la variante aprobada del logo.
6. Ejecutar validaciones en Node 20 y definir un procedimiento de rollback verificable.
7. Evaluar headers HTTP defensivos compatibles con los servicios externos.

## 12. Archivos modificados durante esta auditoría

- **Nuevo por solicitud:** `AUDITORIA-PRE-DEPLOY.md`.
- No se modificaron código, dependencias, configuración de infraestructura, datos, manual, secretos ni recursos durante la auditoría.
- Los 16 archivos de identidad visual ya modificados antes de esta auditoría permanecen como cambios locales del trabajo solicitado.
- Se preservaron `.vscode/settings.json` y el PDF del manual, ambos sin seguimiento previo.

## 13. Recomendación final

**NO-GO / PENDIENTE DE VALIDACIÓN al corte original.** La suite y el build estaban verdes, pero persistían avisos de dependencias, soft 404, desalineación de dominio y validaciones Node 20/E2E/visuales pendientes. El estado vigente y la decisión revisada constan en el informe final.
