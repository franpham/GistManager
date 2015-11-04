angular.module('myApp')
  .controller('AuthController', [
    '$scope',
    '$route',
    '$cookies',
    function($scope, $route, $cookies) {
      $cookies.put('access_token', $route.current.access_token);
      $scope.access_token = $route.current.access_token;

      // call server to get gists;
    }
  ]);