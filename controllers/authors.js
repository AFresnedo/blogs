var express = require('express'); // eslint-disable-line
var router = express.Router();

router.get('/', function(req, res){
  res.send('authors here!');
});

module.exports = router; // eslint-disable-line
