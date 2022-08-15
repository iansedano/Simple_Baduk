[1mdiff --git a/src/script.js b/src/script.js[m
[1mindex c6e6b90..0d8859c 100644[m
[1m--- a/src/script.js[m
[1m+++ b/src/script.js[m
[36m@@ -49,18 +49,14 @@[m [mclass group {[m
       var cardinals = getCardinals(friendsToCheck[i]);[m
       // above outputs a list of 4 positions or "edge"[m
 [m
[31m-      // gets an array of the cardinal states for readability[m
[31m-      var cardinalStates = [];[m
[31m-      cardinalStates = cardinals.map((i) => i.state);[m
[32m+[m[32m      const cardinalStates = cardinals.map((i) => i.state);[m
 [m
       // following ignores edge or enemy[m
       // if empty adds liberty and to checked list[m
       // if friend adds to friends to check and checked list and group positions[m
       for (j = 0; j < 4; j++) {[m
[31m-        if (cardinals[j] == "edge") {[m
[31m-          //do nothing[m
[31m-        } else if (this.isPosInGroup(cardinals[j])) {[m
[31m-          // do nothing[m
[32m+[m[32m        if (cardinals[j] == "edge" || this.isPosInGroup(cardinals[j])) {[m
[32m+[m[32m          continue;[m
         } else if (cardinalStates[j] == "empty") {[m
           this.liberties += 1;[m
           checkedList[cardinals[j].bx][cardinals[j].by] = cardinals[j];[m
[36m@@ -74,8 +70,7 @@[m [mclass group {[m
   }[m
 [m
   isPosInGroup(pos) {[m
[31m-    var groupPosIndex = "";[m
[31m-    groupPosIndex = this.positions.findIndex((p) => p == pos);[m
[32m+[m[32m    const groupPosIndex = this.positions.findIndex((p) => p == pos);[m
     if (groupPosIndex == -1) {[m
       return false;[m
     } else if (groupPosIndex > -1) {[m
[36m@@ -112,11 +107,11 @@[m [mconst GRID_SIZE = 9;[m
 const PADDING = 48.5;[m
 const GRID_SPACING = 50;[m
 [m
[31m-let playerTurn = "black";[m
[31m-const playerBlack = new player("black");[m
[31m-const playerWhite = new player("white");[m
[32m+[m[32mlet PLAYER_TURN = "black";[m
[32m+[m[32mconst PLAYER_BLACK = new player("black");[m
[32m+[m[32mconst PLAYER_WHITE = new player("white");[m
 [m
[31m-const clickMapArray = createClickMap();[m
[32m+[m[32mconst CLICK_MAP_ARRAY = createClickMap();[m
 [m
 var BOARD = new Array(GRID_SIZE);[m
 for (var i = 0; i < GRID_SIZE; i++) {[m
[36m@@ -132,7 +127,7 @@[m [mfor (i = 0; i < GRID_SIZE; i++) {[m
 drawBoard(PADDING, GRID_SPACING, CTX);[m
 [m
 CANVAS.addEventListener("mousedown", function (e) {[m
[31m-  bRef = getBoardRef(getCursorPosition(CANVAS, e), clickMapArray);[m
[32m+[m[32m  bRef = getBoardRef(getCursorPosition(CANVAS, e), CLICK_MAP_ARRAY);[m
 [m
   if (bRef != undefined) {[m
     currentPlayer = getPlayer();[m
[36m@@ -158,7 +153,7 @@[m [mDrawStones(board, ctx)[m
 [m
 // simple group capture setup[m
 [m
[31m-playerTurn = "white";[m
[32m+[m[32mPLAYER_TURN = "white";[m
 BOARD[1][2].state = "white";[m
 BOARD[2][3].state = "white";[m
 BOARD[3][2].state = "white";[m
[36m@@ -187,18 +182,18 @@[m [mfunction findCoordinate(pos) {[m
 }[m
 [m
 function getPlayer() {[m
[31m-  if (playerTurn === "black") {[m
[31m-    return playerBlack;[m
[32m+[m[32m  if (PLAYER_TURN === "black") {[m
[32m+[m[32m    return PLAYER_BLACK;[m
   } else {[m
[31m-    return playerWhite;[m
[32m+[m[32m    return PLAYER_WHITE;[m
   }[m
 }[m
 [m
 function changeTurn() {[m
[31m-  if (playerTurn === "black") {[m
[31m-    playerTurn = "white";[m
[32m+[m[32m  if (PLAYER_TURN === "black") {[m
[32m+[m[32m    PLAYER_TURN = "white";[m
   } else {[m
[31m-    playerTurn = "black";[m
[32m+[m[32m    PLAYER_TURN = "black";[m
   }[m
 }[m
 [m
[36m@@ -209,7 +204,7 @@[m [mfunction move(bRef, activePlayer) {[m
     window.alert("spot already taken");[m
   } else {[m
     // Temporary assigning colour to position[m
[31m-    currentPosition.state = playerTurn;[m
[32m+[m[32m    currentPosition.state = PLAYER_TURN;[m
 [m
     // initalizing groups list[m
     var groups = [];[m
[36m@@ -373,12 +368,12 @@[m [mfunction drawBoard(pad, gridSpacing, context) {[m
   var tengen = new boardRef((GRID_SIZE - 1) / 2, (GRID_SIZE - 1) / 2);[m
   drawDot(tengen.point, context);[m
 [m
[31m-  document.getElementById("turn").innerHTML = playerTurn + "'s turn";[m
[32m+[m[32m  document.getElementById("turn").innerHTML = PLAYER_TURN + "'s turn";[m
 [m
   document.getElementById("whitePrisoners").innerHTML =[m
[31m-    "black has " + playerBlack.prisoners + " prisoners.";[m
[32m+[m[32m    "black has " + PLAYER_BLACK.prisoners + " prisoners.";[m
   document.getElementById("blackPrisoners").innerHTML =[m
[31m-    "white has " + playerWhite.prisoners + " prisoners";[m
[32m+[m[32m    "white has " + PLAYER_WHITE.prisoners + " prisoners";[m
 }[m
 [m
 function createClickMap() {[m
