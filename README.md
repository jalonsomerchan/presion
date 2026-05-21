# Presión

Juego web de reflejos, memoria y decisiones tramposas inspirado en retos de botón bajo presión.

## Características

- Interfaz visual neón, responsive y accesible.
- Juego modular con lógica separada en `src/js/game/`.
- Niveles configurables en `src/data/levels.json`.
- Preparado para funcionar en dominio raíz, subruta y GitHub Pages.
- Workflows de CI y despliegue a Pages.

## Desarrollo

```sh
npm install
npm run dev
npm run lint
npm run build
```

## Añadir niveles

Edita `src/data/levels.json` y añade objetos con estos tipos soportados:

- `tap`: pulsar una vez dentro del tiempo.
- `waitThenTap`: esperar una señal antes de pulsar.
- `multiTap`: pulsar un número exacto de veces.
- `avoidTap`: aguantar sin pulsar.
- `choice`: elegir una opción correcta.
- `memory`: repetir una secuencia.

## Despliegue

El workflow `.github/workflows/pages.yml` construye `dist/` y lo publica en GitHub Pages al hacer push a `main`.

La configuración de Vite usa `base` compatible con Pages durante GitHub Actions y rutas relativas en desarrollo/local.
