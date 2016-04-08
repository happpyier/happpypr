var express = require('express'); 
var app = express();
var pg = require('pg');
var path = require("path");
var url = require("url");
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");

//Index below this line ----->
	app.get('/', function(request, response) {
	  response.sendFile(path.join(__dirname+'/index.html'));
	});
//<-----Index below this line

//Voting App below this line ----->
	app.get('/voting', function(request, response) {
	  response.sendFile(path.join(__dirname+'/voting/polls.html'));
	});
	app.get('/voting/mypolls', function(request, response) {
	  response.sendFile(path.join(__dirname+'/voting/mypolls.html'));
	});
	app.get('/voting/newpoll', function(request, response) {
	  response.sendFile(path.join(__dirname+'/voting/newpoll.html'));
	});
	app.get('/voting/info', function(request, response) {
	  response.sendFile(path.join(__dirname+'/voting/info.html'));
	});
//<-----Voting App below this line

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});