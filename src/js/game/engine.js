import { getCurrentLevel, resetRoundFlags } from './state.js';
import { renderLevel, renderResult, renderTapCount } from './render.js';
import { FAIL_MESSAGES, WIN_MESSAGES, pickMessage } from './messages.js';
import { clearGameTimers, startCountdown } from './timers.js';

export class PressureGame {
  constructor({ elements, state, onLevelComplete }) {
    this.elements = elements;
    this.state = state;
    this.onLevelComplete = onLevelComplete;
  }

  start() {
    this.bindControls();
    this.loadLevel();
  }

  bindControls() {
    this.elements.pressureButton.addEventListener('click', () => this.handlePress());
    this.elements.restart.addEventListener('click', () => this.restart());
  }

  loadLevel() {
    clearGameTimers(this.state);
    this.state = resetRoundFlags(this.state);
    const level = getCurrentLevel(this.state);

    renderLevel({ elements: this.elements, level });

    startCountdown({
      elements: this.elements,
      state: this.state,
      duration: level.timeLimit,
      onEnd: () => (level.type === 'avoidTap' ? this.winRound() : this.failRound()),
    });

    if (level.type === 'waitThenTap') {
      this.state.timerId = window.setTimeout(() => {
        this.state.ready = true;
        this.elements.buttonLabel.textContent = level.readyText ?? 'Ahora';
      }, level.waitTime);
    }
  }

  handlePress() {
    const level = getCurrentLevel(this.state);

    if (level.type === 'tap' || level.type === 'tapIfEmoji') {
      this.winRound();
      return;
    }

    if (level.type === 'waitThenTap') {
      this.state.ready ? this.winRound() : this.failRound();
      return;
    }

    if (level.type === 'multiTap' || level.type === 'wordCountTap') {
      this.handleCountTap(level);
      return;
    }

    if (level.type === 'avoidTap') {
      this.failRound();
    }
  }

  handleCountTap(level) {
    this.state.taps += 1;
    renderTapCount(this.elements, this.state.taps, level.targetTaps);

    if (this.state.taps === level.targetTaps) {
      this.winRound();
    }

    if (this.state.taps > level.targetTaps) {
      this.failRound();
    }
  }

  winRound() {
    clearGameTimers(this.state);
    renderResult(this.elements, pickMessage(WIN_MESSAGES), 'success');

    window.setTimeout(() => {
      const nextIndex = this.state.currentIndex + 1;

      if (nextIndex >= this.state.levels.length) {
        this.onLevelComplete(this.state.levelPack.nivel);
        return;
      }

      this.state.currentIndex = nextIndex;
      this.loadLevel();
    }, 850);
  }

  failRound() {
    clearGameTimers(this.state);
    this.state.lives -= 1;
    renderResult(this.elements, pickMessage(FAIL_MESSAGES), 'danger');

    window.setTimeout(() => {
      if (this.state.lives <= 0) {
        this.restart();
        return;
      }

      this.loadLevel();
    }, 1000);
  }

  restart() {
    clearGameTimers(this.state);
    this.state.currentIndex = 0;
    this.state.lives = 3;
    this.loadLevel();
  }

  stop() {
    clearGameTimers(this.state);
  }
}
