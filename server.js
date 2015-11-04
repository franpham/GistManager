"use strict";

const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var auth = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static('public'));
app.use('/auth', auth);

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(PORT, function() {
  console.log('App started listening on port:', PORT);
});

// Step 6: at the Terminal: env $(cat .env | xargs) nodemon server.js \n "| xargs" pipes all lines in .env into 1 line to pass to nodemon;
