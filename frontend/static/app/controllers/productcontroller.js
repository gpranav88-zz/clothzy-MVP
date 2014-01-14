angular.module('main.controllers.productController', [])
	.controller('productController',['$scope','$http','$resource','$routeParams','commonFactory',
		function($scope,$http,$resource,$routeParams,commonFactory){

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			//$scope.productData=$resource('/api/product/'+$routeParams.slug.split('-').pop()).get();
			//var id = $routeParams.slug.split('-').pop();
			$scope.productData=commonFactory.productCRUD($resource).get({
				'id':commonFactory.fetchID($routeParams)
			});
			

		   }            
   ]);