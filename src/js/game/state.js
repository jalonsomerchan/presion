export const createInitialState = (levelPack, totalLevels) => ({
  currentIndex: 0,
  levelPack,
  levels: levelPack.etapas,
  totalLevels,
  lives: 3,
  status: 'playing',
  taps: 0,
  completed: false,
  ready: false,
  timerId: null,
  deadlineId: null,
  countdownId: null,
});

export const getCurrentLevel = (state) => state.levels[state.currentIndex];

export const resetRoundFlags = (state) => ({
  ...state,
  taps: 0,
  completed: false,
  ready: false,
  status: state.lives > 0 ? 'playing' : 'lost',
});
