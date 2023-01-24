"use strict";

let columns = 16;
let hasGridChanged = false;

function addHoverEffect(node) {
  node.addEventListener("mouseenter", (e) => {
    e.target.style.backgroundColor = "var(--test-c2)";
  });
}

function setSquareWidth(grid) {
  const firetChild = grid.firstChild;
  const firstChildWidth = firetChild.offsetWidth;
  grid.style.gridAutoRows = `minmax(${firstChildWidth}px, auto)`;
}

function initialSetup(columns) {
  if (!hasGridChanged) {
    const buttonConfig = document.createElement("button");
    buttonConfig.textContent = "Click here to change sketchpad size";
    buttonConfig.style.padding = "20px";
    buttonConfig.addEventListener("click", (e) => {
      const res = prompt("Enter the new size of the sketchpad:");
      if (!isNaN(res) && res <= 100 && res > 0) {
        hasGridChanged = true;
        initialSetup(res);
      } else {
        alert("Please enter a valid number between 0 and 100!");
      }
    });

    const buttonContainer = document.querySelector(".config");
    buttonContainer.appendChild(buttonConfig);
  }

  if (hasGridChanged) {
    document.querySelector(".grid-container").remove();

    const newGrid = document.createElement("div");
    newGrid.className = "grid-container";
    document.body.appendChild(newGrid);
  }

  const gridContainer = document.querySelector(".grid-container");
  gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  for (let i = 0; i < columns * columns; i++) {
    const testDiv = document.createElement("div");
    testDiv.style.backgroundColor = "var(--test-c1)";
    gridContainer.appendChild(testDiv);

    addHoverEffect(testDiv);
  }

  setSquareWidth(gridContainer);

  window.addEventListener("resize", (e) => setSquareWidth(gridContainer));
}

initialSetup(columns);
