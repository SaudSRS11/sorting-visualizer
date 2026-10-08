export function generateRandomArray(size) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * 100) + 1
  );
}

export function getAllIndices(length) {
  return Array.from({ length }, (_, index) => index);
}

export function getRangeIndices(start, end) {
  return Array.from(
    { length: Math.max(0, end - start + 1) },
    (_, offset) => start + offset
  );
}

export function swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}
