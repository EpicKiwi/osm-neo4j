const fs = require("fs")
const xml = require("xml2js")
const parser = require("./parser")
const db = require("./db")
const dbSync = require("./dbSync")

const filepath = process.argv[2]

console.log(`Loading OSM file from ${filepath}`)
xml.parseString(fs.readFileSync(filepath,"utf-8"),(err,xml)=>{
	if(err){
		console.error(err)
		process.exit(1)
	}

	console.log("Parsing nodes")
	let nodes = parser.parseNodes(xml.osm.node)

	console.log("Parsing highways")
	let highways = parser.parseHighways(xml.osm.way,nodes)

	console.log("Connecting Neo4J Database")
	db.init()

	console.log("Synchronisation with database")
	dbSync.sync(highways)
	.then(()=>{
		console.log("Done")
		db.getSession().close()
		db.getConnection().close()
	})

})