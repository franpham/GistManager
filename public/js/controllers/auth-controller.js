"use strict";

angular.module('myApp')
  .controller('AuthController', [
    '$scope',
    '$route',
    '$localStorage',
    function($scope, $route, $localStorage) {
      $scope.access_token = $route.current.params.access_token;
      $localStorage.access_token = $route.current.params.access_token;

      // get github gists;
    }
  ]);