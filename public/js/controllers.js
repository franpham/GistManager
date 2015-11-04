"use strict";

angular.module('myApp')
  .controller('AuthController', [
    '$scope', '$route', '$location', '$localStorage',
    function($scope, $route, $location, $localStorage) {
      $scope.access_token = $route.current.params.token;
      $localStorage.access_token = $route.current.params.token;
      console.log($scope.access_token);
      $location.path('list').replace();   // redirect to 'list';
    }
  ]);

angular.module('myApp')
  .controller('ListController', ['$scope', 'GistServer',
    function($scope, GistServer) {
      $scope.gists = [];
      GistServer.listGists().success(function(gists) {
        $scope.gists = gists;
      });
    }
  ]);

angular.module('myApp')
  .controller('ShowController', ['$scope', '$route', 'GistServer',
    function($scope, $route, GistServer) {
      $scope.gist = null;
      GistServer.showGist($route.current.params.id).success(function(gist) {
        $scope.gist = gist;
      });
    }
  ]);

angular.module('myApp')
  .controller('CreateController', ['$scope', 'GistServer',
    function($scope, GistServer) {
      $scope.gist = null;
      GistServer.createGist().success(function(gist) {
        $scope.gist = gist;
      });
    }
  ]);

angular.module('myApp')
  .controller('EditController', ['$scope', '$route', 'GistServer',
    function($scope, $route, GistServer) {
      $scope.gist = null;
      GistServer.editGist($route.current.params.id).success(function(gist) {
        $scope.gist = gist;
      });
    }
  ]);

angular.module('myApp')
  .controller('DeleteController', ['$scope', '$route', 'GistServer',
    function($scope, $route, GistServer) {
      $scope.result = null;
      GistServer.deleteGist($route.current.params.id).success(function(result) {
        $scope.result = result;
      });
    }
  ]);
