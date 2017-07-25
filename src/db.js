const neo4j = require('neo4j-driver').v1;
var connection, session

exports.init = function(){
	connection = neo4j.driver("bolt://192.168.99.100", neo4j.auth.basic("neo4j", "kiwi"));
	session = connection.session()
}

exports.getConnection = function(){
	return connection;
}

exports.getSession = function(){
	return session;
}