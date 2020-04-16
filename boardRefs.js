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

// 

function findCoordinate(boardRef) {
	var x = pad + ((boardRef.bx - 1) * gridSpacing)
	var y = pad + ((boardRef.by - 1) * gridSpacing)
	return new point(x, y);
}