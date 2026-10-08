import { isRunActive } from "../core/state.js";
import { sleep } from "../utils/animation.js";
import { getRangeIndices, getAllIndices } from "../utils/array.js";

export async function selectionSort({
  state,
  runId,
  render,
  explain,
  getDelay
}) {
  const n = state.array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    render({
      pivot: [minIndex],
      sorted: getRangeIndices(0, i - 1)
    });

    explain(
      `Starting position ${i}. Assume index ${i} contains the smallest remaining value.`
    );

    if (!await sleep(getDelay(), () => isRunActive(runId))) return;

    for (let j = i + 1; j < n; j++) {
      if (!isRunActive(runId)) return;

      render({
        compare: [minIndex, j],
        pivot: [minIndex],
        sorted: getRangeIndices(0, i - 1)
      });

      explain(
        `Comparing index ${j} (${state.array[j]}) with current minimum at index ${minIndex} (${state.array[minIndex]}).`
      );

      if (!await sleep(getDelay(), () => isRunActive(runId))) return;

      if (state.array[j] < state.array[minIndex]) {
        minIndex = j;

        render({
          pivot: [minIndex],
          sorted: getRangeIndices(0, i - 1)
        });

        explain(
          `New minimum found at index ${minIndex}: ${state.array[minIndex]}.`
        );

        if (!await sleep(getDelay(), () => isRunActive(runId))) return;
      }
    }

    if (minIndex !== i) {
      render({
        swap: [i, minIndex],
        sorted: getRangeIndices(0, i - 1)
      });

      explain(
        `Swapping index ${i} with index ${minIndex} to place ${state.array[minIndex]} into its sorted position.`
      );

      if (!await sleep(getDelay(), () => isRunActive(runId))) return;

      [state.array[i], state.array[minIndex]] =
        [state.array[minIndex], state.array[i]];
    }

    render({
      sorted: getRangeIndices(0, i)
    });

    explain(
      `Index ${i} is now sorted. The sorted section contains ${i + 1} value${i === 0 ? "" : "s"}.`
    );

    if (!await sleep(getDelay(), () => isRunActive(runId))) return;
  }

  if (!isRunActive(runId)) return;

  render({ sorted: getAllIndices(n) });
  explain("Selection Sort complete. The entire array is sorted.");
}
