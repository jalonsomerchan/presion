import { clearChildren } from '../utils/dom.js';

const createChoiceButton = (choice, onChoice) => {
  const button = document.createElement('button');
  button.className = 'choice-button';
  button.type = 'button';
  button.textContent = choice;
  button.addEventListener('click', () => onChoice(choice));
  return button;
};

export const renderLevel = ({ elements, level, state, onChoice }) => {
  elements.levelCurrent.textContent = String(state.currentIndex + 1);
  elements.levelTotal.textContent = String(state.levels.length);
  elements.lives.textContent = '●'.repeat(state.lives) || '0';
  elements.levelType.textContent = level.type;
  elements.levelTitle.textContent = level.title;
  elements.levelInstruction.textContent = level.instruction;
  elements.buttonLabel.textContent = level.buttonLabel ?? 'pulsa';
  elements.status.textContent = 'El nivel ya está activo.';
  elements.card.dataset.mode = level.type;
  elements.card.dataset.result = 'neutral';
  elements.pressureButton.disabled = level.type === 'choice' || level.type === 'memory';

  clearChildren(elements.choiceGrid);
  clearChildren(elements.memoryStrip);

  if (level.sequence) {
    level.sequence.forEach((item) => {
      const badge = document.createElement('span');
      badge.className = 'memory-badge';
      badge.textContent = item;
      elements.memoryStrip.append(badge);
    });
  }

  if (level.choices) {
    level.choices.forEach((choice) => {
      elements.choiceGrid.append(createChoiceButton(choice, onChoice));
    });
  }
};

export const renderResult = (elements, message, variant) => {
  elements.status.textContent = message;
  elements.card.dataset.result = variant;
};

export const renderTime = (elements, milliseconds) => {
  const seconds = Math.max(0, milliseconds / 1000);
  elements.time.textContent = `${seconds.toFixed(1)}s`;
};
