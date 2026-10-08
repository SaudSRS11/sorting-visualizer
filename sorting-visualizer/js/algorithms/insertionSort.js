import { isRunActive } from "../core/state.js";
import { sleep } from "../utils/animation.js";
import { getRangeIndices, getAllIndices } from "../utils/array.js";

export async function insertionSort({
  state,
  runId,
  render,
  explain,
  getDelay
}) {
  const n = state.array.length;

  if (n === 0) return;

  render({ sorted: [0] });
  explain("The first value is treated as a one-element sorted section.");

  if (!await sleep(getDelay(), () => isRunActive(runId))) return;

  for (let i = 1; i < n; i++) {
    if (!isRunActive(runId)) return;

    const key = state.array[i];
    let j = i - 1;

    render({
      pivot: [i],
      sorted: getRangeIndices(0, i - 1)
    });

    explain(
      `Taking ${key} from index ${i} as the key and inserting it into the sorted section.`
    );

    if (!await sleep(getDelay(), () => isRunActive(runId))) return;

    while (j >= 0 && state.array[j] > key) {
      if (!isRunActive(runId)) return;

      render({
        compare: [j, j + 1],
        pivot: [i],
        sorted: getRangeIndices(0, j - 1)
      });

      explain(
        `Comparing ${state.array[j]} at index ${j} with key ${key}. The value is larger, so it must move right.`
      );

      if (!await sleep(getDelay(), () => isRunActive(runId))) return;

      state.array[j + 1] = state.array[j];

      render({
        swap: [j, j + 1],
        pivot: [i],
        sorted: getRangeIndices(0, j - 1)
      });

      explain(
        `Moving ${state.array[j + 1]} one position to the right to make room for ${key}.`
      );

      if (!await sleep(getDelay(), () => isRunActive(runId))) return;

      j--;
    }

    state.array[j + 1] = key;

    render({
      sorted: getRangeIndices(0, i),
      pivot: [j + 1]
    });

    explain(`Inserted ${key} at index ${j + 1}. The sorted section has grown.`);

    if (!await sleep(getDelay(), () => isRunActive(runId))) return;
  }

  if (!isRunActive(runId)) return;

  render({ sorted: getAllIndices(n) });
  explain("Insertion Sort complete. The entire array is sorted.");
}
