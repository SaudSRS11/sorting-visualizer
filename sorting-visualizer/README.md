# Sorting Algorithm Visualizer

A modular browser-based sorting visualizer built with:

- HTML
- CSS
- Vanilla JavaScript ES modules
- Tailwind CSS CDN

## Features

- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Animated comparisons and swaps
- Pivot/key highlighting
- Sorted-section highlighting
- Live step-by-step explanations
- Time and space complexity display
- Adjustable array size from 10 to 100
- Adjustable animation speed
- Generate/reset while an animation is running
- Responsive layout
- Modular algorithm files

## Project structure

```text
sorting-visualizer/
├── index.html
├── css/
│   ├── styles.css
│   └── components.css
├── js/
│   ├── main.js
│   ├── algorithms/
│   │   ├── bubbleSort.js
│   │   ├── selectionSort.js
│   │   ├── insertionSort.js
│   │   ├── mergeSort.js
│   │   └── quickSort.js
│   ├── core/
│   │   ├── state.js
│   │   ├── sorter.js
│   │   └── algorithmInfo.js
│   ├── ui/
│   │   ├── controls.js
│   │   ├── renderer.js
│   │   ├── explanationPanel.js
│   │   └── status.js
│   └── utils/
│       ├── animation.js
│       ├── array.js
│       └── dom.js
└── README.md
```

## Running locally

Because the project uses ES modules, open it through a local web server rather than using `file://`.

### Option 1: Python

From the project folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Option 2: VS Code

Install the Live Server extension, right-click `index.html`, and choose **Open with Live Server**.

## Architecture

`main.js` coordinates the application.

The files in `algorithms/` contain sorting logic and never directly manipulate the DOM.

`core/` contains application state, algorithm metadata, and algorithm dispatching.

`ui/` contains rendering and panel/control logic.

`utils/` contains reusable helpers for animation timing and array operations.

## Adding an algorithm

1. Create a new module under `js/algorithms/`.
2. Export an async sorting function.
3. Use the context supplied by `sorter.js`:
   - `state`
   - `runId`
   - `render()`
   - `explain()`
   - `getDelay()`
4. Register the algorithm in `js/core/sorter.js`.
5. Add its option to `index.html`.
6. Add its complexity/description to `js/core/algorithmInfo.js`.
