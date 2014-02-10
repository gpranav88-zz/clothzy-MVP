var app = angular.module('main',['ngResource','ngRoute', 'ui.bootstrap', 'ui-rangeSlider', 'checklist-model']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
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

// .when ('/search/store/:location/:product',{
// 		templateUrl:'storesearch.html',
// 	controller:'searchController'
// })
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
})


$locationProvider
.html5Mode(true)
.hashPrefix('!');
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

app.controller('pstoreController',['$scope','$http','$resource','$routeParams','commonFactory',function($scope,$http,$resource,$routeParams,commonFactory){

	var productParams = { id: commonFactory.fetchID($routeParams) };
	$scope.productData = commonFactory.productCRUD($resource).get(productParams, getStore);

	$scope.imageURLs = [];

	$scope.discount = getDiscount();
	// fix null all over
	if ($scope.productData.price === null || $scope.productData.price === 0) {
		$scope.productData.price = 'Price on Request';
	}
	if ($scope.productData.price_discounted === null || $scope.productData.price === 0) {
		$scope.productData.price_discounted = 'Price on Request';
	}

	function getDiscount() {
		if (($scope.productData.price == 'null' || $scope.productData.price === 0) && $scope.productData.price_discounted == 'null' || $scope.productData.price === 0) {

			return ((($scope.productData.price - $scope.productData.price_discounted) / $scope.productData.price)*100);
		}
		else {
			return "0";
		}
	}


	function getStore() {
		var storeParams = { id: $scope.productData.store };
		$scope.storeData = commonFactory.storeCRUD($resource).get(storeParams, setImageUrl);
	}

	function setImageUrl() {
		var prefix = "/static/Store_" + $scope.storeData.id + "/Product_" + $scope.productData.id +"/";

		$scope.imageURLs[0] = prefix + "1-1.jpg";
		$scope.imageURLs[1] = prefix + "2-1.jpg";
		$scope.imageURLs[2] = prefix + "3-1.jpg";
		$scope.imageURLs[3] = prefix + "4-1.jpg";

	}
}
]);

app.controller('dropdownController', ['$scope', function($scope) {
	$scope.myOptions = [{ display: "Products", id: 1 , name:'product'}, { display: "Stores", id: 2, name:'store' }];
	$scope.selectedOption = $scope.myOptions[0];
	$scope.$root.selectedOption = $scope.selectedOption;
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
	$scope.productRow1 = _.range(0, 4);
	
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

	console.log("searchController");


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

				$location.path('/search/products/').search($scope.searchPhrase);

				var searchParams = $scope.searchPhrase; //can get rid of

				$scope.searchResult = function($resource) {
					return $resource('/api/search/products');
				};

				// $scope.searchResult = commonFactory.searchR($resource).get({
				// 	'category': $scope.selectedOption.name,
				// 	'location': searchParams.location,
				// 	'product': searchParams.product,

				// });

};
}]);


app.controller('populateSearchController',['$location','$scope','$http','$resource','$routeParams','commonFactory',function($location,$scope,$http,$resource,$routeParams,commonFactory){
	$scope.searchResults = fetchRealResults().get();
	var totalItems = $scope.searchResults.count;
	// console.log("count = " + totalItems);
	var itemsPerPage = 28;
	$scope.numberOfPages = calculatePages(totalItems);

	
	$scope.getCheckBoxes = function () {
			// console.log("print getCheckBoxes");
			var counter = 0;
			$scope.storeCheckBoxes = {};
			console.log("On declaration type = " + typeof($scope.storeCheckBoxes));

			$('input[type=checkbox]').each(function (counter) {
				console.log("inside jQuery type = " + typeof($scope.storeCheckBoxes));

				// console.log("This = " + $(this));

				if($(this).is(":checked")) {
					console.log("inside if type = " + typeof($scope.storeCheckBoxes));
					counter++;
					console.log("Filter = " + $(this).attr('id'));
					var filterParam = "p" + counter;
					$scope.storeCheckBoxes[filterParam] = $(this).attr('id');
				}
			}
			);
			var searchDict = $location.search();
		// console.log(searchDict);
		var newSearchDict = angular.extend(searchDict, $scope.storeCheckBoxes);
		console.log(newSearchDict);
		$location.path('search/products').search(newSearchDict);	
	};
	


	function fetchDummyResults ($resource) {
		return $resource('/api/search/products');
	}
	function fetchRealResults () {
		return $resource('/api/search/products', $location.search()); // .length()

	}

	function calculatePages (totalItems) {
		return Math.floor(totalItems / itemsPerPage);
	}

}]);

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