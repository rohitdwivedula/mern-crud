var {Movie} = require("../../models/Movie.js");
var User = require("../../models/User.js");
var {PageView} = require("../../models/PageView.js");
var utils = require("./utils.js");

module.exports = app => {
  app.get("/api/stats/", (req,res)=>{
      res.status(200).send({message: "State surveillance metrics exposed in a public API."})
  });

  app.get("/api/stats/movies/", (req,res)=>{
	// how many movies were added over the last few days?
	var days = req.query.days;
	if(days == undefined) days = 6;
	console.log("[STATS: Movies] Returning last", days, "days of data");
	var now = new Date();
	var old_time = new Date(now.getTime()  - (days * 24 * 60 * 60 * 1000));
	var pipeline = [
	    {	
	    	"$match": {
				"created_at": {
					"$gte": old_time,
					"$lte": now
				}    		
	    	}
	    },
	    {
	        "$group": {
	            "_id": {
	            	"year":  { "$year": "$created_at"  },
	            	"month": { "$month": "$created_at" },
	            	"day":   { "$dayOfMonth": "$created_at" }
	            },
	            "count": { "$sum": 1 }
	        }
	    }
	];
	Movie.aggregate(pipeline, function (err, result){
	    if (err) res.status(500).send({message:"Internal server error."});
		result.sort(utils.compare_dates);
		var daywise_data = [];
		for(var i=0;i<result.length;i++){
			daywise_data.push(result[i].count);
		}
	    res.status(200).send({data: daywise_data});
	});
  });

  app.get("/api/stats/users/", (req,res)=>{
	// how many movies were added over the last few days?
	var days = req.query.days;
	if(days == undefined) days = 6;
	console.log("[STATS: Users] Returning last", days, "days of data");
	var now = new Date();
	var old_time = new Date(now.getTime()  - (days * 24 * 60 * 60 * 1000));
	var pipeline = [
	    {	
	    	"$match": {
				"created_at": {
					"$gte": old_time,
					"$lte": now
				}    		
	    	}
	    },
	    {
	        "$group": {
	            "_id": {
	            	"year":  { "$year": "$created_at"  },
	            	"month": { "$month": "$created_at" },
	            	"day":   { "$dayOfMonth": "$created_at" }
	            },
	            "count": { "$sum": 1 }
	        }
	    }
	];
	User.aggregate(pipeline, function (err, result){
	    if (err) res.status(500).send({message:"Internal server error."});
		result.sort(utils.compare_dates);
		var daywise_data = [];
		for(var i=0;i<result.length;i++){
			daywise_data.push(result[i].count);
		}
	    res.status(200).send({data: daywise_data});
	});
  });

  app.get("/api/stats/views/total", (req,res)=>{
  	var request_type = req.query.type; 
  	/*
  	 * type == "device" -> return total pageviews grouped by device
  	 * type == "endpoint" -> return total pageviews grouped by endpoint
	 */
	if(!(request_type == "device" || request_type == "endpoint")){
		request_type = "device"; // default
	}
  	var pipeline = [
	    {"$match":{}},
	    {
	        "$group": {
	            "_id": {
	            	"label": "$" + request_type
	            },
	            "count": { "$sum": 1 }
	        }
	    }
	];
	PageView.aggregate(pipeline, function (err, result){
	    if (err) res.status(500).send({message:"Internal server error."});
	    else res.status(200).send({type: request_type, data: result});
	});
  });

  app.get("/api/stats/views/", (req,res)=>{
  	PageView.countDocuments({},(err, count) => {
      if (err) {
        res.status(500).send({status:false, error:err})
      } 
      else {
        res.status(200).send({"views": count});
      }
    });


  });
}