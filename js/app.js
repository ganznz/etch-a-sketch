const drawingPadContainer = document.querySelector(".drawing-pad-container");
const pixelsPerRow = 54;
const totalPixels = pixelsPerRow * pixelsPerRow;
const height = 500 / pixelsPerRow

for (let i = 0; i < totalPixels; i++) {
    const div = document.createElement("div");
    div.classList.add("drawing-pad-pixel");
    div.setAttribute("style", `height: ${height}px; width: ${height}px`);
    drawingPadContainer.appendChild(div);
}