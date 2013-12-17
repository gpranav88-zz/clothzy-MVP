


var homePage = {

	featured:[
		{	id:1,
			slug:'xyz-store-1',
			name:'XYZ Store',
			description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
			address:'23, Abc Road, New Delhi - 110033',
			phone:'011-25930253',
			timing:'10AM - 10PM'
		},

		{	id:2,
			name:'ABC Store',
			slug:'abc-store-2',
			description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
			address:'23, Abc Road, New Delhi - 110033',
			phone:'011-25930253',
			timing:'10AM - 10PM'
		},

		{	id:3,
			name:'DEF Store',
			slug:'def-store-3',
			description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
			address:'23, Abc Road, New Delhi - 110033',
			phone:'011-25930253',
			timing:'10AM - 10PM'
		},


	],

	top:[
		{	user_id:1,
			name:'Arun Kumar',
			location:'New Delhi',
			upvotes:'50',
			downvotes:'20',
			title:'XYZ Store, Lajpat Nagar',
			description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
			review_id:234
		},

		{	user_id:2,
			name:'Satish Sharma',
			location:'New Delhi',
			upvotes:'50',
			downvotes:'20',
			title:'XYZ Store, Lajpat Nagar',
			description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
			review_id:235
		},

		{	user_id:3,
			name:'Priya Das',
			location:'New Delhi',
			upvotes:'50',
			downvotes:'20',
			title:'XYZ Store, Lajpat Nagar',
			description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
			review_id:2366
		},



	],

	latest:[
		{	id:1,
			name:'Product 1',
			description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
		},

		{	id:2,
			name:'Product 2',
			description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
		}



	]

};

var product={

	description:{
		title:'Supernet Cotton Saree',
		price:'1500',
		rating:'4',
		overview:'Effortlessly fetch the limelight at any social do by walking in wearing this beautiful green saree from Bunkar. The exquisite self pattern and charming design highlight a graceful visage, while the cotton blend fabric makes for a comfortable wear.',
		color:'Purple',
		size:'Free Size',
		material:'Silk',
		status:'In Stock!'

	},

	location:{
		id:1,
		title:'XYZ Store',
		phone:'011-25930253',
		address:'23, Abc Road, New Delhi - 110033',
		timings:'10AM - 10PM',
		about:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'

	},

	reviews:[{
		id:1,
		name:'Satish Sharma',
		upvotes:'50',
		downvotes:'20',
		description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
		rating:'4'

	}],

	similar:[{
		title:'Supernet Cotton Saree',
		location:'Store XYZ, Hauz Khas Village',
		price:'1,500'

	}]

};


var store = {

	description:{

		id:1,
		title:'XYZ Store',
		phone:'011-25930253',
		address:'23, Abc Road, New Delhi - 110033',
		timings:'23, Abc Road, New Delhi - 110033',
		about:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'

	},

	collection:[{
		title:'Supernet Cotton Saree',
		location:'Store XYZ, Hauz Khas Village',
		price:'1,500'

	}],

	reviews:[{
		id:1,
		name:'Satish Sharma',
		upvotes:'50',
		downvotes:'20',
		description:'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
		rating:'4'

	}],

	photos:{

	},

	map:{

	}

};


var express = require('express');
var server = express(); 


server.configure(function(){
	server.use('/static', express.static(__dirname + '/static'));
	server.use(express.static(__dirname + '/templates'));

	server.get('/store|product|review|user\/.*', function(req, res) {
		res.sendfile(__dirname + '/templates/index.html');
	});

	server.get('/api/home', function(req, res) {
		res.json(homePage);
	});

	server.get('/api/product/1', function(req, res) {
		res.json(product);
	});

	server.get('/api/store/1', function(req, res) {
		res.json(store);
	});

});

server.listen(3000);