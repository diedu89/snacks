const request = require('supertest')
			, app = require('../app')
			, { expect } = require('chai');

const faker = require('faker');
const models = require('../models');
const {User, Role} = models;

describe('Users list', function(){
	var user = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    username: 'mario',
    password: 'realmario'
  }
  this.setTimeOut
	before(function(done){
		models.sequelize.sync().then(function(){
			Role.create({role: "Administrator", Users: [user]}, { include: [{model: User}] }).then(function(){
				done(null);
			});
		})
	});

	it("Show the first user", function(done){
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, response) => {
      	if(err) done(err);
      	expect(response.body).to.have.all.keys(['count','rows']);
      	expect(response.body.count).to.equal(1);
      	expect(response.body.rows[0]).to.include({
      		firstname: user.firstname,
			    lastname: user.lastname,
			    email: user.email,
			    username: user.username
      	})
      	done();
      });
	})
})

