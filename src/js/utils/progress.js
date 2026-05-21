const STORAGE_KEY = 'presion.unlockedLevel';

export const getUnlockedLevel = () => {
  const storedValue = Number(window.localStorage.getItem(STORAGE_KEY));
  return Number.isFinite(storedValue) && storedValue > 0 ? storedValue : 1;
};

export const unlockNextLevel = (completedLevel, totalLevels) => {
  const nextLevel = Math.min(completedLevel + 1, totalLevels);
  const unlockedLevel = Math.max(getUnlockedLevel(), nextLevel);
  window.localStorage.setItem(STORAGE_KEY, String(unlockedLevel));
  return unlockedLevel;
};
