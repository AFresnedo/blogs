// require stuff
var bodyParser = require('body-parser'); // eslint-disable-line
var ejsLayouts = require('express-ejs-layouts'); // eslint-disable-line
var express = require('express'); // eslint-disable-line

// declare global variables
var app = express();

// set and use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
// gives us req.body for form submissions
app.use(bodyParser.urlencoded({extended: false}));

// include controllers (thats why they export their router)
app.use('/articles', require('./controllers/articles')); // eslint-disable-line
app.use('/authors', require('./controllers/authors')); // eslint-disable-line

// define routes
app.get('/', function(req, res){
  res.render('home');
});

// link never listens
app.listen(3000);
