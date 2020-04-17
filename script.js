
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

// starting mouse listener
canvas.addEventListener('mousedown', function(e) {
	bRef = getBoardRef(getCursorPosition(canvas, e))
	if (bRef != undefined) { // if mouse has clicked somewhere invalid, does nothing
	    move(bRef)
	    DrawStones(board, ctx)
	}
})



// ++++++++++++++++++++++++++++
// ++++++++ FUNCTIONS +++++++++
// ++++++++++++++++++++++++++++



function changeTurn() {
	if (playerTurn === "black") {
		playerTurn = "white"
	} else {
		playerTurn = "black"
	}
}


	


function move(bRef) {
	var currentPosition = board[bRef.bx][bRef.by] // just for readability
	if (currentPosition.state !== "empty") { // checking if spot taken
		window.alert("spot already taken")
	} else {
		
		currentPosition.state = playerTurn // Temporary assigning colour to position
		
		// initalizing groups list
		var groups = []
		buildGroups(currentPosition, groups)

		//is current position in dead group??
		
		var currentGroupIndex = -1
		groups.forEach((group, index) => {
			posIndex = group.positions.findIndex(pos => pos == currentPosition)
			if (posIndex != -1) {
				currentGroupIndex = index
			}
		})

		var currentGroup = groups[currentGroupIndex]
		
		if (currentGroup.liberties == 0) {
			deadEnemyGroup = groups.filter(g => {
				g.liberties == 0 && g.colour == currentGroup.enemy
			})

		}
		

		//does enemy have a dead group?

		//kill enemy group

		//place stone

		//end turn

		changeTurn()

	}
}
	
	;


function checkEnemyDead(currentPosition, groups) {
	colour = current.Position.state

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

