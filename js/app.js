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
let holdToDrawVal = false; // hover to draw by default
let showGridVal = false; // grid hidden by default


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


const deleteGrid = () => {
    const allGridSquares = document.querySelectorAll(".drawing-pad-container div");
    allGridSquares.forEach(square => {
        square.remove();
    })
};

// if holdToDrawVal = true
const hoverDrawingMethod = (e) => {
    e.target.style.backgroundColor = "rgb(40, 40, 40)";
}

// changes holdToDrawVal bool value
toggleDrawMethodButton.addEventListener("click", (e) => {
    if (holdToDrawVal) {
        holdToDrawVal = !holdToDrawVal;
        e.target.textContent = "Hold to draw";
    } else {
        holdToDrawVal = !holdToDrawVal;
        e.target.textContent = "Hover to draw";
    }
    deleteGrid();
    generateGrid(gridSizeInputVal, totalGridSquares);
    toggleDrawingMethod();
    toggleShowGrid(e);
});

const toggleDrawingMethod = () => {
    const allGridSquares = document.querySelectorAll(".drawing-pad-container div");
    if (!holdToDrawVal) {
        allGridSquares.forEach(square => {
            square.addEventListener("mouseenter", hoverDrawingMethod);
        });
    } else {
        gridContainer.addEventListener("mousedown", () => {
            console.log("mouse down");
            allGridSquares.forEach(square => {
                square.setAttribute("ondragstart", "return false;");
                square.addEventListener("mouseenter", e => {
                    e.target.style.backgroundColor = "rgb(40, 40, 40)";
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

const toggleShowGrid = (e) => {
    const allGridSquares = document.querySelectorAll(".drawing-pad-container div");

    if (e.target.classList.contains("grid-toggle-button")) {
        console.log("helo")
        if (showGridVal === false) { // clicking shows grid
            showGridVal = !showGridVal;
            toggleGridButton.textContent = "Hide grid";
        } else { // clicking hides grid
            toggleGridButton.textContent = "Show grid";
            showGridVal = !showGridVal;
        }
    }

    if (showGridVal === true) {
        allGridSquares.forEach(square => {
            square.classList.add("drawing-pad-square");
        })
    } else {
        allGridSquares.forEach(square => {
            square.classList.remove("drawing-pad-square");
        })
    }
}


toggleGridButton.addEventListener("click", toggleShowGrid);


// generates new grid after clicking "Generate" button
generateGridButton.addEventListener("click", (e) => {
    deleteGrid();
    generateGrid(gridSizeInputVal, totalGridSquares);
    toggleDrawingMethod();
    toggleShowGrid(e);
});