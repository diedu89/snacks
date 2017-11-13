const request = require('supertest')
			, app = require('../app')
			, { expect } = require('chai');

const models = require('../models');
const {User, Role} = models;
const userFactory = require('./helpers/users');
const accountsFactory = require('./helpers/accounts');

describe('Authentication', function(){
	var user = userFactory.create({ username: 'mario', password: 'realmario'});
  var badUser = userFactory.create();

	before(function(done){
		models.sequelize.sync().then(function(){
			Role.create({role: "Administrator", Users: [user]}, { include: [{model: User}] }).then(function(){
				done(null);
			});
		})
	});

  it("Invalid credentials (inexistent user)", function(done){
    accountsFactory.login(badUser)
      .expect(401)
      .end((err, response) => {       
        if(err) done(err);
        expect(response.body.message).to.equal('Invalid credentials');
        done();
      });
  });

  it("Invalid credentials (wrong password)", function(done){
    accountsFactory.login({username: user.username, password: badUser.password})
      .expect(401)
      .end((err, response) => {       
        if(err) done(err);
        expect(response.body.message).to.equal('Invalid credentials');
        done();
      });
  });

  it("Succesfull login", function(done){
    accountsFactory.login(user)
      .expect(200)
      .end((err, response) => {       
        if(err) done(err);
        expect(response.body).to.have.all.keys(['token']);
        done();
      });
  });

  after(function(done){
    Role.destroy({where: { role: "Administrator" } }).then(function(){
      done(null);
    });
  });

});