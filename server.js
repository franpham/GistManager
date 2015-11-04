"use strict";

const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var parser = require('body-parser');
var methodOverride = require('method-override');
var auth = require('./routes/auth');
var gists= require('./routes/gists');

app.use(methodOverride('_method'));   // enable PUT, PATCH, DELETE methods;
app.use(parser.urlencoded({ extended : true }));    // for parsing form data;
app.use(parser.json());      // for parsing application/ json;
app.use(express.static('public'));
app.use('/auth', auth);
app.use('/gists', gists);

app.get('/', function(req, res) {
  res.render('index');
});
app.listen(PORT, function() {
  console.log('App started listening on port:', PORT);
});

// Step 6: at the Terminal: env $(cat .env | xargs) nodemon server.js \n
// "| xargs" pipes all lines in .env into 1 line to pass to nodemon; \n
// .env cannot contain any comments, else it will not run!
