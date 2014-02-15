var app = angular.module('main',['ngResource','ngRoute', 'ui.bootstrap', 'ui-rangeSlider', 'checklist-model']);

app.config(['$routeProvider','$locationProvider','$sceDelegateProvider', function($routeProvider,$locationProvider,$sceDelegateProvider){
	$routeProvider
	.when ('/',{
		templateUrl:'static/partials/home.html',
		controller:'homePageController'
	})
	.when ('/store/:slug',{
		templateUrl:'static/partials/store.html',
		controller:'storeController'

	})
	.when ('/product/:slug',{
		templateUrl:'static/partials/product.html',
			// controller:'productController'
			controller: 'pstoreController'
		})
	.when ('/user/:slug',{
		templateUrl:'user.html',
		controller:'userController'
	})
	.when ('/review/:slug',{
		templateUrl:'review.html',
		controller:'reviewController'
	})
	// .when ('/search/product/:location/:product',{
	// 	templateUrl:'product-search.html',
	// 	controller:'searchController'
	// })

	.when ('/search/products/', {
		templateUrl:'static/partials/product-search.html',
		controller:'populateSearchController'
	})

	.when ('/search/stores/',{
		templateUrl:'static/partials/store-search.html',
		controller:'storeSearchController'
	})

	.when ('/about', {
		templateUrl: 'static/partials/about.html'
	})
	.when ('/privacy-policy', {
		templateUrl: 'static/partials/privacy-policy.html'
	})
	.when ('/product-search', {
		templateUrl: 'static/partials/product-search.html'
	})
	.when ('/contact', {
		templateUrl: 'static/partials/contact.html'
	})
	.when ('/designers-brands', {
		templateUrl: 'static/partials/designers-brands.html'
	});


	$locationProvider
	.html5Mode(true)
	.hashPrefix('!');

	$sceDelegateProvider
	.resourceUrlWhitelist(['self','https://www.google.com/**','https://maps.google.com/**']);
}]);

app.controller('MainCtrl', ['$scope', 'commonFactory','$location', function($scope, commonFactory, $location) {
    $scope.baseSearch = function() {
        commonFactory.baseSearch($location,$scope.searchQuery);
    }
}]);
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


app.controller('homePageController',['$scope','$http','$resource','commonFactory',function($scope,$http,$resource,commonFactory){
	$scope.homePageData=commonFactory.homeCRUD($resource).get();
}            
]);

app.controller('productController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){
	$scope.productData=commonFactory.productCRUD($resource).get({
		'id':commonFactory.fetchID($routeParams),
	});
}            
]);

app.controller('pstoreController',['$scope','$location','$http','$resource','$routeParams','commonFactory',function($scope,$location,$http,$resource,$routeParams,commonFactory){

	var productParams = { id: commonFactory.fetchID($routeParams) };
	$scope.productData = commonFactory.productCRUD($resource).get(productParams, getStore);

	$scope.thumbURLs = [];
	$scope.mainURLs = "";

	$scope.range = function(num_img){
		var input = [];
	    for (var i=1; i<=num_img; i++) input.push(i);
	    return input;
		// $location.path(path); // $location is a wrapper around JS window.location and handles the routing if a path is passed to it
	}
 
	// clickForStore is a function which has to be referenced in the button HTML tag. For reference, one can check how the 
	// search() function from searchController on the home page is being called on the search button. A dummy example is provided below.
	 
	$scope.clickForStore = function(){
		var path = "/store/" + $scope.storeData.id;
		// console.log(path);
		$location.path(path); // $location is a wrapper around JS window.location and handles the routing if a path is passed to it
	}

	$scope.togglePhoto = function(index){
		var prefix = "/static/img/Store_" + $scope.storeData.id + "/P_" + $scope.productData.id +"/";
		$scope.mainURLs = prefix + (index+1)+"-2.jpg";
	}

	$scope.getDiscount = function(){

		if($scope.productData.price_discounted==0 || $scope.productData.price=="Price on request")
			return 0;
		else
			return parseInt((($scope.productData.price-$scope.productData.price_discounted)/$scope.productData.price)*100);
	}

	function getStore() {
		var storeParams = { id: $scope.productData.store };
		$scope.storeData = commonFactory.storeCRUD($resource).get(storeParams, setImageUrl);
	}

	function setImageUrl() {
		var prefix = "/static/img/Store_" + $scope.storeData.id + "/P_" + $scope.productData.id +"/";
		$scope.mainURLs = prefix +"1-2.jpg";
		for (var i=1; i<=$scope.productData.num_images; i++){
			$scope.thumbURLs.push(prefix+i+"-1.jpg");
		} 
		// $scope.imageURLs[0] = prefix + "1-2.jpg";
		// $scope.imageURLs[1] = prefix + "2-1.jpg";
		// $scope.imageURLs[2] = prefix + "3-1.jpg";
		// $scope.imageURLs[3] = prefix + "4-1.jpg";

	}
}    
]);

app.controller('dropdownController', ['$scope', function($scope) {
	$scope.myOptions = [{ display: "Products", id: 1 , name:'product'}, { display: "Stores", id: 2, name:'store' }];
	$scope.selectedOption = $scope.myOptions[0];
	$scope.$root.selectedOption = $scope.selectedOption
}
]);

app.controller('CarouselDemoCtrl', ['$scope', function($scope) {

} 
]);


app.controller('tabController', ['$scope', function($scope) {
	$scope.navType = 'pills';
}
]);

app.controller('DemoController', ['$scope', function DemoController($scope) {
	$scope.demo2 = {
		range: {
			min: 0,
			max: 20000
		},
		minPrice: 0,
		maxPrice: 20000
	};
}]);

app.controller('userController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){
}
]);


app.controller('storeController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){
	$scope.productRow1 = _.range(0, 8);
	
	var store_number =commonFactory.fetchID($routeParams);

	$scope.storeData=commonFactory.storeCRUD($resource).get({
		'id':store_number
	});
	$scope.storeProducts=commonFactory.storeProducts($resource).get({
		'id':commonFactory.fetchID($routeParams)
	});
}
]);



app.controller('reviewController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){
	$scope.reviewData=commonFactory.reviewCRUD($resource,$routeParams).get();
}      
]);


app.controller('searchController',['$scope','$location','$http','$resource','$routeParams','commonFactory', function($scope,$location,$http,$resource,$routeParams,commonFactory){

	// console.log("searchController");


	$scope.myOptions = [{ display: "Products", id: 1 , name:'product'}, { display: "Stores", id: 2, name:'store' }];
	$scope.selectedOption = $scope.myOptions[0];

	$scope.searchPhrase = {product: null, location: null };


	$scope.results = [];


			// location: $scope.searchPhrase.location || null - good parts

	$scope.search = function() {
		if (!$scope.searchPhrase.product) {
			// console.log("No product");
			$scope.searchPhrase.product = null;
		}
		if (!$scope.searchPhrase.location) {
			// console.log("No location");
			$scope.searchPhrase.location = null;
		}
		if($scope.selectedOption.id==1)
			$location.path('/search/products/').search($scope.searchPhrase);
		else
			$location.path('/search/stores/').search($scope.searchPhrase);
		
		// var searchParams = $scope.searchPhrase; //can get rid of

		// $scope.searchResult = function($resource) {
		// 	console.log("searchResults call");
		// 	return $resource('/api/search/products');
			
		// };

		// $scope.searchResult = commonFactory.searchR($resource).get({
		// 	'category': $scope.selectedOption.name,
		// 	'location': searchParams.location,
		// 	'product': searchParams.product,

		// });

	};
}]);


app.controller('populateSearchController',['$location','$scope','$http','$resource','$routeParams','commonFactory',function($location,$scope,$http,$resource,$routeParams,commonFactory){
	$scope.searchResults = fetchRealResults().get();
	var itemsPerPage = 28;
	$scope.numberOfPages = 0;
	// $scope.$watch('totalItems', function() {
	//     $scope.updated++;
	// });
	$scope.val1 = true;
	var displayQuery = $location.search();
	$scope.filters = {
		location: []
	};
	$scope.searchFilters = new Array();
	$scope.searchFilters['color'] = [];
	$scope.searchFilters['sex'] = [];
	$scope.searchFilters['location_f'] = [];
	$scope.searchFilters['sizes'] = [];
	$scope.searchFilters['category'] = [];
	// $scope.Loc = [];
	// console.log(displayQuery['color']);
	$scope.displayPageNum = function(num){
		var input = [];
	    for (var i=1; i<=num; i++) input.push(i);
	    // page = $scope.page;
	    return input;
		// $location.path(path); // $location is a wrapper around JS window.location and handles the routing if a path is passed to it
	}

	$scope.$watch('searchResults', function(newValue, oldValue) {
	    if (newValue === oldValue) { return; }
	    
	    $scope.numberOfPages = calculatePages($scope.searchResults.count);

	    if(!angular.isUndefined(displayQuery['sex'])){
		    for(var i = 0;i<$scope.searchResults.filters.sex.length;i++){
		    	var curr_val = $scope.searchResults.filters.sex[i][0].toLowerCase();
		    	var val_array = displayQuery['sex'].toLowerCase().split(',');
		    	if($.inArray(curr_val, val_array) > -1){
	        		$scope.searchFilters['sex'][i] = true;
	        	}
	        }
	    }
	    if(!angular.isUndefined(displayQuery['color'])){
		    for(var i = 0;i<$scope.searchResults.filters.color.length;i++){
		    	var curr_color = $scope.searchResults.filters.color[i][0].toLowerCase();
		    	var color_array = displayQuery['color'].toLowerCase().split(',');
		    	if($.inArray(curr_color, color_array) > -1)
	        		$scope.searchFilters['color'][i] = true;
	        }
	    }
	    if(!angular.isUndefined(displayQuery['location_f'])){
		    for(var i = 0;i<$scope.searchResults.filters.location.length;i++){
		    	var curr_color = $scope.searchResults.filters.location[i][0].toLowerCase();
		    	var color_array = displayQuery['location_f'].toLowerCase().split(',');
		    	if($.inArray(curr_color, color_array) > -1)
	        		$scope.searchFilters['location_f'][i] = true;
	        }
	    }
	    if(!angular.isUndefined(displayQuery['sizes'])){
		    for(var i = 0;i<$scope.searchResults.filters.sizes.length;i++){
		    	var curr_color = $scope.searchResults.filters.sizes[i][0].toUpperCase();
		    	var color_array = displayQuery['sizes'].toUpperCase().split(',');
		    	if($.inArray(curr_color, color_array) > -1)
	        		$scope.searchFilters['sizes'][i] = true;
	        }
	    }
	    if(!angular.isUndefined(displayQuery['category'])){
		    for(var i = 0;i<$scope.searchResults.filters.category.length;i++){
		    	var curr_color = $scope.searchResults.filters.category[i][0].toLowerCase();
		    	var color_array = displayQuery['category'].toLowerCase().split(',');
		    	if($.inArray(curr_color, color_array) > -1)
	        		$scope.searchFilters['category'][i] = true;
	        }
	    }
	},true);

    $scope.checkdisp = function(index,filter_selected){
        //filters.location[index][0] = locationName filters.location[index][1] = number_of_results
        // $scope.searchResults.filters.color.length
        var loc_string, loc = $scope.searchFilters[filter_selected];
        flag = false;
        for(var i = 0;i<$scope.searchFilters[filter_selected].length;i++){
            if($scope.searchFilters[filter_selected][i] == true){
            	flag = true;
            	if(filter_selected=='color')
            		filter_q = $scope.searchResults.filters.color[i][0];
            	if(filter_selected=='sex')
            		filter_q = $scope.searchResults.filters.sex[i][0];
            	if(filter_selected=='location_f')
            		filter_q = $scope.searchResults.filters.location[i][0];
            	if(filter_selected=='sizes')
            		filter_q = $scope.searchResults.filters.sizes[i][0];
            	if(filter_selected=='category')
            		filter_q = $scope.searchResults.filters.category[i][0];
                if(loc_string == undefined)
                    loc_string = filter_q;
                else
                    loc_string = loc_string + "," + filter_q;
            }
        }
        if(flag)
        	displayQuery[filter_selected]=loc_string
        else
        	delete displayQuery[filter_selected];
        $location.path('/search/products/').search(displayQuery);
    }
    $scope.goToPage = function(page){
    	console.log("yo");
    	displayQuery['page'] = page;
    	$location.path('/search/products/').search(displayQuery);
    }
    $scope.getDiscount_SearchPage = function(index){
		// alert(parseInt((($scope.products.price-$scope.products.price_discounted)/$scope.products.price)*100));
		if($scope.searchResults.products[index].price_discounted==0 || $scope.searchResults.products[index].price=="Price on request")
			return 0;
		else
			return parseInt((($scope.searchResults.products[index].price-$scope.searchResults.products[index].price_discounted)/$scope.searchResults.products[index].price)*100);
	}

	function fetchDummyResults ($resource) {
		return $resource('/api/search/products');
	}
	function fetchRealResults () {
		return $resource('/api/search/products', $location.search()); // .length()
	}

	function fetchAfterFilter () {
		return $resource('/api/search/products', $location.search($scope.filters));
	}

	function calculatePages (totalItems) {
		return Math.floor(totalItems / itemsPerPage)+1;
	}
}
]);

app.controller('storeSearchController',['$location','$scope','$http','$resource','$routeParams','commonFactory',function($location,$scope,$http,$resource,$routeParams,commonFactory){
	$scope.searchResults = fetchRealResults().get();
	var totalItems = $scope.searchResults.count;
	var itemsPerPage = 21;
	$scope.numberOfPages = calculatePages(totalItems);
	$scope.displayQuery = $location.search();
	

	$scope.filters = {
		location: []
	};

	function fetchDummyResults ($resource) {
		return $resource('/api/search/products');
	}
	function fetchRealResults () {
		return $resource('/api/search/stores', $location.search()); // .length()
	}

	function fetchAfterFilter () {
		return $resource('/api/search/products', $location.search($scope.filters));
	}

	function calculatePages (totalItems) {
		return Math.floor(totalItems / itemsPerPage)+1;
	}


}
]);

function LocationController($scope, $location) {
  $scope.$watch('locationPath', function(path) {
    $location.path(path);
  });
  $scope.$watch(function() {
    return $location.path();
  }, function(path) {
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
        val: function() {
        	console.log($scope.val);
        	return $scope.val;
        }
      }
    });

    // modalInstance.result.then(
    // //	function () {
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

app.factory('commonFactory',function(){ //can pass $resource over here as an argument to the factory function

	return {

        baseSearch: function($location,query) {
        	$location.path('/search/products/').search({product:query});
            // alert("I'm search!");
        },

		homeCRUD:function($resource){

			return $resource('/api/home'); 

		},

		storeCRUD:function($resource){

			return $resource('/api/stores/:id',{
				id:'@id'
			});

		},

		storeProducts:function($resource){

			return $resource('/api/stores/:id/products',{
				id:'@id'
			});

		},

		productCRUD:function($resource){

			return $resource('/api/products/:id',{
				id:'@id'
			});

		},

		userCRUD:function($resource,$routeParams){

			return $resource('/api/user/'+$routeParams.slug.split('-').pop());

		},

		reviewCRUD:function($resource,$routeParams){

			return $resource('/api/review/'+$routeParams.slug.split('-').pop());

		},

		searchR:function($resource){

			return $resource('/api/search/:category/:location/:product', {

				category: '@category',
				location: '@location',
				product: '@product'

			});


		},

		fetchID:function($routeParams){
			return $routeParams.slug.split('-').pop();
		}
	};

});

$('.thumb').mouseover(function(){
	$(this).find(".quickView").show();
});

$('.thumb').mouseout(function(){
	$(this).find(".quickView").hide();
});