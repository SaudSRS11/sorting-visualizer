import { isRunActive } from "../core/state.js";
import { sleep } from "../utils/animation.js";
import { getAllIndices } from "../utils/array.js";

export async function bubbleSort({
  state,
  runId,
  render,
  explain,
  getDelay
}) {
  const n = state.array.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (!isRunActive(runId)) return;

      render({ compare: [j, j + 1] });
      explain(
        `Comparing index ${j} (${state.array[j]}) and index ${j + 1} (${state.array[j + 1]}).`
      );

      if (!await sleep(getDelay(), () => isRunActive(runId))) return;

      if (state.array[j] > state.array[j + 1]) {
        render({ swap: [j, j + 1] });
        explain(
          `Swapping index ${j} and ${j + 1} because ${state.array[j]} is greater than ${state.array[j + 1]}.`
        );

        if (!await sleep(getDelay(), () => isRunActive(runId))) return;

        [state.array[j], state.array[j + 1]] =
          [state.array[j + 1], state.array[j]];

        swapped = true;
        render({ swap: [j, j + 1] });

        if (!await sleep(getDelay(), () => isRunActive(runId))) return;
      }
    }

    if (!isRunActive(runId)) return;

    render({
      sorted: getAllIndices(n).slice(n - i - 1)
    });

    explain(
      `The largest remaining value has reached index ${n - i - 1}, so that position is sorted.`
    );

    if (!await sleep(getDelay(), () => isRunActive(runId))) return;

    if (!swapped) {
      explain("No swaps occurred in this pass, so the array is already sorted.");
      break;
    }
  }

  if (!isRunActive(runId)) return;

  render({ sorted: getAllIndices(n) });
  explain("Bubble Sort complete. The entire array is sorted.");
}
