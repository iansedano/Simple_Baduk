class pos {
	constructor(bx, by){
	this.bx = bx
	this.by = by
	this._state = "empty"
	}

	set state(string) {
		if (string === "black" || string === "white" || string === "empty") {
			this._state = string;
		} else {
			console.log("invalid state")
			debugger
		}
	}

	get state() {
		return this._state;
	}


	
}