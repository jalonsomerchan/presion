import '../css/main.css';
import { levelPacks } from '../data/levels.js';
import { PressureGame } from './game/engine.js';
import { createInitialState } from './game/state.js';
import { getUnlockedLevel, unlockNextLevel } from './utils/progress.js';
import { query } from './utils/dom.js';

const screens = {
  home: query('[data-screen="home"]'),
  select: query('[data-screen="select"]'),
  game: query('[data-screen="game"]'),
};

const elements = {
  levelCurrent: query('[data-level-current]'),
  levelTotal: query('[data-level-total]'),
  stageCurrent: query('[data-stage-current]'),
  stageTotal: query('[data-stage-total]'),
  lives: query('[data-lives]'),
  levelType: query('[data-level-type]'),
  levelTitle: query('[data-level-title]'),
  levelInstruction: query('[data-level-instruction]'),
  status: query('[data-status]'),
  memoryStrip: query('[data-memory-strip]'),
  pressureButton: query('[data-pressure-button]'),
  buttonLabel: query('[data-button-label]'),
  choiceGrid: query('[data-choice-grid]'),
  restart: query('[data-restart]'),
  backLevels: query('[data-back-levels]'),
  card: query('[data-card]'),
  actionRing: query('[data-action-ring]'),
  time: document.createElement('span'),
};

const levelSelect = query('[data-level-select]');
const playButton = query('[data-play]');
let game = null;
let unlockedLevel = getUnlockedLevel();

const showScreen = (screenName) => {
  Object.entries(screens).forEach(([name, screen]) => {
    screen.classList.toggle('is-hidden', name !== screenName);
  });
};

const renderLevelSelect = () => {
  levelSelect.replaceChildren();
  unlockedLevel = getUnlockedLevel();

  levelPacks.forEach((levelPack) => {
    const isLocked = levelPack.nivel > unlockedLevel;
    const button = document.createElement('button');
    button.className = 'level-card';
    button.type = 'button';
    button.disabled = isLocked;
    button.innerHTML = `
      <span>Nivel ${levelPack.nivel}</span>
      <strong>${levelPack.nombre}</strong>
      <small>${isLocked ? 'Bloqueado' : levelPack.normas}</small>
    `;
    button.addEventListener('click', () => startLevel(levelPack));
    levelSelect.append(button);
  });
};

const startLevel = (levelPack) => {
  if (game) {
    game.stop();
  }

  game = new PressureGame({
    elements,
    state: createInitialState(levelPack, levelPacks.length),
    onLevelComplete: (completedLevel) => {
      unlockedLevel = unlockNextLevel(completedLevel, levelPacks.length);
      renderLevelSelect();
      showScreen('select');
    },
  });

  showScreen('game');
  game.start();
};

playButton.addEventListener('click', () => {
  renderLevelSelect();
  showScreen('select');
});

elements.backLevels.addEventListener('click', () => {
  if (game) {
    game.stop();
  }
  renderLevelSelect();
  showScreen('select');
});

renderLevelSelect();
showScreen('home');
