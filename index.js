//Here are all the needed frameworks
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

//We must explicitly say what folders we're going to use (if not, it won't exist for the server)
app.use("/dagre-master", express.static(__dirname + '/dagre-master'));
app.use("/dist", express.static(__dirname + '/dist'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/jquery-ui-1.12.1", express.static(__dirname + '/jquery-ui-1.12.1'));
app.use("/test_data", express.static(__dirname + '/test_data'));
app.use("/util", express.static(__dirname + '/util'));

//We link each get request on an url to an html file
app.get('/', function(req, res){
  res.sendFile(__dirname + '/Design-dependencies.html');
});
app.get('/graph', function(req, res){
 res.sendFile(__dirname + '/Open-graph.html');
});
//We handle all the events coming from the configurator here
io.on('connection', function(socket){
	
	socket.on("connection message", function(){
		console.log("Connected");
	});
	
	socket.on("graph connection", function(){
		console.log("Graph Connected");
		socket.broadcast.emit('need data');
	});

	socket.on("tab to server", function(tab){
		//console.log(tab);
		socket.broadcast.emit('tab to graph', tab);
	});
	
});

//The server is accessed from the port 8080
http.listen(8080, function(){
  console.log('listening on *:8080');
});
