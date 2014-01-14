app.controller('userController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			//$scope.userData=$resource('/api/user/'+$routeParams.slug).get();
			$scope.userData=commonFactory.userCRUD($resource,$routeParams).get();
			

		   }            
   ]);