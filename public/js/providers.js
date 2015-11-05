"use strict";
var GISTURL = "http://localhost:3000/gists";    // DO NOT ADD TRAILING SLASH!

angular.module('myApp')
  .provider('GistServer', function() {
    this.$get = ['$http', '$localStorage', function($http, $localStorage) {
      return {
        listGists : function() {
          return $http.get(GISTURL, { headers :
            { Authorization : 'token ' + $localStorage.access_token }
          });
        },
        showGist : function(id) {
          return $http.get(GISTURL + '/' + id, { headers :
            { Authorization : 'token ' + $localStorage.access_token }
          });
        },
        deleteGist: function(id) {
          return $http.delete(GISTURL + '/' + id, { headers :
            { Authorization : 'token ' + $localStorage.access_token }
          });
        },
        addGist : function(json) {
          return $http.post(GISTURL, json,
            { headers : { Authorization : 'token ' + $localStorage.access_token }}
          );
        },
        editGist: function(id, json) {
          return $http.patch(GISTURL + '/' + id, json,
            { headers : { Authorization : 'token ' + $localStorage.access_token }}
          );
        },

      };
    }];
  });
