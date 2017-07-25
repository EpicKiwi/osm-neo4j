const Taggable = require("./Taggable")

module.exports = class Node extends Taggable {
	constructor(id,latitude,longitude){
		super()
		this.latitude = latitude
		this.longitude = longitude
		this.id = id
	}
}