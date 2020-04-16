listoflists = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16],[17,18,19,20],[,21,22,23,24]]

var result = ""
for (i = 0; i < listoflists.length; i++) {
	indexofnumber = listoflists[i].findIndex(j => j == 10)
	if (indexofnumber != -1) {result = indexofnumber}
}

console.log(result)

////

list = [1,2,3,4,5]

console.log(list.findIndex(i => i == 2)) // returns number

///

listoflists = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16],[17,18,19,20],[21,22,23,24]]

var result = ""

listoflists.forEach((list, index) => {
	var intindex = list.findIndex(j => j == 10)
	if (intindex != -1) {
		result = index + ":" + intindex
	}
}
)

console.log(result)