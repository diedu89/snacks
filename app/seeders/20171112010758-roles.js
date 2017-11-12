'use strict';
const faker = require('faker');
const {User, Role} = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {

    var administrators = [
    {
      ...(fakeUser()),
      username: 'mario',
      password: 'realmario'
    }
    ];

    var users = [
      {
        ...(fakeUser()),
        username: 'luigi',
        password: 'greenmario'
      },
      {
        ...(fakeUser()),
        username: 'peach',
        password: 'kidnapped'
      },
      {
        ...(fakeUser()),
        username: 'browser',
        password: 'kidnapper'
      }
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