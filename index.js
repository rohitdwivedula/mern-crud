const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path")
require("dotenv").config()

var app = express(); //This is our server object


PORT = process.env.PORT || 5050
/*
	Middleware section: Here we specify our middleware, middlewares are basically functions that modify 
	request and response objects and some processing before they are handled by our routes 

		- body-parser provides middleware to modify the data sent as part of the requests to that
		  is appears/oraganized and easily accessed 
*/

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "movies-crud", "build")))

/**
	
	The below lines import the schema that we created for storing movies, and then sets some
	default values for mongoose to prevent too many warnings from popping up. The mongoose.connect()
	statement in the code connects your application with MongoDB.

**/

var {Movie} = require("./models/Movie.js");
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
DATABASE_CONNECTION = process.env.MONGODB_URI || "mongodb://localhost:27017/movies-crud"
console.log(DATABASE_CONNECTION)
mongoose.connect(DATABASE_CONNECTION,{useNewUrlParser: true});  

app.get("/api",(req,res)=>{
    res.send({"message": "Welcome to the movie microservice API."});
});

app.get("/api/movies",(req,res)=>{
	/// get a list of all movies in the database
    var movie_object = {title: req.body.title, desc: req.body.desc, year: req.body.year, cast: req.body.cast};
    Movie.find({},(err, obj) => {
        if (err) {
          res.send({status:false, error:err})
        } 
        else {
          res.send(obj);
        }
      }	
    );
});

app.post("/api/movie/add",(req,res)=>{
	/// add a movie to the database
    var movie_object = {title: req.body.title, desc: req.body.desc, year: req.body.year, cast: req.body.cast};
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
});

app.get("/api/movie/:id/delete",(req,res)=>{
    Movie.findByIdAndDelete(req.params.id,(err, obj) => {
        if (err) {
          res.send({status:false, message:"Unexpected error occurred."});
        } 
        else {
          res.send({status: true, movieRemoved: obj});
        }
      }
    );
});

/*
	Shown below is a sample structure for how operations on movies would work. 
	Some of the endpoints have been completed, others haven't. 
*/

app.get('/api/movie/:id',(req,res)=>{
	// get movie details by movie ID
    Movie.findById(req.params.id,(err, obj) => {
        if (err) {
          res.send({status:false, message:"Movie not found"});
        } 
        else {
          res.send({movie: obj});
        }
      }
    );
})

app.post("/api/movie/:id/update",(req,res)=>{
    /// update the attributes of a movie in the database 
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
});


/* 
	Other functionalities can be added based on the scope and relevance for your application. The ones shown 
	above are samples to give a brief idea of how to design the functionalities/routes for a small app. 
	Other possibilities are given below. For these to work, you might have to add more schemas and provide a 
	mechanism for people to create an account and login. 
*/

app.get('/api/movie/:id/versions',(req,res)=>{
    /* Route to retrieve all versions of a movie */
})

app.post('/api/movie/:id/add-version',(req,res)=>{
    /* Route to add a version */
})

app.get('/api/movies/top-rated',(req,res)=>{
    /* Route to get top rated movies */
})

app.get('/api/movie/:id/reviews',(req,res)=>{
    /* Route to get reviews of a movie */
})

app.post('/api/movie/:id/rate',(req,res)=>{
    /* Route to post a rating of a movie */
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "movies-crud", "build", "index.html"));
});

/*
	Staring up our server/microservice: The following peice of code starts up our server, tells which 
	port to listen to and a callback on successful deployment
*/
app.listen(PORT,function(){
    console.log("Listening on port ", PORT);
    console.log(process.env);
})

