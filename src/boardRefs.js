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

function findCoordinate(pos) {
	var x = pad + ((pos.bx) * gridSpacing)
	var y = pad + ((pos.by) * gridSpacing)
	return new point(x, y);
}