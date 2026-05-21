const countWords = (text) => text.trim().split(/\s+/u).filter(Boolean).length;

const countEmoji = (text, emoji) => [...text].filter((character) => character === emoji).length;

const countTargetLetter = (text, letter) => {
  const normalizedText = text.toLocaleLowerCase('es-ES');
  const normalizedLetter = letter.toLocaleLowerCase('es-ES');
  return [...normalizedText].filter((character) => character === normalizedLetter).length;
};

export const getTargetTaps = (level) => {
  if (level.type === 'wordCountTap') {
    return countWords(level.buttonText);
  }

  if (level.type === 'emojiCountTap') {
    return countEmoji(level.buttonText, level.emoji);
  }

  if (level.type === 'letterCountTap') {
    return countTargetLetter(level.buttonText, level.letter);
  }

  return level.targetTaps;
};

export const shouldTapOnce = (level) => level.type === 'tap' || level.type === 'tapIfEmoji';

export const shouldAvoidTap = (level) => level.type === 'avoidTap';

export const isCountTap = (level) =>
  level.type === 'multiTap' ||
  level.type === 'wordCountTap' ||
  level.type === 'emojiCountTap' ||
  level.type === 'letterCountTap';
