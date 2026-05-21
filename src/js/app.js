import '../css/main.css';
import levels from '../data/levels.json';
import { PressureGame } from './game/engine.js';
import { createInitialState } from './game/state.js';
import { query } from './utils/dom.js';

const elements = {
  levelCurrent: query('[data-level-current]'),
  levelTotal: query('[data-level-total]'),
  lives: query('[data-lives]'),
  time: query('[data-time]'),
  levelType: query('[data-level-type]'),
  levelTitle: query('[data-level-title]'),
  levelInstruction: query('[data-level-instruction]'),
  status: query('[data-status]'),
  memoryStrip: query('[data-memory-strip]'),
  pressureButton: query('[data-pressure-button]'),
  buttonLabel: query('[data-button-label]'),
  choiceGrid: query('[data-choice-grid]'),
  restart: query('[data-restart]'),
  next: query('[data-next]'),
  card: query('[data-card]'),
};

const game = new PressureGame({
  elements,
  state: createInitialState(levels),
});

game.start();
