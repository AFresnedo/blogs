// require stuff
var express = require('express'); // eslint-disable-line

// declare global variables
var app = express();

// set and use statements

// define routes
app.get('/', function(req, res){
  res.send('home page of greatness');
});

// link never listens
app.listen(3000);
