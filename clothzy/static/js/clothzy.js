var app = angular.module('main',['ngResource','ngRoute']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
	$routeProvider
		.when ('/',{
			templateUrl:'static/partials/home.html',
			controller:'homePageController'
		})
		.when ('/store/:slug',{
			templateUrl:'static/partials/store.html',
			controller:'storeController'

		})
		.when ('/product/:slug',{
			templateUrl:'static/partials/product.html',
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
		.when ('/search/product/:location/:product',{
			templateUrl:'product-search.html',
			controller:'searchController'
		})
		.when ('/search/store/:location/:product',{
			templateUrl:'storesearch.html',
			controller:'searchController'
		});


   $locationProvider
      .html5Mode(true)
      .hashPrefix('!');
}]);

// app.run(function($rootScope, $log, $http, $cookies) {

//     $http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];

// });

app.controller('homePageController',['$scope','$http','$resource','commonFactory',function($scope,$http,$resource,commonFactory){
			$scope.homePageData=commonFactory.homeCRUD($resource).get();
		   }            
   ]);



app.controller('productController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){
			$scope.productData=commonFactory.productCRUD($resource).get({
				'id':commonFactory.fetchID($routeParams)
			});
		}            
   ]);

app.controller('dropdownController', ['$scope', function($scope) {
	$scope.myOptions = [{ display: "Products", id: 1 , name:'product'}, { display: "Stores", id: 2, name:'store' }];
	$scope.selectedOption = $scope.myOptions[0];
	$scope.$root.selectedOption = $scope.selectedOption
		}
	]);



app.controller('userController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){
		   }            
   ]);


app.controller('storeController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){
			$scope.storeData=commonFactory.storeCRUD($resource).get({
				'id':commonFactory.fetchID($routeParams)
			});
		}            
   ]);

app.controller('reviewController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){
			$scope.reviewData=commonFactory.reviewCRUD($resource,$routeParams).get();
		}            
   ]);

// app.controller('searchController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){
// 			var searchQueryObject;

// 			$scope.searchData=commonFactory.searchR($resource).get(searchQueryObject);
// 		   }            
//    ]);

app.controller('searchController',['$scope','$http','$resource','$routeParams','commonFactory', function($scope,$http,$resource,$routeParams,commonFactory){
			$scope.searchPhrase = {product: null, location: null};
			$scope.results = [];

			$scope.search = function() {
				if (!$scope.searchPhrase.product) {
					// console.log("No product");
					$scope.searchPhrase.product = null;
				}
				if (!$scope.searchPhrase.location) {
					// console.log("No location");
					$scope.searchPhrase.location = null;
				}
				$scope.searchPhrase.category = $scope.selectedOption.name;

				var searchParams = $scope.searchPhrase;

				// commonFactory.searchR($resource).query();
				$scope.searchResult = 
				commonFactory.searchR($resource).get({
					'category': searchParams.category,
					'location': searchParams.location,
					'product': searchParams.product,
				});

   };
   }]);

app.factory('commonFactory',function(){

	return {

			homeCRUD:function($resource){

				return $resource('/api/home'); 

			},

			storeCRUD:function($resource){

				return $resource('/api/stores/:id',{
					id:'@id'
				});

			},

			productCRUD:function($resource){

				return $resource('/api/products/:id',{
					id:'@id'
				}); 

			},

			userCRUD:function($resource,$routeParams){

				return $resource('/api/user/'+$routeParams.slug.split('-').pop());

			},

			reviewCRUD:function($resource,$routeParams){

				return $resource('/api/review/'+$routeParams.slug.split('-').pop());

			},

			searchR:function($resource){

				return $resource('/api/search/:category/:location/:product', {
					
					category: '@category',
					location: '@location',
					product: '@product'
					// query: {
					// 	method: 'GET',
					// 	params: {
					// 		category: '@category',
					// 		location: '@location',
					// 		product: '@product'
					// 	},
					// 	isArray:true
					// }
				});


			},

			fetchID:function($routeParams){
				return $routeParams.slug.split('-').pop();
			}
	};

});