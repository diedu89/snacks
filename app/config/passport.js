var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var { User } = require('../models');

module.exports = function(passport){
	var jwtOptions = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
		secretOrKey: process.env.JWT_SECRET
	}

	var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
	  User.findOne({where: {id: jwt_payload.id}}).then(function(user){
	    if (user) {
	      next(null, jwt_payload);
	    } else {
	      next(null, false);
	    }
	  })
	});

	passport.use("jwt", strategy);
} 