
// CANVAS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//  ++++++++++++++++++++++++++++
//  +++++++ DRAWING GRID +++++++ 
//  ++++++++++++++++++++++++++++

// Grid initalizing parameters

var gridSize = 9; // THIS PARAMETER SETS SIZE FOR GRID AND GAME - IMPORTANT!
var pad = 20.5;
var gridSpacing = 50;

function drawBoard() {
	
	//CANVAS Background
	ctx.beginPath();
	ctx.fillStyle = '#ffd1b3';
	ctx.fillRect(1, 1, 498, 498);

	//GRID
	ctx.beginPath();
	//vertical lines
	for (var i = 0; i < gridSize; i++) {
		ctx.moveTo(pad + (gridSpacing * i), pad);
		ctx.lineTo(pad + (gridSpacing * i), pad + ((gridSize - 1) * gridSpacing));
	}
	//horizontal lines
	for (var i = 0; i < gridSize; i++) {
		ctx.moveTo(pad, pad + (gridSpacing * i));
		ctx.lineTo( pad + ((gridSize - 1) * gridSpacing), pad + (gridSpacing * i));
	}
	ctx.stroke();

	// Drawing tengen star point
	var tengen = new boardRef(5, 5)
	drawDot(tengen.point);
}

//  ++++++++++++++++++++++++++++
//  ++++++++ CLICK MAP +++++++++
//  ++++++++++++++++++++++++++++

var clickMapArray = new Array(gridSize);
for (var i = 0; i < gridSize; i++){
	clickMapArray[i] = new Array(gridSize)
}

boxSize = 30;
positionX = pad;
positionY = pad;

for (var i = 0; i < gridSize; i++) {
	positionY = pad;
	for (var j = 0; j < gridSize; j++) {
		clickMapArray[i][j] = new point(positionX, positionY);
		positionY += gridSpacing;
	}
	positionX +=gridSpacing;
}

/*
// draws rectangles
for (var i in clickMapArray) {
	for (var j in clickMapArray[i]) {
			drawClickRect(clickMapArray[i][j]);
	}
}

function drawClickRect(point) {
	ctx.beginPath();
	ctx.fillStyle = '#ffff99';
	ctx.fillRect(point.y - (boxSize/2), point.x - (boxSize/2), boxSize, boxSize);
	ctx.stroke();
	}
*/

// Click listening

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return new point(x, y);
}



// GAME STATE

// Array of board

var gameState = new Array(gridSize);
for (var i = 0; i < gridSize; i++) {
	gameState[i] = new Array(gridSize);
}

// TESTING

drawBoard();

playerTurn = "black";
moveIndex = 0;

canvas.addEventListener('mousedown', function(e) {
    newStoneRef = getBoardRef(getCursorPosition(canvas, e))
    if (newStoneRef != undefined) {
    	placeStone(newStoneRef)
    }
})

