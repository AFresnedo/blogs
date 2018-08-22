var async = require('async');
var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/new', function(req, res) {
  db.author.findAll().then(function(allAuthors) {
    res.render('articles/new', { authors: allAuthors });
  }).catch(function(err) {
    console.log(err);
    res.send('trouble loading new article page');
  });
});

router.get('/:id', function(req, res) {
  // get some more info from this query, in this case name of author
  // aka "join"
  // NOTICE: this functionality is dependent on associations!
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author, db.comment, db.tag]
  }).then(function(foundArticle) {
    // nested query (see how it's in "then"?)
    // it is nested because we needed the results from the include to do this
    db.author.findAll().then(function(allAuthors) {
      res.render('articles/show', { article: foundArticle, authors: allAuthors
      });
    }).catch(function(err) {
      console.log(err);
      res.render('error');
    });
  }).catch(function(err) {
    console.log(err);
    res.send('could not load aritcle page');
  });
});

router.get('/', function(req, res) {
  db.article.findAll().then(function(articlesFound) {
    res.render('articles/index', { articles: articlesFound });
  }).catch(function(err) {
    console.log(err);
    res.send('excuse me sir, there has been a problem loading this page');
  });
});

router.post('/', function(req, res) {
  if (req.body.authorId !== 0) {
    console.log(req.body);
    db.article.create(req.body).then(function(createdArticle){
      // do tag stuff
      var tags = [];
      if (req.body.tags) {
        // in our current impl, tags are seperated by comma
        tags = req.body.tags.split(',');
      }
      if (tags.length > 0) {

        // 1st param is thing to do things to
        // 2nd param is func to do to things
        // 3rd param is func to do after done
        async.forEach(tags, function(t, done) {
          // this code runs for each individual things we need to do
          db.tag.findOrCreate({
            where: { name: t.trim() }
          }).spread(function(newTag, wasCreated) {
            // bug detected: addTag is actually async because
            // you are writing to the join table db IT IS NOT INSTANT OR SERIAL
            createdArticle.addTag(newTag).then(function() {
              done(); // callback to tell async.forEach to move onto next
            });
          });
        }, function() {
          // this code runs after everything is finished
          res.redirect('/articles/' + createdArticle.id);
        });

        // CURSES! RACE COND!
        // add the tags
        // tags.forEach(function(t) {
          // db.tag.findOrCreate({
            // where: { name: t.trim() }
          // }).spread(function(newTag, wasCreated) {
            // // ^ newTag was either found or just created
            // // sequelize helper method for attaching a tag to an article
            // // where tag belogns to article
            // // below is the entry into the join table
            // createdArticle.addTag(newTag);
          // });
        // });
        // TODO OH NO A RACE DONDITION i didn't see it wahhhhhh
      }
      else {
        res.redirect('/articles/' + createdArticle.id);
      }
    }).catch(function(err) {
      console.log(err);
      res.send('article create failed');
    });
  }
  else {
    res.redirect('/articles/new');
  }
});

module.exports = router; // eslint-disable-line
