// require stuff
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');

// declare global variables
var app = express();

// set and use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
// gives us req.body for form submissions
app.use(bodyParser.urlencoded({extended: false}));

// include controllers (thats why they export their router)
app.use('/articles', require('./controllers/articles'));
app.use('/authors', require('./controllers/authors'));
app.use('/comments', require('./controllers/comments'));
app.use('/tags', require('./controllers/tags'));

// define routes
app.get('/', function(req, res){
  res.render('home');
});

// catch all page for 404s
app.get('*', function(req, res) {
  res.send('standard 404 sent');
});

// link never listens
app.listen(3000);
