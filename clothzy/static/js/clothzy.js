//angular
//    .module('main',[])
//    .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
//        $routeProvider
//            .when ('/',{
//                templateUrl:'home.html'
//            })
//            .when ('/store/:id',{
//                templateUrl:'store.html'
//            })
//            .when ('/product/:id',{
//                templateUrl:'product.html'
//            });            
////
//        //$locationProvider
//        //    .html5Mode(true)
//        //    .hashPrefix('!');
//    }])
//    .controller('home',['$scope','$http',function($scope,$http){
//        $http({method: 'GET', url: '/api/store/featured/'})
//            .success(function(data, status, headers, config) {
//                $scope.featuredStores=data;
//
//            });
//        $http({method: 'GET', url: '/api/product/latest/'})
//            .success(function(data, status, headers, config) {
//                $scope.latestDesigns=data;
//
//            });
//        $http({method: 'GET', url: '/api/user/top/'})
//            .success(function(data, status, headers, config) {
//                $scope.topReviewers=data;
//
//            });            
//    }]);


var app = angular.module('main',['ngResource','ngRoute', 'ngCookies'], function ($interpolateProvider) {
	$interpolateProvider.startSymbol("{[{");
       $interpolateProvider.endSymbol("}]}");
});

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

app.run(function($rootScope, $log, $http, $cookies) {

    $http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];

});

app.controller('homePageController',['$scope','$http','$resource','commonFactory',function($scope,$http,$resource,commonFactory){

			window.MY_SCOPE = $scope;

			$scope.homePageData=commonFactory.homeCRUD($resource).get();
			//$scope.homePageData=$resource('/api/home/').get();
			

		   }            
   ]);



app.controller('productController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			//$scope.productData=$resource('/api/product/'+$routeParams.slug.split('-').pop()).get();
			//var id = $routeParams.slug.split('-').pop();
			$scope.productData=commonFactory.productCRUD($resource).get({
				'id':commonFactory.fetchID($routeParams)
			});
			

		   }            
   ]);


app.controller('userController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			//$scope.userData=$resource('/api/user/'+$routeParams.slug).get();
			$scope.userData=commonFactory.userCRUD($resource,$routeParams).get();
			

		   }            
   ]);


app.controller('storeController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			//$scope.storeData=$resource('/api/store/'+$routeParams.slug.split('-').pop()).get();
			//var id = $routeParams.slug.split('-').pop();
			$scope.storeData=commonFactory.storeCRUD($resource).get({
				'id':commonFactory.fetchID($routeParams)
			});
			

		   }            
   ]);

app.controller('reviewController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			//$scope.reviewData=$resource('/api/review/'+$routeParams.slug.split('-').pop()).get();
			$scope.reviewData=commonFactory.reviewCRUD($resource,$routeParams).get();

		   }            
   ]);

app.controller('searchController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){

			window.MY_SCOPE = $scope;

			var searchQueryObject;

			//$scope.homePageData=commonFactory.homeCRUD().query();

			$scope.searchData=commonFactory.searchR($resource).get(searchQueryObject);



			

		   }            
   ]);

app.factory('commonFactory',function(){

	return {

			homeCRUD:function($resource){

				return $resource('http://localhost:8000/api/home'); 

			},

			storeCRUD:function($resource){

				return $resource('/api/store/:id',{
					id:'@id'
				});

			},

			productCRUD:function($resource){

				return $resource('http://localhost:8000/api/products/:id',{
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

				return $resource('/api/search/location/:param1/price/:param2/size/:param3',

					{
						param1:'@param1',
						param2:'@param2',
						param3:'@param3'

					}


				);

			},

			fetchID:function($routeParams){
				return $routeParams.slug.split('-').pop();
			}




	};

});