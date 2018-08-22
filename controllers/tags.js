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

module.exports = router;
