var express = require('express');
var router = express.Router();
var { User, Role } = require('../models');
var jwt = require('jsonwebtoken');

/* POST authenticate */
router.post('/login', function(req, res, next) {
	User.findOne({include: [{model: Role}], where: {username: req.body.username}})
		.then(function(user){
			if (!user) {
				res.status(401).send({message: "Invalid credentials"});
			}else{
				if(user.checkPassword(req.body.password)){
					var payload = {id: user.id, role: user.Role.role};
			    var token = jwt.sign(payload, process.env.JWT_SECRET);
			    res.send({token: token});
				}else{
					res.status(401).send({message: "Invalid credentials"});
				}
			}
		})
});

module.exports = router;
