app.factory('commonFactory',function(){

	return {

			homeCRUD:function($resource){

				return $resource('/api/home'); 

			},

			storeCRUD:function($resource){

				return $resource('/api/store/:id',{
					id:'@id'
				});

			},

			productCRUD:function($resource){

				return $resource('/api/product/:id',{
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

				return $resource('/api/search/location/:param1/price/:param2/size/:param3',

					{
						param1:'@param1',
						param2:'@param2',
						param3:'@param3'

					}


				);

			},

			fetchID:function($routeParams){
				return $routeParams.slug.split('-').pop();
			}
	};

});