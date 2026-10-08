export function renderBars(array, chart, {
  compare = [],
  swap = [],
  pivot = [],
  sorted = [],
  range = []
} = {}) {
  chart.innerHTML = "";

  if (!array.length) return;

  const maxValue = Math.max(...array, 1);

  array.forEach((value, index) => {
    const item = document.createElement("div");
    const barArea = document.createElement("div");
    const bar = document.createElement("div");
    const valueLabel = document.createElement("span");

    let color = "bg-indigo-600";

    if (range.length === 2 && (index < range[0] || index > range[1])) {
      color = "bg-gray-700";
    }

    if (sorted.includes(index)) color = "bg-green-500";
    if (compare.includes(index)) color = "bg-yellow-400";
    if (swap.includes(index)) color = "bg-red-500";
    if (pivot.includes(index)) color = "bg-purple-500";

    item.className = "bar-item";
    barArea.className = "bar-area";
    bar.className = `bar ${color}`;
    bar.style.height = `${Math.max(2, (value / maxValue) * 100)}%`;

    valueLabel.className = "bar-value-label";
    valueLabel.textContent = value;

    item.setAttribute("title", `Index ${index}: ${value}`);
    item.setAttribute("aria-label", `Index ${index}, value ${value}`);

    barArea.appendChild(bar);
    item.appendChild(barArea);
    item.appendChild(valueLabel);
    chart.appendChild(item);
  });
}
