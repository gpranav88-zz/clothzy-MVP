app.controller('searchController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){

			window.MY_SCOPE = $scope;

			var searchQueryObject;

			//$scope.homePageData=commonFactory.homeCRUD().query();

			$scope.searchData=commonFactory.searchR($resource).get(searchQueryObject);
		}            
   ]);