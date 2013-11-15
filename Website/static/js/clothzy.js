angular
    .module('main',[])
    .config(function($routeProvider){
        $routeProvider
            .when ('/',{
                templateUrl:'index.html'
            });
    })
    .controller('index',function($scope){
        //dummy json
    });
