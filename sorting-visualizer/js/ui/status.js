export function setStatus(elements, message, type = "idle") {
  elements.status.textContent = message;

  const colors = {
    idle: "bg-indigo-500",
    running: "bg-yellow-400",
    success: "bg-green-500",
    error: "bg-red-500"
  };

  elements.statusDot.className =
    `h-2.5 w-2.5 rounded-full ${colors[type] || colors.idle}`;
}
