"use strict";

angular.module('myApp')
  .controller('AuthController', [
    '$scope', '$route', '$location', '$localStorage',
    function($scope, $route, $location, $localStorage) {
      $scope.access_token = $route.current.params.token;
      $localStorage.access_token = $route.current.params.token;
      console.log($scope.access_token);
      $location.path('/list').replace();   // redirect to 'list';
    }
  ]);

angular.module('myApp')
  .controller('ListController', ['$scope', 'GistServer',
    function($scope, GistServer) {
      $scope.gists = [];
      GistServer.listGists().success(function(gists) {
        for (var i = 0; i < gists.length; i++) {
          var gist = gists[i];
          var files = gist.files ? Object.keys(gist.files) : [gist.id];
          gist.title = files[0];
        }
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
        if (gist.files) {
          $scope.files = gist.files;
          var files = Object.keys(gist.files);
          gist.title = files[0];
        }
        else {
          $scope.files = {};
          gist.title = gist.id;
        }
      });
    }
  ]);

angular.module('myApp')
  .controller('EditController', ['$scope', '$route', '$location', 'GistServer',
    function($scope, $route, $location, GistServer) {
      $scope.gist = null;     // must declare gist since GistServer methods are promises;
      GistServer.showGist($route.current.params.id).success(function(gist) {
        $scope.gist = gist;
        $scope.editor = GistServer;
        $scope.location = $location;
        if (gist.files) {
          $scope.files = gist.files;
          var files = Object.keys(gist.files);
          gist.title = files[0];
        }
        else {
          $scope.files = {};
          gist.title = gist.id;
        }
      });
    }
  ]);

angular.module('myApp')
  .controller('UpdateController', ['$scope', 'GistServer',
    function($scope, GistServer) {
      $scope.gist = null;
      GistServer.getGistPromise().success(function(gist) {
        $scope.gist = gist;
        if (gist.files) {
          $scope.files = gist.files;
          var files = Object.keys(gist.files);
          gist.title = files[0];
        }
        else {
          $scope.files = {};
          gist.title = gist.id;
        }
      });
    }
  ]);

angular.module('myApp')
  .controller('AddController', ['$scope', '$location', 'GistServer',
    function($scope, $location, GistServer) {
      $scope.editor = GistServer;
      $scope.location = $location;
    }
  ]);
