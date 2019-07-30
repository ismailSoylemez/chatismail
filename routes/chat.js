var express = require('express');
var router = express.Router();

/*get chat homepage*/
router.get('/', function(req, res, next) {
  res.render('chat'); //chat pug ı render edecek
});

module.exports = router;
