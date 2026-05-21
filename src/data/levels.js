const modules = import.meta.glob('./nivel-*.json', { eager: true });

export const levelPacks = Object.values(modules)
  .map((module) => module.default)
  .sort((firstLevel, secondLevel) => firstLevel.nivel - secondLevel.nivel);
