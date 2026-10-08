import { state } from "../core/state.js";

export function createExplanationPanel(elements) {
  function explain(message) {
    elements.stepExplanation.textContent = message;
    state.operationCount += 1;
    elements.operationCount.textContent = String(state.operationCount);
  }

  function resetExplanation() {
    state.operationCount = 0;
    elements.operationCount.textContent = "0";
    elements.stepExplanation.textContent = "Ready to sort.";
  }

  function updateAlgorithmInfo(info) {
    elements.algorithmLabel.textContent = info.name;
    elements.algorithmDescription.textContent = info.description;
    elements.timeComplexity.textContent = info.time;
    elements.spaceComplexity.textContent = info.space;
  }

  return {
    explain,
    resetExplanation,
    updateAlgorithmInfo
  };
}
