'use strict';
const faker = require('faker');
const { Product } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var products = [];
    var names = [];
    var name = "";
    for (var i = 0; i < 50; i++) {
      
      //avoid unique constraint validation when seeding
      name = faker.commerce.productName();
      var lastIndex = names.lastIndexOf(name);
      if(lastIndex >= 0)
        name = name + " " + lastIndex
      names.push(name);

      products.push({
        name: name,
        description: faker.lorem.sentences(),
        price: faker.commerce.price(0.5, 10, 2),
        stock: Math.floor(Math.random() * 100),
        likes: 0
      })
    }
    
    return Product.bulkCreate(products, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});    
  }
};
