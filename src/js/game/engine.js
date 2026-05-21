import { getCurrentLevel, resetRoundFlags } from './state.js';
import { renderLevel, renderResult } from './render.js';
import { FAIL_MESSAGES, WIN_MESSAGES, pickMessage } from './messages.js';
import { clearGameTimers, startCountdown } from './timers.js';

export class PressureGame {
  constructor({ elements, state }) {
    this.elements = elements;
    this.state = state;
  }

  start() {
    this.bindControls();
    this.loadLevel();
  }

  bindControls() {
    this.elements.pressureButton.addEventListener('click', () => this.handlePress());
    this.elements.restart.addEventListener('click', () => this.restart());
    this.elements.next.addEventListener('click', () => this.winRound());
  }

  loadLevel() {
    clearGameTimers(this.state);
    this.state = resetRoundFlags(this.state);
    const level = getCurrentLevel(this.state);

    renderLevel({
      elements: this.elements,
      level,
      state: this.state,
      onChoice: (choice) => this.handleChoice(choice),
    });

    startCountdown({
      elements: this.elements,
      state: this.state,
      duration: level.timeLimit,
      onEnd: () => (level.type === 'avoidTap' ? this.winRound() : this.failRound()),
    });

    if (level.type === 'waitThenTap') {
      this.state.timerId = window.setTimeout(() => {
        this.state.ready = true;
        this.elements.buttonLabel.textContent = level.readyLabel ?? 'ahora';
        renderResult(this.elements, 'Ahora sí.', 'warning');
      }, level.waitTime);
    }
  }

  handlePress() {
    const level = getCurrentLevel(this.state);

    if (level.type === 'tap') {
      this.winRound();
      return;
    }

    if (level.type === 'waitThenTap') {
      if (this.state.ready) {
        this.winRound();
        return;
      }

      this.failRound();
      return;
    }

    if (level.type === 'multiTap') {
      this.state.taps += 1;
      renderResult(this.elements, `${this.state.taps}/${level.targetTaps} pulsaciones`, 'warning');

      if (this.state.taps === level.targetTaps) {
        this.winRound();
      }

      if (this.state.taps > level.targetTaps) {
        this.failRound();
      }
      return;
    }

    if (level.type === 'avoidTap') {
      this.failRound();
    }
  }

  handleChoice(choice) {
    const level = getCurrentLevel(this.state);

    if (level.type === 'choice') {
      if (choice === level.answer) {
        this.winRound();
        return;
      }

      this.failRound();
      return;
    }

    if (level.type === 'memory') {
      this.handleMemoryChoice(choice, level);
    }
  }

  handleMemoryChoice(choice, level) {
    const expected = level.sequence[this.state.memoryIndex];

    if (choice !== expected) {
      this.failRound();
      return;
    }

    this.state.memoryIndex += 1;
    renderResult(this.elements, `${this.state.memoryIndex}/${level.sequence.length}`, 'warning');

    if (this.state.memoryIndex === level.sequence.length) {
      this.winRound();
    }
  }

  winRound() {
    clearGameTimers(this.state);
    renderResult(this.elements, pickMessage(WIN_MESSAGES), 'success');

    window.setTimeout(() => {
      this.state.currentIndex = (this.state.currentIndex + 1) % this.state.levels.length;
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
}
