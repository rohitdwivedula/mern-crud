const csv = require('csv-parser');
const fs = require('fs'); 
var Client = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

Client.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Connected to database: ", url);
  var dbo = db.db("movies-crud");
  fs.createReadStream("movie_data.csv")
	.pipe(csv())
	.on('data', function(data){
	    try {
	    	data.cast = [data.cast];
	    	data.created_at = new Date(data.created_at);
	    	dbo.collection("movies").insertOne(data, function(err, res) {
		    	if (err) console.log(err);
		  	});
	    }
	    catch(err) {
	    	console.log(err);
	    	throw err;
	        console.log("An error occured while trying to process movies data.")
	    }
	});  

  fs.createReadStream("user_data.csv")
	.pipe(csv())
	.on('data', function(data){
	    try {
	    	data.created_at = new Date(data.created_at);
	    	dbo.collection("users").insertOne(data, function(err, res) {
		    	if (err) throw err;
		    	db.close();
		  	});
	    }
	    catch(err) {
	        console.log("An error occured while trying to process users data.")
	    }
	}); 

	fs.createReadStream("pageview_data.csv")
	.pipe(csv())
	.on('data', function(data){
	    try {
	    	data.created_at = new Date(data.created_at);
	    	dbo.collection("pageviews").insertOne(data, function(err, res) {
		    	if (err) throw err;
		    	db.close();
		  	});
	    }
	    catch(err) {
	        console.log("An error occured while trying to process PageViews data.")
	    }
	});
});