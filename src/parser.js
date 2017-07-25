const Node = require("./Node")
const Tag = require("./Tag")
const Highway = require("./Highway")

exports.parseNodes = function(xmlNodes){
	let nodes = {}
	for(xmlNode in xmlNodes){
		xmlNode = xmlNodes[xmlNode]
		let node = new Node(xmlNode['$'].id,parseFloat(xmlNode['$'].lat),parseFloat(xmlNode['$'].lon))
		extractTags(xmlNode,node)
		nodes[node.id] = node
	}
	return nodes
}

exports.parseHighways = function(xmlWays,parsedNodes){
	let highways = {}
	for(xmlWay in xmlWays){
		xmlWay = xmlWays[xmlWay]
		if(!xmlWay.tag || !xmlWay.tag.some((e)=>e['$'].k == "highway"))
			continue

		let name = null
		if(xmlWay.tag.some((e)=>e['$'].k == "name"))
			name = xmlWay.tag.find((e)=>e['$'].k == "name")['$'].v
		else if(xmlWay.tag.some((e)=>e['$'].k == "ref"))
			name = xmlWay.tag.find((e)=>e['$'].k == "ref")['$'].v

		let way = new Highway(xmlWay["$"].id,
			xmlWay.tag.find((e)=>e['$'].k == "highway")['$'].v,
			name)
		extractTags(xmlWay,way,["highway","name"])
		if(xmlWay.nd){
			for(xmlNode in xmlWay.nd){
				xmlNode = xmlWay.nd[xmlNode]
				let node = parsedNodes[xmlNode["$"].ref]
				if(node){
					way.addNode(node)
				} else {
					console.error(`Can't find node with id ${xmlNode["$"].ref} for way ${way.id}`)
				}
			}
		}
		highways[way.id] = way
	}
	return highways
}

const extractTags = function(xmlElement,taggableElement,ignoredKeys){
	if(!ignoredKeys)
		ignoredKeys = []
	if(xmlElement.tag){
		for(xmlTag in xmlElement.tag){
			xmlTag = xmlElement.tag[xmlTag]
			if(ignoredKeys.some((el)=>el == xmlTag['$'].k))
				continue
			taggableElement.addTag(new Tag(xmlTag['$'].k,xmlTag['$'].v))
		}
	}
}