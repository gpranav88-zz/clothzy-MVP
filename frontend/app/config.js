var app = angular.module('main',['ngResource','ngRoute']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
	$routeProvider
		.when ('/',{
			templateUrl:'home.html',
			controller:'homePageController'
		})
		.when ('/store/:slug',{
			templateUrl:'store.html',
			controller:'storeController'

		})
		.when ('/product/:slug',{
			templateUrl:'product.html',
			controller:'productController'
		})
		.when ('/user/:slug',{
			templateUrl:'user.html',
			controller:'userController'
		})
		.when ('/review/:slug',{
			templateUrl:'review.html',
			controller:'reviewController'
		})
		.when ('/search/:slug',{
			templateUrl:'search.html',
			controller:'searchController'
		});


   $locationProvider
      .html5Mode(true)
      .hashPrefix('!');
}]);
