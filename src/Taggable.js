module.exports = class Taggable {

	constructor(){
		this.tags = {}
	}

	addTag(tag){
		this.tags[tag.key] = tag.value
	}

	tagNumber(){
		return Object.keys(this.tags).length
	}
}