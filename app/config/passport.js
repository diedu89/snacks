var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var { User } = require('../models');

module.exports = function(passport){
	var jwtOptions = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
		secretOrKey: 'somesnacks'
	}

	var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
	  User.findOne({username: jwt_payload.id}).then(function(user){
	    if (user) {
	      next(null, user);
	    } else {
	      next(null, false);
	    }
	  })
	});

	passport.use("jwt", strategy);
} 