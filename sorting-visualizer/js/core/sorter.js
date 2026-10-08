import { bubbleSort } from "../algorithms/bubbleSort.js";
import { selectionSort } from "../algorithms/selectionSort.js";
import { insertionSort } from "../algorithms/insertionSort.js";
import { mergeSort } from "../algorithms/mergeSort.js";
import { quickSort } from "../algorithms/quickSort.js";

const algorithms = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort
};

export async function runAlgorithm(name, context) {
  const algorithm = algorithms[name];

  if (!algorithm) {
    throw new Error(`Unknown algorithm: ${name}`);
  }

  await algorithm(context);
}
