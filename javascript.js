console.log("hello, world!");

const DEFAULTSIZE      = 10;
const DEFAULTCOLORMODE = 'black';

let colorMode = DEFAULTCOLORMODE;
let gridSize  = DEFAULTSIZE;

let resetButton    = document.getElementById('reset-button');
let rainbowButton  = document.getElementById('rainbow-button');
let blackButton    = document.getElementById('black-button');
let hideGridButton = document.getElementById('hide-grid-button');

resetButton.addEventListener('click', resetGrid);
rainbowButton.addEventListener('click', changeToRainbow);
blackButton.addEventListener('click', changeToBlack);

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
}

function changeToRainbow(){
    colorMode = 'rainbow';
}

function changeToBlack(){
    colorMode = 'black';
}