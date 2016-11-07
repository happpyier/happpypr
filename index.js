var express = require('express'); 
var app = express();
var cookieParser = require('cookie-parser');
var pg = require('pg');
const https = require('https');
const fs = require('fs');
var path = require("path");
var url = require("url");
var OAuth = require('oauth').OAuth;
var Twitter = require("node-twitter-api");
var randid_vote = "";
var votechoose_vote = "";
var votes_vote = "";
var uservoted_vote = "";
var ipvoted_vote = "";
var title_vote = "";
var votedalready = "";
var _requestSecret;
var _requestToken;
var _accessToken;
var _accessTokenSecret;
var _screen_name = "";
var twitter = new Twitter({
	consumerKey: 'YZoBVI9Ak2MAxLTRJ460c65Oq',
	consumerSecret: 'UxkG05HcRBlOmOVLvcHM9AlFStHStUMKwtuCKXM0nwtbm5IJAP',
	callback: 'https://happpypr.herokuapp.com/windowClose'
});
var _requestSecret;
app.set('port', (process.env.PORT || 5000));
app.use(cookieParser());
app.set("Content-Type", "text/html");
app.get(['', '/polls'], function(request, response) {
	var postSqlVarRandId = "SELECT randid FROM vote_tb LIMIT 50";
	var postSqlVarTitle = "SELECT title FROM vote_tb LIMIT 50";
	var queryForSQL = "SELECT DISTINCT randid, title FROM vote_tb LIMIT 50";
	if (_screen_name.length > 0)
	{
		fs.readFile('indexSignedIn.html', 'utf8', function (err,data) {
			if (err) 
			{
				return console.log(err);
			}
			response.write(data+"<div id='poll_results'>");
		});
	
	}
	else
	{
		fs.readFile('index.html', 'utf8', function (err,data) {
			if (err) 
			{
				return console.log(err);
			}
			response.write(data+"<div id='poll_results'>");
		});
	}
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
		client.query(postSqlVar, function(err, result) 
		{
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
			if (_screen_name.length > 0)
			{
				fs.readFile('thispollSignedIn.html', 'utf8', function (err,data) {
					if (err) 
					{
						return console.log(err);
					}
					response.write(data);
				});
			
			}
			else
			{
				fs.readFile('thispoll.html', 'utf8', function (err,data) {
					if (err) 
					{
						return console.log(err);
					}
					response.write(data);
				});
			}
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
	if (_screen_name.length > 0)
	{
		fs.readFile('mypollsSignedIn.html', 'utf8', function (err,data) {
			if (err) 
			{
				return console.log(err);
			}
			response.write(data+"<div id='poll_results'>");
		});
	
	}
	else
	{
		res.redirect("https://happpypr.herokuapp.com");
	}
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
app.get('/newpoll', function(request, response)
{
	//NEED to create the rows by title. with seperate votechoose and votes on each row.
	
	if (_screen_name.length > 0)
	{
		fs.readFile('newpollSignedIn.html', 'utf8', function (err,data) {
			if (err) 
			{
				return console.log(err);
			}
			response.write(data);
		});
	
	}
	else
	{
		res.redirect("https://happpypr.herokuapp.com");
	}
});
app.get('/windowClose', function(request, response)
{
	var oauth_verifier = request.param('oauth_verifier');
	requestToken = _requestToken;
	requestTokenSecret = _requestSecret;
	twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
    if (error) {
        console.log(error);
    } else {
        _accessToken = accessToken;
		_accessTokenSecret = accessTokenSecret;

    }
	});
	response.redirect("https://happpypr.herokuapp.com/verifyTwit");
});
app.get('/verifyTwit', function(request, response)
{
	accessToken = _accessToken;
	accessTokenSecret = _accessTokenSecret;
	twitter.verifyCredentials(accessToken, accessTokenSecret, function(error, data, response) 
	{
		if (error) 
		{
			console.log(error);
		} 
		else 
		{
			_screen_name = data["name"];
		}
	});
	fs.readFile('reloadPage.html', 'utf8', function (err,data) 
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
app.get("/twitter/auth", function(req, res) {
	twitter.getRequestToken(function(err, requestToken, requestSecret) {
		if (err)
			res.status(500).send(err);
		else {
			_requestSecret = requestSecret;
			_requestToken = requestToken;
			res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
		}
	});
});
app.get("/twitter/SignOut", function(req, res) {
	_screen_name = "";
	res.redirect("https://happpypr.herokuapp.com");
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});