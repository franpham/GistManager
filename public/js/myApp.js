/**
 * Creation of a modules uses a 2nd array argument to import dependecies
 */

// tell angular you want to use this
angular.module('myApp', [
  'ngRoute'
  ]);

var myApp = angular.module('myApp');

myApp.config(function($routeProvider) {
  //routes
  $routeProvider
  .when('/', {
    templateUrl : 'views/default.html'
  })

  .when('/books', {
    templateUrl : 'views/books.html',
    controller : 'BooksController'
  })

  .otherwise({
    templateUrl : 'views/404.html'
  });

})

.run(['$rootScope', function($rootScope) {

}]);