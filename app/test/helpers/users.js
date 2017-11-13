const faker = require('faker');

const create = function(props){
	const user = {
		firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password()
	}

	return Object.assign(user, props || {});
}

module.exports = {
	create: create
}