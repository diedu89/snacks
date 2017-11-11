var express = require('express');
var router = express.Router();
var { sequelize } = require('../models')
/* GET home page. */
router.get('/', function(req, res, next) {
	sequelize
	  .authenticate()
	  .then(() => {
	    console.log('Connection has been established successfully.');
	  })
	  .catch(err => {
	    console.error('Unable to connect to the database:', err);
	  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
