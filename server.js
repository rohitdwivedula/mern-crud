const app = require('./index.js')
/*
	Staring up our server/microservice: The following peice of code starts up our server, tells which 
	port to listen to and a callback on successful deployment
*/
app.listen(PORT,function(){
    console.log("Listening on port ", PORT);
})

