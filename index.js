var express = require('express'); 
var app = express();
var pg = require('pg');
var path = require("path");
var url = require("url");
var kitty = "Ello";
var randid_vote = "";
var votechoose_vote = "";
var votes_vote = "";
var uservoted_vote = "";
var ipvoted_vote = "";
var title_vote = "";
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
	  
	  	var postSqlVarRandId = "SELECT randid FROM vote_tb LIMIT 50";
		var postSqlVarTitle = "SELECT title FROM vote_tb LIMIT 50";
		pg.connect(process.env.DATABASE_URL, function(err, client, done) 
		{
			client.query(postSqlVarRandId, function(err, result) {
			  if (err)
			   //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
			   { resultsidSQL = ("Error " + err); }
			  else
			   //{ resultsSQL = "Results " + {results: result.rows}; response.render('pages/db', {results: result.rows} ); }
			   { 
				    resultsidSQLRandId = JSON.stringify(result.rows);			
			   }
			   done();
			});
			client.query(postSqlVarTitle, function(err, result) {
			  if (err)
			   //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
			   { resultsidSQL = ("Error " + err); }
			  else
			   //{ resultsSQL = "Results " + {results: result.rows}; response.render('pages/db', {results: result.rows} ); }
			   { 
				    resultsidSQLTitle = JSON.stringify(result.rows);			
			   }
			   done();
			});				
		});
		var options = 
		{
			headers: { 
						'randid_vote_main': resultsidSQLRandId,
						'title_vote_main': resultsidSQLTitle,
						'charset': "dog"
					 }
		}
		response.vary('User-Agent').render('docs');

		response.sendFile(path.join(__dirname+'/voting/polls.html'), options, function (err) 
		{
			if (err) {
			  response.status(err.status).end();
			}
			else {
			  response.status('Sent:', options);
			}
		  });
	});

	app.get('/voting/polls/:id', function(request, response) {
		var pickId = request.params.id;
		var postSqlVar = "SELECT * FROM vote_tb WHERE randid LIKE \'"+pickId+"\'";
		pg.connect(process.env.DATABASE_URL, function(err, client, done) 
		{
			client.query(postSqlVar, function(err, result) {
			  if (err)
			   //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
			   { resultsidSQL = ("Error " + err); }
			  else
			   //{ resultsSQL = "Results " + {results: result.rows}; response.render('pages/db', {results: result.rows} ); }
			   { 
				    resultsidSQL = JSON.stringify(result.rows);
					randid_voteVal = JSON.stringify(result.rows[0].randid);
					votechoose_voteVal = JSON.stringify(result.rows[0].votechoose);
					votes_voteVal = JSON.stringify(result.rows[0].votes);
					uservoted_voteVal = JSON.stringify(result.rows[0].uservoted);
					ipvoted_voteVal = JSON.stringify(result.rows[0].ipvoted);
					title_voteVal = JSON.stringify(result.rows[0].title);				
			   }
			   done();
			});	
		});
		var options = 
		{
			headers: { 
						'kitkat': resultsidSQL,
						'randid_vote' : randid_voteVal,
						'votechoose_vote' : votechoose_voteVal,
						'votes_vote' : votes_voteVal,
						'uservoted_vote' : uservoted_voteVal,
						'ipvoted_vote' : ipvoted_voteVal,
						'title_vote' : title_voteVal	
					 }
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