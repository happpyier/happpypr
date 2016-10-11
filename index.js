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
fs = require('fs');
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");
app.get('', function(request, response) {
	var postSqlVarRandId = "SELECT randid FROM vote_tb LIMIT 50";
	var postSqlVarTitle = "SELECT title FROM vote_tb LIMIT 50";
	var queryForSQL = "SELECT randid, title FROM vote_tb LIMIT 50";
	
	fs.readFile('index.html', 'utf8', function (err,data) {
		if (err) 
		{
			return console.log(err);
		}
		response.write(data);
	});
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query(queryForSQL, function(err, result) {
			if (err)
		    {
				resultsidSQL = ("Error term" + err);
			}
			else
		    {
				
				testSQlValue = result.rows;
				preresultsidSQL = JSON.stringify(result.rows);
				rowCount = JSON.stringify(result.rowCount);
				resultsidSQL = preresultsidSQL.split(",");
				response.write(typeof(testSQlValue[0]) + "..." + testSQlValue["randid"] + "<br/>");
				resultsidSQL.forEach(function(value){
						response.write(value + "..." + typeof(value) +"<br/>");
				});
				//resultsidSQL.forEach(function(entry) {
				//	response.write(entry);
				//});
			}
			done();
			fs.readFile('footer.html', 'utf8', function (err,data) {
				if (err) 
				{
					return console.log(err);
				}
				response.end(data);
			});
		});
	});
	
	//response.write(preresultsidSQL);
	//response.end();
});
/*
app.get('/polls', function(request, response) {
  
	var postSqlVarRandId = "SELECT randid FROM vote_tb LIMIT 50";
	var postSqlVarTitle = "SELECT title FROM vote_tb LIMIT 50";
	var testSQL = "SELECT * FROM vote_tb LIMIT 50";
	pg.connect(process.env.DATABASE_URL, function(err, client, done) 
	{
		client.query(testSQL, function(err, result) {
		  if (err)
		   //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
		   { resultsidSQL = ("Error " + err); }
		  else
		   { 
				resultsidSQLRandId = JSON.stringify(result.rows);
				response.send(resultsidSQLRandId);					
		   }
		   done();
		});			
	});
	
	//response.sendFile(path.join(__dirname+'/voting/polls.html'), options, function (err) 
	{
		if (err) {
		  response.status(err.status).end();
		}
		else {
		  response.status('Sent:', options);
		}
	  });
});

app.get('/polls/:id', function(request, response) {
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
app.get('/mypolls', function(request, response) {
  response.sendFile(path.join(__dirname+'/voting/mypolls.html'));
});
app.get('/newpoll', function(request, response) {
  response.sendFile(path.join(__dirname+'/voting/newpoll.html'));
});
*/
app.get('/info', function(request, response) {
  response.sendFile(path.join(__dirname+'/voting/info.html'));
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});