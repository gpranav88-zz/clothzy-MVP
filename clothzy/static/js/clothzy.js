var app = angular.module('main',['ngResource','ngRoute', 'ui.bootstrap']);

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
			// controller:'productController'
			controller: 'pstoreController'
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
		})
		.when ('/about', {
			templateUrl: 'static/partials/about.html'
		})
		.when ('/privacy-policy', {
			templateUrl: 'static/partials/privacy-policy.html'
		})
		.when ('/product-search', {
			templateUrl: 'static/partials/product-search.html'
		})
		.when ('/contact', {
			templateUrl: 'static/partials/contact.html'
		})
		.when ('/designers-brands', {
			templateUrl: 'static/partials/designers-brands.html'
		});


   $locationProvider // look at docs
      .html5Mode(true) // django handle html5 mode
      .hashPrefix('!');
}]);

// app.run(function($rootScope, $log, $http, $cookies) {

//     $http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];

// });

app.filter("myFilter", function(){
    return function(input, test){
        var newArray = [];
        for(var x = 1; x < input.length; x+=1){
             newArray.push(input[x]);
        }
        console.log(newArray);
        return newArray;
    };
});


app.controller('homePageController',['$scope','$http','$resource','commonFactory',function($scope,$http,$resource,commonFactory){
			$scope.homePageData=commonFactory.homeCRUD($resource).get();
		   }            
   ]);



app.controller('productController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){
			$scope.productData=commonFactory.productCRUD($resource).get({
				'id':commonFactory.fetchID($routeParams),
			});
		}            
   ]);

app.controller('pstoreController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){
			console.log("Entered the pstoreController");

			// $scope.productData = commonFactory.productCRUD($resource).get(params, getStore);
			// $scope.productData=commonFactory.productCRUD($resource).get({
			// 	'id':commonFactory.fetchID($routeParams)
			// 	}, function() {
			var productParams = { id: commonFactory.fetchID($routeParams) };
			$scope.productData = commonFactory.productCRUD($resource).get(productParams, getStore);

			$scope.discount = getDiscount();

			if ($scope.productData.price == 'null' || $scope.productData.price === 0) {
				$scope.productData.price = 'Price on Request';
			}
			if ($scope.productData.price_discounted == 'null' || $scope.productData.price === 0) {
				$scope.productData.price_discounted = 'Price on Request';
			}

			function getDiscount() {
				if (($scope.productData.price == 'null' || $scope.productData.price === 0) && $scope.productData.price_discounted == 'null' || $scope.productData.price === 0) {

				return ((($scope.productData.price - $scope.productData.price_discounted) / $scope.productData.price)*100);
				}
				else {
					return "0";
				}
			}


			function getStore() {
				var storeParams = { id: $scope.productData.store };
    			$scope.storeData = commonFactory.storeCRUD($resource).get(storeParams);
}
					// console.log($scope.productData['store']);
					// $scope.storeData=commonFactory.storeCRUD($resource).get({
					// 'id': storeid
			
			// var storeid = productData.store;
			console.log();
			console.log($scope.productData['store']);

			// $scope.storeData=commonFactory.storeCRUD($resource).get({
			// 	'id': storeid
		}            
   ]);

app.controller('dropdownController', ['$scope', function($scope) {
	$scope.myOptions = [{ display: "Products", id: 1 , name:'product'}, { display: "Stores", id: 2, name:'store' }];
	$scope.selectedOption = $scope.myOptions[0];
	$scope.$root.selectedOption = $scope.selectedOption
		}
	]);

app.controller('tabController', ['$scope', function($scope) {
  $scope.navType = 'pills';
               }
                      ]);

app.controller('priceController', ['$scope', function($scope) {
	
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
			
			$scope.myOptions = [{ display: "Products", id: 1 , name:'product'}, { display: "Stores", id: 2, name:'store' }];
			$scope.selectedOption = $scope.myOptions[0];

			$scope.searchPhrase = {product: null, location: null };
			
			
			$scope.results = [];


			// location: $scope.searchPhrase.location || null - good parts

			$scope.search = function() {
				if (!$scope.searchPhrase.product) {
					// console.log("No product");
					$scope.searchPhrase.product = null;
				}
				if (!$scope.searchPhrase.location) {
					// console.log("No location");
					$scope.searchPhrase.location = null;
				}

				var searchParams = $scope.searchPhrase; //can get rid of

				// commonFactory.searchR($resource).query();
				$scope.searchResult = 
				commonFactory.searchR($resource).get({
					'category': $scope.selectedOption.name,
					'location': searchParams.location,
					'product': searchParams.product,
				});

   };
   }]);

app.factory('commonFactory',function(){ //can pass $resource over here as an argument to the factory function

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