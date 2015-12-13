var ejs = require("ejs");
var mysql = require('./mysql');
var fs = require("fs");

function onUpload(req,res)
{
	// persist the zip code and description of the problem
	var insertData= "insert into userdata(zipcode, description)VALUES('"+req.param("txt_name")+"','" +req.param("txt_area")+"')";
	console.log("Query is:"+insertData);
	
	mysql.insertData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(1 > 0){
				console.log("data persisted");
				console.log(req);
				fs.readFile(req.files.image.path, function (err, data) {

					var imageName = req.files.image.name;
                    console.log(imageName);
					/// If there's an error
					if(!imageName){

						console.log("There was an error");
						res.redirect("/");
						res.end();

					} else {

					  var newPath = "/home/varun/Varun/WorkSpaces" + "/uploads/" + imageName;

					  /// write file to uploads folder
					  fs.writeFile(newPath, data, function (err) {
			                         
			                        if(err){
						        throw err;
					        }

					  });
					}
				});
				ejs.renderFile('./views/UploadSuccessful.ejs', function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("error in persistence");
				ejs.renderFile('./views/UploadFail.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},insertData);
}

exports.onUpload=onUpload;

