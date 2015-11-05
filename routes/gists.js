"use strict";

var request = require('request');
var express = require('express');
var router = express.Router();
var GITHUB = 'https://api.github.com/gists';    // DO NOT add trailing slash!

// POST (add) a Gist
// Step 4: define route to post new object; Bearer Access Token is stored in the header as: Authorization : Bearer access_token
router.post('/', getAuthBearerToken, (req, res) => {
  request.post({
    json: true,
    url: GITHUB,
    headers: { Authorization: 'Bearer ' + req.access_token, 'User-Agent': 'gist-manager' },
    body: {
      public: true,
      description: req.body.description,
      files: JSON.parse(req.body.files)   // files is a json string;
    }
  },
  (err, response, body) => {
    if (err)
      return res.status(500).json(err);
    res.json(body);
  });
});

// PATCH (edit) a Gist
router.patch('/:id', getAuthBearerToken, (req, res) => {
  request.patch({
    json : true,
    url : GITHUB + '/' + req.params.id,
    headers : { Authorization : 'Bearer ' + req.access_token, 'User-Agent' : 'gist-manager' },
    body : {
      public: true,
      description : req.body.description,
      files: JSON.parse(req.body.files)   // files is a json string;
    }
  },
  (err, response, body) => {
    if (err)
      return res.status(500).json(err);
    res.json(body);
  });
});

// Step 5: define route to get object with id; get the id from the json of the new object and add it to the GET route;
router.get('/:id', getAuthBearerToken, (req, res) => {
  request.get({
    json: true,
    url: GITHUB + '/' + req.params.id,
    headers: { Authorization: 'Bearer ' + req.access_token, 'User-Agent': 'gist-manager' }
  },
  (err, response, body) => {
    if (err)
      return res.status(500).json(err);
    res.json(body);
  });
});

// GET all user's gists
router.get('/', getAuthBearerToken, (req, res) => {
  console.log('in express get()');
  request.get({
    json: true,
    url: GITHUB,
    headers: { Authorization: 'Bearer ' + req.access_token, 'User-Agent': 'gist-manager' }
  },
  (err, response, body) => {
    if (err)
      return res.status(500).json(err);
    res.json(body);
  });
});

// DELETE a Gist
router.delete('/:id', getAuthBearerToken, (req, res) => {
  request.del({
    url : GITHUB + '/' + req.params.id,
    headers : { Authorization : 'Bearer ' + req.access_token, 'User-Agent' : 'gist-manager' }
  },
  (err, response, body) => {
    if (err)
      return res.status(500).json(err);
    res.json(body);
  });
});

function getAuthBearerToken(req, res, next) {
  if (req.headers.hasOwnProperty('Authorization')) {
    return res.status(401).json({ error: 401, message: 'Bearer auth token not found' });
  }
  var auth_header = req.headers.authorization;
  var auth_header_value = auth_header.split(' ');
  if (auth_header_value.length != 2)
    return res.status(401).json({ error: 401, message: 'Authorization header is malformed' });
  req.access_token = auth_header_value[1];
  next();   // MUST ALWAYS CALL next();
}

// Step 6: at the Terminal: env $(cat .env | xargs) nodemon server.js \n
// "| xargs" pipes all lines in .env into 1 line to pass to nodemon; \n
// .env cannot contain any comments, else it will not run!

module.exports = router;
