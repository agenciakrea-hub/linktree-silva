# Assets derivados del logo

Fuente: `logo.png` (1184×1500, RGBA). Si cambia el logo, regenerar con ImageMagick 7:

```bash
magick logo.png -strip -resize x280 -define png:compression-level=9 logo-280.png
magick -size 512x512 xc:'#1e4ba8' \( logo.png -resize 390x390 \) -gravity center -composite -strip icon-512.png
magick -size 192x192 xc:'#1e4ba8' \( logo.png -resize 146x146 \) -gravity center -composite -strip icon-192.png
magick -size 512x512 xc:'#1e4ba8' \( logo.png -resize 300x300 \) -gravity center -composite -strip icon-maskable-512.png
magick -size 1200x630 xc:'#0e2a5c' -fill '#1e4ba8' -draw 'roundrectangle 370,85 830,545 64,64' \( logo.png -resize 380x380 \) -gravity center -composite -alpha off -strip og.png
```

- `logo-280.png`: el que muestra la página (116–140 px en pantallas 2×).
- `icon-192.png` / `icon-512.png`: íconos PWA `purpose: any`, logo con 12 % de margen sobre el azul del tile.
- `icon-maskable-512.png`: `purpose: maskable`, logo dentro de la zona segura (20 % de margen).
- `og.png`: vista previa al compartir el enlace (WhatsApp, redes), 1200×630.

Después de regenerar: subir `VERSION` en `sw.js`.
