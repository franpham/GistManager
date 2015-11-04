angular.module('myApp')

.service('BookService', [ function() {
  var self = this;
  self.books = [
    {
      title : 'Talion the Revenant',
      author : 'Michael A. Stackpole'
    },
    {
      title : 'All my friends are dead',
      author : 'Avery Monsen & Jory John'
    },
    {
      title : 'Unbearable lightness of being',
      author : 'Milan Kunder'
    },
    {
      title : 'Eloquent Javascript',
      author : 'Marijn Haverbeke'
    },
    {
      title : 'A New Earth',
      author : 'Eckhart Tolle'
    },
    {
      title : 'Tuesdays with Morrie',
      author : 'Mitch Album'
    },
    {
      title : 'Outliers',
      author : 'Malcolm Gladwell'
    },
    {
      title : 'B is for Beer',
      author : 'Tom Robins'
    }
  ];

  this.getBook = function(id) {

  };

  this.getBooks = function() {

  };

  this.addBook = function(book) {
    //using the model(book) to create a new instance ( can keep adding the same book w/o re-typing)
    self.books.push({
      title : book.title,
      author : book.author
    });
  };
}])

.service('MagazineService', MagazineService)
.service('VideoService', ['$http', VideoService])

function MagazineService() {
  this.getMagazine = function(id) {
  };
  this.totalMagazine = 20;
}

function VideoService($http) {
  this.getVideos = function() {

  }
}


function MyClass (argst, args2) {
  this.myProp = 1;
}