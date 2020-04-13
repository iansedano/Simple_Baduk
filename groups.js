class group {
	constructor () {
		this.stones = [];
		this.life = true;
	}

}


allStonesCopy = allStones;
	for (var i = 0; i < allStonesCopy.length - 1; i++) {
		neighbours = stoneNeighbours(allStonesCopy[i]);

function getGroup(stone) {
	neighbours = stoneNeighbours(stone);

	for (var i = 0; i < neighbours.length - 1; i++) {
		if (neighbours[i] == stone.colour) {
			if (i == 0) {
				
			} else if (i == 1) {

			} else if (i == 2) {
				
			} else if (i == 3) {
				
			}
		}
	}


	}

}



function stoneNeighbours(stoneToCheck) {

	var N = "liberty";
	var E = "liberty";
	var S = "liberty";
	var W = "liberty";
	var sx = stoneToCheck.boardRef.bx - 1
	var sy = stoneToCheck.boardRef.by - 1
	
	if (sy == 0) {N = "edge"}
	if (sx == 8) {E = "edge"}
	if (sy == 8) {S = "edge"}
	if (sx == 0) {W = "edge"}

	var xN = gameState[sx][sy - 1]
	var xE = gameState[sx + 1][sy]
	var xS = gameState[sx][sy + 1]
	var xW = gameState[sx - 1][sy]

	if (N != "edge") {
		if (xN != undefined) {N = xN.colour}
	}
	if (E != "edge") {
		if (xE != undefined) {E = xE.colour}
	}
	if (S != "edge") {
		if (xS != undefined) {S = xS.colour}
	}
	if (W != "edge") {
		if (xW != undefined) {W = xW.colour}
	}

	var neighbours = [N, E, S, W];

	return neighbours;
}



function checkLife(stoneToCheck) {
	
	var lifePoints = 0;

	var N = "unassigned";
	var E = "unassigned";
	var S = "unassigned";
	var W = "unassigned";
	var sx = stoneToCheck.boardRef.bx - 1
	var sy = stoneToCheck.boardRef.by - 1
	
	var xN = gameState[sx][sy - 1]
	var xE = gameState[sx + 1][sy]
	var xS = gameState[sx][sy + 1]
	var xW = gameState[sx - 1][sy]

	if (sy == 0) {N = "edge"}
	if (sx == 8) {E = "edge"}
	if (sy == 8) {S = "edge"}
	if (sx == 0) {W = "edge"}

	if (N != "edge") {
		if (xN != undefined) {N = xN.colour}
	}
	if (E != "edge") {
		if (xE != undefined) {E = xE.colour}
	}
	if (S != "edge") {
		if (xS != undefined) {S = xS.colour}
	}
	if (W != "edge") {
		if (xW != undefined) {W = xW.colour}
	}

	var array = [N, E, S, W];

	for (var i = 0; i < array.length; i++) {
		if (array[i] == "unassigned") {
			lifePoints += 1
		}
	}

	if (lifePoints == 0) {
		return false;
	}
}

function checkLife(stoneArray) {
	
	var lifePoints = 0;

	for (i = 0; i < stoneArray.Length; i++) {
		var N = "unassigned";
		var E = "unassigned";
		var S = "unassigned";
		var W = "unassigned";
		var sx = stoneArray[i].boardRef.bx - 1
		var sy = stoneArray[i].boardRef.by - 1
		
		var xN = gameState[sx][sy - 1]
		var xE = gameState[sx + 1][sy]
		var xS = gameState[sx][sy + 1]
		var xW = gameState[sx - 1][sy]

		if (sy == 0) {N = "edge"}
		if (sx == 8) {E = "edge"}
		if (sy == 8) {S = "edge"}
		if (sx == 0) {W = "edge"}

		if (N != "edge") {
			if (xN != undefined) {N = xN.colour}
		}
		if (E != "edge") {
			if (xE != undefined) {E = xE.colour}
		}
		if (S != "edge") {
			if (xS != undefined) {S = xS.colour}
		}
		if (W != "edge") {
			if (xW != undefined) {W = xW.colour}
		}

		var array = [N, E, S, W];

		for (var i = 0; i < array.length; i++) {
			if (array[i] == "unassigned") {
				lifePoints += 1
			}
		}
	}

	if (lifePoints == 0) {
		return false;
	}
	
}