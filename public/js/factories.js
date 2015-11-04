angular.module('myApp')
.factory('CharacterVersionFactory', ['APP_VERSION', 'mainCharacter', function  (APP_VERSION, mainCharacter)  {
  return {
    characterVersion : function() {
      return mainCharacter + ' ' + APP_VERSION;
    }
  };
}]);