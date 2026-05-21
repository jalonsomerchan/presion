export const WIN_MESSAGES = [
  'Nivel superado.',
  'Correcto. Siguiente reto.',
  'Has pasado esta ronda.',
];

export const FAIL_MESSAGES = [
  'Has fallado el reto.',
  'Respuesta incorrecta.',
  'Vuelve a intentarlo.',
];

export const pickMessage = (messages) => messages[Math.floor(Math.random() * messages.length)];
