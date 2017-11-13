var express = require('express');
var router = express.Router();
var { User } = require('../models');

/* POST authenticate */
router.post('/login', function(req, res, next) {
	User.findOne({where: {username: req.body.username}})
		.then(function(user){
			if (!user) {
				res.status(401).send({message: "Invalid credentials"});
			}else{
				if(user.checkPassword(req.body.password)){
					res.send({message: "nice!"});
				}else{
					res.status(401).send({message: "Invalid credentials"});
				}
			}
		})
});

module.exports = router;
