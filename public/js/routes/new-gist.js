'use strict';
var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();

/**
 * Creating a gist
 */
app.post('/gists', getAuthBearerToken, (req, res) => {
  var auth_header = req.headers.authorization;
  var access_token = auth_header.split(' ')[1];
  console.log(access_token);

  // create a new gist from the contents of req.body
  request.post({
    url : 'https://api.github.com/gists',
    json : true,
    headers : {
      Authorization : 'Bearer ' + req.access_token,
      'User-Agent' : 'Node' // Tracks how you're doing requests
    },
    body : {
      description : req.body.description,
      public : true,
      files : JSON.parse(req.body.files)
    }
  }, (err, response, body) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(body);
  });
});

/**
 * Get Gist by id ( when the user clicks on it )
 */
app.get('/gists/:id', getAuthBearerToken, (req, res) => {
  request.get({
    url : 'https://api.github.com/gists/'+req.params.id,
    headers : {
      Authorization : 'Bearer '+req.access_token,
      'User-Agent' : 'Node'
    }
  }, (err, response, body) => {
    if (err) {
      // Parse the body
      res.json(JSON.parse(body));
    }
  });
});

/**
 * Delete the Gist
 */
app.delete(getAuthBearerToken, (req, res, err) => {
  request.delete({
    url : 'https://api.github.com/gists/' + req.params.id,
    headers : {
      Authorization : 'Bearer ' + req.access_token,
      'User-Agent' : 'Node'
    }
  }, (err, response, body) => {
    res.json(JSON.parse(body));
  });
});

/**
 * Editing a Gist
 */
app.patch(getAuthBearerToken, (req, res) => {
  request.patch({
    url : 'https://api.github.com/gists/' + req.params.id,
    json : true,
    headers : {
      Authorization : 'Bearer ' + req.access_token,
      'User-Agent' : 'Node'
    },
    body : {
      description : req.body.descrip,
      files : {
        filename : {
          content : req.body.content
        },
        oldFile : {
          filename : req.body.filename,
          content : req.body.content
        },
        newFile : {
          content : req.body.content
        }
      }
    }
  }, (err, response, body) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(body);
  });
});

module.exports = router;






