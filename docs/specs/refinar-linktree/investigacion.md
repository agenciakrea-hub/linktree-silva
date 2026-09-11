# Investigación — refinar linktree-silva

Fecha: 2026-09-11. Fuente: `impeccable critique` dual-agent (informe en
`.impeccable/critique/2026-09-11T14-11-47Z__index-html.md`), lectura completa
del código y detector determinista (`impeccable detect`, 10 hallazgos, 1 falso
positivo).

## Qué existe hoy

Sitio estático de una sola página, sin build, publicado en GitHub Pages con
dominio `links.aeroambulanciasilva.com` (`CNAME`). Producción es idéntica al
repo byte a byte (SHA `34be1978…7431`).

| Archivo | Qué es |
|---|---|
| `index.html` (566 líneas) | Todo: `<head>`, CSS inline (l.17–195), HTML (l.197–433), cuatro `<script>` inline (l.437, 463, 502, 549) |
| `manifest.json` | PWA: `display: standalone`, `theme_color #0e2a5c`, íconos 192 (jpg) y 512 (apunta a `logo.png`, que no es cuadrado) |
| `sw.js` | Service worker `v6`: precache de 5 assets; navegación network-first con `cache: 'no-cache'` y fallback a `index.html`; assets network-first con cache de respaldo |
| `logo.png` | 1184×1500, 321 KB, RGBA. Se muestra a 116 px |
| `logocelular.jpg` | 512×512, 28 KB. Favicon + apple-touch-icon + ícono 192 |
| `CNAME` | dominio |

Sin `.gitignore`, sin `docs/`, sin `README`. Historial: commits "Update index.html" / "Update sw.js" hechos desde la web de GitHub.

## Estructura de `index.html`

**Tokens** (`index.html:20-39`): colores, sombras y radios en `:root`. Solo hay
paleta clara. El fondo de página no es token: `html { background: #9ab0d0 }`
(l.41) más `.bg-layer` fijo con cuatro `radial-gradient` azules (l.55).

**Perfil** (`index.html:203-232`): tile azul 140 px con logo (`.logo-container`
l.61), `<h1>` (l.209), bio de tres líneas (l.210, `.profile-bio` l.64) y seis
redes de 40 px (l.212–231, `.social-icon-btn` l.67). Mide 379 px en 390×844
antes del primer botón.

**Pila de enlaces** (`index.html:234-413`), en este orden:
1. `#btn-install` (l.236) oculto por defecto; se muestra en iOS o al disparar
   `beforeinstallprompt` (script l.437–461). Estilo inline azul marino.
2. `.btn-emergency` (l.246, CSS l.73–84): `tel:+582123105225`, título con
   emoji 🚨, anillo `ping` infinito (l.77–79).
3. `.phone-row` (l.257–270, CSS l.85–88): tres `tel:` a 0.7rem (11,2 px), sin
   rótulo. El primero repite el del botón rojo; el tercero (0424) es el mismo
   número del WhatsApp "Atención General".
4. Tres `.link-btn.btn-whatsapp` (l.272, 283, 294; CSS l.100–101): visualmente
   idénticos; subtítulo con `style="color:#009e7a"` inline (l.278, 289, 300).
5. `.section-label` "Nuestros Servicios" (l.305, CSS l.127–128): `div`, 0.68rem
   (10,88 px), `#6b7590` directamente sobre el fondo.
6. `.accordion` (l.307–378, CSS l.103–125): header `<button onclick>` sin
   `aria-expanded`; cuerpo con `max-height: 0 → 1000px` (l.114–115); siete
   `.sub-link` (l.320–375) que siguen focalizables cerrados. Íconos genéricos
   que no representan el servicio (MedEvac = flecha, Offshore = gráfico,
   FRMS = sol, RAA = mismo globo que "Sitio Web").
7. `.section-label` "Más información" (l.380) y tres `.link-btn` (l.381–412):
   sitio, quiénes somos, YouTube (YouTube ya está en la fila de redes; el sitio
   aparece cuatro veces en la página).

**Pie** (`index.html:416-420`, CSS l.130–132).

**Modal iOS** (`index.html:425-433`, CSS l.148–156): sin `role="dialog"`, botón
"✕" sin `aria-label`, sin Escape ni trampa de foco. Indica usar el botón
Compartir "de Safari", que no existe en el navegador interno de Instagram.

**Widget de accesibilidad** (`index.html:475-500`, CSS l.158–172, JS l.502–547):
FAB fijo abajo a la izquierda, toast "ACCESIBILIDAD" 3 s en cada carga (l.505–508),
panel `role="menu"` con A−/A+, dislexia, Oscuro, Mono. Modos implementados con
clases en `body` y ~20 reglas `!important` (l.174–194). Nada persiste.

**Animaciones**: `fadeUp` en perfil (l.59), botón rojo (l.73), fila de teléfonos
(l.85), pie (l.130) y por `nth-child` en los ocho hijos de `.links-section`
(l.139–146). Ninguna regla `prefers-reduced-motion`. Sin `:focus-visible` propio.
Sin `@media (hover: hover)`.

**Service worker** (`index.html:549-561`, `sw.js`): al activarse una versión
nueva, `window.location.reload()` (l.557) recarga la página bajo el dedo del
usuario.

## Convenciones que sigue

- Un solo archivo, CSS de una línea por regla, español en comentarios y
  variables JS (`promptInstalacion`, `esIOS`).
- Iconografía SVG inline estilo Feather (stroke 1.8–2, 24 px), colores de
  marca hardcodeados en `stroke="#0e2a5c"` dentro del SVG.
- Tokens en `--kebab-case` con sufijo `-soft` para tintes.
- Copy en español neutro (correcto para Venezuela), con dos deslices: "Fatigue
  Risk Management para operadores" (l.370) y "Off Shore" vs "Offshore" (l.361 vs
  l.314).

## Qué va a tener que cambiar (mapa a los hallazgos)

| Hallazgo | Dónde |
|---|---|
| P1 Jerarquía: 379 px de preámbulo, install encima del rojo, título con emoji partido, número ausente del botón | l.59–70, 203–232, 236–256, 437–461 |
| P1 Contacto: 7 opciones, teléfonos a 11,2 px sin rótulo, tres WhatsApp iguales, subtítulos truncados | l.85–101, 257–303 |
| P1 Widget: oscuro ilegible (≈1,2:1), Comic Sans, mono deja `html` azul, sin estado activo, `role="menu"`, 29 px, sin persistencia, toast y FAB tapan contenido | l.158–194, 475–547 |
| P1 Acordeón: enlaces ocultos focalizables, sin aria, abre fuera del viewport, `max-height`, íconos equivocados | l.103–125, 307–378, 463–471 |
| P2 Contraste/tamaño: bio 2,17:1 real, etiquetas 1,94:1 real y 10,88 px, WhatsApp subs 3,14:1, `.sub-desc` 4,43:1, hover teléfonos 4,38:1 | l.64, 87, 100, 123, 127, 278/289/300 |
| Menores: sin `meta description`/OG, manifest 512 no cuadrado ni maskable, `logo.png` 321 KB, fonts sin `preconnect`, `alt` ≠ `h1`, `nth-child` cuenta al install oculto, SW recarga | l.6–16, 61, 139–146, 206, 557; `manifest.json`, `sw.js` |

## Riesgos que me llamaron la atención

1. **Los tokens `--text-secondary` y `--text-muted` se usan tanto sobre blanco
   (donde pasan AA) como sobre el fondo azul (donde no).** Cambiarlos globalmente
   rompe lo que hoy funciona; hay que corregir por elemento o introducir tokens
   "on-page" vs "on-card".
2. **El modo oscuro actual es un parche de `!important` sobre una paleta clara.**
   Cualquier tema oscuro honesto exige que TODOS los colores pasen por tokens,
   incluidos los `stroke` inline de los SVG y los `style=""` inline de las
   tarjetas WhatsApp y del botón de instalar.
3. **El reemplazo de `max-height` por `grid-template-rows` necesita un wrapper
   extra**: probado en vivo, sin él quedan 18,6 px visibles por el padding y el
   borde de `.accordion-inner` (l.116).
4. **La condición que muestra "Instalar la App" en iOS** (`esIOS && !esStandalone
   && ancho ≤ 768`, l.442–444) se cumple en casi toda visita real desde iPhone,
   incluido el navegador interno de Instagram, donde las instrucciones del modal
   son incorrectas.
5. **El detector marca `dark-glow` en `.logo-container` (l.61) y es un falso
   positivo** (la regla reacciona al relleno #1e4ba8, no al fondo). No hay que
   "arreglarlo"; si molesta en el hook, se silencia con
   `impeccable-disable-line dark-glow`.
6. **El hook de impeccable está activo en este proyecto**
   (`.claude/settings.local.json`): cada Edit/Write sobre `index.html` corre el
   detector y devuelve hallazgos al hilo. Útil, pero conviene saberlo para no
   confundir sus mensajes con errores.
7. **No hay tests ni build.** La verificación es: `impeccable detect`, capturas
   en 390×844 y 1280×800 (claro y oscuro), navegación por teclado, y `git diff`.

## Datos que faltaban (resueltos por Franco el 2026-09-11)

- Los tres números y los mensajes prellenados de WhatsApp **no se tocan**: están tal
  cual los publica la empresa en su web. No se rotulan ni se reordenan.
- Es cierto que atiende un coordinador médico: la línea de tranquilidad bajo el botón
  rojo está aprobada (T3 del plan).
- Sin credenciales para publicar: ese bloque queda fuera.
- Recarga automática del service worker: sin preferencia; se conserva.
