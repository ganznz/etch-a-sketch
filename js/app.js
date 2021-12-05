// -- ELEMENTS -- //
const gridSizeInput = document.querySelector(".grid-size-input");
const generateGridButton = document.querySelector(".generate-grid-button");
const gridContainer = document.querySelector(".drawing-pad-container");
const toggleGridButton = document.querySelector(".grid-toggle-button");
const toggleDrawMethodButton = document.querySelector(".hover-toggle-button");
const colourInputButton = document.querySelector(".colour-input");
const toggleRainbowModeButton = document.querySelector(".rainbow-mode-button");
const toggleEraserModeButton = document.querySelector(".eraser-mode-button");
const clearGridButton = document.querySelector(".clear-button");


// -- VARIABLES -- //
let holdToDrawVal = true; // hover to draw by default
let showGridVal = true; // grid hidden by default
let colour = "#282828"; // default colour
let rainbowMode = false; // off by default
let eraserMode  = false; // off by default


let gridSizeInputVal = 5;
let totalGridSquares = gridSizeInputVal * gridSizeInputVal;
// get grid size
const getGridSizeInputVal = e => {
    if (e.target.value <= 100 && e.target.value >= 3) {
        gridSizeInputVal = e.target.value;
        totalGridSquares = e.target.value * e.target.value;
        generateGridButton.textContent = "Generate";
        generateGridButton.classList.add("activated");
        generateGridButton.classList.remove("not-activated");
    } else {
        (e.target.value < 3) ? generateGridButton.textContent = "Too small!"
        : generateGridButton.textContent = "Too large!";

        generateGridButton.classList.add("not-activated");
        generateGridButton.classList.remove("activated");
    }
}
gridSizeInput.addEventListener("change", getGridSizeInputVal);


const generateGrid = (squaresPerRow, totalSquareAmount) => {
    if (squaresPerRow <= 100) {
        for (let i = 0; i < totalSquareAmount; i++) {
            const div = document.createElement("div");
    
            gridContainer.style.gridTemplateRows = `repeat(${squaresPerRow}, 1fr)`;
            gridContainer.style.gridTemplateColumns = `repeat(${squaresPerRow}, 1fr)`;
    
            gridContainer.appendChild(div);
        };
    }
}


const deleteGrid = () => {
    const allGridSquares = document.querySelectorAll(".drawing-pad-container div");
    allGridSquares.forEach(square => {
        square.remove();
    })
}

// changes colour value on change
colourInputButton.addEventListener("change", (e) => {
    colour = e.target.value;
    console.log(colour);
})

toggleRainbowModeButton.addEventListener("click", (e) => {
    if (rainbowMode) {
        rainbowMode = !rainbowMode;
        e.target.classList.remove("activated");
        e.target.classList.add("not-activated");
    } else {
        rainbowMode = !rainbowMode;
        e.target.classList.remove("not-activated");
        e.target.classList.add("activated");
    }
})

toggleEraserModeButton.addEventListener("click", (e) => {
    if (eraserMode) {
        eraserMode = !eraserMode;
        e.target.classList.remove("activated");
        e.target.classList.add("not-activated");
    } else {
        eraserMode = !eraserMode;
        e.target.classList.remove("not-activated");
        e.target.classList.add("activated");
    }
})

const toggleRainbowMode = () => {
    const num1 = Math.floor(Math.random() * 255);
    const num2 = Math.floor(Math.random() * 255);
    const num3 = Math.floor(Math.random() * 255);

    return [num1, num2, num3];
}


// if holdToDrawVal = true
const hoverDrawingMethod = (e) => {
    if (rainbowMode == false) {
        e.target.style.backgroundColor = colour;
    } else {
        const [num1, num2, num3] = toggleRainbowMode();
        e.target.style.backgroundColor = `rgb(${num1}, ${num2}, ${num3})`;
    }

    if (eraserMode) {
        e.target.style.backgroundColor = "white";
    }
}

// changes holdToDrawVal bool value
toggleDrawMethodButton.addEventListener("click", (e) => {
    if (holdToDrawVal) {
        holdToDrawVal = !holdToDrawVal;
        e.target.classList.remove("activated");
        e.target.classList.add("not-activated");
    } else {
        holdToDrawVal = !holdToDrawVal;
        e.target.classList.add("activated");
        e.target.classList.remove("not-activated");
    }
    deleteGrid();
    generateGrid(gridSizeInputVal, totalGridSquares);
    toggleDrawingMethod();
    toggleShowGrid(e);
})

// if you're looking at this function, don't worry i hate it too
const toggleDrawingMethod = () => {
    const allGridSquares = document.querySelectorAll(".drawing-pad-container div");
    if (holdToDrawVal == false) {
        allGridSquares.forEach(square => {
            square.addEventListener("mouseenter", hoverDrawingMethod);
        });
    } else {
        gridContainer.addEventListener("mousedown", () => {
            allGridSquares.forEach(square => {
                square.setAttribute("ondragstart", "return false;");
                square.addEventListener("mouseenter", e => {
                    if (rainbowMode == false) {
                        e.target.style.backgroundColor = colour;  
                    } else {
                        const [num1, num2, num3] = toggleRainbowMode();
                        e.target.style.backgroundColor = `rgb(${num1}, ${num2}, ${num3})`;
                    }

                    if (eraserMode) {
                        e.target.style.backgroundColor = "white";
                    }
                })
                square.addEventListener("click", e => {
                    if (rainbowMode == false) {
                        e.target.style.backgroundColor = colour;  
                    } else {
                        const [num1, num2, num3] = toggleRainbowMode();
                        e.target.style.backgroundColor = `rgb(${num1}, ${num2}, ${num3})`;
                    }

                    if (eraserMode) {
                        e.target.style.backgroundColor = "white";
                    }
                });
            });
        })
        gridContainer.addEventListener("mouseup", () => {
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
        if (showGridVal === false) { // clicking shows grid
            showGridVal = !showGridVal;
            e.target.classList.add("activated");
            e.target.classList.remove("not-activated");
        } else { // clicking hides grid
            toggleGridButton.textContent = "Show grid";
            showGridVal = !showGridVal;
            e.target.classList.remove("activated");
            e.target.classList.add("not-activated");
        }
    }

    if (showGridVal === true) {
        allGridSquares.forEach(square => {
            square.classList.add("drawing-pad-square");
        });
    } else {
        allGridSquares.forEach(square => {
            square.classList.remove("drawing-pad-square");
        });
    }
}

toggleGridButton.addEventListener("click", toggleShowGrid);

// repaints every square in the grid to white (original colour)
clearGridButton.addEventListener("click", (e) => {
    const allGridSquares = document.querySelectorAll(".drawing-pad-container div");
    allGridSquares.forEach(square => {
        square.removeAttribute("style", "background-color");
    })
})


// generates new grid after clicking "Generate" button
generateGridButton.addEventListener("click", (e) => {
    deleteGrid();
    generateGrid(gridSizeInputVal, totalGridSquares);
    toggleDrawingMethod();
    toggleShowGrid(e);
})