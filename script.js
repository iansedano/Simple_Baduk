
// CANVAS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//CANVAS Background
ctx.beginPath();
ctx.fillStyle = '#ffd1b3';
ctx.fillRect(1, 1, 498, 498);



// Grid initalizing parameters
var gridSize = 9;
var pad = 20.5;
var gridSpacing = 50;


//  +++++++ DRAWING GRID +++++++ 

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

var tengen = findCoordinate(5,5);
drawDot(tengen[0], tengen[1]);

// ++ CLICK MAP ++

var clickMapArray = new Array(gridSize);
for (var i = 0; i < gridSize; i++){
	clickMapArray[i] = new Array(gridSize)
}

boxSize = 40;
positionX = pad;
positionY = pad;

for (var i = 0; i < gridSize; i++) {
	positionY = pad;
	for (var j = 0; j < gridSize; j++) {
		clickMapArray[i][j] = new Array(positionX, positionY);
		positionY += gridSpacing;
	}
	positionX +=gridSpacing;
}

/*
/// DRAWS RECTANGLES
for (var i in clickMapArray) {
	for (var j in clickMapArray[i]) {
		drawClickRect(clickMapArray[i][j]);
	}
}
*/

function drawClickRect(array) {
	ctx.beginPath();
	ctx.fillStyle = '#ffff99';
	ctx.fillRect(array[1] - (boxSize/2), array[0] - (boxSize/2), boxSize, boxSize);
	ctx.stroke();
	}


// Click listening

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    return [x, y]
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

function placeStone() {


}
	
function getBoardPosition(x, y) {

	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			var xMin = clickMapArray[i][j][0] - (boxSize / 2)
			var xMax = clickMapArray[i][j][0] + (boxSize / 2)
			var yMin = clickMapArray[i][j][1] - (boxSize / 2)
			var yMax = clickMapArray[i][j][1] + (boxSize / 2)
			if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
				return [i, j];
				break;
			}
		}
	}
}

// GAME STATE

// Array of board
var gameState = Array(gridSize).fill(Array(gridSize).fill(""));



// TESTING

playerTurn = "black";
moveIndex = 1;
groupIndex = 1;


var firstStone = new stone(1, 1, "black", 1);
drawStone(firstStone);