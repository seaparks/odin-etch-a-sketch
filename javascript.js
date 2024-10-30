const DEFAULTSIZE      = 10;
const DEFAULTPAINTMODE = 'black';
const DEFAULTGRIDMODE  = 'on';

let paintMode   = DEFAULTPAINTMODE;
let paintColor  = '#000000'; 
let gridSize    = DEFAULTSIZE;
let gridMode    = DEFAULTGRIDMODE;
let isMouseDown = false; 

// painting modes
let rainbowButton    = document.getElementById('rainbow-button');
let blackButton      = document.getElementById('black-button');
let eraserButton     = document.getElementById('eraser-button');

rainbowButton.addEventListener('click', () => setPaintMode('rainbow'));
blackButton.addEventListener('click', () => setPaintMode('black'));
eraserButton.addEventListener('click', () => setPaintMode('erase'));

const colorPicker = document.getElementById('color-picker');
colorPicker.addEventListener('input', (event) => setPaintMode(event.target.value));

// grid options
let resetButton      = document.getElementById('reset-button');
let toggleGridButton = document.getElementById('toggle-grid-button');

resetButton.addEventListener('click', resetGrid);
toggleGridButton.addEventListener('click', toggleGrid);

const gridContainer = document.getElementById('grid-container');
const slider = document.getElementById('grid-size-slider');
const sliderLabel = document.getElementById('grid-size-label');

slider.addEventListener("input", () => {
    gridSize = slider.value;
    sliderLabel.textContent = `${gridSize} x ${gridSize}`;
    resetGrid();
});

// listen everywhere for the mouse clicks
document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);

setupGrid(DEFAULTSIZE);

function setupGrid(size){
    let side = 1000 / size;
    
    for (let i = 0; i < size * size; i++){
        const box = document.createElement('div');
        box.addEventListener('mouseover', paintSquare);
        box.addEventListener('mousedown', paintSquare)
        box.classList.add('grid-box');
        box.style.width = side + 'px';
        box.style.height = side + 'px';
        gridContainer.appendChild(box);
    }
}

function paintSquare(event){
    if (isMouseDown || event.type === 'mousedown'){

        if (paintMode === 'black'){
            event.target.style.backgroundColor = 'black';
        } else if (paintMode === 'rainbow'){
            event.target.style.backgroundColor = getRandomColor();
        } else if (paintMode === 'erase'){
            event.target.style.backgroundColor = 'white';
        } else if (paintMode === 'custom'){
            event.target.style.backgroundColor = paintColor;
        }

    }
}

function getRandomColor(){
    let hexvals = '0123456789ABCDEF';
    let color   = '#';

    for (let i = 0; i < 6; i++){
        color += hexvals[Math.floor(Math.random() * 16)];
    }
    return color;
}

function clearGrid() {
    gridContainer.innerHTML = '';
}

function resetGrid() {
    clearGrid();
    setupGrid(gridSize);
    gridMode = 'on';
}

function toggleGrid(){
    const gridBoxes = document.querySelectorAll('.grid-box');
    if (gridMode == 'on'){
        gridBoxes.forEach(box => {
            box.style.border = 'none';
        });
        gridMode = 'off';
    } else {
        gridBoxes.forEach(box =>{
            box.style.border = '1px solid lightgray';
        });
        gridMode = 'on';
    }
}

function setPaintMode(modeOrColor){
    if (modeOrColor === 'rainbow' || modeOrColor === 'erase' || modeOrColor === 'black'){
        paintMode = modeOrColor
    } else {
        paintMode  = 'custom';
        paintColor = modeOrColor;
    }
}