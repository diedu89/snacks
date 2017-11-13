var express = require('express');
var passport = require("passport");
var router = express.Router();
var { Product, Sequelize } = require('../models');
var permit = require('../permission');

/* GET products listing. */
router.get('/',
	function(req, res, next) {
	  Product.findAndCountAll({offset: 0, limit: 10})
	  	.then(function(result){
	  		res.send(result);
	  	})
	}
);

/* POST create a product */
router.post('/', 
	passport.authenticate('jwt', {session: false, failWithError: true}), 
	permit("Administrator"), function(req, res, next) {
		Product.create(req.body).then((product) => {
			res.send(product);	
		}, next)
});

/*DELETE delete a product*/
router.delete('/:id', 
	passport.authenticate('jwt', {session: false, failWithError: true}), 
	permit("Administrator"), function(req, res, next) {
		Product.findOne({where: {id: req.params.id}})
			.then(product => {
				if(!product){
					res.status(404).json();
					return Promise.reject();
				} 

				return Product.destroy({where: {id: product.id}});
			}, next)
			.then(deletedProduct => {
				res.status(204).send();
			}, next)

});

module.exports = router;
