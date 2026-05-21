export const createInitialState = (levels) => ({
  currentIndex: 0,
  lives: 3,
  levels,
  status: 'playing',
  taps: 0,
  memoryIndex: 0,
  ready: false,
  timerId: null,
  deadlineId: null,
  countdownId: null,
});

export const getCurrentLevel = (state) => state.levels[state.currentIndex];

export const resetRoundFlags = (state) => ({
  ...state,
  taps: 0,
  memoryIndex: 0,
  ready: false,
  status: state.lives > 0 ? 'playing' : 'lost',
});
