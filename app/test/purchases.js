const request = require('supertest')
			, app = require('../app')
			, { expect } = require('chai');

const models = require('../models');
const { Product, Role, User } = models;
const userFactory = require('./helpers/users');
const accountsFactory = require('./helpers/accounts');
const productFactory = require('./helpers/products');

describe('Purchases', function(){
	var user = userFactory.create();
  var admin = userFactory.create();

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

  it("Only logged user can buy", function(done){
    request(app)
      .post('/products/1/purchases')
      .set('Accept', 'application/json')
      .expect(401, done)
  });

  it("Logged user purchase a product", function(done){
    Product.create(productFactory.create())
      .then(product => {
        accountsFactory.login(user)
          .end((err, response) => {       
            if(err) done(err);

            request(app)
              .post('/products/' + product.id + '/purchases')
              .send({quantity: 1})
              .set('Accept', 'application/json')
              .set('Authorization', "JWT " + response.body.token )
              .expect(204)
              .end((err, response) => {
                if(err) done(err);
                var updatedProduct;
                Product.findById(product.id).then(p => { 
                  updatedProduct = p; 
                  return p.countBuyers();
                }).then( count => {
                  expect(updatedProduct.stock).to.equal(product.stock - 1);
                  expect(count).to.equal(1);
                  done();
                })
              });
          });
      })
  });

  it("Insufficient stock", function(done){
    Product.create(productFactory.create())
      .then(product => {
        accountsFactory.login(user)
          .end((err, response) => {       
            if(err) done(err);

            request(app)
              .post('/products/' + product.id + '/purchases')
              .send({quantity: product.stock + 1})
              .set('Accept', 'application/json')
              .set('Authorization', "JWT " + response.body.token )
              .expect(409)
              .end((err, response) => {
                if(err) done(err);
                
                var updatedProduct;
                Product.findById(product.id).then(p => { 
                  updatedProduct = p; 
                  return p.countBuyers();
                }).then( count => {
                  expect(updatedProduct.stock).to.equal(product.stock);
                  expect(count).to.equal(0);
                  expect(response.body.message).to.equal("There is not enough product in stock, try purchasing less");
                  done();
                })
              });
          });
      })
  });

  it("Product to purchase not found", function(done){
    accountsFactory.login(user)
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