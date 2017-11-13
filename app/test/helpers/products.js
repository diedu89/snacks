const faker = require('faker');

const create = function(props){
	const product = {
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(0.5, 10, 2),
    stock: Math.floor(Math.random() * 100),
    likes: 0
	}

	return Object.assign(product, props || {});
}

module.exports = {
	create: create
}