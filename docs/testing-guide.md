# Guía de checks y calidad

## Objetivo

Mantener una validación simple, rápida y útil para proyectos HTML, JavaScript, Vite y Tailwind CSS.

## Comandos principales

Instalación limpia:

```sh
npm ci
```

Lint:

```sh
npm run lint
```

Formato:

```sh
npm run format:check
```

Build:

```sh
npm run build
```

Preview:

```sh
npm run preview
```

## CI actual

El workflow `.github/workflows/ci.yml` debe mantenerse simple:

```sh
npm install
npm run lint
npm run build
```

Si se cambia a `npm ci`, comprobar que el repositorio tenga `package-lock.json` actualizado.

## Cuándo añadir tests

Este template no incluye un framework de testing por defecto para evitar dependencias innecesarias.

Añadir tests solo si el proyecto incorpora lógica suficiente para justificarlo, por ejemplo:

- funciones de cálculo,
- parsers,
- lógica de juego,
- almacenamiento en `localStorage`,
- gestión compleja de estado,
- módulos reutilizables con reglas claras.

Si se añaden tests, preferir herramientas ligeras y documentar:

- comando npm,
- carpetas de tests,
- cobertura esperada,
- cómo se ejecutan en CI.

## Qué debe validar siempre un agente

Antes de terminar una tarea, intentar ejecutar o razonar sobre:

```sh
npm run lint
npm run format:check
npm run build
```

Si no se pueden ejecutar, indicarlo en la PR o resumen final.

## Reglas de lint

- No desactivar reglas sin motivo.
- No añadir excepciones globales por comodidad.
- Mantener nombres claros.
- Eliminar código muerto.
- Evitar variables globales innecesarias.

## Reglas de formato

- Usar Prettier para formato.
- No mezclar estilos manuales contradictorios.
- No reordenar ficheros completos si solo hay que hacer un cambio pequeño.

## Checklist de calidad

- ¿Pasa lint?
- ¿Pasa format check?
- ¿Compila el build?
- ¿No se han añadido dependencias innecesarias?
- ¿La UI sigue funcionando en móvil?
- ¿Las rutas funcionan en raíz y subruta?
- ¿No hay secretos ni `.env` reales en el repositorio?
