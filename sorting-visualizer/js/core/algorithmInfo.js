export const algorithmInfo = {
  bubble: {
    name: "Bubble Sort",
    description:
      "Repeatedly compares adjacent values and swaps them when they are out of order.",
    time: "O(n²)",
    space: "O(1)"
  },
  selection: {
    name: "Selection Sort",
    description:
      "Finds the smallest remaining value and places it at the beginning of the unsorted section.",
    time: "O(n²)",
    space: "O(1)"
  },
  insertion: {
    name: "Insertion Sort",
    description:
      "Builds a sorted section one value at a time by inserting each value into its correct position.",
    time: "O(n²)",
    space: "O(1)"
  },
  merge: {
    name: "Merge Sort",
    description:
      "Divides the array into smaller sections, sorts them, and merges those sections back together.",
    time: "O(n log n)",
    space: "O(n)"
  },
  quick: {
    name: "Quick Sort",
    description:
      "Partitions the array around a pivot and recursively sorts the sections on either side.",
    time: "O(n log n) avg.",
    space: "O(log n) avg."
  }
};
