'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('main',
  [ 'main.config'
  , 'main.controllers.homePageController'
  , 'main.controllers.storeController'
  , 'main.controllers.productController'
  , 'ngRoute', 'ngResource']
  )