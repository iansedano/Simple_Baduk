var allStones = [];

class stone {
	constructor(boardX, boardY, string, moveIndex) {
		this.boardRef = new boardRef(boardX, boardY);
		this.colour = string
		this.moveIndex = moveIndex
		this.point = findCoordinate(this.boardRef)
		allStones.push(this);
	}

	show() {
		ctx.beginPath()
		ctx.arc(this.point.x, this.point.y, 20, 0, 2 * Math.PI);
		ctx.fillStyle = this.colour;
		ctx.fill();
		ctx.stroke();
	}

	place() {
		if (gameState[this.boardRef.bx-1][this.boardRef.by - 1] == undefined) {
		newStone = new stone(this.boardRef.bx, this.boardRef.by, playerTurn, moveIndex)
	    newStone.show()
	    gameState[this.boardRef.bx - 1][this.boardRef.by - 1] = newStone
	    changeTurn()
	    moveIndex += 1
	    for (var i = 0; i < allStones.length; i++) {
			if (checkLife(allStones[i]) == false) {
				deleteStone(allStones[i]);
			}
		}
	} else { window.alert("spot already taken") }
	}

}



function placeStone(boardRef) {
	if (gameState[boardRef.bx-1][boardRef.by - 1] == undefined) {
		newStone = new stone(boardRef.bx, boardRef.by, playerTurn, moveIndex)
	    newStone.show()
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


var deadStones = [];



function reDrawStones() {
	for (var i = 0; i < allStones.length; i++) {
		allStones[i].show
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