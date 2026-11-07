# Zappy Delivery

Sitio estático de [Zappy Delivery](https://zappydelivery.com/), mensajería en moto y última milla para empresas en Panamá. La carga que no cabe en moto, y las rutas al interior, van en panel o camión. Hecho con [Astro](https://astro.build/) (salida estática). El idioma del sitio es español de Panamá (`es-PA`).

El diseño sigue una retícula tipo bento: bordes negros de 2–3 px, botones píldora, tarjetas de 32–64 px, bandas a sangre y titulares en peso 800. La paleta es la del logotipo (dos azules y naranja), no la del estilo de referencia original. La tipografía es Inter, servida con `@fontsource`.

## Requisitos

- Node.js 22 o superior
- npm

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`.

## Producción

```bash
npm run build
npm run preview
```

`npm run build` genera HTML, CSS y assets en `dist/`. No hay servidor de aplicación: el formulario de contacto solo abre WhatsApp en el navegador.

## Despliegue

Sirva el contenido de `dist/`. El dominio previsto en canonical, Open Graph y el sitemap es `https://zappydelivery.com` (`site` en `astro.config.mjs`).

| Plataforma | Comando de build | Directorio | Notas |
| --- | --- | --- | --- |
| Vercel | `npm run build` | `dist` | Framework Astro, o static. Sin adapter. |
| Netlify | `npm run build` | `dist` | Publicar el directorio `dist`. |
| Cloudflare Pages | `npm run build` | `dist` | Igual. El `robots.txt` apunta al sitemap del dominio configurado. |

Si el dominio de salida cambia, actualice `site` en `astro.config.mjs` y `url` en `src/config/site.ts`, y vuelva a construir.

## Dónde está cada cosa

- `src/config/site.ts` — nombre legal, WhatsApp, teléfono, redes, horario de la mensajería (sin días) y TODOs (correo, dirección).
- `src/data/services.ts` — los seis servicios.
- `src/data/faq.ts` — preguntas y respuestas.
- `src/data/coverage.ts` — zonas e interior.
- `src/content/blog/` — artículos (content collection).
- `src/lib/llms.ts` — genera `/llms.txt` y `/llms-full.txt` desde la config, los servicios, las preguntas y el blog. `robots.txt` permite los crawlers de asistentes y enlaza esos archivos y el sitemap.
- `public/og-zappy.jpg` y los favicon — marca.

El número de WhatsApp es el de `https://wa.me/+50766009480`, enlace de la barra social de zappydelivery.com. Todos los botones usan ese valor.

## Colores

Muestreados del logotipo publicado en el sitio (no hay manual de marca público):

| Uso | Hex |
| --- | --- |
| Azul del wordmark «ZAPPY» | `#21397A` |
| Azul claro del ala | `#008BCE` |
| Naranja de «DELIVERY» y de los botones | `#EB6935` |
| Lienzo | `#F3F3F1` |
| Tinta | `#000000` |

El naranja es el único acento de acción. El hover del botón usa `#E76033`, un punto más oscuro del mismo naranja del logo.

## Pendientes marcados en el sitio

- Correo público (no está en zappydelivery.com).
- Dirección de la oficina (solo consta Ciudad de Panamá).
- Días de la semana del horario (el servicio publica de 8:00 a.m. a 5:00 p.m., sin días).
- Tabla de ZappyPoints y restricciones. Solo está publicado el canje de 100 puntos por una entrega gratis.
- Tarifas y tiempos que el sitio actual no publica. No se inventaron.
