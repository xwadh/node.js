'user strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '后台登录' });
});

module.exports = router;
