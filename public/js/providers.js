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
        deleteGist : function(id) {
          return $http.delete(GISTURL + '/' + id, { headers :
            { Authorization : 'token ' + $localStorage.access_token }
          });
        },
        addGist : function(json) {
          return $http.post(GISTURL, json,
            { headers : { Authorization : 'token ' + $localStorage.access_token }}
          );
        },
        editGist : function(id, gist) {
          var fileObj = {};
          var inputs = Object.keys(gist.files);
          for (var i = 0; i < inputs.length; i++) {
            var input = gist.files[inputs[i]];
            fileObj[input.title] = { content : input.content };
          }
          var json = { files : fileObj, _method : 'PATCH', description : gist.description };
          return $http.patch(GISTURL + '/' + id, JSON.stringify(json),          // MUST CONVERT object to string;
            { headers : { Authorization : 'token ' + $localStorage.access_token }}
          );
        },
        addGist : function(gist) {
          var fileObj = {};
          var inputs = Object.keys(gist.files);
          for (var i = 0; i < inputs.length; i++) {
            var input = gist.files[inputs[i]];
            fileObj[input.title] = { content : input.content };
          }
          var json = { files : fileObj, description : gist.description };
          return $http.post(GISTURL, JSON.stringify(json),          // MUST CONVERT object to string;
            { headers : { Authorization : 'token ' + $localStorage.access_token }}
          );
        },
        addFileInput : function() {
          var fieldset = $('#fileSet');
          var scope = $fieldset.scope();
          var $compile = $fieldset.injector().get('$compile');
          // Angular elements are a subset of jQuery elements; Angular adds extra methods to BOTH types of elements, such as scope() and injector();
          var inputs = $('<label />').text('Filename: ').append($('<input text="text" name="filename" ng-model="gist.files[' + fileCounter + '].title" />'));
          inputs.after($('<label />').text('Content:  ').append($('<input type="text" name="content"  ng-model="gist.files[' + fileCounter + '].content" />')));
          fieldset.append($compile(inputs)(scope));
          scope.$apply();
        },
        fileCounter : 1   // counter for addFileInput();
      };
    }];
  });
