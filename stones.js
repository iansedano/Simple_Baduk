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

class stone {
	constructor(boardX, boardY, string, moveIndex) {
		this.boardRef = new boardRef(boardX, boardY);
		this.alive = true;
		this.colour = string
		this.group = ""
		this.moveIndex = moveIndex
		this.point = findCoordinate(this.boardRef)
	}
}

class group {
	constructor() {
		this.index = groupIndex
		groupIndex += 1
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
