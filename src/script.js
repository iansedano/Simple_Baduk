class Player {
  constructor(colour) {
    this.colour = colour;
    this.prisoners = 0;
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class BoardRef {
  constructor(boardX, boardY) {
    this.bx = boardX;
    this.by = boardY;
    this.point = findCoordinate(this);
  }
}

class Group {
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
      var cardinals = this.getCardinals(friendsToCheck[i]);
      // above outputs a list of 4 positions or "edge"

      const cardinalStates = cardinals.map((i) => i.state);

      // following ignores edge or enemy
      // if empty adds liberty and to checked list
      // if friend adds to friends to check and checked list and group positions
      for (j = 0; j < 4; j++) {
        if (cardinals[j] == "edge" || this.isPosInGroup(cardinals[j])) {
          continue;
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
    const groupPosIndex = this.positions.findIndex((p) => p == pos);
    if (groupPosIndex == -1) {
      return false;
    } else if (groupPosIndex > -1) {
      return true;
    }
  }

  getCardinals(position) {
    // initalizing cardinals
    let N;
    let E;
    let S;
    let W;

    // for readability
    let bx = position.bx;
    let by = position.by;

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
      N = BOARD[bx][by - 1];
    }
    if (E != "edge") {
      E = BOARD[bx + 1][by];
    }
    if (S != "edge") {
      S = BOARD[bx][by + 1];
    }
    if (W != "edge") {
      W = BOARD[bx - 1][by];
    }

    return [N, E, S, W];
  }
}

class BoardPosition {
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

const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");

// SETS SIZE FOR GRID AND GAME - only works for 9 x 9 for now.
const GRID_SIZE = 9;
const PADDING = 48.5;
const GRID_SPACING = 50;

let PLAYER_TURN = "black";
const PLAYER_BLACK = new Player("black");
const PLAYER_WHITE = new Player("white");

const CLICK_MAP_ARRAY = createClickMap();

var BOARD = new Array(GRID_SIZE);
for (var i = 0; i < GRID_SIZE; i++) {
  BOARD[i] = new Array(GRID_SIZE);
}

for (i = 0; i < GRID_SIZE; i++) {
  for (var j = 0; j < GRID_SIZE; j++) {
    BOARD[i][j] = new BoardPosition(i, j);
  }
}

drawBoard(PADDING, GRID_SPACING, CTX);

CANVAS.addEventListener("mousedown", function (e) {
  bRef = getBoardRef(getCursorPosition(CANVAS, e), CLICK_MAP_ARRAY);

  if (bRef != undefined) {
    currentPlayer = getPlayer();
    move(bRef, currentPlayer);
    drawBoard(PADDING, GRID_SPACING, CTX);
    DrawStones(BOARD, CTX);
  }
});

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

PLAYER_TURN = "white";
BOARD[1][2].state = "white";
BOARD[2][3].state = "white";
BOARD[3][2].state = "white";
BOARD[2][2].state = "black";
BOARD[2][1].state = "black";
BOARD[1][1].state = "white";
BOARD[3][1].state = "white";
DrawStones(BOARD, CTX);

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

function findCoordinate(pos) {
  var x = PADDING + pos.bx * GRID_SPACING;
  var y = PADDING + pos.by * GRID_SPACING;
  return new Point(x, y);
}

function getPlayer() {
  if (PLAYER_TURN === "black") {
    return PLAYER_BLACK;
  } else {
    return PLAYER_WHITE;
  }
}

function changeTurn() {
  if (PLAYER_TURN === "black") {
    PLAYER_TURN = "white";
  } else {
    PLAYER_TURN = "black";
  }
}

function move(bRef, activePlayer) {
  var currentPosition = BOARD[bRef.bx][bRef.by];
  if (currentPosition.state !== "empty") {
    window.alert("spot already taken");
  } else {
    currentPosition.state = PLAYER_TURN;

    const groups = buildGroups();

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

function buildGroups() {
  const groups = [];
  // making blank board to track checking
  var checked = new Array(GRID_SIZE);
  for (let i = 0; i < GRID_SIZE; i++) {
    checked[i] = new Array(GRID_SIZE);
  }

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      checked[i][j] = "unchecked";
    }
  }

  // checking whole board and building groups
  // (builds new picture of groups for every move)

  for (let i = 0; i < BOARD.length; i++) {
    for (let j = 0; j < BOARD[i].length; j++) {
      posBeingChecked = BOARD[i][j];
      if (checked[i][j] == "unchecked") {
        checked[i][j] = posBeingChecked;
        if (posBeingChecked.state != "empty") {
          let newGroup = new Group(); // initalizing new group
          newGroup.buildFrom(posBeingChecked, checked); // building group
          groups.push(newGroup); // adding to group list
        }
      }
    }
  }

  return groups;
}

function drawBoard(pad, gridSpacing, context) {
  //CANVAS Background
  context.beginPath();
  context.fillStyle = "#D6B450";
  context.fillRect(0, 0, 500, 500);

  //GRID
  context.beginPath();
  //vertical lines
  for (var i = 0; i < GRID_SIZE; i++) {
    context.moveTo(pad + gridSpacing * i, pad);
    context.lineTo(pad + gridSpacing * i, pad + (GRID_SIZE - 1) * gridSpacing);
  }
  //horizontal lines
  for (var i = 0; i < GRID_SIZE; i++) {
    context.moveTo(pad, pad + gridSpacing * i);
    context.lineTo(pad + (GRID_SIZE - 1) * gridSpacing, pad + gridSpacing * i);
  }
  context.stroke();

  // Drawing tengen star point
  var tengen = new BoardRef((GRID_SIZE - 1) / 2, (GRID_SIZE - 1) / 2);
  drawDot(tengen.point, context);

  document.getElementById("turn").innerHTML = PLAYER_TURN + "'s turn";

  document.getElementById("whitePrisoners").innerHTML =
    "black has " + PLAYER_BLACK.prisoners + " prisoners.";
  document.getElementById("blackPrisoners").innerHTML =
    "white has " + PLAYER_WHITE.prisoners + " prisoners";
}

function createClickMap() {
  const clickMapArray = new Array(GRID_SIZE);
  for (let i = 0; i < GRID_SIZE; i++) {
    clickMapArray[i] = new Array(GRID_SIZE);
  }

  boxSize = 30;
  positionX = PADDING;
  positionY = PADDING;

  for (let i = 0; i < GRID_SIZE; i++) {
    positionY = PADDING;
    for (let j = 0; j < GRID_SIZE; j++) {
      clickMapArray[i][j] = new Point(positionX, positionY);
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
  return new Point(x, y);
}

function drawDot(point, context) {
  context.beginPath();
  context.arc(point.x, point.y, 3, 0, 2 * Math.PI);
  context.fillStyle = "black";
  context.fill();
  context.stroke();
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

function getBoardRef(point, clickMapArray) {
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
        return new BoardRef(i, j);
      }
    }
  }
}
