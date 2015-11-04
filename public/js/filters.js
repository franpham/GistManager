angular.module('myApp')
.filter('afterYearFilter', function() {
  return function(collection, year) {
    return collection.filter(function(item) {
      return item.year > year;
    });
  };
});
