var express = require('express');
var passport = require("passport");
var router = express.Router();
var { User } = require('../models');

/* GET users listing. */
router.get('/', passport.authenticate('jwt', {session: false, failWithError: true}), function(req, res, next) {
  User.findAndCountAll({offset: 0, limit: 10})
  	.then(function(result){
  		res.send(result);
  	})
});

module.exports = router;
