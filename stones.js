class point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

class boardRef {
	constructor(boardX, boardY) {
		this.boardX = boardX
		this.boardY = boardY
	}
}

class stone {
	constructor(boardX, boardY, string, moveIndex) {
		this.X = boardX;
		this.Y = boardY;
		this.alive = true;
		this.colour = string
		this.group = ""
		this.moveIndex = moveIndex
	}
}

class group {
	constructor() {
		this.index = groupIndex
		groupIndex += 1
	}
}



function findCoordinate(boardX, boardY) {
	var x = pad + ((boardX - 1) * gridSpacing)
	var y = pad + ((boardY - 1) * gridSpacing)
	return [x, y];
}

function drawDot(x, y) {
	ctx.beginPath()
	ctx.arc(x, y, 3, 0, 2 * Math.PI);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.stroke();
}

function drawStone(stone) {
	ctx.beginPath()
	coord = findCoordinate(stone.X, stone.Y)
	ctx.arc(coord[0], coord[1], 20, 0, 2 * Math.PI);
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
