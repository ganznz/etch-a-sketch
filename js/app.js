// -- ELEMENTS -- //
const gridSizeInput = document.querySelector(".grid-size-input");
const generateGridButton = document.querySelector(".generate-grid-button");
const gridContainer = document.querySelector(".drawing-pad-container");
const toggleGridButton = document.querySelector(".grid-toggle-button");
const toggleDrawMethodButton = document.querySelector(".hover-toggle-button");
const toggleRainbowModeButton = document.querySelector(".rainbow-mode-button");
const toggleEraserModeButton = document.querySelector(".eraser-mode-button");
const clearGridButton = document.querySelector(".clear-button");


// -- VARIABLES -- //
drawingMethodVal = true; // hover to draw by default



let gridSizeInputVal = 5;
let totalGridSquares = gridSizeInputVal * gridSizeInputVal;
// get grid size
const getGridSizeInputVal = e => { 
    gridSizeInputVal = e.target.value;
    totalGridSquares = e.target.value * e.target.value;
}
gridSizeInput.addEventListener("change", getGridSizeInputVal);


const generateGrid = (squaresPerRow, totalSquareAmount) => {
    for (let i = 0; i < totalSquareAmount; i++) {
        const div = document.createElement("div");

        gridContainer.style.gridTemplateRows = `repeat(${squaresPerRow}, 1fr)`;
        gridContainer.style.gridTemplateColumns = `repeat(${squaresPerRow}, 1fr)`;

        gridContainer.appendChild(div);
    };
};


const clearGrid = () => {
    const allGridSquares = document.querySelectorAll(".drawing-pad-container div");
    allGridSquares.forEach(square => {
        square.remove();
    })
};

// if drawingMethodVal = true
const hoverDrawingMethod = (e) => {
    e.target.style.backgroundColor = "red";
}

// if drawingMethodVal = false
const holdDrawingMethod = (e) => {
    e.target.style.backgroundColor = "green";
}

const toggleDrawingMethod = () => {
    const allGridSquares = document.querySelectorAll(".drawing-pad-container div");
    if (drawingMethodVal) {
        allGridSquares.forEach(square => {
            square.addEventListener("mouseenter", hoverDrawingMethod)
        });
    } else {
        gridContainer.addEventListener("mousedown", () => {
            console.log("mouse down");
            allGridSquares.forEach(square => {
                square.setAttribute("ondragstart", "return false;");
                square.addEventListener("mouseenter", e => {
                    e.target.style.backgroundColor = "red";
                })
            });
        })
        gridContainer.addEventListener("mouseup", () => {
            console.log("mouse up");
            allGridSquares.forEach(square => {
                const bgColor = square.style.backgroundColor;
                square.addEventListener("mouseenter", e => {
                    e.target.style.backgroundColor = bgColor;
                })
            });
        })
    }
}


// changes drawingMethodVal bool value
toggleDrawMethodButton.addEventListener("click", (e) => {
    if (drawingMethodVal) {
        drawingMethodVal = false;
        e.target.textContent = "Hover to draw";
    } else {
        drawingMethodVal = true;
        e.target.textContent = "Hold to draw";
    }
    clearGrid();
    generateGrid(gridSizeInputVal, totalGridSquares);
    toggleDrawingMethod();
});


// generates new grid after clicking "Generate" button
generateGridButton.addEventListener("click", () => {
    clearGrid();
    generateGrid(gridSizeInputVal, totalGridSquares);
    toggleDrawingMethod();
});
