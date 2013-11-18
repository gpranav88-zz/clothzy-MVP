angular
    .module('main',[])
    .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
        $routeProvider
            .when ('/',{
                templateUrl:'home.html'
            })
            .when ('/store/:id',{
                templateUrl:'store.html'
            })
            .when ('/products/:id',{
                templateUrl:'product.html'
            });            
//
        //$locationProvider
        //    .html5Mode(true)
        //    .hashPrefix('!');
    }])
    .controller('home',['$scope','$http',function($scope,$http){
        $http({method: 'GET', url: '/api/stores/featured/'})
            .success(function(data, status, headers, config) {
                $scope.featuredStores=data;

            });
        $http({method: 'GET', url: '/api/products/latest/'})
            .success(function(data, status, headers, config) {
                $scope.latestDesigns=data;

            });
        $http({method: 'GET', url: '/api/users/top/'})
            .success(function(data, status, headers, config) {
                $scope.topReviewers=data;

            });            
    }]);

