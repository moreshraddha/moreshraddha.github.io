var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();
    var pg = require('pg');

var dbOperations = require("./dbOperation.js");
 var logFmt = require("logfmt");
app.set('views', __dirname + '/views/index.html') ;
app.get('/' , function(req,res) {
    res.sendFile(__dirname +'/views/index.html');
} );
app.post('/readRecords', function(req,res){
    dbOperations.getRecords(req,res);
});
app.post('/save', function(req,res){
    dbOperations.save(req,res);
});
app.delete('/delete', function(req,res){
    dbOperations.delete(req,res);
});
 
app.put('/updateRecord', function(req,res){
    dbOperations.updateRecord(req,res);
});

var conString = process.env.DATABASE_URL ||  "pg://postgres:shraddha@localhost:5432/Employee";
var client = new pg.Client(conString);
client.connect();   
var query = client.query( "CREATE TABLE if not exists student ( firstname character varying(50),lastname character varying(20),email character varying(30),mobile character varying(12),id serial NOT NULL)");  
console.log("Connected to DB");
app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/client')); 

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


