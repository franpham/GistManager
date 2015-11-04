angular.module('myApp')
.controller('BooksController', ['$scope', 'BookService', '$animate', function($scope, BookService, $animate) {

  $scope.bookService = BookService;

}]);