var express = require('express'); // eslint-disable-line
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
  res.send('articles here!');
});

router.get('/new', function(req, res) {
  db.author.findAll().then(function(allAuthors) {
    res.render('articles/new', { authors: allAuthors });
  }).catch(function(err) {
    console.log(err);
    res.send('trouble loading new article page');
  });
});

router.post('/', function(req, res) {
  console.log(req.body);
  db.article.create(req.body).then(function(createdArticle){
    res.redirect('/articles/' + createdArticle.id);
  }).catch(function(err) {
    console.log(err);
    res.send('article create failed');
  });
});

module.exports = router; // eslint-disable-line
