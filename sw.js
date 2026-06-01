// ─── CAMBIÁ ESTE NÚMERO CADA VEZ QUE ACTUALICES EL SITIO ───
const VERSION = 'v2';
// ────────────────────────────────────────────────────────────

const CACHE_NAME = 'aerosilva-' + VERSION;

const ASSETS = [
  '/',
  '/index.html',
  '/logo.png',
  '/logocelular.jpg',
  '/manifest.json'
];

// INSTALACIÓN: descarga y guarda los archivos nuevos
self.addEventListener('install', event => {
  console.log('[SW] Instalando versión:', VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // No espera, se activa ya
  );
});

// ACTIVACIÓN: borra todas las cachés viejas
self.addEventListener('activate', event => {
  console.log('[SW] Activando versión:', VERSION);
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('aerosilva-') && key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Borrando caché vieja:', key);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim()) // Toma control de todas las pestañas abiertas
  );
});

// FETCH: intenta red primero, si falla usa caché
self.addEventListener('fetch', event => {
  // Solo manejamos requests GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Guardamos la respuesta fresca en caché
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Sin internet: usamos la caché
        return caches.match(event.request);
      })
  );
});

// MENSAJE: permite forzar actualización desde el HTML si se necesita
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
