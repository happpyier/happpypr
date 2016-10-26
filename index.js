var express = require('express'); 
var app = express();
var pg = require('pg');
const https = require('https');
const fs = require('fs');
var path = require("path");
var url = require("url");
//var oauth = require('oauth-client');
//require('oauth');
require('oauth-client');
var randid_vote = "";
var votechoose_vote = "";
var votes_vote = "";
var uservoted_vote = "";
var ipvoted_vote = "";
var title_vote = "";
var votedalready = "";
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
				alertVar = result.rows;
				randid_vote = "";
				votechoose_vote = "";
				votes_vote = "";
				uservoted_vote = "";
				ipvoted_vote = "";
				title_vote = "";
				votedalready = "";
				alertVar.forEach(function(value)
				{
					randid_vote = value["randid"];
					votechoose_vote = votechoose_vote +  value["votechoose"]  + "|";
					votes_vote = votes_vote +  value["votes"]  + "|";
					uservoted_vote = uservoted_vote +  value["uservoted"]  + "|";
					ipvoted_vote = ipvoted_vote +  value["ipvoted"]  + "|";
					title_vote = value["title"] ;
					votedalready = votedalready +  value["votedalready"]  + "|";
				});
				votechoose_vote = votechoose_vote.substring(0, votechoose_vote.length - 1);
				votes_vote = votes_vote.substring(0, votes_vote.length - 1);
				uservoted_vote = uservoted_vote.substring(0, uservoted_vote.length - 1);
				ipvoted_vote = ipvoted_vote.substring(0, ipvoted_vote.length - 1);
				votedalready = votedalready.substring(0, votedalready.length - 1);			
				response.write( "<div class='hidden' style='display:none' id= 'randid_hidden'>" + randid_vote + "</div> <div class='hidden' style='display:none' id= 'votechoose_hidden'>" + votechoose_vote + "</div> <div class='hidden' style='display:none' id= 'votes_hidden'>" + votes_vote + "</div> <div class='hidden' style='display:none' id= 'uservoted_hidden'>" + uservoted_vote + "</div> <div class='hidden' style='display:none' id= 'ipvoted_hidden'>" + ipvoted_vote + "</div> <div class='hidden' style='display:none' id= 'title_hidden'>" + title_vote + "</div> <div class='hidden' style='display:none' id= 'alreadyvoted'>" + votedalready + "</div>"	);
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
	var clientIP = request.ip.substring(7);
	var selectionVar = request.params.selection;
	var postSqlVar1 = "UPDATE vote_tb  SET votedalready = '1' WHERE ipvoted LIKE '"+clientIP+"'";
	var postSqlVar2 = "UPDATE vote_tb  SET votes = votes+1, ipvoted='"+clientIP+"' WHERE votechoose = '"+selectionVar+"'";
	var location = '/polls/' + pickId;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) 
	{
		client.query(postSqlVar1, function(err, result) 
		{
			if (err)
				{ resultsidSQL = ("Error " + err); }
			else
			{
				
			}
			done();
		});
	});
	pg.connect(process.env.DATABASE_URL, function(err, client, done) 
	{
		client.query(postSqlVar2, function(err, result) 
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
app.get('/twitter/auth' , function(request, response)
{
	var Authorization = 'oauth_consumer_key=YZoBVI9Ak2MAxLTRJ460c65Oq&oauth_signature_method=PLAINTEXT&oauth_signature=kd94hf93k423kf44%26&oauth_timestamp=1191242090&oauth_nonce=hsu94j3884jdopsl&oauth_version=1.0';
	//var location = 'https://api.twitter.com/oauth/request_token?' + Authorization;
	var location = 'https://api.twitter.com/oauth/authenticate?oauth_token=	981639187-ENufChYj4H962rxFBE42DYHu1bDAWc5wyrffJbbm';
	response.redirect(location);
	response.end();
	
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});