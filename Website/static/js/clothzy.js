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


var app = angular.module('main',['ngResource','ngRoute']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
	$routeProvider
		.when ('/',{
			templateUrl:'home.html',
			controller:'homePageController'
		})
		.when ('/store/:id',{
			templateUrl:'store.html',
			controller:'storeController'

		})
		.when ('/product/:id',{
			templateUrl:'product.html',
			controller:'productController'
		});            

   //$locationProvider
     //  .html5Mode(true)
       //.hashPrefix('!');
}]);

app.controller('homePageController',['$scope','$http','$resource','commonFactory',function($scope,$http,$resource,commonFactory){

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			$scope.homePageData=$resource('/api/home/').get();
			

		   }            
   ]);


app.controller('productController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			$scope.productData=$resource('/api/product/'+$routeParams.id).get();
			

		   }            
   ]);


app.controller('userController',['$scope','$http','$resource','commonFactory',function($scope,$http,$resource,commonFactory){

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			$scope.homePageData=$resource('/api/home/').get();
			

		   }            
   ]);


app.controller('storeController',['$scope','$http','$resource','commonFactory',function($scope,$http,$resource,commonFactory){

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			$scope.homePageData=$resource('/api/home/').get();
			

		   }            
   ]);

app.controller('reviewController',['$scope','$http','$resource','commonFactory',function($scope,$http,$resource,commonFactory){

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			$scope.homePageData=$resource('/api/home/').get();
			

		   }            
   ]);

app.factory('commonFactory',['$resource',function($resource){

	return {

		homeCRUD:function($resource){

			return $resource('/api/home/'); 

		}

	};

}]
);