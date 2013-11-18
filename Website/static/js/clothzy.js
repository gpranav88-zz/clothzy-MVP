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
            .when ('/product/:id',{
                templateUrl:'product.html'
            });            
//
        //$locationProvider
        //    .html5Mode(true)
        //    .hashPrefix('!');
    }])
    .controller('home',['$scope','$http',function($scope,$http){
        $http({method: 'GET', url: '/api/store/featured/'})
            .success(function(data, status, headers, config) {
                $scope.featuredStores=data;

            });
        $http({method: 'GET', url: '/api/product/latest/'})
            .success(function(data, status, headers, config) {
                $scope.latestDesigns=data;

            });
        $http({method: 'GET', url: '/api/user/top/'})
            .success(function(data, status, headers, config) {
                $scope.topReviewers=data;

            });            
    }]);

