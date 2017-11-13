const request = require('supertest')
			, app = require('../app')
			, { expect } = require('chai');

const models = require('../models');
const {User, Role} = models;
const userFactory = require('./helpers/users');
const accountsFactory = require('./helpers/accounts');

describe('Users', function(){
	var admin = userFactory.create();
  var user = userFactory.create();

	before(function(done){
		models.sequelize.sync().then(function(){
      Promise.all([
			  Role.create({role: "Administrator", Users: [admin]}, { include: [{model: User}] }),
        Role.create({role: "User", Users: [user]}, { include: [{model: User}] })
      ]).then(function(){
				done(null);
			});
		})
	});

	it("List users", function(done){
    accountsFactory.login(admin)
      .end((err, response) => {

        request(app)
          .get('/users')
          .set('Accept', 'application/json')
          .set('Authorization', "JWT " + response.body.token )
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, response) => {
            if(err) done(err);
            
            expect(response.body).to.have.all.keys(['count','rows']);
            expect(response.body.count).to.equal(2);
            expect(response.body.rows[1]).to.include({
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              username: user.username
            })
            done();
          });
      });

	})

  describe("Safety in users", function(){
    it("Unanthorize for non registereds user", function(done){
        request(app)
          .get('/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401, done);
    });

    it("Unanthorize for non administrators", function(done){
        accountsFactory.login(user)
          .end((err, response) => {
            request(app)
              .get('/users')
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .set('Authorization', "JWT " + response.body.token )
              .expect(403, done)
          });
    });

  });

  after(function(done){
    Promise.all([
      Role.destroy({where: { role: "Administrator" } }),
      Role.destroy({where: { role: "User" } })
    ]).then(function(){
      done(null);
    });
  });
})
