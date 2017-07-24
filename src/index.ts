import Logger from "./log/Logger"

import * as xml from "xml2js"
import * as fs from "fs"

Logger.info("Starting file parsing to Neo4J")

xml.parseString(fs.readFileSync("test-files/saint-cyr-centre.osm","utf-8"),(err,result)=>{
	if(err){
		Logger.err(err.message)
		process.exit(1);
	}
	console.log(result.osm.way[0].nd)
})