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


function drawDot(point) {
	ctx.beginPath()
	ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.stroke();
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

function findCoordinate(boardRef) {
	var x = pad + ((boardRef.bx - 1) * gridSpacing)
	var y = pad + ((boardRef.by - 1) * gridSpacing)
	return new point(x, y);
}