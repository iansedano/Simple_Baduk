
//  ++++++++++++++++++++++++++++
//  +++++++ DRAWING GRID +++++++ 
//  ++++++++++++++++++++++++++++

// CANVAS


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

var clickMapArray

function createClickMap() {
	clickMapArray = new Array(gridSize);
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

}



function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return new point(x, y);
}


function drawDot(point) {
	ctx.beginPath()
	ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.stroke();
}

function DrawStones(board, context) {
	board.forEach(x => {
		x.forEach(pos => {
			if (pos.state != 'empty') {
				coord = findCoordinate(pos)
				context.beginPath()
				context.arc(coord.x, coord.y, 20, 0, 2 * Math.PI);
				context.fillStyle = pos.state;
				context.fill();
				context.stroke();
			}
		})
	})
		


}

function getBoardRef(point) {
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			var xMin = clickMapArray[i][j].x - (boxSize / 2)
			var xMax = clickMapArray[i][j].x + (boxSize / 2)
			var yMin = clickMapArray[i][j].y - (boxSize / 2)
			var yMax = clickMapArray[i][j].y + (boxSize / 2)
			if (point.x >= xMin && point.x <= xMax && point.y >= yMin && point.y <= yMax) {
				return new boardRef(i, j);
				break;
			}
		}
	}
}