class group {
    constructor() {
        this.positions = [];
        this.liberties = 0;
    }

    buildFrom(position, checkedList) {

    	// adds position to list of positions within this group
    	this.positions.push(position)
    	
    	// some definitions for readability
    	this.colour = position.state
		if (this.colour == "white") {this.enemy = "black"}
        if (this.colour == "black") {this.enemy = "white"}

        // initalizing list of 'friends' that make up this group
    	// and adding in current position.
        var friendsToCheck = [position]

        // going through the friends
        for (i = 0; i < friendsToCheck.length; i++) {
        	// getting the adjacent positions
            var cardinals = getCardinals(friendsToCheck[i])
            // above outputs a list of 4 positions or "edge"

            // gets an array of the cardinal states for readability
            var cardinalStates = []
            cardinalStates = cardinals.map(i => i.state)

            // following ignores edge or enemy
            // if empty adds liberty and to checked list
            // if friend adds to friends to check and checked list and group positions
            for (i = 0; i < 4; i++){
            	if (cardinalStates[i] == "empty"){
            		this.liberties += 1
            		checkedList[cardinals[i].bx][cardinals[i].by] = cardinals[i]
            	} else if (cardinalStates[i] == "friend") {
            		this.positions.push(cardinals[i])
            		friendsToCheck.push(cardinals[i])
            		checkedList[cardinals[i].bx][cardinals[i].by] = cardinals[i]
            	}
            }
        }
    }
}