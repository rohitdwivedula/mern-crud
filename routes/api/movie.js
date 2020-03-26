var {Movie} = require("../../models/Movie.js");
const passport = require("passport");

module.exports = app => {
  app.get("/api/movies", (req,res)=>{
  	/// get a list of all movies in the database
      var movie_object = {title: req.body.title, desc: req.body.desc, year: req.body.year, cast: req.body.cast};
	  if(req.isAuthenticated()){
	      Movie.find({},(err, obj) => {
	          if (err) {
	            res.send({status:false, error:err})
	          } 
	          else {
	            res.send(obj);
	          }
	        }	
	      );
	   }
	   else{
	   	res.status(401).send("Unauthorized")
	   }
  });

  app.post("/api/movie/add",(req,res)=>{
  	/// add a movie to the database
      var movie_object = {title: req.body.title, desc: req.body.desc, year: req.body.year, cast: req.body.cast};
      if(req.body.year < 1888){
      	res.send({status:false, error:"There are no movies before 1888."});
      }
      else if(req.isAuthenticated()){
        Movie.create(movie_object,(err, obj) => {
            if (err) {
              console.log(err);
              res.send({status:false, error:err})
            } 
            else {
              console.log("New movie added successfully");
              res.send({status:true, newMovie: obj});
            }
          }	
        );
      }
      else{
      	res.send({status:false, error:"Not authorized"});	
      }
  });

  app.get("/api/movie/:id/delete",(req,res)=>{
  		if(req.isAuthenticated){
	      Movie.findByIdAndDelete(req.params.id,(err, obj) => {
	          if (err) {
	            res.send({status:false, message:"Unexpected error occurred."});
	          } 
	          else {
	            res.send({status: true, movieRemoved: obj});
	          }
	        }
	      );
	    }
	    else{
	    	res.status(401).send("Unauthorized")
	    }
  });

  app.get('/api/movie/:id',(req,res)=>{
  	// get movie details by movie ID
  	if(req.isAuthenticated()){
	      Movie.findById(req.params.id,(err, obj) => {
	          if (err) {
	            res.send({status:false, message:"Movie not found"});
	          } 
	          else {
	            res.send({movie: obj});
	          }
	        }
	      );
	}
	else{
		res.status(401).send("Unauthorized")
	}
  })

  app.post("/api/movie/:id/update",(req,res)=>{
      /// update the attributes of a movie in the database 
	  if(req.isAuthenticated()){
	      var update = {};
	      if("title" in req.body){
	  		  update["title"] = req.body.title;
	  	  }
	    	if("desc" in req.body){
	    		update["desc"] = req.body.title;	
	    	}
	    	if("year" in req.body){
	    		update["year"] = req.body.year;
	    	}
	    	if("cast" in req.body){
	    		update["cast"] = req.body.cast;	
	    	}
	      Movie.findByIdAndUpdate(req.params.id, update, (err, doc) => {
	      	if(err){
	      		res.send({status:false, message:"Error: not updated"});
	      	}
	      	else {
	      		res.send({status:true, message:"Success: Updated"});	
	      	}
	      });
	}
	else{
		res.status(401).send("Unauthorized");
	}
  });
}