angular.module('main.controllers.homePageController', [])
	.controller('homePageController', ['$scope','$http','$resource','commonFactory',
		function($scope,$http,$resource,commonFactory){


			window.MY_SCOPE = $scope;

			$scope.homePageData=commonFactory.homeCRUD($resource).get();
			//$scope.homePageData=$resource('/api/home/').get();
			

		   }            
   ]);