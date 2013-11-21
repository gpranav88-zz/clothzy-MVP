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

app.controller('homePageController',['$scope','$http',function($scope,$http,homePageFactory){

               $scope.featuredStores=homePageFactory.getFeaturedStores($http);

               $scope.latestDesigns=homePageFactory.getLatestDesigns($http);

               $scope.topReviewers=homePageFactory.getTopReviewers($http);

           }            
   ]);

app.factory('homePageFactory',function(){

    return {

        getFeaturedStores:function($http){

            $http({
                method: 'GET', url: '/api/store/featured/'
            })
            .success(function(data, status, headers, config) {
               return data;

           });

        },



        getLatestDesigns:function($http){

            $http({
                method: 'GET', url: '/api/product/latest/'
            })
            .success(function(data, status, headers, config) {
               return data;

           });

        },


        getTopReviewers:function($http){

            $http({
                method: 'GET', url: '/api/user/top/'
            })
            .success(function(data, status, headers, config) {
               return data;

           });

        },






    };




});