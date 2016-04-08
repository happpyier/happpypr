var express = require('express'); 
var app = express();
var pg = require('pg');
var path = require("path");
var url = require("url");
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});