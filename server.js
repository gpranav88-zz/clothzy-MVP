var express = require('express');
var server = express(); 


server.configure(function(){
	server.use('/static', express.static(__dirname + '/static'));
	// server.use(express.static('http://162.243.235.72:8000/static'));


	server.get('/api/home', function(req, res) {
		res.json(homePage);
	});

	server.get('/api/product/1', function(req, res) {
		res.json(product);
	});

	server.get('/api/store/1', function(req, res) {
		res.json(store);
	});

	server.get('/about|store|product|review|user.*', function(req, res) {
		res.sendfile(__dirname + '/index.html');
	});

	server.get('/', function(req, res) {
		res.sendfile(__dirname + '/index.html');
	});

});

server.listen(8000);