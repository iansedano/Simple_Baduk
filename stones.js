var allStones = [];

class stone {
	constructor(boardX, boardY, string, moveIndex) {
		this.boardRef = new boardRef(boardX, boardY);
		this.colour = string
		this.moveIndex = moveIndex
		this.point = findCoordinate(this.boardRef)
		allStones.push(this);
	}
}

function findCoordinate(boardRef) {
	var x = pad + ((boardRef.bx - 1) * gridSpacing)
	var y = pad + ((boardRef.by - 1) * gridSpacing)
	return new point(x, y);
}

function drawStone(stone) {
	ctx.beginPath()
	ctx.arc(stone.point.x, stone.point.y, 20, 0, 2 * Math.PI);
	ctx.fillStyle = stone.colour;
	ctx.fill();
	ctx.stroke();
}

function changeTurn() {
	if (playerTurn === "black") {
		playerTurn = "white"
	} else {
		playerTurn = "black"
	}
}

function placeStone(boardRef) {
	if (gameState[boardRef.bx-1][boardRef.by - 1] == undefined) {
		newStone = new stone(boardRef.bx, boardRef.by, playerTurn, moveIndex)
	    drawStone(newStone)
	    gameState[boardRef.bx - 1][boardRef.by - 1] = newStone
	    changeTurn()
	    moveIndex += 1
	    for (var i = 0; i < allStones.length; i++) {
			if (checkLife(allStones[i]) == false) {
				deleteStone(allStones[i]);
			}
		}
	} else { window.alert("spot already taken") }
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

var deadStones = [];



function reDrawStones() {
	for (var i = 0; i < allStones.length; i++) {
		drawStone(allStones[i])
	}
}

function deleteStone(stone) {
	sx = stone.boardRef.bx - 1
	sy = stone.boardRef.by - 1
	gameState[sx][sy] = undefined
	for (var i = 0; i < allStones.length; i++) {
		if (allStones[i].moveIndex == stone.moveIndex) {
			deadStones.push(allStones[i]);
			allStones.splice(i, 1)
			break;
		}
	}
	drawBoard();
	reDrawStones();
}


/*
for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			for (var k = 0; k < allStones.length; i++) {
				
			}
		}
	}
*/