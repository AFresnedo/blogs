var express = require('express'); // eslint-disable-line
var router = express.Router();

router.get('/', function(req, res){
  res.send('articles here!');
});

module.exports = router; // eslint-disable-line
