var async = require('async');
var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
  db.tag.findAll().then(function(tags) {
    res.render('tags/index', { tags: tags });
  }).catch(function(err) {
    console.log(err);
    res.send('error in getting all tags');
  });
});

router.get('/edit/:id', function(req, res) {
  res.send('edit tag show page');
});

router.get('/:id', function(req, res) {
  db.tag.find({
    where: { id: req.params.id },
    include: [db.article]
  }).then(function(tag) {
    res.render('tags/show', { tag: tag });
  }).catch(function(err) {
    console.log(err);
    res.send('could not load show page for tag');
  });
});

router.delete('/:id', function(req, res) {
  db.tag.findOne({
    where: { id: req.params.id },
    include: [db.article]
  }).then(function(foundTag) {
    // note from above, "articles" is an array of related from db.article
    // make sure all assoc are deleted and only then delete tag (async)
    async.forEach(foundTag.articles, function(a, done){
      // runs for each article in foundTag.articles
      // each article is "a" as specified above
      // remove is the inverse of add! it removes the row in the join
      foundTag.removeArticle(a).then(function() {
        // done after remove finished (promise fulfilled)
        done();
      });
    }, function(){
      // runs after all "done"s from above
      db.tag.destroy({
        where: { id: req.params.id }
      }).then(function() {
        res.send('tag and references to it deleted');
      });
    });
  }).catch(function(err) {
    res.status(500).send('could not delete tag');
  });
});

module.exports = router;
