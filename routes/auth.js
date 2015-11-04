"use strict";

var request = require('request');
var express = require('express');
var router = express.Router();
// ALL PATHS ARE RELATIVE TO '/auth', except for redirect();

var OAuth2 = require('oauth').OAuth2;
var oauth2 = new OAuth2(
  process.env.GITHUB_CLIENT_ID,
  process.env.GITHUB_CLIENT_SECRET,
  'https://github.com/',       // provider base url
  'login/oauth/authorize',      // provider's login path
  'login/oauth/access_token',   // provider's access_token path
  null                          // options
);

/**
 * Step 1 : Oauth2, getting http provider's auth url
 */
router.get('/login', (req, res ) => {     // route handler
  var authURL = oauth2.getAuthorizeUrl({
    redirect_uri : 'http://localhost:3000/auth/github/callback',
    scope : ['gist'], // asking users for persmission
    state : 'Authorize' + Math.round(Math.random() * 9999999)
  });
  res.redirect(authURL);
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
    code, {
      redirect_uri : 'http://localhost:3000/auth/github/callback'
    },
    (err, access_token, refresh_token, results) => {
      var error = err || results.error;
      if (error) {
        console.error(error);
        res.status(401).json(error);
      } else {
        res.redirect('/#/auth/' + access_token);
      } // REDIRECT TO AN ANGULAR ROUTE!
    }
  );
});

module.exports = router;