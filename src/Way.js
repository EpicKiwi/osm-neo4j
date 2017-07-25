const Taggable = require("./Taggable")

module.exports = class Way extends Taggable {

	constructor(id){
		super()
		this.id = id
		this.nodes = []
	}

	addNode(node){
		this.nodes.push(node)
	}

}