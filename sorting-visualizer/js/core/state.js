export const state = {
  array: [],
  isSorting: false,
  animationId: 0,
  operationCount: 0
};

export function startNewRun() {
  state.animationId += 1;
  return state.animationId;
}

export function cancelCurrentRun() {
  state.animationId += 1;
  state.isSorting = false;
}

export function isRunActive(runId) {
  return runId === state.animationId;
}
