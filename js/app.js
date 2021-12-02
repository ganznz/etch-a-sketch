// -- ELEMENTS -- //
const drawingPadContainer = document.querySelector(".drawing-pad-container");
const squaresPerRowInput = document.querySelector("input");
const rainbowModeButton = document.querySelector(".rainbow-mode-button");

// -- VARIABLES -- //
let initialSquaresPerRow = 5;
let totalSquares = initialSquaresPerRow * initialSquaresPerRow;



const createGrid = (squaresPerRow = initialSquaresPerRow, totalSquareAmount = totalSquares) => {
    for (let i = 0; i < totalSquareAmount; i++) {
        const div = document.createElement("div");
        div.classList.add("drawing-pad-square");

        drawingPadContainer.style.gridTemplateRows = `repeat(${squaresPerRow}, 1fr)`;
        drawingPadContainer.style.gridTemplateColumns = `repeat(${squaresPerRow}, 1fr)`;

        drawingPadContainer.appendChild(div);
    }
};

// creates the grid that shows when page loads
createGrid();
let allSquares = document.querySelectorAll(".drawing-pad-square");
allSquares.forEach(square => {
    square.addEventListener("mouseenter", (e) => {
        e.target.style.backgroundColor = "rgb(30, 30, 30)";
    })
});

// remove squares function
const removeSquares = (squares = allSquares) => {
    squares.forEach(square => {
        square.remove();
    });
}

let rainbowMode = false;
rainbowModeButton.addEventListener("click", () => {
    rainbowMode = !rainbowMode;
    removeSquares();
    createGrid(squaresPerRow, totalSquares);
})

squaresPerRowInput.addEventListener("change", (e) => {
    squaresPerRow = e.target.value;
    totalSquares = squaresPerRow * squaresPerRow;
    const oldSquares = document.querySelectorAll(".drawing-pad-square");

    // deletes old squares
    removeSquares(oldSquares);

    // creates new squares
    createGrid(squaresPerRow, totalSquares);
    allSquares = document.querySelectorAll(".drawing-pad-square");

    allSquares.forEach(square => {
        square.addEventListener("mouseenter", (e) => {
            if (rainbowMode) {
                e.target.style.backgroundColor = "red";
            } else {
                e.target.style.backgroundColor = "rgb(30, 30, 30)";    
            }
        });
    });
});