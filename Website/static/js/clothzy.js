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


var app = angular.module('main',[]);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
	$routeProvider
		.when ('/',{
			templateUrl:'home.html'
		})
		.when ('/store/:id',{
			templateUrl:'store.html'
		})
		.when ('/product/:id',{
			templateUrl:'product.html'
		});            

   //$locationProvider
   //    .html5Mode(true)
   //    .hashPrefix('!');
}]);

app.controller('homePageController',['$scope','$http','$q','commonFactory',function($scope,$http,$q,commonFactory){


			window.MY_SCOPE = $scope;
			//$scope.featuredStores=commonFactory.getDummy();

			//$scope.featuredStores=commonFactory.getFeaturedStores($http);

			//$scope.latestDesigns=commonFactory.getLatestDesigns($http);

			//$scope.topReviewers=commonFactory.getTopReviewers($http);

			$scope.homePageData=commonFactory.getFromAPI('/api/home/');
			

		   }            
   ]);

app.factory('commonFactory',function($http,$q){

	return {

		getFromAPI:function(apiURL){ 

			//console.log('wolololo');

			//$http({
			//	method: 'GET', url: apiURL
			//})
			//.success(function(data, status, headers, config) {
			//console.log(data);
			//   return data;

			return $q.all([$http.get(apiURL)])
				.then(function (results) {
                	return results;
            	});



		}

	};




});