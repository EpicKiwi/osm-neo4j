const Way = require("./Way")

module.exports = class Highway extends Way {
	constructor(id,type,name){
		super(id)
		this.type = type
		this.name = name
	}
}