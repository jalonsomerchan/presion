import { getCurrentLevel, resetRoundFlags } from './state.js';
import { renderLevel, renderResult, renderTapCount } from './render.js';
import { FAIL_MESSAGES, WIN_MESSAGES, pickMessage } from './messages.js';
import { clearGameTimers, startCountdown } from './timers.js';
import { animatePress, clearChaos, renderChaos } from './chaos.js';

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
    renderChaos({
      elements: this.elements,
      levelPack: this.state.levelPack,
      stageIndex: this.state.currentIndex,
    });

    startCountdown({
      elements: this.elements,
      state: this.state,
      duration: level.timeLimit,
      onEnd: () => this.finishStage(),
    });

    if (level.type === 'waitThenTap') {
      this.state.timerId = window.setTimeout(() => {
        this.state.ready = true;
        this.elements.buttonLabel.textContent = level.readyText ?? 'Ahora';
      }, level.waitTime);
    }
  }

  finishStage() {
    clearGameTimers(this.state);
    const level = getCurrentLevel(this.state);

    if (level.type === 'avoidTap') {
      this.state.completed ? this.failRound() : this.completeStage();
      return;
    }

    this.state.completed ? this.completeStage() : this.failRound();
  }

  handlePress() {
    animatePress(this.elements);
    const level = getCurrentLevel(this.state);

    if (level.type === 'tap' || level.type === 'tapIfEmoji') {
      this.markCompleted();
      return;
    }

    if (level.type === 'waitThenTap') {
      this.state.ready ? this.markCompleted() : this.failRound();
      return;
    }

    if (level.type === 'multiTap' || level.type === 'wordCountTap') {
      this.handleCountTap(level);
      return;
    }

    if (level.type === 'avoidTap') {
      this.state.completed = true;
      this.failRound();
    }
  }

  handleCountTap(level) {
    this.state.taps += 1;
    renderTapCount(this.elements, this.state.taps, level.targetTaps);

    if (this.state.taps === level.targetTaps) {
      this.markCompleted();
    }

    if (this.state.taps > level.targetTaps) {
      this.failRound();
    }
  }

  markCompleted() {
    if (this.state.completed) {
      this.failRound();
      return;
    }

    this.state.completed = true;
    renderResult(this.elements, 'Bien. Espera...', 'success');
  }

  completeStage() {
    renderResult(this.elements, pickMessage(WIN_MESSAGES), 'success');

    window.setTimeout(() => {
      const nextIndex = this.state.currentIndex + 1;

      if (nextIndex >= this.state.levels.length) {
        this.onLevelComplete(this.state.levelPack.nivel);
        return;
      }

      this.state.currentIndex = nextIndex;
      this.loadLevel();
    }, 550);
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
    clearChaos(this.elements);
  }
}
