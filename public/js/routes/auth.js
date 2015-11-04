var request = require('request');
var express = require('express');
var router = express.Router();

/**
 * Step 1 : Oauth2, getting hte provider's auth url
 */
router.get('/auth/login', (req, res ) => {     // route handler
  var authURL = oauth2.getAuthorizeUrl({
    redirect_uri : 'http://localhost:3000/auth/github/callback',
    scope : ['gist'], // asking users for persmission
    state : 'Authorize' + Math.round(Math.random() * 9999999)
  });
  res.json({ url : authURL }); // Gives url to user
});

/**
 * Step 2 : Callback from provider, with code, on succesful authorization
 * this route must be set _exactly_ as it is set on the provider
 * as callback url
 * - use the code, to exchange for an access_token
 */
router.get('/github/callback', (req, res) => {
  var code = req.query.code;

  if(code === undefined) {
    return res.status(401).json({ error : 401, message : 'Invalid auth code' });
  }
  oauth2.getOAuthAccessToken(
    code,
    {
      redirect_uri : 'http://localhost:3000/auth/github/callback'
    },
    (err, access_token, refresh_token, results) => {
      if (err) {
        console.error(err);
        res.status(401).json(err);
      } else if ( results.error ) {
        console.error(results.error);
        res.status(401).json(results.error);
      } else {
        res.redirect('http://localhost:3000/auth/auth_code/' + access_token); // <----- access_token
      }
    }
    );
});

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

};

module.exports = router;