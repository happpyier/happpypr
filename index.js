var express = require('express'); 
var app = express();
var pg = require('pg');
var path = require("path");
var url = require("url");
var kitty = "Ello";
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");
// USE THIS AS ONE PROJECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Index below this line-------------------------------------------------------------------------------------------------------------------------------------------------->
	app.get('/', function(request, response) {
	  response.sendFile(path.join(__dirname+'/index.html'));
	});
//<--------------------------------------------------------------------------------------------------------------------------------------------------Index below this line

//Voting App below this line--------------------------------------------------------------------------------------------------------------------------------------------->
	app.get('/voting', function(request, response) {
	  response.sendFile(path.join(__dirname+'/voting/polls.html'));
	});
	app.get('/voting/polls', function(request, response) {
	  response.sendFile(path.join(__dirname+'/voting/polls.html'));
	});
	app.get('/voting/polls/:id', function(request, response) {
		pg.connect(process.env.DATABASE_URL, function(err, client, done) 
		{
			client.query("SELECT * FROM vote_tb", function(err, result) {
			  if (err)
			   //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
			   { resultsidSQL = ("Error " + err); }
			  else
			   //{ resultsSQL = "Results " + {results: result.rows}; response.render('pages/db', {results: result.rows} ); }
			   { resultsidSQL = JSON.stringify(encodeURIComponent(result.rows[0]['votechoose'])); }
			   done();
			});	
		});
		var KittyAlarm = resultsidSQL;
		var options = 
		{
			headers: { 'kitkat': KittyAlarm }
		}
	  response.sendFile(path.join(__dirname+'/voting/thispoll.html'), options);
	});
	app.get('/voting/mypolls', function(request, response) {
	  response.sendFile(path.join(__dirname+'/voting/mypolls.html'));
	});
	app.get('/voting/newpoll', function(request, response) {
	  response.sendFile(path.join(__dirname+'/voting/newpoll.html'));
	});
	app.get('/voting/newpoll/:id', function(request, response) {
	
		/*
	  	pg.connect(process.env.DATABASE_URL, function(err, client, done) 
		{
			client.query("INSERT INTO image_search VALUES ('"+parametersSQL+"', '"+dateNowVal+"')", function(err, result) {
			  if (err)
			   //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
			   { resultsidSQL = ("Error " + err); }
			  else
			   //{ resultsSQL = "Results " + {results: result.rows}; response.render('pages/db', {results: result.rows} ); }
			   { resultsidSQL = JSON.stringify(result.rows[0].id); }
			   done();
			});	
		});
		*/
	});
	app.get('/voting/info', function(request, response) {
	  response.sendFile(path.join(__dirname+'/voting/info.html'));
	});
//<--------------------------------------------------------------------------------------------------------------------------------------------Voting App below this line

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});