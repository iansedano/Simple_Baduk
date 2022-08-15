class player {
  constructor(colour) {
    this.colour = colour;
    this.prisoners = 0;
  }
}

class point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class boardRef {
  constructor(boardX, boardY) {
    this.bx = boardX;
    this.by = boardY;
    this.point = findCoordinate(this);
  }
}

class group {
  constructor() {
    this.positions = [];
    this.liberties = 0;
  }

  buildFrom(position, checkedList) {
    // adds position to list of positions within this group
    this.positions.push(position);

    // some definitions for readability
    this.colour = position.state;
    if (this.colour == "white") {
      this.enemy = "black";
    }
    if (this.colour == "black") {
      this.enemy = "white";
    }

    // initalizing list of 'friends' that make up this group
    // and adding in current position.
    var friendsToCheck = [position];

    // going through the friends
    for (i = 0; i < friendsToCheck.length; i++) {
      // getting the adjacent positions
      var cardinals = getCardinals(friendsToCheck[i]);
      // above outputs a list of 4 positions or "edge"

      // gets an array of the cardinal states for readability
      var cardinalStates = [];
      cardinalStates = cardinals.map((i) => i.state);

      // following ignores edge or enemy
      // if empty adds liberty and to checked list
      // if friend adds to friends to check and checked list and group positions
      for (j = 0; j < 4; j++) {
        if (cardinals[j] == "edge") {
          //do nothing
        } else if (this.isPosInGroup(cardinals[j])) {
          // do nothing
        } else if (cardinalStates[j] == "empty") {
          this.liberties += 1;
          checkedList[cardinals[j].bx][cardinals[j].by] = cardinals[j];
        } else if (cardinalStates[j] == this.colour) {
          this.positions.push(cardinals[j]);
          friendsToCheck.push(cardinals[j]);
          checkedList[cardinals[j].bx][cardinals[j].by] = cardinals[j];
        }
      }
    }
  }

  isPosInGroup(pos) {
    var groupPosIndex = "";
    groupPosIndex = this.positions.findIndex((p) => p == pos);
    if (groupPosIndex == -1) {
      return false;
    } else if (groupPosIndex > -1) {
      return true;
    }
  }
}

class boardPosition {
  constructor(bx, by) {
    this.bx = bx;
    this.by = by;
    this._state = "empty";
  }

  set state(string) {
    if (string === "black" || string === "white" || string === "empty") {
      this._state = string;
    } else {
      console.log("invalid state");
    }
  }

  get state() {
    return this._state;
  }
}

class stone {
  constructor(boardX, boardY, string, moveIndex) {
    this.boardRef = new boardRef(boardX, boardY);
    this.colour = string;
    this.moveIndex = moveIndex;
    this.point = findCoordinate(this.boardRef);
    allStones.push(this);
  }

  show() {
    CTX.beginPath();
    CTX.arc(this.point.x, this.point.y, 20, 0, 2 * Math.PI);
    CTX.fillStyle = this.colour;
    CTX.fill();
    CTX.stroke();
  }

  place() {
    if (gameState[this.boardRef.bx - 1][this.boardRef.by - 1] == undefined) {
      newStone = new stone(
        this.boardRef.bx,
        this.boardRef.by,
        playerTurn,
        moveIndex
      );
      newStone.show();
      gameState[this.boardRef.bx - 1][this.boardRef.by - 1] = newStone;
      changeTurn();
      moveIndex += 1;
      for (var i = 0; i < allStones.length; i++) {
        if (checkLife(allStones[i]) == false) {
          deleteStone(allStones[i]);
        }
      }
    } else {
      window.alert("spot already taken");
    }
  }
}

const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");

// SETS SIZE FOR GRID AND GAME - only works for 9 x 9 for now.
const GRID_SIZE = 9;
const PADDING = 48.5;
const GRID_SPACING = 50;

let playerTurn = "black";
const playerBlack = new player("black");
const playerWhite = new player("white");

const clickMapArray = createClickMap();

drawBoard(PADDING, GRID_SPACING);

CANVAS.addEventListener("mousedown", function (e) {
  bRef = getBoardRef(getCursorPosition(CANVAS, e));
  // if mouse has clicked somewhere invalid, does nothing
  if (bRef != undefined) {
    currentPlayer = getPlayer();
    move(bRef, currentPlayer);
    drawBoard(PADDING, GRID_SPACING);
    DrawStones(board, CTX);
  }
});

var board = new Array(GRID_SIZE);
for (var i = 0; i < GRID_SIZE; i++) {
  board[i] = new Array(GRID_SIZE);
}

for (i = 0; i < GRID_SIZE; i++) {
  for (var j = 0; j < GRID_SIZE; j++) {
    board[i][j] = new boardPosition(i, j);
  }
}
function findCoordinate(pos) {
  var x = PADDING + pos.bx * GRID_SPACING;
  var y = PADDING + pos.by * GRID_SPACING;
  return new point(x, y);
}

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

/* simple group capture setup
playerTurn = "white";
board[1][2].state = "white"
board[2][3].state = "white"
board[3][2].state = "white"
board[2][2].state = "black"
board[2][1].state = "black"
board[1][1].state = "white"
board[3][1].state = "white"
DrawStones(board, ctx)
*/

/* NEAR KO SETUP
playerTurn = "black";
board[1][2].state = "white"
board[2][3].state = "white"
board[3][2].state = "white"
board[2][1].state = "white"
board[1][1].state = "black"
board[2][0].state = "black"
board[3][1].state = "black"
DrawStones(board, ctx)
*/

function getPlayer() {
  if (playerTurn === "black") {
    return playerBlack;
  } else {
    return playerWhite;
  }
}

function changeTurn() {
  if (playerTurn === "black") {
    playerTurn = "white";
  } else {
    playerTurn = "black";
  }
}

function move(bRef, activePlayer) {
  var currentPosition = board[bRef.bx][bRef.by];
  if (currentPosition.state !== "empty") {
    // checking if spot taken
    window.alert("spot already taken");
  } else {
    // Temporary assigning colour to position
    currentPosition.state = playerTurn;

    // initalizing groups list
    var groups = [];
    buildGroups(currentPosition, groups);

    //which group is the current move in?
    var currentGroup = findGroupByPosition(currentPosition, groups);

    // is there a dead enemy group?
    var deadEnemy = findDeadEnemyGroup(groups, currentGroup);

    if (currentGroup.liberties === 0 && deadEnemy === "no dead enemy") {
      window.alert("Suicide! Invalid move");
      currentPosition.state = "empty";
    } else if (deadEnemy != "no dead enemy") {
      killGroup(deadEnemy, activePlayer);
      changeTurn();
    } else if (deadEnemy == "no dead enemy") {
      changeTurn();
    }
  }
}

function killGroup(groupToKill, playerKilling) {
  groupToKill.positions.forEach((pos) => {
    pos.state = "empty";
    playerKilling.prisoners += 1;
  });
}

function isGroupAlive(group) {
  if (group.liberties == 0) {
    return false;
  } else if (group.liberties > 0) {
    return true;
  }
}

function findDeadEnemyGroup(groupList, friendlyGroup) {
  var deadEnemyGroupIndex = groupList.findIndex(
    (g) => g.liberties == 0 && g.colour == friendlyGroup.enemy
  );

  if (deadEnemyGroupIndex == -1) {
    return "no dead enemy";
  } else if (deadEnemyGroupIndex > -1) {
    return groupList[deadEnemyGroupIndex];
  }
}

function findGroupByPosition(positionToFind, groupList) {
  var currentGroupIndex = -1;
  var groupFound = "";
  groupList.forEach((g, index) => {
    posIndex = g.positions.findIndex((pos) => pos == positionToFind);
    if (posIndex != -1) {
      currentGroupIndex = index;
      groupFound = groupList[currentGroupIndex];
    }
  });
  if (currentGroupIndex == -1) {
    return "group not found";
  } else {
    return groupFound;
  }
}

function buildGroups(pos, groups) {
  // making blank board to track checking
  var checked = new Array(GRID_SIZE);
  for (var i = 0; i < GRID_SIZE; i++) {
    checked[i] = new Array(GRID_SIZE);
  }

  for (var i = 0; i < GRID_SIZE; i++) {
    for (var j = 0; j < GRID_SIZE; j++) {
      checked[i][j] = "unchecked";
    }
  }

  // checking whole board and building groups
  // (builds new picture of groups for every move)

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      // defining for readability
      posBeingChecked = board[i][j];
      // is pos already checked?
      if (checked[i][j] == "unchecked") {
        checked[i][j] = posBeingChecked;
        if (posBeingChecked.state != "empty") {
          var newGroup = new group(); // initalizing new group
          newGroup.buildFrom(posBeingChecked, checked); // building group
          groups.push(newGroup); // adding to group list
        }
      }
    }
  }
}

function getCardinals(position) {
  // initalizing cardinals
  var N;
  var E;
  var S;
  var W;

  // for readability
  var bx = position.bx;
  var by = position.by;

  // checking for edges
  if (bx == 0) {
    W = "edge";
  } else if (bx == GRID_SIZE - 1) {
    E = "edge";
  }

  if (by == GRID_SIZE - 1) {
    S = "edge";
  } else if (by == 0) {
    N = "edge";
  }

  // assigning positions if not edge
  if (N != "edge") {
    N = board[bx][by - 1];
  }
  if (E != "edge") {
    E = board[bx + 1][by];
  }
  if (S != "edge") {
    S = board[bx][by + 1];
  }
  if (W != "edge") {
    W = board[bx - 1][by];
  }

  return [N, E, S, W];
}

function drawBoard(pad, gridSpacing) {
  //CANVAS Background
  CTX.beginPath();
  CTX.fillStyle = "#D6B450";
  CTX.fillRect(0, 0, 500, 500);

  //GRID
  CTX.beginPath();
  //vertical lines
  for (var i = 0; i < GRID_SIZE; i++) {
    CTX.moveTo(pad + gridSpacing * i, pad);
    CTX.lineTo(pad + gridSpacing * i, pad + (GRID_SIZE - 1) * gridSpacing);
  }
  //horizontal lines
  for (var i = 0; i < GRID_SIZE; i++) {
    CTX.moveTo(pad, pad + gridSpacing * i);
    CTX.lineTo(pad + (GRID_SIZE - 1) * gridSpacing, pad + gridSpacing * i);
  }
  CTX.stroke();

  // Drawing tengen star point
  var tengen = new boardRef((GRID_SIZE - 1) / 2, (GRID_SIZE - 1) / 2);
  drawDot(tengen.point);

  document.getElementById("turn").innerHTML = playerTurn + "'s turn";

  document.getElementById("whitePrisoners").innerHTML =
    "black has " + playerBlack.prisoners + " prisoners.";
  document.getElementById("blackPrisoners").innerHTML =
    "white has " + playerWhite.prisoners + " prisoners";
}

function createClickMap() {
  const clickMapArray = new Array(GRID_SIZE);
  for (var i = 0; i < GRID_SIZE; i++) {
    clickMapArray[i] = new Array(GRID_SIZE);
  }

  boxSize = 30;
  positionX = PADDING;
  positionY = PADDING;

  for (var i = 0; i < GRID_SIZE; i++) {
    positionY = PADDING;
    for (var j = 0; j < GRID_SIZE; j++) {
      clickMapArray[i][j] = new point(positionX, positionY);
      positionY += GRID_SPACING;
    }
    positionX += GRID_SPACING;
  }

  return clickMapArray;
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return new point(x, y);
}

function drawDot(point) {
  CTX.beginPath();
  CTX.arc(point.x, point.y, 3, 0, 2 * Math.PI);
  CTX.fillStyle = "black";
  CTX.fill();
  CTX.stroke();
}

function DrawStones(board, context) {
  board.forEach((x) => {
    x.forEach((pos) => {
      if (pos.state != "empty") {
        coord = findCoordinate(pos);
        context.beginPath();
        context.arc(coord.x, coord.y, 20, 0, 2 * Math.PI);
        context.fillStyle = pos.state;
        context.fill();
        context.stroke();
      }
    });
  });
}

function getBoardRef(point) {
  for (var i = 0; i < GRID_SIZE; i++) {
    for (var j = 0; j < GRID_SIZE; j++) {
      var xMin = clickMapArray[i][j].x - boxSize / 2;
      var xMax = clickMapArray[i][j].x + boxSize / 2;
      var yMin = clickMapArray[i][j].y - boxSize / 2;
      var yMax = clickMapArray[i][j].y + boxSize / 2;
      if (
        point.x >= xMin &&
        point.x <= xMax &&
        point.y >= yMin &&
        point.y <= yMax
      ) {
        return new boardRef(i, j);
        break;
      }
    }
  }
}
var allStones = [];

function placeStone(boardRef) {
  if (gameState[boardRef.bx - 1][boardRef.by - 1] == undefined) {
    newStone = new stone(boardRef.bx, boardRef.by, playerTurn, moveIndex);
    newStone.show();
    gameState[boardRef.bx - 1][boardRef.by - 1] = newStone;
    changeTurn();
    moveIndex += 1;
    for (var i = 0; i < allStones.length; i++) {
      if (checkLife(allStones[i]) == false) {
        deleteStone(allStones[i]);
      }
    }
  } else {
    window.alert("spot already taken");
  }
}

var deadStones = [];

function reDrawStones() {
  for (var i = 0; i < allStones.length; i++) {
    allStones[i].show;
  }
}

function deleteStone(stone) {
  sx = stone.boardRef.bx - 1;
  sy = stone.boardRef.by - 1;
  gameState[sx][sy] = undefined;
  for (var i = 0; i < allStones.length; i++) {
    if (allStones[i].moveIndex == stone.moveIndex) {
      deadStones.push(allStones[i]);
      allStones.splice(i, 1);
      break;
    }
  }
  drawBoard();
  reDrawStones();
}
