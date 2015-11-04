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


module.exports= router;