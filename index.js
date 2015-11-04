/**
 * Instances for Displaying
 */
const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();

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

/**
 * Hi Express! Look in here !
 */
app.use(express.static('./public'));

/**
 * bodyParser
 */
app.use(bodyParser.urlencoded({ extended : true }));


/**
 * AuthBearerToken
 */
var getAuthBearerToken =
function getAuthBearerToken (req, res, next) {
  if ( !req.headers.hasOwnProperty('authorization')){
    return res.status(401).json(
      { error : 401, message : 'Bearer auth token not found.' }
      );
  }
  var auth_header = req.headers.authorization;
  var auth_header_value = auth_header.split(' ');
  if (auth_header_value.length !== 2) {
    return res.status(401).json(
    {
      error : 401, message : 'Authorization header is malformed'
    });
  }

  req.access_token = auth_header_value[1];
  next();

}


/**
 * Listening on ...
 */
app.listen(PORT, function() {
  console.log('App started listening on port:', PORT);
});
