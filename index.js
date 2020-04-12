const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport")
const path = require("path")
const cookieSession = require("cookie-session");
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
app.use(express.static(path.join(__dirname, "client", "build")))

var device = require('express-device');
app.use(device.capture());


/**
	
	The below lines import the schema that we created for storing movies, and then sets some
	default values for mongoose to prevent too many warnings from popping up. The mongoose.connect()
	statement in the code connects your application with MongoDB.

**/

require("./models/User.js");
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
DATABASE_CONNECTION = process.env.MONGODB_URI || "mongodb://localhost:27017/movies-crud"
console.log(DATABASE_CONNECTION)
mongoose.connect(DATABASE_CONNECTION,{useNewUrlParser: true});  

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["somesecretsauce"]
  })
);

/**
	PassportJS - JWT Authentication With Google
**/
app.use(passport.initialize());
app.use(passport.session());
require("./passport.js");
require("./routes/api/auth.js")(app);
require("./routes/api/movie.js")(app);
require("./routes/api/stats.js")(app);

/// API Endpoints Begin Here
app.get("/api", (req,res)=>{
    res.status(200).send({"message": "Welcome to the movie microservice API."});
});

	
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app
