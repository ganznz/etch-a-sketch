// -- ELEMENTS -- //
const drawingPadContainer = document.querySelector(".drawing-pad-container");
const input = document.querySelector("input");

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


input.addEventListener("change", (e) => {
    squaresPerRow = e.target.value;
    totalSquares = squaresPerRow * squaresPerRow;
    const divs = document.querySelectorAll(".drawing-pad-square")

    // deletes old squares
    divs.forEach(div => {
        div.remove();
    });

    // creates new squares
    createGrid(squaresPerRow, totalSquares);
});


