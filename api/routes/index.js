var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Please read project README.md for more information. https://github.com/My-Quran-Tajwid/quran-tajwid-api');
});

module.exports = router;
