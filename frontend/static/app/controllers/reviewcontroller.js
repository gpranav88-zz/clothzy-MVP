app.controller('reviewController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){

			window.MY_SCOPE = $scope;

			//$scope.homePageData=commonFactory.homeCRUD().query();
			//$scope.reviewData=$resource('/api/review/'+$routeParams.slug.split('-').pop()).get();
			$scope.reviewData=commonFactory.reviewCRUD($resource,$routeParams).get();

		   }            
   ]);