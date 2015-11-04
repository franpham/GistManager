angular.module('myApp')
  .controller('authController', [
    '$scope',
    '$routeParams',
    '$cookies',
    function($cookies, $scope, $routeParams, $cookies) {

      $scope.new = '/new';

      $cookies.put('access_token', $routeParams.access_token);

      console.log($cookies.get('access_token'));
    }
  ]);