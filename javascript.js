console.log("hello, world!");

const gridContainer = document.getElementById('grid-container');

setupGrid();




function setupGrid(){
    for (let i = 0; i < 100; i++){
        const box = document.createElement('div');
        box.classList.add('grid-box');
        gridContainer.appendChild(box);
    }
}