angular.module('myApp')
  .controller('authController', [
    '$scope',
    '$route',
    '$cookies',
    function($cookies, $scope, $route) {

      var access_token = $cookies.get($route.current.access_token);

      $cookies.put('access_token', $route.current.access_token);

      console.log(access_token);

    }

  ]);