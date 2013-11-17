var express = require('express');
var server = express(); 


var featured = [
	{	id:1,
		name:'XYZ Store',
		description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
		address:'23, Abc Road, New Delhi - 110033',
		phone:'011-25930253',
		timing:'10AM - 10PM'
	},

	{	id:2,
		name:'ABC Store',
		description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
		address:'23, Abc Road, New Delhi - 110033',
		phone:'011-25930253',
		timing:'10AM - 10PM'
	},

	{	id:3,
		name:'DEF Store',
		description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
		address:'23, Abc Road, New Delhi - 110033',
		phone:'011-25930253',
		timing:'10AM - 10PM'
	},


];




server.configure(function(){
	server.use('/static', express.static(__dirname + '/static'));
	server.use(express.static(__dirname + '/templates'));
	server.get('/api/stores/featured/', function(req, res) {
		res.json(featured);
	});







});

server.listen(3000);