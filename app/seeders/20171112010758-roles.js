'use strict';
const faker = require('faker');
const {User, Role} = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {

    var administrators = [
      Object.assign(fakeUser(),{
        username: 'mario',
        password: 'realmario'
      })
    ];

    var users = [
      Object.assign(fakeUser(),{
        username: 'luigi',
        password: 'greenmario'
      }),
      Object.assign(fakeUser(),{
        username: 'peach',
        password: 'kidnapped'
      }),
      Object.assign(fakeUser(),{
        username: 'browser',
        password: 'kidnapper'
      })
    ];

    return Promise.all([
      Role.create({role: "Administrator", Users: administrators}, { include: [{model: User}] }),
      Role.create({role: "User", Users: users}, {include: [{model: User}]})
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null);
  }
};

const fakeUser = function(){
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email()
  }
}