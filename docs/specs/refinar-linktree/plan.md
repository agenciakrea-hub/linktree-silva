# Plan — refinar linktree-silva (crítica impeccable 22/40 → objetivo ≥ 30/40)

Estado: **EN EJECUCIÓN**. P0 publicado el 2026-09-11. P1 implementado y commiteado localmente (push pendiente de confirmación). Siguiente: P2.
Contexto: `investigacion.md` (mismo directorio) y
`.impeccable/critique/2026-09-11T14-11-47Z__index-html.md`.

## Reglas fijadas por Franco

1. **Refinar, no rediseñar.** Misma identidad: DM Sans, azul `#0e2a5c`, tarjetas de
   radio 16 px, sombras suaves, lógica Linktree. Tiene que verse como un Linktree
   autogestionado y profesional. Móvil primero.
2. **El logo de 140 px arriba se queda** como primer elemento.
3. **Ningún botón se agrega ni se saca.** Los tres teléfonos, las tres tarjetas de
   WhatsApp, las seis redes, las tarjetas de "Más información", el botón de instalar
   y los siete servicios del acordeón quedan todos, con sus mismos destinos. Los
   números y los mensajes prellenados de WhatsApp no se tocan. **El trabajo es
   estético**: jerarquía, tipografía, color, espaciado, íconos, movimiento,
   accesibilidad y semántica.
4. **Sin tema oscuro automático.** La página es clara siempre. El modo oscuro existe
   solo como opción manual dentro del panel de accesibilidad, como hoy, pero
   implementado bien.
5. **El botón de accesibilidad se queda** como señal de inclusión, con sus cinco
   controles (A−, A+, dislexia, oscuro, mono), todos funcionando de verdad.
6. **Recarga automática del service worker: no se toca** (Franco no tiene
   preferencia; se conserva el comportamiento actual).
7. **Entrega prompt por prompt**: implementar → vista previa que Franco pueda ver →
   confirmación → commit y push a `main` (GitHub Pages despliega solo). Cada prompt
   deja el sitio entero y publicable por sí mismo.
8. Copy en español neutro (Venezuela). Cambios de texto solo los listados abajo.

## Cambios de texto propuestos (vetá el que no quieras)

| # | Cambio | Por qué | Estado |
|---|---|---|---|
| T1 | Quitar el emoji 🚨 del título del botón rojo (el ícono de teléfono ya está al lado) | Los lectores de pantalla leen "sirena" antes de "Emergencias"; se renderiza distinto en cada sistema; craft-floor de impeccable lo prohíbe como ícono | propuesto |
| T2 | Mostrar el número `(0212) 310.52.25` dentro del botón rojo, en grande, entre el título y el subtítulo | Es el mismo número del `tel:`; hoy no se ve en el botón y solo aparece a 11 px en la fila de abajo | propuesto |
| T3 | Línea bajo el botón rojo: "Te atiende un coordinador médico. Ten a mano la ubicación y el estado del paciente." | Franco confirmó que es cierto; baja la ansiedad en el momento de más estrés | **aprobado** |
| T4 | "MedEvac Off Shore" → "MedEvac Offshore" (el subtítulo del acordeón ya dice "Offshore") | Consistencia | propuesto |
| T5 | Modal de instalación iOS: agregar "Si abriste este enlace desde Instagram, ábrelo primero en Safari" | Hoy indica un botón que no existe en el navegador interno | propuesto |
| — | Bio, títulos, subtítulos, mensajes de WhatsApp, pie: **sin cambios** | Regla 3 | fijo |

## Decisiones de diseño dentro del alcance

| Tema | Decisión |
|---|---|
| Primer pantallazo móvil | logo 140 → nombre → bio (texto igual, contraste corregido, márgenes más justos) → botón rojo con el número grande. Objetivo: borde superior del rojo ≤ 300 px en 390×844 (hoy 379; 469 en iPhone con el botón de instalar). |
| Redes sociales | **Decisión abierta (D1)**: A) bajan al final, encima del pie, a 44 px (gana ~62 px para el rojo; Linktree lo soporta como "socials at bottom") — recomendado; B) quedan arriba, más compactas (gana ~10 px). |
| Instalar la app | Mismo botón, misma lógica de aparición; pasa al final de la pila con estilo secundario (borde `--accent`, sin relleno) para que no pese igual que el rojo. |
| Teléfonos | Las tres tarjetas iguales que hoy, sin rótulos inventados; número en una sola línea, más grande (0.9rem/600) y en color de texto principal. |
| WhatsApp | Las tres tarjetas verdes como hoy; subtítulos completos (sin "…"), contraste AA. |
| Tema | Claro siempre. Oscuro solo manual (`html[data-theme="dark"]`) por tokens, sin `!important`. |
| Movimiento | Una sola animación autoral: pulso lento del ícono del rojo. Sin `fadeUp` escalonado. `prefers-reduced-motion` la apaga (es la única preferencia del sistema que se respeta; no cambia colores). |
| Widget | Mismo botón redondo, a la **derecha** (zona del pulgar), con la etiqueta "Accesibilidad" visible al lado en vez del toast que desaparece. Panel con los cinco controles de hoy más "Restablecer" (D2, opcional). Todo persiste. |
| Acordeón | `grid-template-rows` con wrapper, `inert` cerrado, `aria-expanded`, scroll al abrir, íconos que representan cada servicio. |
| Falso positivo `dark-glow` | No se toca; si molesta en el hook, comentario `impeccable-disable-line dark-glow`. |

## Flujo por prompt (vista previa → confirmación → push)

1. Sesión nueva: `seguí con docs/specs/refinar-linktree/plan.md, prompt PN` (modelo y
   esfuerzo indicados en cada uno).
2. Implementar, correr las verificaciones del prompt, marcar casillas.
3. **Vista previa** para Franco, dos formas a la vez:
   - Servidor estático del árbol de trabajo en la IP de Tailscale:
     `python3 -m http.server 8090 --bind 100.90.211.14` → `http://100.90.211.14:8090/`
     desde el celular o la PC (ufw deja pasar `tailscale0`). Limitación: sobre `http`
     el service worker y el prompt de instalación no corren; la PWA se prueba después
     del push en el dominio real.
   - Capturas enviadas al chat: 390×844 y 1280×800, claro y oscuro manual.
4. Franco confirma → commit con mensaje corto → `git push origin main`.
   Si no confirma, se corrige en la misma sesión y se vuelve al paso 3.
5. Parar el servidor de vista previa.

## Orden y dependencias

```
P0 preparación ─→ P1 tokens ─→ P2 jerarquía ─→ P3 acordeón ─→ P4 widget ─→ P5 SW/modal ─→ P6 verificación
```
P2, P3 y P4 dependen de los tokens de P1. P5 depende de los assets finales.

---

## P0 — Preparación, assets e higiene del `<head>`

**Modelo:** `sonnet` + `/effort medium`. Mecánico.
**Archivos:** `.gitignore` (nuevo), `manifest.json`, `sw.js`, `index.html` (solo `<head>` y el `<img>` del logo), nuevos `logo-280.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `og.png`.

- [x] `.gitignore`: `.claude/settings.local.json` + bloque `impeccable-ignore-start/end` del README de impeccable. `.impeccable/critique/*.md` y `docs/` quedan trackeados.
- [x] Commit base "Estado previo al refinado" (incluye `docs/specs/` y `.impeccable/critique/`). Push: pendiente de confirmación de Franco.
- [x] Generar con ImageMagick desde `logo.png` (1184×1500, RGBA): `logo-280.png` (alto 280 px, para 116–140 px en pantallas 2×); `icon-192.png` e `icon-512.png` (logo centrado sobre cuadrado `#1e4ba8`, margen 12 %); `icon-maskable-512.png` (margen 20 %); `og.png` 1200×630 (tile del logo centrado sobre `#0e2a5c`). Verificar con `identify`. Dejar los comandos en `docs/specs/refinar-linktree/assets.md` para regenerar si cambia el logo.
- [x] `manifest.json`: `icons` con los tres PNG (`purpose: "any"` y `"maskable"`), `lang: "es"`, `id: "/"`, `scope: "./"`. Mantener `theme_color` y `background_color`.
- [x] `<head>`: `<meta name="description">` (usar la bio actual), `og:title`, `og:description`, `og:image` (URL absoluta a `og.png`), `og:url`, `og:type`, `twitter:card=summary_large_image`; `<link rel="preconnect">` a `fonts.googleapis.com` y `fonts.gstatic.com` (`crossorigin`); favicon y `apple-touch-icon` → `icon-192.png`.
- [x] `<img>` del logo → `logo-280.png` con `width`/`height` y `alt="Aeroambulancias Silva"` (igual al `<h1>`).
- [x] `sw.js`: `VERSION = 'v7'`; `ASSETS` con los archivos nuevos. Cuidado: `cache.addAll` falla entero si un asset devuelve 404. No borrar todavía `logo.png` ni `logocelular.jpg` (P5).

**Verificación:** `impeccable detect index.html` sin hallazgos nuevos; `python3 -m json.tool manifest.json`; `node --check sw.js`; servir y comprobar en chrome-devtools MCP que el manifest carga sin errores y las imágenes responden 200. Vista previa + confirmación + push.

**Prompt para pegar:**
```
Seguí con docs/specs/refinar-linktree/plan.md, prompt P0. Leé antes investigacion.md.
Modelo sonnet, /effort medium. Trabajo mecánico: .gitignore, commit base, assets con
ImageMagick, manifest, meta tags y preconnect. No toques CSS ni estructura del HTML.
Al terminar: casillas, verificaciones pegadas, vista previa en Tailscale + capturas, y
esperá mi confirmación antes de commit y push.
```

---

## P1 — Sistema de tokens, modo oscuro manual, contraste, foco y movimiento

**Modelo:** `opus` + `/effort max`. Base de todo lo que sigue: toca cada regla de color.
**Archivos:** `index.html` (CSS l.17–195; `stroke`/`fill` inline de los SVG; `style=""` inline de l.236–244 y l.278/289/300).

- [x] Tokens completos en `:root` (claro): `--page-bg`, `--page-glow-1..4` (los cuatro radiales de `.bg-layer`), `--page-text`, `--page-text-soft`; `--card`, `--card-hover`, `--card-text`, `--card-text-soft`, `--card-text-muted`; `--accent`, `--accent-soft`, `--on-accent`; `--red`, `--red-soft`, `--on-red`; `--green`, `--green-soft`, `--green-text`; `--border`, `--focus`; sombras. Mover `#9ab0d0` de `html` (l.41) a `--page-bg`. **Sin `@media (prefers-color-scheme)` ni `prefers-contrast`.**
- [x] Paleta oscura SOLO en `html[data-theme="dark"]` (la activa el panel): fondo azul noche, tarjetas azul grafito, rojo igual, verde ajustado a AA, `color-scheme: dark` dentro de ese selector. Todos los elementos que hoy fallan en "Oscuro" (títulos del acordeón, encabezado abierto, globo del sitio, panel) tienen que leerse.
- [x] Todo color hardcodeado pasa por token: `stroke="#0e2a5c"`, `stroke="#fff"`, `fill="#25d366"`, colores de marca de las redes (tokens `--brand-*`), `#fafbfc` del cuerpo del acordeón, `#1e4ba8` del tile, `#009e7a` inline. Los `style=""` inline se reemplazan por clases (`.link-btn--install`, `.btn-sub--green`).
- [x] Borrar los bloques `body.high-contrast`, `body.monochrome`, `body.dyslexia-font` (l.174–194) y sus `!important`. Equivalentes nuevos por tokens y `data-*` en `<html>`: `data-theme="dark"`, `data-mono` (`filter: grayscale(1)` sobre `html`, así el fondo también), `data-font="dyslexic"`.
- [x] Contraste AA con los valores verificados: `.profile-bio` y `.section-label` con `--page-text`; subtítulo WhatsApp ≥ `#007f61` (4,78:1); `.sub-desc` ≥ `#5a6278` (5,87:1); `.phone-btn:hover` `#c0262a` (5,34:1). Comprobar la paleta oscura elemento por elemento.
- [x] Tamaños: ningún texto funcional por debajo de `0.8125rem` (13 px). `.section-label` a `0.75rem` con `letter-spacing: 0.08em`. `.btn-sub`, `.sub-desc` y `.phone-btn` suben.
- [x] `:focus-visible` propio (anillo 2 px `--focus` + `outline-offset: 2px`) en enlaces, botones, header del acordeón y controles del panel. `::selection` con la paleta.
- [x] Movimiento: eliminar `fadeUp` (l.59, 73, 85, 130, 139–146 y el `@keyframes`); pulso del rojo a 3 s con menos amplitud; `@media (prefers-reduced-motion: reduce)` apaga pulso, `scroll-behavior: smooth` y transiciones de transform.
- [x] Todos los `:hover` que mueven o cambian fondo dentro de `@media (hover: hover)`.
- [x] `dark-glow` en `.logo-container`: dejar; si el hook lo marca, `/* impeccable-disable-line dark-glow */`.

**Verificación:** `impeccable detect index.html` → 0 hallazgos salvo `dark-glow`; capturas 390×844 y 1280×800 en claro y con `data-theme="dark"` forzado; contraste de los seis textos medido con `getComputedStyle`; Tab por toda la página con anillo visible; `git diff --stat`. Vista previa + confirmación + push.

**Qué se vuelve más difícil:** cada color nuevo se declara dos veces (claro y oscuro manual). Ya no se puede pegar un `style="color:…"` inline sin romper el modo oscuro.

**Prompt para pegar:**
```
Seguí con docs/specs/refinar-linktree/plan.md, prompt P1. Leé antes investigacion.md, el
snapshot en .impeccable/critique/ y ~/.claude/skills/impeccable/reference/craft-floor.md.
Modelo opus, /effort max. Refactorizá TODO el color a tokens con modo oscuro MANUAL (sin
prefers-color-scheme), corregí contraste y tamaños, agregá focus-visible y reduced-motion,
sacá los fadeUp. No cambies orden ni contenido del HTML: eso es P2. Verificá con impeccable
detect y capturas en claro y oscuro. Vista previa en Tailscale + capturas, y esperá mi
confirmación antes de commit y push.
```

---

## P2 — Jerarquía del primer pantallazo y punto de contacto (estético, mismos botones)

**Modelo:** `opus` + `/effort high`. Criterio de diseño con restricciones duras.
**Archivos:** `index.html` (HTML l.203–303 y 380–420; CSS de perfil, rojo, teléfonos, WhatsApp; JS de instalación l.437–461 solo para reubicar el botón).
**Necesita antes:** decisión D1 (redes) y veto o no de T1/T2 en la tabla de textos.

- [ ] Perfil: `.logo-container` queda en 140 px; `.profile` padding-top `0.75rem`, `.avatar-wrap` margin `0.9rem`; bio con el mismo texto, `--page-text`, `max-width` que dé dos o tres líneas parejas, margen inferior `1rem`.
- [ ] Redes según D1: A) mover `.social-icons` al final de `.page` antes del pie, dentro de `<nav aria-label="Redes sociales">`, 44 px; B) quedan arriba con gap y margen menores, 44 px.
- [ ] Botón rojo: título "Emergencias — Llamar Ahora" en una línea (T1: sin emoji; si se veta, queda el emoji fuera del nombre accesible con `aria-hidden`); T2: número `(0212) 310.52.25` a `1.35rem/700` con `font-variant-numeric: tabular-nums` entre título y subtítulo; subtítulo igual al de hoy. Área táctil ≥ 104 px de alto.
- [ ] T3 (aprobado): párrafo de una línea bajo el rojo, sobre la página, con `--page-text-soft` a AA, `0.8125rem`.
- [ ] Fila de teléfonos: las tres, mismos `tel:`, número en una línea (`white-space: nowrap`, `0.9rem/600`, `--card-text`), ícono 14 px, alto ≥ 48 px; en 360 px pasa a `grid-template-columns: 1fr` con los tres apilados si no entran.
- [ ] WhatsApp: las tres verdes, subtítulos `white-space: normal` (máximo dos líneas), contraste ya corregido en P1.
- [ ] `#btn-install`: mismo elemento y misma lógica de aparición; movido al final de `.links-section` (después de YouTube), clase `.link-btn--install` (borde `--accent` 1.5 px, fondo `--card`, texto `--accent`), sin `style` inline.
- [ ] Semántica: `<main>` alrededor de `.page`; `div.section-label` → `<h2 class="section-label">` (mismo aspecto); `<footer>`; `rel="noopener"` en cada `target="_blank"`.
- [ ] "Más información": las tres tarjetas quedan (sitio, quiénes somos, YouTube).
- [ ] `nth-child`: ya sin animación escalonada, nada que corregir; confirmar que no queda ninguna regla `nth-child`.

**Verificación:** `getBoundingClientRect().top` del rojo en 390×844 ≤ 300 px (≤ 240 con D1-A); ninguna tarjeta trunca a 360 px; `impeccable detect`; capturas claro/oscuro; Tab en orden lógico (rojo → teléfonos → WhatsApp → servicios → más info → instalar → redes → accesibilidad). Vista previa + confirmación + push.

**Qué se vuelve más difícil:** con T2 el número de emergencias vive en dos lugares del rojo (`href` y texto) más la fila de teléfonos: cambiarlo son tres ediciones.

**Prompt para pegar:**
```
Seguí con docs/specs/refinar-linktree/plan.md, prompt P2. Modelo opus, /effort high. Leé
investigacion.md, el snapshot de la crítica y craft-floor.md. Regla 3 del plan: ningún botón
se agrega ni se saca, números y mensajes de WhatsApp intactos; solo los cambios de texto T1–T3
según su estado en la tabla. Usá los tokens de P1. Aplicá la decisión D1 tal como esté
anotada en el plan; si no está anotada, preguntámela antes de escribir. Vista previa en
Tailscale + capturas, y esperá mi confirmación antes de commit y push.
```

---

## P3 — Acordeón accesible y animado sin reflow

**Modelo:** `opus` + `/effort high`. Técnica verificada; el orden entre `inert`, transición y scroll tiene sutilezas.
**Archivos:** `index.html` (HTML l.307–378, CSS l.103–125, JS l.463–471).

- [ ] Envolver `.accordion-inner` en `<div class="accordion-clip">` (`min-height: 0; overflow: hidden`); `.accordion-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s cubic-bezier(.4,0,.2,1) }`, `.open { grid-template-rows: 1fr }`; borrar `max-height`. Sin wrapper quedan 18,6 px visibles (verificado).
- [ ] Cerrado: `inert` en `.accordion-body`; abierto: se quita antes de animar.
- [ ] Header: `type="button"`, `aria-expanded`, `aria-controls="servicios-lista"`, `id` en el body; listener en JS, no `onclick` inline.
- [ ] Al abrir: `header.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' })`.
- [ ] Íconos por servicio (mismo estilo, stroke 1.8, 24 px): avión (MedEvac), ambulancia (Terrestre, se queda), pulso ECG (Telemedicina, se queda), red de nodos (RAA), triángulo (Planes, se queda), plataforma con olas (Offshore), reloj o luna (FRMS).
- [ ] T4 si no se veta: "MedEvac Offshore". Resto del copy del acordeón intacto.
- [ ] `.sub-link`: alto ≥ 44 px, `:focus-visible`, hover dentro de `@media (hover: hover)`.

**Verificación:** con el acordeón cerrado, Tab no entra en los 7 enlaces (`document.activeElement` vía chrome-devtools MCP); abierto, sí; `take_snapshot` muestra `expanded`; detector sin `layout-transition`; captura a mitad de la apertura. Vista previa + confirmación + push.

**Prompt para pegar:**
```
Seguí con docs/specs/refinar-linktree/plan.md, prompt P3. Modelo opus, /effort high. Leé
investigacion.md (riesgo 3: el wrapper es obligatorio). Reconstruí el acordeón con
grid-template-rows, inert y aria, cambiá los íconos y aplicá T4 solo si no está vetado.
Verificá el foco con el acordeón cerrado usando chrome-devtools. Vista previa + capturas, y
esperá mi confirmación antes de commit y push.
```

---

## P4 — Widget de accesibilidad: mismos controles, todos funcionando

**Modelo:** `opus` + `/effort high`. Estado persistente sin parpadeo, semántica y carga de fuente bajo demanda.
**Archivos:** `index.html` (HTML l.475–500, CSS l.158–172, JS l.502–547, script inline nuevo en `<head>`), nuevos `fonts/OpenDyslexic-Regular.woff2`, `fonts/OpenDyslexic-Bold.woff2`, `fonts/LICENSE-OpenDyslexic.txt`.

- [ ] Botón redondo igual al de hoy, movido a la **derecha** (`right: 1rem`), con etiqueta "Accesibilidad" fija a su izquierda (pill `--card`, `0.75rem/600`) en lugar del toast de 3 s. `aria-expanded` + `aria-controls`. `body { padding-bottom: 6.5rem }`.
- [ ] Panel `role="group" aria-labelledby="a11y-titulo"`, abre/cierra con `hidden`; Escape cierra y devuelve el foco; clic afuera cierra. Mínimo 260 px de ancho para que "Mono" no caiga huérfano.
- [ ] Controles (los cinco de hoy): **A−** / **A+** (75–140 % en pasos de 10, región `aria-live="polite"` con el porcentaje) + D2 opcional **Restablecer**; **Fuente dislexia** (toggle `aria-pressed`; carga `fonts/OpenDyslexic-*.woff2` con `FontFace` al activar; `html[data-font="dyslexic"]` aplica la familia con `letter-spacing`/`line-height` sin `!important`); **Oscuro** (toggle `aria-pressed` → `html[data-theme="dark"]`, tokens de P1); **Mono** (toggle `aria-pressed` → `html[data-mono]`, `filter: grayscale(1)` sobre `html` para que el fondo también). Oscuro y Mono pueden convivir.
- [ ] Un solo nombre por control: etiqueta visible = `aria-label` (hoy conviven "Alto contraste", "Oscuro" y "Modo oscuro").
- [ ] Estado en `localStorage` (`a11y.size`, `a11y.theme`, `a11y.mono`, `a11y.font`), aplicado en `<html>` por un script inline al principio de `<head>` (antes del CSS) para que no parpadee.
- [ ] Botones ≥ 44 px; estado activo con contraste verificado en claro y oscuro.
- [ ] Descargar OpenDyslexic (SIL OFL 1.1) a `fonts/` con su licencia; NO precachear en `sw.js` (el handler de fetch la cachea al primer uso).

**Verificación:** cada control cambia algo visible y vuelve; recargar conserva; captura inmediata tras recarga en oscuro sin flash claro; `take_snapshot` muestra título y etiquetas; Tab/Escape completos; detector sin `text-occlusion`; contraste del panel en ambos temas. Vista previa + confirmación + push.

**Qué se vuelve más difícil:** cada preferencia nueva exige tocar el script del `<head>`, el panel y los tokens de los dos temas.

**Prompt para pegar:**
```
Seguí con docs/specs/refinar-linktree/plan.md, prompt P4. Modelo opus, /effort high. Leé
investigacion.md y craft-floor.md. Reconstruí el widget con los mismos cinco controles, todos
funcionando, persistencia sin parpadeo, cero !important, usando los tokens y data-* de P1.
Descargá OpenDyslexic con su licencia. Vista previa + capturas, y esperá mi confirmación antes
de commit y push.
```

---

## P5 — Service worker, modal iOS y cierre de higiene

**Modelo:** `sonnet` + `/effort medium`. Acotado y verificable.
**Archivos:** `sw.js`, `index.html` (l.425–433, 549–561), posible borrado de `logo.png` y `logocelular.jpg`.

- [ ] `sw.js`: `VERSION = 'v8'`; `ASSETS` = lista final (`./`, `index.html`, `manifest.json`, `logo-280.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`). Antes de borrar `logo.png`/`logocelular.jpg`, `grep -rn` de referencias en todo el repo. **La recarga automática al activarse queda como está.**
- [ ] Modal iOS: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, botón cerrar con `aria-label="Cerrar"`, Escape cierra, foco al abrir y retorno al cerrar; T5 si no se veta.
- [ ] Repasar que todo `target="_blank"` tenga `rel="noopener"`; `<footer>` sin cambios de contenido.

**Verificación:** `node --check sw.js`; servir y comprobar en chrome-devtools MCP que el SW instala sin error de precache; modal navegable por teclado; `impeccable detect`. Vista previa + confirmación + push.

**Prompt para pegar:**
```
Seguí con docs/specs/refinar-linktree/plan.md, prompt P5. Modelo sonnet, /effort medium.
Actualizá sw.js (versión y lista de assets final, sin tocar la recarga automática), hacé
accesible el modal iOS (T5 solo si no está vetado) y repasá rel="noopener". Antes de borrar
imágenes viejas, grep de referencias. Vista previa + capturas, y esperá mi confirmación antes
de commit y push.
```

---

## P6 — Verificación final y re-crítica

**Modelo:** `opus` + `/effort high`.

- [ ] `impeccable detect index.html` y `detect --viewport 390x844` / `1280x800` contra `https://links.aeroambulanciasilva.com` ya desplegado: exit 0 o solo `dark-glow`.
- [ ] `/impeccable critique index.html`: nueva puntuación (objetivo ≥ 30/40) y tendencia respecto de 22.
- [ ] Agente `verificador` sobre `git diff <commit base>..HEAD`: enlaces y `tel:` intactos, mismos botones que al inicio (contarlos), tokens definidos en los dos temas, aria coherente.
- [ ] Lighthouse móvil (accesibilidad y rendimiento) con chrome-devtools MCP `lighthouse_audit` sobre el dominio real.
- [ ] Prueba en celular real (Franco): claro/oscuro manual, instalar PWA, tocar "Llamar".
- [ ] Sin push (P5 ya dejó todo publicado); si P6 encuentra algo, se corrige en un P7 corto con el mismo flujo.

**Prompt para pegar:**
```
Seguí con docs/specs/refinar-linktree/plan.md, prompt P6. Modelo opus, /effort high. Corré el
detector en archivo y contra el dominio real, /impeccable critique, el agente verificador sobre
el diff completo (confirmá que hay exactamente los mismos botones y destinos que al inicio) y
Lighthouse móvil. Pegá evidencia real de cada uno. No hagas push.
```

---

## Decisiones abiertas para anotar

- **D1 Redes:** A) al pie (recomendado) / B) arriba, compactas.
- **D2 Botón "Restablecer"** en el panel de accesibilidad: sí / no.
- **T1, T2, T4, T5** de la tabla de textos: vetar el que no quieras. T3 ya está aprobado.

## Qué se vuelve más difícil después de esto

- Dos paletas (claro y oscuro manual): cada color nuevo se declara dos veces.
- Preferencias en `data-*` + `localStorage`: agregar una opción toca head-script, panel y CSS.
- Con T2, el número de emergencias aparece tres veces en el HTML.
- Assets derivados del logo: si cambia el logo hay que regenerarlos (comandos en `assets.md`).
- Dos binarios de fuente y una licencia en el repo.
- El repo pasa de 6 archivos a ~15; los commits "desde la web de GitHub" ya no alcanzan para cambios de assets.

## Fuera de alcance (explícito)

- Rediseño del mundo visual, logo nuevo, fotografías.
- Agregar, quitar o renombrar botones, números, destinos o mensajes de WhatsApp.
- Tema oscuro o alto contraste automáticos según el sistema.
- Cambiar la recarga automática del service worker.
- Bloque de credenciales para el comprador corporativo.
- Erratas en las URLs del sitio principal (`/sevicios-…`, `/quienes-somos-1`): otro repo.
- Analítica, formulario, correo, i18n.
