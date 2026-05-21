export const animatePress = (elements) => {
  elements.pressureButton.classList.remove('is-pressed');
  window.requestAnimationFrame(() => {
    elements.pressureButton.classList.add('is-pressed');
  });
};
