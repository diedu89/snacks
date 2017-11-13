var express = require('express');
var passport = require("passport");
var router = express.Router();
var { Product } = require('../models');
var permit = require('../permission');

/* GET users listing. */
router.post('/', 
	passport.authenticate('jwt', {session: false, failWithError: true}), 
	permit("Administrator"), function(req, res, next) {
		Product.create(req.body).then((product) => {
			res.send(product);	
		})
});

module.exports = router;
