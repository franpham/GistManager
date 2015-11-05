/**
 * Creation of a modules uses a 2nd array argument to import dependecies
 */

// tell angular you want to use myApp;
angular.module('myApp', [
  'ngRoute',
  'ngStorage'
]);
var myApp = angular.module('myApp');

myApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'views/default.html'
    })
    .when('/login', {
      templateUrl : 'views/login.html'
    })
    .when("/auth/:token", {
      templateUrl : 'views/auth.html',
      controller : 'AuthController'
    })
    .when('/list', {
      templateUrl : 'views/list-gists.html',
      controller : 'ListController'
    })
    .when('/show/:id', {
      templateUrl : 'views/show-gist.html',
      controller : 'ShowController'
    })
    .when('/create', {
      templateUrl : 'views/add-gist.html',
      controller : 'AddController'
    })
    .when('/edit/:id', {
      templateUrl : 'views/edit-gist.html',
      controller : 'EditController'
    })
    .otherwise({
      templateUrl : 'views/404.html'
    });
})
.run(['$rootScope', function($rootScope) {
}]);