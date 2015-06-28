'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'firebase'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/landing_page.html',
      controller: 'LandingPageController'
    });
    $routeProvider.when('/waitlist', {
      templateUrl: 'partials/waitlist.html',
      controller: 'WaitlistController',
      controllerAs: 'waitlistController'
    });
    $routeProvider.when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'AuthController',
      controllerAs: 'authController'
    });
    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'AuthController',
      controllerAs: 'authController'
    });
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }]);