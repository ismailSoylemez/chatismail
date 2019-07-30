var express = require('express');
var router = express.Router();

/*get chat homepage*/
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('chat' , {user: req.user}); //chat pug ı render edecek
});

module.exports = router;
