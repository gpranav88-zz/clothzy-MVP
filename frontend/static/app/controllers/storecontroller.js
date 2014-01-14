angular.module('main.controllers.storeController', [])
	.controller('storeController',['$scope','$http','$resource','$routeParams','commonFactory',
		function($scope,$http,$resource,$routeParams,commonFactory) {

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			//$scope.storeData=$resource('/api/store/'+$routeParams.slug.split('-').pop()).get();
			//var id = $routeParams.slug.split('-').pop();
			$scope.storeData=commonFactory.storeCRUD($resource).get({
				'id':commonFactory.fetchID($routeParams)
			});
			

		}            
   ]);