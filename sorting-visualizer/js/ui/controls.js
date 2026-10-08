export function setControlsDisabled(elements, disabled) {
  elements.algorithm.disabled = disabled;
  elements.arraySize.disabled = disabled;
  elements.generateBtn.disabled = disabled;
  elements.sortBtn.disabled = disabled;
  elements.stopBtn.disabled = !disabled;
}

export function updateSpeedLabel(value, target) {
  const speed = Number(value);

  if (speed <= 33) {
    target.textContent = "Slow";
  } else if (speed <= 66) {
    target.textContent = "Medium";
  } else {
    target.textContent = "Fast";
  }
}
