export function getDelay(speedValue) {
  const speed = Number(speedValue);
  return Math.max(10, 510 - speed * 5);
}

export function sleep(ms, isActive = () => true) {
  return new Promise(resolve => {
    setTimeout(() => resolve(isActive()), ms);
  });
}
