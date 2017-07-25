const db = require("./db")

exports.sync = async function(highways,callback){
	await syncHighways(Object.values(highways))
}

const syncHighways = async function(highwayList){
	for(let i = 0; i<highwayList.length; i++){
		highway = highwayList[i]
		await syncNodes(highway.nodes)
		for(let y = 0; y<highway.nodes.length-1; y++){
			let node = highway.nodes[y]
			let nextNode = highway.nodes[y+1]
			let query = `MATCH (n:Node {osmid: ${node.id}}),
							   (m:Node {osmid: ${nextNode.id}})
						 MERGE (n)-[w:Highway {osmid: ${highway.id}}]->(m)
							ON CREATE SET
								w.name = ${JSON.stringify(highway.name)},
								w.type = ${JSON.stringify(highway.type)}`
			for(tag in highway.tags){
					query += `,\nw.${tag.replace(/:/g,"_")} = ${JSON.stringify(highway.tags[tag])}`
			}
			await (db.getSession().run(query))
		}
		console.log(`Highway ${highway.id} synchronized`)
	}
}

const syncNodes = async function(nodeList){
	for(let i = 0; i<nodeList.length; i++){
		let node = nodeList[i]
		let query = `MERGE (n:Node {osmid: ${node.id}})
						ON CREATE SET
							n.latitude = ${node.latitude},
							n.longitude = ${node.longitude}`
		for(tag in node.tags){
				query += `,\nn.${tag.replace(/:/g,"_")} = ${JSON.stringify(node.tags[tag])}`
		}
		await (db.getSession().run(query))
		console.log(`Node ${node.id} syncronized`)
	}
}