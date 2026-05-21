import { renderTime } from './render.js';

export const clearGameTimers = (state) => {
  window.clearTimeout(state.timerId);
  window.clearTimeout(state.deadlineId);
  window.clearInterval(state.countdownId);
};

export const startCountdown = ({ elements, state, duration, onEnd }) => {
  const endAt = Date.now() + duration;
  renderTime(elements, duration);

  state.countdownId = window.setInterval(() => {
    renderTime(elements, endAt - Date.now());
  }, 100);

  state.deadlineId = window.setTimeout(onEnd, duration);
};
