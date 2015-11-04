'use strict';
var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var getAuthBearerToken = require('../lib');
var OAuth2 = require('oauth').OAuth2;
var oauth2 = new OAuth2(
  process.env.GITHUB_CLIENT_ID,
  process.env.GITHUB_CLIENT_SECRET,
  'https://github.com',
  '/login/oauth/authorize',
  '/login/oauth/access_token',
  null
);

/**
 * Step 1 : Oauth2, getting hte provider's auth url
 */
app.get('/auth/login', (req, res ) => {     // route handler
  let authURL = oauth2.getAuthorizeUrl({
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
app.get('/auth/github/callback', (req, res) => {
  let code = req.query.code;

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
      } else { // everything worked
        // get token
        //    send token back to client
        res.json({ access_token : access_token });
      }
    }
    );
});

module.exports= router;