import { isRunActive } from "../core/state.js";
import { sleep } from "../utils/animation.js";
import { getAllIndices } from "../utils/array.js";

export async function mergeSort({
  state,
  runId,
  render,
  explain,
  getDelay
}) {
  async function merge(left, mid, right) {
    const leftPart = state.array.slice(left, mid + 1);
    const rightPart = state.array.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    render({ range: [left, right] });
    explain(
      `Merging sorted ranges ${left}–${mid} and ${mid + 1}–${right}.`
    );

    if (!await sleep(getDelay(), () => isRunActive(runId))) return false;

    while (i < leftPart.length && j < rightPart.length) {
      if (!isRunActive(runId)) return false;

      const leftIndex = left + i;
      const rightIndex = mid + 1 + j;

      render({
        compare: [leftIndex, rightIndex],
        range: [left, right]
      });

      explain(
        `Comparing ${leftPart[i]} and ${rightPart[j]} to choose the next smallest value.`
      );

      if (!await sleep(getDelay(), () => isRunActive(runId))) return false;

      if (leftPart[i] <= rightPart[j]) {
        state.array[k] = leftPart[i];
        i++;
      } else {
        state.array[k] = rightPart[j];
        j++;
      }

      render({
        swap: [k],
        range: [left, right]
      });

      explain(
        `Writing ${state.array[k]} into index ${k} of the merged section.`
      );

      if (!await sleep(getDelay(), () => isRunActive(runId))) return false;

      k++;
    }

    while (i < leftPart.length) {
      if (!isRunActive(runId)) return false;

      state.array[k] = leftPart[i];
      render({ swap: [k], range: [left, right] });
      explain(`Copying remaining value ${leftPart[i]} into index ${k}.`);

      if (!await sleep(getDelay(), () => isRunActive(runId))) return false;

      i++;
      k++;
    }

    while (j < rightPart.length) {
      if (!isRunActive(runId)) return false;

      state.array[k] = rightPart[j];
      render({ swap: [k], range: [left, right] });
      explain(`Copying remaining value ${rightPart[j]} into index ${k}.`);

      if (!await sleep(getDelay(), () => isRunActive(runId))) return false;

      j++;
      k++;
    }

    render({ range: [left, right] });
    explain(`Range ${left}–${right} is now sorted.`);

    return await sleep(getDelay(), () => isRunActive(runId));
  }

  async function divide(left, right) {
    if (left >= right || !isRunActive(runId)) {
      return isRunActive(runId);
    }

    const mid = Math.floor((left + right) / 2);

    render({ range: [left, right] });
    explain(
      `Dividing range ${left}–${right} into ${left}–${mid} and ${mid + 1}–${right}.`
    );

    if (!await sleep(getDelay(), () => isRunActive(runId))) return false;

    if (!await divide(left, mid)) return false;
    if (!await divide(mid + 1, right)) return false;

    return merge(left, mid, right);
  }

  if (state.array.length > 1) {
    if (!await divide(0, state.array.length - 1)) return;
  }

  if (!isRunActive(runId)) return;

  render({ sorted: getAllIndices(state.array.length) });
  explain("Merge Sort complete. All divided sections have been merged into one sorted array.");
}
