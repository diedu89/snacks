const request = require('supertest')
			, app = require('../app')
			, { expect } = require('chai');

const models = require('../models');
const {User, Role} = models;
const userFactory = require('./helpers/users');

describe('Users list', function(){
	var user = userFactory.create();

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


  describe("Safety in users", function(){
    it("Unanthorize for non registereds user", function(done){
        request(app)
          .get('/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401, done);
    });
  });

  after(function(done){
    Role.destroy({where: { role: "Administrator" } }).then(function(){
      done(null);
    });
  });
})
