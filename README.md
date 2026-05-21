# Presión

Juego web de reflejos y decisiones tramposas inspirado en retos de botón bajo presión.

## Características

- Interfaz visual neón, responsive y accesible.
- Juego modular con lógica separada en `src/js/game/`.
- Niveles configurables en ficheros JSON dentro de `src/data/`.
- Carga automática de niveles: basta con añadir un nuevo `src/data/nivel-X.json`.
- Mecánicas centradas en un único botón: pulsar, no pulsar, esperar, contar palabras, contar letras, contar emojis y reaccionar a señales visuales.
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

Para añadir un nivel nuevo solo tienes que crear un fichero `src/data/nivel-X.json`. El juego lo detecta automáticamente, lo importa y lo ordena por el campo `nivel`.

Cada fichero tiene esta estructura:

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
- `wordCountTap`: hay que pulsar según el número de palabras reales de `buttonText`.
- `emojiCountTap`: hay que pulsar según el número de veces que aparece `emoji` dentro de `buttonText`.
- `letterCountTap`: hay que pulsar según el número de veces que aparece `letter` dentro de `buttonText`.
- `avoidTap`: no hay que pulsar nada hasta que acabe el tiempo.
- `tapIfEmoji`: hay que pulsar cuando aparezca el emoji indicado, aunque el texto intente engañar.

## Prompt para generar más niveles

```txt
Actúa como diseñador de niveles para un juego tipo Pressing Under Pressure llamado Presión.

Genera solo un objeto JSON válido para un nuevo fichero `src/data/nivel-X.json`.

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
- Todo debe resolverse con un único botón. No generes choices, respuestas externas, formularios, memoria por botones separados, pantallas extra ni caos visual.
- La pregunta, trampa o instrucción debe ir siempre dentro de `buttonText`.
- Usa solo estos tipos: `tap`, `waitThenTap`, `multiTap`, `wordCountTap`, `emojiCountTap`, `letterCountTap`, `avoidTap`, `tapIfEmoji`.
- En `wordCountTap`, el jugador debe contar las palabras de `buttonText`; no escribas el número explícitamente ni pistas obvias como “cuatro palabras”.
- En `emojiCountTap`, pon varios emojis iguales mezclados con señuelos y define `emoji` con el símbolo que hay que contar.
- En `letterCountTap`, usa frases cortas y define `letter`; evita decir “cuenta la letra A” si eso hace demasiado evidente el resultado.
- En `multiTap`, usa `targetTaps`, pero el texto puede ser una pista indirecta, por ejemplo “un toque por estación” con `targetTaps: 4`.
- En `tapIfEmoji`, usa cualquier emoji objetivo imaginativo: 🔥, 🗝️, 🧊, 🐙, ⚡, 🧠, 🧨, 👁️, 🐭, etc. No te limites al ratón.
- Puedes crear trampas donde `buttonText` diga “No pulses” pero aparezca el emoji objetivo; en ese caso debe ser `tapIfEmoji`, porque el símbolo manda sobre el texto.
- Puedes crear señuelos con emojis parecidos usando `avoidTap`; si no aparece el emoji objetivo exacto, no se pulsa.
- Alterna pruebas: una de esperar, una de no pulsar, una de contar, una de símbolo o reacción.
- Usa `timeLimit` entre 3000 y 8000 milisegundos.
- Para `waitThenTap`, añade `readyText` y `waitTime`.
- No añadas explicaciones fuera del JSON.
```

## Despliegue

El workflow `.github/workflows/pages.yml` construye `dist/` y lo publica en GitHub Pages al hacer push a `main`.

La configuración de Vite usa `base` compatible con Pages durante GitHub Actions y rutas relativas en desarrollo/local.
