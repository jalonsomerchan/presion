import { clearChildren } from '../utils/dom.js';

const createChoiceButton = (choice, onChoice) => {
  const button = document.createElement('button');
  button.className = 'choice-button';
  button.type = 'button';
  button.textContent = choice;
  button.addEventListener('click', () => onChoice(choice));
  return button;
};

const usesChoices = (level) => level.type === 'choice' || level.type === 'memory';

export const renderLevel = ({ elements, level, state, onChoice }) => {
  elements.levelCurrent.textContent = String(state.levelPack.nivel);
  elements.levelTotal.textContent = String(state.totalLevels);
  elements.stageCurrent.textContent = String(state.currentIndex + 1);
  elements.stageTotal.textContent = String(state.levels.length);
  elements.lives.textContent = '●'.repeat(state.lives) || '0';
  elements.levelType.textContent = state.levelPack.nombre;
  elements.levelTitle.textContent = level.title;
  elements.levelInstruction.textContent = level.instruction;
  elements.buttonLabel.textContent = level.buttonLabel ?? 'pulsa';
  elements.status.textContent = state.levelPack.normas;
  elements.card.dataset.mode = level.type;
  elements.card.dataset.result = 'neutral';
  elements.actionRing.dataset.variant = usesChoices(level) ? 'choices' : 'button';
  elements.pressureButton.hidden = usesChoices(level);
  elements.pressureButton.disabled = usesChoices(level);

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

export const renderTime = (elements, milliseconds, duration) => {
  const seconds = Math.max(0, milliseconds / 1000);
  const progress = duration > 0 ? Math.max(0, Math.min(1, milliseconds / duration)) : 0;
  elements.time.textContent = `${seconds.toFixed(1)}s`;
  elements.actionRing.style.setProperty('--progress', String(progress));
};
