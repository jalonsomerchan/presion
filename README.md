# Presión

Juego web de reflejos y decisiones tramposas inspirado en retos de botón bajo presión.

## Características

- Interfaz visual neón, responsive y accesible.
- Juego modular con lógica separada en `src/js/game/`.
- Niveles configurables en ficheros JSON dentro de `src/data/`.
- Mecánicas centradas en un único botón: pulsar, no pulsar, esperar, contar pulsaciones y reaccionar a señales visuales.
- A partir del nivel 2 aparecen efectos raros: parpadeos, textos fantasma, botones falsos y pequeñas interferencias.
- Progreso de niveles guardado en `localStorage`.
- Preparado para funcionar en dominio raíz, subruta y GitHub Pages.

## Desarrollo

```sh
npm install
npm run dev
npm run lint
npm run build
```

## Añadir niveles

Cada fichero `src/data/nivel-X.json` tiene esta estructura:

```json
{
  "nivel": 5,
  "nombre": "Nombre del nivel",
  "normas": "Regla general del nivel",
  "etapas": []
}
```

Tipos soportados:

- `tap`: hay que pulsar una vez y esperar a que acabe el tiempo.
- `waitThenTap`: hay que esperar a que cambie el texto del botón y pulsar después.
- `multiTap`: hay que pulsar exactamente `targetTaps` veces; si se pulsa de más, se falla.
- `wordCountTap`: hay que pulsar según el número de palabras reales de la frase, sin poner el número escrito en el propio texto.
- `avoidTap`: no hay que pulsar nada hasta que acabe el tiempo.
- `tapIfEmoji`: hay que pulsar cuando aparezca el emoji indicado, aunque el texto intente engañar.

## Prompt para generar más niveles

```txt
Actúa como diseñador de niveles para un juego tipo Pressing Under Pressure llamado Presión.

Genera un objeto JSON válido para un nuevo fichero `src/data/nivel-X.json`.

Estructura obligatoria:
{
  "nivel": 5,
  "nombre": "Título corto",
  "normas": "Regla general del nivel",
  "etapas": [
    {
      "id": "n5-etapa-1",
      "type": "tap",
      "buttonText": "Texto que irá dentro del botón",
      "timeLimit": 5000
    }
  ]
}

Reglas:
- Crea exactamente 4 etapas.
- Solo usa estos tipos: `tap`, `waitThenTap`, `multiTap`, `wordCountTap`, `avoidTap`, `tapIfEmoji`.
- Todo debe resolverse con un único botón. No generes choices, respuestas externas, formularios ni memoria por botones separados.
- La pregunta o instrucción debe ir dentro de `buttonText`.
- En `wordCountTap`, el texto no debe decir el número directamente. Evita frases como “cuatro palabras”. El jugador debe contar.
- En `multiTap`, usa `targetTaps` y no hagas que el texto revele siempre el número de forma demasiado evidente.
- En `tapIfEmoji`, usa `emoji`: "🐭" para indicar que hay que pulsar si aparece un ratón.
- Puedes crear trampas donde `buttonText` diga “No pulses” pero aparezca 🐭; en ese caso debe ser `tapIfEmoji`, porque el ratón manda.
- Puedes crear señuelos con gato, hámster o conejo usando `avoidTap`; si no hay 🐭, no se pulsa.
- Usa `timeLimit` entre 3000 y 8000 milisegundos.
- No añadas explicaciones fuera del JSON.
```

## Despliegue

El workflow `.github/workflows/pages.yml` construye `dist/` y lo publica en GitHub Pages al hacer push a `main`.

La configuración de Vite usa `base` compatible con Pages durante GitHub Actions y rutas relativas en desarrollo/local.
