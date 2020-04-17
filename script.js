
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// Grid initalizing parameters

var gridSize = 5; // THIS PARAMETER SETS SIZE FOR GRID AND GAME - IMPORTANT!

// GAME STATE

// Array of board

var board = new Array(gridSize);
for (var i = 0; i < gridSize; i++) {
	board[i] = new Array(gridSize);
}

for (var i = 0; i < gridSize; i++) {
	for (var j = 0; j < gridSize; j++) { 
		board[i][j] = new pos(i,j)
	}
}

// +++++++++++++++++++++++
// ++++++++ GAME +++++++++
// +++++++++++++++++++++++


drawBoard();
createClickMap();

playerTurn = "black";

playerBlack = new player("black")
playerWhite = new player("white")

// starting mouse listener
canvas.addEventListener('mousedown', function(e) {
	bRef = getBoardRef(getCursorPosition(canvas, e))
	if (bRef != undefined) { // if mouse has clicked somewhere invalid, does nothing
	    currentPlayer = getPlayer()
	    move(bRef, currentPlayer)
	    drawBoard()
	    DrawStones(board, ctx)
	}
})


// ++++++++++++++++++++++++++++++++++
// ++++++++ TESTING SET UPS +++++++++
// ++++++++++++++++++++++++++++++++++

/* SIMPLE CAPTURE SETUP
playerTurn = "white";
board[1][2].state = "white"
board[2][3].state = "white"
board[3][2].state = "white"
board[2][2].state = "black"
DrawStones(board, ctx)
*/

// simple group capture setup
playerTurn = "white";
board[1][2].state = "white"
board[2][3].state = "white"
board[3][2].state = "white"
board[2][2].state = "black"
board[2][1].state = "black"
board[1][1].state = "white"
board[3][1].state = "white"
DrawStones(board, ctx)

// ++++++++++++++++++++++++++++
// ++++++++ FUNCTIONS +++++++++
// ++++++++++++++++++++++++++++

function getPlayer (){
	if (playerTurn === "black") {
		return playerBlack
	} else {
		return playerWhite
	}
}

function changeTurn() {
	if (playerTurn === "black") {
		playerTurn = "white"
	} else {
		playerTurn = "black"
	}
}

function move(bRef, activePlayer) {
	var currentPosition = board[bRef.bx][bRef.by] // just for readability
	if (currentPosition.state !== "empty") { // checking if spot taken
		window.alert("spot already taken")
	} else {
		
		currentPosition.state = playerTurn // Temporary assigning colour to position
		
		// initalizing groups list
		var groups = []
		buildGroups(currentPosition, groups)

		//which group is the current move in?
		var currentGroup = findGroupByPosition(currentPosition, groups)
		
		// is there a dead enemy group?
		var deadEnemy = findDeadEnemyGroup(groups, currentGroup)

		if ((currentGroup.liberties == 0) && (deadEnemy == "no dead enemy")) {
			window.alert("Suicide! Invalid move")
			currentPosition.state = "empty"
		} else if (deadEnemy != "no dead enemy") {
			killGroup(deadEnemy, activePlayer)
			changeTurn()
		} else if (deadEnemy == "no dead enemy") {
			changeTurn()
		}

	}
}
	
function killGroup(groupToKill, playerKilling) {
	groupToKill.positions.forEach(pos => {
		pos.state = "empty"
		playerKilling.prisoners += 1
	})
}

function isGroupAlive(group) {
	if (group.liberties == 0) {
		return false
	} else if (group.liberties > 0) {
		return true
	}
}

function findDeadEnemyGroup(groupList, friendlyGroup) {

	var deadEnemyGroupIndex = groupList.findIndex(
		g => g.liberties == 0 && g.colour == friendlyGroup.enemy
		)

	if (deadEnemyGroupIndex == -1) {
		return "no dead enemy"
	} else if (deadEnemyGroupIndex > -1) {
		return groupList[deadEnemyGroupIndex]
	}
}

function findGroupByPosition(position, groupList) {
	var currentGroupIndex = -1
	var groupFound = ''
	groupList.forEach((group, index) => {
		posIndex = group.positions.findIndex(pos => pos == position)
		if (posIndex != -1) {
			currentGroupIndex = posIndex
			groupFound =  groupList[currentGroupIndex]
		}
	})
	if (currentGroupIndex == -1) {
		return "group not found"
	} else {
		return groupFound
	}
}

function buildGroups(pos, groups) {

	// making blank board to track checking
	var checked = new Array(gridSize); 
	for (var i = 0; i < gridSize; i++) {
		checked[i] = new Array(gridSize);
	}

	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) { 
			checked[i][j] = "unchecked"
		}
	}



	// checking whole board and building groups (builds new picture of groups for every move)
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) { 
			// defining for readability
			posBeingChecked = board[i][j]
			// is pos already checked?
			if (checked[i][j] == "unchecked") {
				checked[i][j] = posBeingChecked
				if (posBeingChecked.state != "empty") {
					var newGroup = new group() // initalizing new group
					newGroup.buildFrom(posBeingChecked, checked) // building grou
					groups.push(newGroup) // adding to group list
				}
			}
		}
	}


}


function getCardinals(position) {

    // initalizing cardinals
    var N
    var E
    var S
    var W

    // for readability
    var bx = position.bx;
    var by = position.by;

    // checking for edges
    if (bx == 0) {
    	W = "edge";
	} else if (bx == (gridSize - 1)) {
		E = "edge";
	}

    if (by == (gridSize - 1)) {
    	S = "edge";
    } else if (by == 0) {
    	N = "edge";
    }

    // assigning positions if not edge
    if (N != "edge") {N = board[bx][by - 1]};
    if (E != "edge") {E = board[bx + 1][by]};
    if (S != "edge") {S = board[bx][by + 1]};
    if (W != "edge") {W = board[bx - 1][by]};

    return [N, E, S, W];

}

