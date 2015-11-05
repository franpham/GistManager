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
        for (var i = 0; i < gists.length; i++) {
          var gist = gists[i];
          var files = Object.keys(gist.files);
          gist.title = files.length > 0 ? files[0] : gist.id;
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
        $scope.files = gist.files;

        var files = Object.keys(gist.files);
        gist.title = files.length > 0 ? files[0] : gist.id;
      });
    }
  ]);

angular.module('myApp')
  .controller('AddController', ['$scope', 'GistServer',
    function($scope, GistServer) {
    }
  ]);

angular.module('myApp')
  .controller('EditController', ['$scope', '$route', 'GistServer',
    function($scope, $route, GistServer) {
      $scope.gist = null;     // must declare gist since GistServer methods are promises;
      $scope.editor = GistServer;

      GistServer.showGist($route.current.params.id).success(function(gist) {
        $scope.gist = gist;
        $scope.files = gist.files;
      });
    }
  ]);
