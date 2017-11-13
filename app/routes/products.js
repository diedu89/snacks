var express = require('express');
var passport = require("passport");
var router = express.Router();
var { Product, Sequelize } = require('../models');
var permit = require('../permission');

/* GET products listing. */
router.get('/',
	function(req, res, next) {
		var sortBy = req.query.sortBy || "name"
		if(!["name", "likes"].includes(sortBy)){
			res.status(400).send({messsage: "Products can only be sorted by name or number of likes"});
			return next();
		}
		
		var sortOrder = (req.query.sortOrder || "asc").toUpperCase();
		if(!["ASC", "DESC"].includes(sortOrder)){
			res.status(400).send({messsage: "Products can only be sorted by name or number of likes"});
			return next();
		}

		var page = req.query.page || 1;
		var perPage = req.query.perPage || 10;

		var options = {
			offset: (page - 1) * perPage, 
			limit: perPage, 
			order: [[sortBy, sortOrder]]
		}

		if(req.query.search)
			options.where = { name: {[Sequelize.Op.iLike]: '%' + req.query.search + '%'}}

	  Product.findAndCountAll(options)
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
