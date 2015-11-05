"use strict";
/* global $ */      // MUST DECLARE $ for jQuery;

var GISTURL = "http://localhost:3000/gists";    // DO NOT ADD TRAILING SLASH!
angular.module('myApp')
  .provider('GistServer', function() {
    this.$get = ['$http', '$localStorage', function($http, $localStorage) {
      var fileCounter = 1;              // counter for addFileInput();
      var gistPromise = null;           // a Promise to add/ edit a gist;
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
        editGist : function(id, $location, gist) {
          var fileObj = {};
          var inputs = gist.files ? Object.keys(gist.files) : [];
          for (var i = 0; i < inputs.length; i++) {
            var input = gist.files[inputs[i]];
            fileObj[input.title] = { content : input.content };
          }
          var json = { _method : 'PATCH', files : fileObj, description : gist.description };
          gistPromise = $http.patch(GISTURL + '/' + id, JSON.stringify(json),   // MUST CONVERT object to string;
            { headers : { Authorization : 'token ' + $localStorage.access_token }}
          );
          $location.path('/update').replace();
        },
        addGist : function($location, gist) {
          var fileObj = {};
          var inputs = gist.files ? Object.keys(gist.files) : [];
          for (var i = 0; i < inputs.length; i++) {
            var input = gist.files[inputs[i]];
            fileObj[input.title] = { content : input.content };
          }
          var json = { files : fileObj, description : gist.description };
          gistPromise = $http.post(GISTURL, JSON.stringify(json),      // MUST CONVERT object to string;
            { headers : { Authorization : 'token ' + $localStorage.access_token }}
          );
          $location.path('/update').replace();
        },
        addFileInput : function() {
          var fieldset = $('#fileSet');
          var scope = fieldset.scope();
          var $compile = fieldset.injector().get('$compile');
          // Angular elements are a subset of jQuery elements; Angular adds extra methods to BOTH types of elements, such as scope() and injector();
          var fileInput = $('<label>').text('Filename: ').append($('<input text="text" name="filename" ng-model="gist.files[' + fileCounter + '].title" required>'));
          var dataInput = $('<label>').text(' Content: ').append($('<input type="text" name="content"  ng-model="gist.files[' + fileCounter + '].content" required>')).append($('<br>'));
          fieldset.append($compile(fileInput)(scope));
          fieldset.append($compile(dataInput)(scope));
          fileCounter++;
        },
        getGistPromise : function() {
          return gistPromise;
        }
      };
    }];
  });
