class point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

class boardRef {
	constructor(boardX, boardY) {
		this.bx = boardX
		this.by = boardY
		this.point = findCoordinate(this)
	}
}

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

function drawDot(point) {
	ctx.beginPath()
	ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.stroke();
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
	newStone = new stone(boardRef.bx, boardRef.by, playerTurn, moveIndex)
    drawStone(newStone)
    gameState[boardRef.bx - 1][boardRef.by - 1] = newStone
    changeTurn()
    moveIndex += 1
    for (var i = 0; i < allStones.length; i++) {
		checkLife(allStones[i]);
	}
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


function checkLife(stoneToCheck) {
	

	var lifePoints = 0;

	var N = "unassigned";
	var E = "unassigned";
	var S = "unassigned";
	var W = "unassigned";

	var sx = stoneToCheck.boardRef.bx - 1
	var sy = stoneToCheck.boardRef.by - 1

	if (sx == 0) {
		W = "edge"
	}
	if (sy == 0) {
		N = "edge"
	}
	if (sx == 8) {
		E = "edge"
	}
	if (sy == 8) {
		S = "edge"
	}

	var xN = gameState[sx][sy - 1]
	var xE = gameState[sx + 1][sy]
	var xS = gameState[sx][sy + 1]
	var xW = gameState[sx - 1][sy]


	if (N != "edge") {
		if (xN != undefined) {
			N = xN.colour
		}
	}

	if (E != "edge") {
		if (xE != undefined) {
			E = xE.colour
		}
	}

	if (S != "edge") {
		if (xS != undefined) {
			S = xS.colour
		}
	}

	if (W != "edge") {
		if (xW != undefined) {
			W = xW.colour
		}
	}

	var array = [N, E, S, W];


	for (var i = 0; i < array.length; i++) {
		if (array[i] == "unassigned") {
			lifePoints += 1
		}
	}

	if (lifePoints == 0) {
		deleteStone(stoneToCheck)
	}
}

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
		if (allStones[i].index == stone.index) {
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