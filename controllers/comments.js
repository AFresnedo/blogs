var express = require('express');
var router = express.Router();
var db = require('../models');

router.post('/', function(req, res) {
  console.log('create comment request recieved');
  db.comment.create(req.body).then(function(createdComment) {
    res.redirect('/articles/' + req.body.articleId);
  }).catch(function(err) {
    res.send('error creating comment');
  });
});

module.exports = router;
