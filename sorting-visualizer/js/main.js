import { state, startNewRun, cancelCurrentRun, isRunActive } from "./core/state.js";
import { algorithmInfo } from "./core/algorithmInfo.js";
import { runAlgorithm } from "./core/sorter.js";
import { generateRandomArray } from "./utils/array.js";
import { getDelay } from "./utils/animation.js";
import { $ } from "./utils/dom.js";
import { renderBars } from "./ui/renderer.js";
import { createExplanationPanel } from "./ui/explanationPanel.js";
import { setStatus } from "./ui/status.js";
import { setControlsDisabled, updateSpeedLabel } from "./ui/controls.js";

const elements = {
  algorithm: $("#algorithm"),
  algorithmLabel: $("#algorithmLabel"),
  arraySize: $("#arraySize"),
  arraySizeValue: $("#arraySizeValue"),
  speed: $("#speed"),
  speedValue: $("#speedValue"),
  generateBtn: $("#generateBtn"),
  sortBtn: $("#sortBtn"),
  stopBtn: $("#stopBtn"),
  chart: $("#chart"),
  status: $("#status"),
  statusDot: $("#statusDot"),
  arrayLength: $("#arrayLength"),
  algorithmDescription: $("#algorithmDescription"),
  stepExplanation: $("#stepExplanation"),
  timeComplexity: $("#timeComplexity"),
  spaceComplexity: $("#spaceComplexity"),
  operationCount: $("#operationCount")
};

const panel = createExplanationPanel(elements);

function updateArrayLabels() {
  const size = state.array.length;
  elements.arraySizeValue.textContent = String(size);
  elements.arrayLength.textContent = `${size} value${size === 1 ? "" : "s"}`;
}

function updateAlgorithm() {
  const info = algorithmInfo[elements.algorithm.value];

  if (!info) return;

  panel.updateAlgorithmInfo(info);
  panel.resetExplanation();
  setStatus(elements, "Ready", "idle");
}

function generateArray() {
  startNewRun();
  state.isSorting = false;

  state.array = generateRandomArray(Number(elements.arraySize.value));

  renderBars(state.array, elements.chart);
  updateArrayLabels();
  panel.resetExplanation();
  setStatus(elements, "Ready", "idle");
  setControlsDisabled(elements, false);
}

function stopSorting() {
  if (!state.isSorting) return;

  cancelCurrentRun();
  renderBars(state.array, elements.chart);
  panel.explain("Sorting stopped. The array is left in its current state so you can inspect the result.");
  setStatus(elements, "Stopped", "idle");
  setControlsDisabled(elements, false);
}

async function sortArray() {
  if (state.isSorting || state.array.length === 0) return;

  state.isSorting = true;
  const runId = startNewRun();

  setControlsDisabled(elements, true);
  elements.speed.disabled = false;
  setStatus(elements, "Sorting...", "running");

  try {
    await runAlgorithm(elements.algorithm.value, {
      state,
      runId,
      render: visualState => {
        if (isRunActive(runId)) {
          renderBars(state.array, elements.chart, visualState);
        }
      },
      explain: message => {
        if (isRunActive(runId)) {
          panel.explain(message);
        }
      },
      getDelay: () => getDelay(elements.speed.value)
    });

    if (isRunActive(runId)) {
      setStatus(elements, "Sorted", "success");
    }
  } catch (error) {
    console.error(error);

    if (isRunActive(runId)) {
      setStatus(elements, "Something went wrong", "error");
      panel.explain("The algorithm stopped because an unexpected error occurred.");
    }
  } finally {
    if (isRunActive(runId)) {
      state.isSorting = false;
      setControlsDisabled(elements, false);
    }
  }
}

elements.algorithm.addEventListener("change", updateAlgorithm);

elements.arraySize.addEventListener("input", () => {
  elements.arraySizeValue.textContent = elements.arraySize.value;
  generateArray();
});

elements.speed.addEventListener("input", () => {
  updateSpeedLabel(elements.speed.value, elements.speedValue);
});

elements.generateBtn.addEventListener("click", generateArray);
elements.sortBtn.addEventListener("click", sortArray);
elements.stopBtn.addEventListener("click", stopSorting);

updateSpeedLabel(elements.speed.value, elements.speedValue);
updateAlgorithm();
generateArray();
