const DEFAULTSIZE      = 10;
const DEFAULTCOLORMODE = 'black';
const DEFAULTGRIDMODE  = 'on';

let colorMode = DEFAULTCOLORMODE;
let gridSize  = DEFAULTSIZE;
let gridMode  = DEFAULTGRIDMODE;

let resetButton      = document.getElementById('reset-button');
let rainbowButton    = document.getElementById('rainbow-button');
let blackButton      = document.getElementById('black-button');
let toggleGridButton = document.getElementById('toggle-grid-button');

resetButton.addEventListener('click', resetGrid);
rainbowButton.addEventListener('click', changeToRainbow);
blackButton.addEventListener('click', changeToBlack);
toggleGridButton.addEventListener('click', toggleGrid);

const gridContainer = document.getElementById('grid-container');
const slider = document.getElementById('grid-size-slider');
const sliderLabel = document.getElementById('grid-size-label');

slider.addEventListener("input", () => {
    gridSize = slider.value;
    sliderLabel.textContent = `${gridSize} x ${gridSize}`;
    resetGrid();
});

setupGrid(DEFAULTSIZE);



function setupGrid(size){
    let side = 1000 / size;
    
    for (let i = 0; i < size * size; i++){
        const box = document.createElement('div');
        box.addEventListener('mouseover', changeColor);
        box.classList.add('grid-box');
        box.style.width = side + 'px';
        box.style.height = side + 'px';
        gridContainer.appendChild(box);
    }
}

function changeColor(event){
    if (colorMode == 'black'){
        event.target.style.backgroundColor = 'black';
    } else if (colorMode == 'rainbow'){
        event.target.style.backgroundColor = getRandomColor();
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

function changeToRainbow(){
    colorMode = 'rainbow';
}

function changeToBlack(){
    colorMode = 'black';
}