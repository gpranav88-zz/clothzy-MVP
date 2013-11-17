angular
    .module('main',[])
    .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
        $routeProvider
            .when ('/',{
                templateUrl:'home.html'
            })
            .when ('/store/',{
                templateUrl:'store.html'
            });
//
        //$locationProvider
        //    .html5Mode(true)
        //    .hashPrefix('!');
    }])
    .controller('index',function($scope){
        //dummy json
    });


function openStore(){
$location.path('/newValue');

}
