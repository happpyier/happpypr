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
app.get(['', '/polls'], function(request, response) {
	var postSqlVarRandId = "SELECT randid FROM vote_tb LIMIT 50";
	var postSqlVarTitle = "SELECT title FROM vote_tb LIMIT 50";
	var queryForSQL = "SELECT DISTINCT randid, title FROM vote_tb LIMIT 50";
	
	fs.readFile('index.html', 'utf8', function (err,data) {
		if (err) 
		{
			return console.log(err);
		}
		response.write(data+"<div id='poll_results'>");
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
				testSQlValue.forEach(function(value){
					response.write("<a href=\'https://happpypr.herokuapp.com/polls/" + value["randid"] + "\'><div 'class='resultsPoll'>" + value["title"] + "</div></a>");
				});
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
});

app.get('/polls/:id', function(request, response) {
	//NEED to create the rows by title. with seperate votechoose and votes on each row.
	//
	//
	//
	//
	var pickId = request.params.id;
	var postSqlVar = "SELECT * FROM vote_tb WHERE randid LIKE \'"+pickId+"\'";
	pg.connect(process.env.DATABASE_URL, function(err, client, done) 
	{
		client.query(postSqlVar, function(err, result) {
		  if (err)
		   { resultsidSQL = ("Error " + err); }
		  else
		   { 
				/*
				for (var i = 0, i < len; i++) 
				{
					randid_voteVal += JSON.stringify(result.rows[i].randid);
					votechoose_voteVal += JSON.stringify(result.rows[i].votechoose);
					votes_voteVal += JSON.stringify(result.rows[i].votes);
					uservoted_voteVal += JSON.stringify(result.rows[i].uservoted);
					ipvoted_voteVal += JSON.stringify(result.rows[i].ipvoted);
					title_voteVal+= JSON.stringify(result.rows[i].title);
					alreadyvoted_voteVal += JSON.stringify(result.rows[i].votedalready);
				}
				*/
					alertVar = result.rowCount;
					randid_voteVal = JSON.stringify(result.rows[0].randid);
					votechoose_voteVal = JSON.stringify(result.rows[0].votechoose);
					votes_voteVal = JSON.stringify(result.rows[0].votes);
					uservoted_voteVal = JSON.stringify(result.rows[0].uservoted);
					ipvoted_voteVal = JSON.stringify(result.rows[0].ipvoted);
					title_voteVal = JSON.stringify(result.rows[0].title);
					alreadyvoted_voteVal = JSON.stringify(result.rows[0].votedalready);
				response.write( "<div>" + alertVar + "</div> <div class='hidden' style='display:none' id= 'randid_hidden'>" + randid_voteVal + "</div> <div class='hidden' style='display:none' id= 'votechoose_hidden'>" + votechoose_voteVal + "</div> <div class='hidden' style='display:none' id= 'votes_hidden'>" + votes_voteVal + "</div> <div class='hidden' style='display:none' id= 'uservoted_hidden'>" + uservoted_voteVal + "</div> <div class='hidden' style='display:none' id= 'ipvoted_hidden'>" + ipvoted_voteVal + "</div> <div class='hidden' style='display:none' id= 'title_hidden'>" + title_voteVal + "</div> <div class='hidden' style='display:none' id= 'alreadyvoted'>" + alreadyvoted_voteVal + "</div>"	);
		   }
		   done();
		   	fs.readFile('thispoll.html', 'utf8', function (err,data) 
			{
				if (err) 
				{
					return console.log(err);
				}
				response.end(data);
			});	
	});

	});
});
app.get('/submit/:id/:selection', function(request, response) 
{
	var pickId = request.params.id;
	var postSqlVar = "UPDATE vote_tb  SET votedalready = '1' WHERE randid LIKE \'"+pickId+"\'";
	var location = '/polls/' + pickId;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) 
	{
		client.query(postSqlVar, function(err, result) 
		{
			if (err)
				{ resultsidSQL = ("Error " + err); }
			else
			{ 
				response.redirect(location);
				response.end();
			}
			done();
		});

	});
});
app.get('/mypolls', function(request, response) 
{
	fs.readFile('mypolls.html', 'utf8', function (err,data) 
	{
		if (err) 
		{
			return console.log(err);
		}
		response.end(data);
	});	
});
app.get('/newpoll', function(request, response)
{
	//NEED to create the rows by title. with seperate votechoose and votes on each row.
	
	fs.readFile('newpoll.html', 'utf8', function (err,data) 
	{
		if (err) 
		{
			return console.log(err);
		}
		response.end(data);
	});	
});
app.get('/info', function(request, response)
{
	fs.readFile('info.html', 'utf8', function (err,data) 
	{
		if (err) 
		{
			return console.log(err);
		}
		response.end(data);
	});	
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});