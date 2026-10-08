import { isRunActive } from "../core/state.js";
import { sleep } from "../utils/animation.js";
import { getAllIndices } from "../utils/array.js";

export async function quickSort({
  state,
  runId,
  render,
  explain,
  getDelay
}) {
  const sortedIndices = new Set();

  async function partition(low, high) {
    const pivotValue = state.array[high];

    render({
      pivot: [high],
      range: [low, high],
      sorted: [...sortedIndices]
    });

    explain(
      `Choosing ${pivotValue} at index ${high} as the pivot for range ${low}–${high}.`
    );

    if (!await sleep(getDelay(), () => isRunActive(runId))) return null;

    let i = low;

    for (let j = low; j < high; j++) {
      if (!isRunActive(runId)) return null;

      render({
        compare: [j],
        pivot: [high],
        range: [low, high],
        sorted: [...sortedIndices]
      });

      explain(
        `Comparing index ${j} (${state.array[j]}) with pivot ${pivotValue}.`
      );

      if (!await sleep(getDelay(), () => isRunActive(runId))) return null;

      if (state.array[j] < pivotValue) {
        if (i !== j) {
          render({
            swap: [i, j],
            pivot: [high],
            range: [low, high],
            sorted: [...sortedIndices]
          });

          explain(
            `${state.array[j]} is smaller than the pivot, so move it into the left partition at index ${i}.`
          );

          if (!await sleep(getDelay(), () => isRunActive(runId))) return null;

          [state.array[i], state.array[j]] =
            [state.array[j], state.array[i]];
        }

        i++;
      }
    }

    if (i !== high) {
      render({
        swap: [i, high],
        pivot: [high],
        range: [low, high],
        sorted: [...sortedIndices]
      });

      explain(
        `Placing the pivot at index ${i}, separating smaller values from larger values.`
      );

      if (!await sleep(getDelay(), () => isRunActive(runId))) return null;

      [state.array[i], state.array[high]] =
        [state.array[high], state.array[i]];
    }

    sortedIndices.add(i);

    render({
      pivot: [i],
      range: [low, high],
      sorted: [...sortedIndices]
    });

    explain(
      `Pivot ${state.array[i]} is fixed at index ${i}. It is now in its final sorted position.`
    );

    if (!await sleep(getDelay(), () => isRunActive(runId))) return null;

    return i;
  }

  async function partitionRange(low, high) {
    if (!isRunActive(runId) || low >= high) {
      if (low === high && low >= 0) sortedIndices.add(low);
      return true;
    }

    const pivotIndex = await partition(low, high);

    if (pivotIndex === null) return false;

    if (!await partitionRange(low, pivotIndex - 1)) return false;
    if (!await partitionRange(pivotIndex + 1, high)) return false;

    return true;
  }

  if (state.array.length > 0) {
    if (!await partitionRange(0, state.array.length - 1)) return;
  }

  if (!isRunActive(runId)) return;

  render({ sorted: getAllIndices(state.array.length) });
  explain("Quick Sort complete. All pivot positions are finalized and the array is sorted.");
}
