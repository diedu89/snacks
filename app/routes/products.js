var express = require('express');
var passport = require("passport");
var router = express.Router();
var { Product, Sequelize, Purchase } = require('../models');
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

/* DELETE delete a product */
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

/* PATCH update price or stock */
router.patch('/:id', 
	passport.authenticate('jwt', {session: false, failWithError: true}), 
	permit("Administrator"), function(req, res, next) {
		var permited = ["price", "stock", "price,stock"];
		if(!permited.includes(Object.keys(req.body).sort().join(","))){
			res.status(400).send({message: "Only price and stock can be edited"});
			return next();
		}
		var product = null;
		Product.findOne({where: {id: req.params.id}})
			.then(p => {
				product = p;
				if(!product){
					res.status(404).json();
					return Promise.reject();
				}

				return product.update(req.body);
			}, next)
			.then(rows => {
				if(rows > 0) return Product.findOne({where: {id: req.params.id}}).then(p => res.send(p));

				res.send(product);
			}, next)
});

/* POST like a product */
router.post('/:id/likes', 
	passport.authenticate('jwt', {session: false, failWithError: true}), 
	function(req, res, next) {
		Product.findById(req.params.id)
			.then(product => {
				if(!product){
					res.status(404).json();
					return Promise.reject();
				} 

				product.countUsers({where: {id: req.user.id}})
					.then(count =>{
						if(count == 0){
							product.setUsers([req.user.id]).then(relation => {
								res.status(204).json();
							})
						}else{
							res.status(204).json();
						}
					})
			}, next);
	}
);

/* POST buy a product */
router.post('/:id/purchases', 
	passport.authenticate('jwt', {session: false, failWithError: true}), 
	function(req, res, next) {
		Product.findById(req.params.id)
			.then(product => {
				if(!product){
					res.status(404).json();
					return Promise.reject();
				} 

				if(!req.body.quantity){
					res.status(400).send({message: "Must define a quantity to buy"});
					return next();
				}

				if(req.body.quantity > product.stock){
					res.status(409).send({message: "There is not enough product in stock, try purchasing less"});
					return next();
				}

				Purchase.create({UserId: req.user.id, ProductId: product.id, quantity: req.body.quantity, currentPrice: product.price})
				.then(relation => {
					res.status(204).json();
				})
			}, next);
	}
);

module.exports = router;
