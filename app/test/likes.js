const request = require('supertest')
			, app = require('../app')
			, { expect } = require('chai');

const models = require('../models');
const { Product, Role, User } = models;
const userFactory = require('./helpers/users');
const accountsFactory = require('./helpers/accounts');
const productFactory = require('./helpers/products');

describe('Likes', function(){
	var user = userFactory.create();
  var admin = userFactory.create();
  var product = productFactory.create();

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

  beforeEach(function(done) {
    Product.destroy({where:{}, truncate:true}).then(() => done());
  });

  it("Not logged user is not allowed to like a product", function(done){
    request(app)
      .post('/products/1/likes')
      .set('Accept', 'application/json')
      .expect(401,done)
  });

  it("User likes a product", function(done){
    Product.create(productFactory.create())
      .then(product => {
        accountsFactory.login(admin)
          .end((err, response) => {       
            if(err) done(err);

            request(app)
              .post('/products/' + product.id + '/likes')
              .set('Accept', 'application/json')
              .set('Authorization', "JWT " + response.body.token )
              .expect(204)
              .end((err, response) => {
                if(err) done(err);
                
                Product.findById(product.id).then(p => {
                  expect(p.likes).to.equal(product.likes + 1);
                  done();
                })
              });
          });
      })
  });

  it("Like twice must not increment neither create relation", function(done){
    var product = null;
    User.findOne({where:{username: user.username}})
      .then(u => {
        user = u;
        return Product.create(productFactory.create());
      })
      .then(p => {
        product = p;
        return product.setUsers([user]);
      })
      .then(result => {
        accountsFactory.login(user)
          .end((err, response) => {       
            if(err) return done(err);

            request(app)
              .post('/products/' + product.id + '/likes')
              .set('Accept', 'application/json')
              .set('Authorization', "JWT " + response.body.token )
              .expect(204)
              .end((err, response) => {
                if(err) return done(err);
                
                Product.findById(product.id).then(p => {
                  expect(p.likes).to.equal(product.likes)
                  done();
                })
              });
          });
      })
  });

  it("Product to like not found", function(done){
    accountsFactory.login(admin)
      .end((err, response) => {       
        if(err) done(err);

        request(app)
          .post('/products/9999/likes')
          .set('Accept', 'application/json')
          .set('Authorization', "JWT " + response.body.token )
          .expect('Content-Type', /json/)
          .expect(404, done)
      });
  });

  after(function(done){
    Promise.all([
      Role.destroy({where: { role: "Administrator" } }),
      Role.destroy({where: { role: "User" } }),
      Product.destroy({where:{}, truncate:true})
    ]).then(function(){
      done(null);
    });
  });

});