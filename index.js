/**
 * Instances for Displaying
 */
const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var auth = require('./public/js/routes/auth');

/**
 * Instances for Gist
 */
var bodyParser = require('body-parser');
var request = require('request');
var OAuth2 = require('oauth').OAuth2;
var oauth2 = new OAuth2(
  process.env.GITHUB_CLIENT_ID,        // client id
  process.env.GITHUB_CLIENT_SECRET,    // secret key
  'https://github.com/',               // provider base url
  'login/oauth/authorize',             // provider's login path
  'login/oauth/access_token',          // provider's access_token path
  null                                 // options
  );

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended : true }));

app.use('auth', auth);

/**
 * Listening on ...
 */
app.listen(PORT, function() {
  console.log('App started listening on port:', PORT);
});
