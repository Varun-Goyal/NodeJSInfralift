var ejs= require('ejs');
var mysql = require('mysql');

//Test code starts
console.log("varun");
// Test code ends


function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root',
	    database : 'TeamProject',
	    port     : 3306
	});
	return connection;
}


function insertData(callback,sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, results, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+results);
			callback(err, results);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

exports.insertData=insertData;
