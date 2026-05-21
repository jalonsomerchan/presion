const GHOST_TEXTS = ['pulsa', 'no pulses', 'ahora', 'otra vez', '🐭', '🐱'];

const getIntensity = (levelNumber) => Math.max(0, levelNumber - 1);

const createGhost = (index) => {
  const ghost = document.createElement('span');
  ghost.className = 'chaos-ghost';
  ghost.textContent = GHOST_TEXTS[index % GHOST_TEXTS.length];
  ghost.style.setProperty('--x', `${12 + ((index * 23) % 72)}%`);
  ghost.style.setProperty('--y', `${10 + ((index * 37) % 78)}%`);
  ghost.style.setProperty('--delay', `${index * 120}ms`);
  return ghost;
};

const createFakeButton = (index) => {
  const button = document.createElement('span');
  button.className = 'fake-button';
  button.textContent = index % 2 === 0 ? 'pulsa' : 'no';
  button.style.setProperty('--x', `${8 + ((index * 31) % 78)}%`);
  button.style.setProperty('--y', `${15 + ((index * 29) % 70)}%`);
  button.style.setProperty('--delay', `${index * 170}ms`);
  return button;
};

export const renderChaos = ({ elements, levelPack, stageIndex }) => {
  elements.chaosLayer.replaceChildren();
  const intensity = getIntensity(levelPack.nivel);
  elements.arena.dataset.chaos = intensity > 0 ? String(intensity) : '0';

  if (intensity === 0) {
    return;
  }

  const ghostCount = Math.min(7, intensity + stageIndex + 1);
  const fakeButtonCount = Math.min(4, intensity);

  for (let index = 0; index < ghostCount; index += 1) {
    elements.chaosLayer.append(createGhost(index));
  }

  for (let index = 0; index < fakeButtonCount; index += 1) {
    elements.chaosLayer.append(createFakeButton(index));
  }
};

export const clearChaos = (elements) => {
  elements.chaosLayer.replaceChildren();
  elements.arena.dataset.chaos = '0';
};

export const animatePress = (elements) => {
  elements.pressureButton.classList.remove('is-pressed');
  window.requestAnimationFrame(() => {
    elements.pressureButton.classList.add('is-pressed');
  });
};
