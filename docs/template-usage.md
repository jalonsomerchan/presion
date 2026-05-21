# Uso del template

## Objetivo

Esta base sirve para iniciar proyectos frontend sencillos con HTML, JavaScript, Vite y Tailwind CSS sin añadir frameworks de UI ni complejidad innecesaria.

## Stack incluido

- HTML estático.
- JavaScript ES Modules.
- Vite.
- Tailwind CSS 4.
- ESLint.
- Prettier.
- GitHub Actions.

## Primeros pasos

```sh
npm ci
npm run dev
```

Para generar build:

```sh
npm run build
```

Para previsualizar build:

```sh
npm run preview
```

## Estructura base

```txt
index.html
src/
├── assets/
├── css/
│   └── main.css
└── js/
    └── app.js
```

## Convenciones de HTML

- `index.html` debe mantener estructura semántica.
- Evitar lógica inline en HTML.
- Los scripts deben cargarse como módulos.
- Los enlaces internos deben funcionar en raíz y subruta.
- Los assets deben cargarse de forma compatible con Vite y con `base`.

## Convenciones de JavaScript

- Usar ES Modules.
- Mantener `src/js/app.js` como punto de entrada pequeño.
- Extraer lógica reusable a módulos propios.
- Crear carpetas como `src/js/utils/`, `src/js/config/`, `src/js/data/` o `src/js/features/` si el proyecto crece.
- Evitar dependencias para tareas que se puedan resolver con APIs nativas.

Ejemplo recomendado:

```txt
src/js/
├── app.js
├── config/
│   └── site.js
├── features/
│   └── menu.js
└── utils/
    └── dom.js
```

## Convenciones de CSS

- `src/css/main.css` debe contener Tailwind y estilos globales.
- Evitar CSS global demasiado específico.
- Usar tokens CSS para valores repetidos.
- Preferir utilidades Tailwind para estilos locales simples.

## Assets

- Guardar assets fuente en `src/assets/` cuando deban pasar por Vite.
- Usar `public/` solo para archivos que deban copiarse tal cual al build.
- Evitar rutas absolutas duras si el proyecto puede desplegarse en subruta.

## Dependencias

No añadir dependencias nuevas salvo que la tarea lo requiera claramente.

Antes de añadir una dependencia, comprobar:

- si puede hacerse con JavaScript nativo,
- si aumenta mucho el bundle,
- si introduce mantenimiento innecesario,
- si afecta a seguridad o privacidad.

## Calidad

Antes de terminar cambios:

```sh
npm run lint
npm run format:check
npm run build
```

Si se añade un script nuevo, documentarlo en `README.md` y comprobar si debe añadirse al workflow de CI.

## Checklist para agentes

- ¿El cambio es pequeño y modular?
- ¿`index.html` sigue siendo semántico?
- ¿`src/js/app.js` sigue siendo entrada ligera?
- ¿Los estilos globales no se han convertido en un cajón desastre?
- ¿Funciona en móvil?
- ¿Funciona en raíz y subruta?
- ¿No se han añadido dependencias innecesarias?
- ¿La documentación sigue reflejando el proyecto?
