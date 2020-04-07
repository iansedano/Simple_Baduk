
// CANVAS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//CANVAS Background
ctx.beginPath();
ctx.fillStyle = '#ffd1b3';
ctx.fillRect(1, 1, 498, 498);



//  +++++++ DRAWING GRID +++++++ 

// Grid initalizing parameters
var gridSize = 9;
var pad = 20.5;
var gridSpacing = 50;

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

// ++ CLICK MAP ++

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


/// draws rectangles
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


// Click listening

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return new point(x, y);
}

canvas.addEventListener('mousedown', function(e) {
    newStoneRef = getBoardRef(getCursorPosition(canvas, e))
    if (newStoneRef != "") {
    	placeStone(newStoneRef)
    }
})

function placeStone(boardRef) {
	newStone = new stone(boardRef.bx, boardRef.by, playerTurn, moveIndex)
    drawStone(newStone)
    if (playerTurn == 'black') {
    	playerTurn = 'white'
    } else {
    	playerTurn = 'black'
    }
    moveIndex += 1
}
	
function getBoardRef(point) {
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			var xMin = clickMapArray[i][j].x - (boxSize / 2)
			var xMax = clickMapArray[i][j].x + (boxSize / 2)
			var yMin = clickMapArray[i][j].y - (boxSize / 2)
			var yMax = clickMapArray[i][j].y + (boxSize / 2)
			if (point.x >= xMin && point.x <= xMax && point.y >= yMin && point.y <= yMax) {
				return new boardRef(i + 1, j + 1);
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


