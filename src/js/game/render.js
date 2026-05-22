export const renderLevel = ({ elements, level }) => {
  elements.buttonLabel.textContent = level.buttonText;
  elements.status.textContent = '';
  elements.actionRing.dataset.mode = level.type;
  elements.actionRing.dataset.result = 'neutral';
  elements.actionRing.style.setProperty('--progress', '1');
  elements.pressureButton.disabled = false;
};

export const renderResult = (elements, message, variant) => {
  elements.status.textContent = message;
  elements.actionRing.dataset.result = variant;
};

export const renderSilentResult = (elements, variant) => {
  elements.status.textContent = '';
  elements.actionRing.dataset.result = variant;
};

export const renderTapCount = (elements) => {
  elements.status.textContent = '';
};

export const renderTime = (elements, milliseconds, duration) => {
  const progress = duration > 0 ? Math.max(0, Math.min(1, milliseconds / duration)) : 0;
  elements.actionRing.style.setProperty('--progress', String(progress));
};
