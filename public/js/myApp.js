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

  .when("/auth/:access_token", {
    templateUrl : 'views/results.html',
    controller : 'AuthController'
  })

  .otherwise({
    templateUrl : 'views/404.html'
  });
})
.run(['$rootScope', function($rootScope) {

}]);