# Guía de despliegue

## Objetivo

El proyecto debe funcionar tanto en la raíz de un dominio como en una subruta.

Ejemplos:

```txt
https://example.com/
https://example.com/proyecto/
https://usuario.github.io/nombre-repo/
```

## Vite y `base`

Vite permite controlar la base pública del build con la opción `base`.

Para dominio raíz:

```js
export default {
  base: '/',
};
```

Para subruta:

```js
export default {
  base: '/nombre-repo/',
};
```

También se puede dejar el proyecto preparado para leer una variable de entorno si se añade `vite.config.js`.

## Regla principal

No usar rutas absolutas duras si deben funcionar en subruta.

Evitar:

```html
<a href="/contacto/">Contacto</a>
<img src="/src/assets/logo.svg" alt="Logo" />
<script type="module" src="/src/js/app.js"></script>
```

Preferir rutas compatibles con Vite y con `base`.

En `index.html`, la entrada de Vite suele funcionar correctamente como módulo, pero cualquier asset manual debe revisarse si el proyecto se despliega en subruta.

## Assets

- `src/assets/`: assets procesados por Vite.
- `public/`: assets copiados tal cual al build.

Si se usa `public/`, recordar que las rutas deben respetar `base` cuando el proyecto esté en subcarpeta.

## GitHub Pages

El workflow de CI actual valida lint y build. Si se añade despliegue a GitHub Pages, mantenerlo simple:

```sh
npm ci
npm run lint
npm run build
```

Y desplegar `dist/`.

## SEO en despliegues

Si se añaden canonical, Open Graph, sitemap, robots o manifest:

- No hardcodear un dominio si se puede configurar.
- No duplicar subrutas.
- Comprobar raíz y subruta.
- Documentar variables de entorno necesarias.

## Checklist antes de tocar rutas o despliegue

- ¿Funciona con `base = '/'`?
- ¿Funciona con `base = '/nombre-repo/'`?
- ¿Los enlaces internos evitan rutas absolutas duras?
- ¿Los assets se resuelven en build?
- ¿El build genera `dist/` correctamente?
- ¿La documentación explica cualquier variable nueva?
