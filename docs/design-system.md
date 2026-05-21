# Design system

## Objetivo

Mantener una interfaz moderna, limpia, responsive y fácil de reutilizar en proyectos creados desde esta base HTML, JavaScript, Vite y Tailwind CSS.

## Principios visuales

- Mobile first.
- Diseño claro y profesional.
- Jerarquía visual fuerte en títulos, llamadas a la acción y secciones.
- Contraste suficiente para cumplir accesibilidad mínima WCAG AA.
- Espaciado generoso y consistente.
- Bordes redondeados, sombras suaves y transiciones cortas cuando aporten claridad.
- Evitar decoración innecesaria que añada peso o dificulte mantenimiento.

## Tipografía

No usar fuentes externas.

Usar system fonts:

```css
font-family: ui-sans-serif, system-ui, sans-serif;
```

Evitar dependencias con Google Fonts, Adobe Fonts o CDNs similares.

## Colores

Preferir tokens CSS globales cuando el proyecto crezca.

Ejemplo:

```css
:root {
  --color-bg: #09090b;
  --color-text: #fafafa;
  --color-muted: #a1a1aa;
  --color-primary: #3b82f6;
  --radius-card: 1.5rem;
}
```

En componentes pequeños se pueden usar utilidades Tailwind, pero si un color se repite mucho debe convertirse en token o convención documentada.

## Modo claro y oscuro

Cuando se creen nuevas piezas de UI, deben tener en cuenta light mode y dark mode si el proyecto los soporta o si la tarea los requiere.

Evitar dejar textos, fondos o bordes con contraste pobre.

## Componentes y secciones

Aunque este proyecto no usa un framework de componentes, se debe pensar de forma modular:

- Header.
- Hero.
- Cards.
- CTA.
- Footer.
- Formularios.
- Modales o paneles.

Si una sección necesita lógica, moverla a `src/js/`.

Si una sección necesita estilos globales o tokens, moverlos a `src/css/main.css`.

## Accesibilidad

Requisitos mínimos:

- Usar HTML semántico: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Los enlaces deben tener texto claro.
- Los botones deben ser botones reales si ejecutan acciones.
- Las imágenes informativas deben tener `alt` útil.
- Las imágenes decorativas deben tener `alt=""`.
- Mantener foco visible.
- No depender solo del color para comunicar estados.
- Añadir `aria-label` cuando un control no tenga texto visible suficiente.

## Animaciones

Usar animaciones con moderación.

- Transiciones cortas.
- No bloquear interacción.
- No animar propiedades costosas si se puede evitar.
- Respetar `prefers-reduced-motion` cuando se añadan animaciones importantes.

## Rendimiento visual

- Optimizar imágenes.
- Evitar fondos pesados si no son necesarios.
- No cargar scripts para efectos que se pueden resolver con CSS.
- Evitar layout shift reservando espacio para imágenes y elementos dinámicos.

## Checklist de UI

- ¿Funciona bien en móvil?
- ¿Tiene contraste suficiente?
- ¿Usa HTML semántico?
- ¿La UI evita dependencias innecesarias?
- ¿Los estilos repetidos están centralizados?
- ¿Las imágenes tienen `alt` correcto?
- ¿La interacción funciona con teclado cuando aplica?
