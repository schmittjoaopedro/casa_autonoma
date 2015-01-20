var express = require('express');
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var session = require("express-session");
var bodyParser = require("body-parser");

var userSessionJoao = {
	"user": {
		"name" : "Joao",
		"phone" : "96152305",
		"email" : "schmittjoaopedro@gmail.com",
		"username" : "joao",
		"password" : "asd123"
	},
	"mac": "123456",
	"actuators": [{
		"name" : "light",
		"command" : "turn on"
	}, {
		"name" : "arcondition",
		"command" : "turn on 25 degree"
	}]
}

var userSessionMaria = {
	"user": {
		"name" : "Maria",
		"phone" : "96222305",
		"email" : "maria@gmail.com",
		"username" : "maria",
		"password" : "123asd"
	},
	"mac": "654321",
	"actuators": [{
		"name" : "door",
		"command" : "lock"
	}]
}

var clients = {};

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "ssshhhhh" }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get('/home', function(req, res) {
	if(!req.session.user) {
		res.redirect('/');
	} else {
		res.sendFile(__dirname + "/home.html");	
	}
});

app.get('/login/:name', function(req, res) {
	var user = req.param('name', null);
	if(!user) {
		res.send("Usuario nao enviado");
	} else if (user === 'joao') {
		req.session.user = userSessionJoao;
		res.redirect('/home');
	} else if(user === 'maria') {
		req.session.user = userSessionMaria;
		res.redirect('/home');
	} else {
		res.send("Usuario invalido");
	}
});

app.get('/send/:mac/:message', function(req, res) {
	var mac = req.param('mac', null);
	var message = req.param('message', null);
	clients[mac].socket.emit('data', req.session.user.user.name + ': ' + message);
	res.send('OK');
});

io.on('connection', function(socket) {

	console.log('client connected');

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	socket.on('configuration', function(data) {

		if(data['mac'] === 123456) {
			clients[data['mac']] = {
				socket: socket,
				controller: userSessionJoao
			};
		} else {
			clients[data['mac']] = {
				socket: socket,
				controller: userSessionMaria
			};
		}
		console.log('Registered: ' + data['mac']);
	});

});


http.listen(3000, function() {
	console.log('listening on *3000');
});