export const query = (selector, scope = document) => {
  const element = scope.querySelector(selector);

  if (!element) {
    throw new Error(`No se encontró el elemento ${selector}`);
  }

  return element;
};

export const clearChildren = (element) => {
  element.replaceChildren();
};
