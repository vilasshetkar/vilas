var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var chatData = [];
io.on('connection', function(client) {
	client.on("message", function(data){
		chatData.push(data);
		client.broadcast.emit("messages", client.nickname + " " + data);
		console.log(data);
	});
	client.on('join', function(name) {
		console.log(name + "client joined!");
		client.nickname = name;
		client.broadcast.emit("messages", chatData);
	});
});

app.get('/', function (req, res) {
res.sendFile(__dirname + '/index.html');
});
server.listen(8080);