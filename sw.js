// ─── CAMBIÁ ESTE NÚMERO CADA VEZ QUE ACTUALICES EL SITIO ───
const VERSION = 'v6';
// ────────────────────────────────────────────────────────────
const CACHE_NAME = 'aerosilva-' + VERSION;
const ASSETS = [
  './',
  './index.html',
  './logo.png',
  './logocelular.jpg',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('aerosilva-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // ── Navegación (HTML) ──────────────────────────────────────
  // Siempre va a la red ignorando el caché HTTP del browser.
  // Esto evita que el browser le devuelva al SW un index.html viejo.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // ── Assets (imágenes, manifest, etc.) ─────────────────────
  // Network-first: intenta la red, guarda en caché, fallback al caché.
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
