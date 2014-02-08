var app = angular.module('main', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui-rangeSlider', 'checklist-model']);

app.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'static/partials/home.html',
                controller: 'homePageController'
            })
            .when('/store/:slug', {
                templateUrl: 'static/partials/store.html',
                controller: 'storeController'

            })
            .when('/product/:slug', {
                templateUrl: 'static/partials/product.html',
                // controller:'productController'
                controller: 'pstoreController'
            })
            .when('/user/:slug', {
                templateUrl: 'user.html',
                controller: 'userController'
            })
            .when('/review/:slug', {
                templateUrl: 'review.html',
                controller: 'reviewController'
            })
        // .when ('/search/product/:location/:product',{
        //  templateUrl:'product-search.html',
        //  controller:'searchController'
        // })

        .when('/search/products', {
            templateUrl: 'static/partials/product-search.html',
            controller: 'populateSearchController'
        })

        .when('/search/stores/', {
            templateUrl: 'static/partials/store-search.html',
            controller: 'storeSearchController'
        })

        .when('/about', {
            templateUrl: 'static/partials/about.html'
        })
            .when('/privacy-policy', {
                templateUrl: 'static/partials/privacy-policy.html'
            })
            .when('/product-search', {
                templateUrl: 'static/partials/product-search.html'
            })
            .when('/contact', {
                templateUrl: 'static/partials/contact.html'
            })
            .when('/designers-brands', {
                templateUrl: 'static/partials/designers-brands.html'
            });


        $locationProvider
            .html5Mode(true)
            .hashPrefix('!');

        $sceDelegateProvider
            .resourceUrlWhitelist(['self', 'https://mapsengine.google.com/**', 'https://maps.google.com/**', 'http://162.243.235.72:8000/**']);
    }
]);


// app.filter("myFilter", function(){
//     return function(input, test){
//         var newArray = [];
//         for(var x = 1; x < input.length; x+=1){
//              newArray.push(input[x]);
//         }
//         console.log(newArray);
//         return newArray;
//     };
// });


app.controller('homePageController', ['$scope', '$http', '$resource', 'commonFactory',
    function ($scope, $http, $resource, commonFactory) {
        $scope.homePageData = commonFactory.homeCRUD($resource).get();
    }
]);

app.controller('productController', ['$scope', '$http', '$resource', '$routeParams', 'commonFactory',
    function ($scope, $http, $resource, $routeParams, commonFactory) {
        $scope.productData = commonFactory.productCRUD($resource).get({
            'id': commonFactory.fetchID($routeParams),
        });
    }
]);

app.controller('pstoreController', ['$scope', '$location', '$http', '$resource', '$routeParams', 'commonFactory',
    function ($scope, $location, $http, $resource, $routeParams, commonFactory) {

        var productParams = {
            id: commonFactory.fetchID($routeParams)
        };
        $scope.productData = commonFactory.productCRUD($resource).get(productParams, getStore);

        $scope.thumbURLs = [];
        $scope.mainURLs = "";

        $scope.range = function (num_img) {
            var input = [];
            for (var i = 1; i <= num_img; i++) input.push(i);
            return input;
            // $location.path(path); // $location is a wrapper around JS window.location and handles the routing if a path is passed to it
        }

        // clickForStore is a function which has to be referenced in the button HTML tag. For reference, one can check how the 
        // search() function from searchController on the home page is being called on the search button. A dummy example is provided below.

        $scope.clickForStore = function () {
            var path = "/store/" + $scope.storeData.id;
            // console.log(path);
            $location.path(path); // $location is a wrapper around JS window.location and handles the routing if a path is passed to it
        }

        $scope.togglePhoto = function (index) {
            var prefix = "/static/img/Store_" + $scope.storeData.id + "/P_" + $scope.productData.id + "/";
            $scope.mainURLs = prefix + (index + 1) + "-2.jpg";
        }

        $scope.getDiscount = function () {
            if ($scope.productData.price_discounted == 0 || $scope.productData.price == "Price on request")
                return 0;
            else
                return parseInt((($scope.productData.price - $scope.productData.price_discounted) / $scope.productData.price) * 100);
        }

        function getStore() {
            var storeParams = {
                id: $scope.productData.store
            };
            $scope.storeData = commonFactory.storeCRUD($resource).get(storeParams, setImageUrl);
        }

        function setImageUrl() {
            var prefix = "/static/img/Store_" + $scope.storeData.id + "/P_" + $scope.productData.id + "/";
            $scope.mainURLs = prefix + "1-2.jpg";
            for (var i = 1; i <= $scope.productData.num_images; i++) {
                $scope.thumbURLs.push(prefix + i + "-1.jpg");
            }
            // $scope.imageURLs[0] = prefix + "1-2.jpg";
            // $scope.imageURLs[1] = prefix + "2-1.jpg";
            // $scope.imageURLs[2] = prefix + "3-1.jpg";
            // $scope.imageURLs[3] = prefix + "4-1.jpg";

        }
    }
]);

app.controller('dropdownController', ['$scope',
    function ($scope) {
        $scope.myOptions = [{
            display: "Products",
            id: 1,
            name: 'product'
        }, {
            display: "Stores",
            id: 2,
            name: 'store'
        }];
        $scope.selectedOption = $scope.myOptions[0];
        $scope.$root.selectedOption = $scope.selectedOption
    }
]);

app.controller('CarouselDemoCtrl', ['$scope',
    function ($scope) {

    }
]);


app.controller('tabController', ['$scope',
    function ($scope) {
        $scope.navType = 'pills';
    }
]);

app.controller('DemoController', ['$scope',
    function DemoController($scope) {
        $scope.demo2 = {
            range: {
                min: 0,
                max: 20000
            },
            minPrice: 0,
            maxPrice: 20000
        };
    }
]);

app.controller('userController', ['$scope', '$http', '$resource', '$routeParams', 'commonFactory',
    function ($scope, $http, $resource, $routeParams, commonFactory) {}
]);


app.controller('storeController', ['$scope', '$http', '$resource', '$routeParams', 'commonFactory',
    function ($scope, $http, $resource, $routeParams, commonFactory) {
        $scope.productRow1 = _.range(0, 8);

        var store_number = commonFactory.fetchID($routeParams);

        $scope.storeData = commonFactory.storeCRUD($resource).get({
            'id': store_number
        });
        $scope.storeProducts = commonFactory.storeProducts($resource).get({
            'id': commonFactory.fetchID($routeParams)
        });
    }
]);



app.controller('reviewController', ['$scope', '$http', '$resource', '$routeParams', 'commonFactory',
    function ($scope, $http, $resource, $routeParams, commonFactory) {
        $scope.reviewData = commonFactory.reviewCRUD($resource, $routeParams).get();
    }
]);


app.controller('searchController', ['$scope', '$location', '$http', '$resource', '$routeParams', 'commonFactory',
    function ($scope, $location, $http, $resource, $routeParams, commonFactory) {

        console.log("searchController");


        $scope.myOptions = [{
            display: "Products",
            id: 1,
            name: 'product'
        }, {
            display: "Stores",
            id: 2,
            name: 'store'
        }];
        $scope.selectedOption = $scope.myOptions[0];

        $scope.searchPhrase = {
            product: null,
            location: null
        };


        $scope.results = [];


        // location: $scope.searchPhrase.location || null - good parts

        $scope.search = function () {
            if (!$scope.searchPhrase.product) {
                // console.log("No product");
                $scope.searchPhrase.product = null;
            }
            if (!$scope.searchPhrase.location) {
                // console.log("No location");
                $scope.searchPhrase.location = null;
            }
            if ($scope.selectedOption.id == 1)
                $location.path('/search/products/').search($scope.searchPhrase);
            else
                $location.path('/search/stores/').search($scope.searchPhrase);

            // var searchParams = $scope.searchPhrase; //can get rid of

            // $scope.searchResult = function($resource) {
            //  console.log("searchResults call");
            //  return $resource('http://162.243.235.72:8000/api/search/products');

            // };

            // $scope.searchResult = commonFactory.searchR($resource).get({
            //  'category': $scope.selectedOption.name,
            //  'location': searchParams.location,
            //  'product': searchParams.product,

            // });

        };
    }
]);


app.controller('populateSearchController', ['$location', '$scope', '$http', '$resource', '$routeParams', 'commonFactory',
    function ($location, $scope, $http, $resource, $routeParams, commonFactory) {
        // console.log("Hello"+$routeParams.color)
        $scope.searchResults = fetchRealResults().get();
        var totalItems = $scope.searchResults.count;
        var itemsPerPage = 28;
        $scope.numberOfPages = calculatePages(totalItems);
        $scope.displayQuery = $location.search();
        $scope.filters = {
            location: []
        };
        $scope.Loc = []

        // console.log(fetchRealResults().get())
        $scope.checkdisp = function(index){
            

            var loc_string, loc = $scope.Loc
            for(var i = 0;i<$scope.Loc.length;i++){
                if($scope.Loc[i] == true){
                    if(loc_string == undefined)
                        loc_string = $scope.searchResults.filters.location[index][0]
                    else
                        loc_string = loc_string + "&&" + $scope.searchResults.filters.location[index][0]
                }
                if(i == $scope.Loc.length - 1){
                    $http({method:'GET',url:'http://162.243.235.72:8000/api/search/products?product=all&location='+loc_string})
                        .success(function(d){
                            console.log(d)
                            $scope.SearchResults = d
                        })

                }
            }
        }

        function fetchDummyResults($resource) {
            return $resource('http://162.243.235.72:8000/api/search/products');
        }
        function fetchRealResults() {
            return $resource('http://162.243.235.72:8000/api/search/products', $location.search()); // .length()
        }

        function fetchAfterFilter() {
            return $resource('http://162.243.235.72:8000/api/search/products', $location.search($scope.filters));
        }

        function calculatePages(totalItems) {
            return Math.floor(totalItems / itemsPerPage);
        }
    }

]);

app.controller('storeSearchController', ['$location', '$scope', '$http', '$resource', '$routeParams', 'commonFactory',
    function ($location, $scope, $http, $resource, $routeParams, commonFactory) {
        $scope.searchResults = fetchRealResults().get();
        var totalItems = $scope.searchResults.count;
        var itemsPerPage = 28;
        $scope.numberOfPages = calculatePages(totalItems);
        $scope.displayQuery = $location.search();


        $scope.filters = {
            location: []
        };

        // $location.search($scope.filters.locations);
        // $scope.$watch(
        //  function() {
        //      console.log("enter 1")
        //      return $scope.filters;
        //  },
        //  function (newValue, oldValue) {
        //  console.log("enter 2");
        //  console.log("Change detected" + newValue);
        // } );
        //  function getFilters () {

        // }

        // $scope.demo2 = {
        //  range: {
        //      min: $scope.searchResults.Filters.Price.min,
        //      max: $scope.searchResults.Filters.Price.max
        //  },
        //  minPrice: 0,
        //  maxPrice: 20000 
        // }
        // console.log($location.search("product"))

        function fetchDummyResults($resource) {
            return $resource('http://162.243.235.72:8000/api/search/products');
        }

        function fetchRealResults() {
            return $resource('http://162.243.235.72:8000/api/search/stores', $location.search()); // .length()
        }

        function fetchAfterFilter() {
            return $resource('http://162.243.235.72:8000/api/search/products', $location.search($scope.filters));
        }

        function calculatePages(totalItems) {
            return Math.floor(totalItems / itemsPerPage);
        }


    }
]);

function LocationController($scope, $location) {
    $scope.$watch('locationPath', function (path) {
        $location.path(path);
    });
    $scope.$watch(function () {
        return $location.path();
    }, function (path) {
        $scope.locationPath = path;
    });
}

var ModalDemoCtrl = function ($scope, $modal, $log) {

    // $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            resolve: {
                searchResults: function () {
                    return $scope.searchResults;
                },
                val: function () {
                    console.log($scope.val);
                    return $scope.val;
                }
            }
        });

        // modalInstance.result.then(
        // //   function () {
        // //   // $scope.selected = selectedItem;
        // // }, 
        // function () {
        //   $log.info('Modal dismissed at: ' + new Date());
        // });
    };
};




// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, searchResults, val) {
    console.log("ModalInstanceCtrl");
    console.log(searchResults);
    $scope.searchResults = searchResults;
    $scope.val = val;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

app.factory('commonFactory', function () { //can pass $resource over here as an argument to the factory function

    return {

        homeCRUD: function ($resource) {

            return $resource('http://162.243.235.72:8000/api/home');

        },

        storeCRUD: function ($resource) {

            return $resource('http://162.243.235.72:8000/api/stores/:id', {
                id: '@id'
            });

        },

        storeProducts: function ($resource) {

            return $resource('http://162.243.235.72:8000/api/stores/:id/products', {
                id: '@id'
            });

        },

        productCRUD: function ($resource) {

            return $resource('http://162.243.235.72:8000/api/products/:id', {
                id: '@id'
            });

        },

        userCRUD: function ($resource, $routeParams) {

            return $resource('http://162.243.235.72:8000/api/user/' + $routeParams.slug.split('-').pop());

        },

        reviewCRUD: function ($resource, $routeParams) {

            return $resource('http://162.243.235.72:8000/api/review/' + $routeParams.slug.split('-').pop());

        },

        searchR: function ($resource) {

            return $resource('http://162.243.235.72:8000/api/search/:category/:location/:product', {

                category: '@category',
                location: '@location',
                product: '@product'

            });


        },

        fetchID: function ($routeParams) {
            return $routeParams.slug.split('-').pop();
        }
    };

});

$('.thumb').mouseover(function () {
    $(this).find(".quickView").show();
});

$('.thumb').mouseout(function () {
    $(this).find(".quickView").hide();
});