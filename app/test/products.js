const request = require('supertest')
			, app = require('../app')
			, { expect } = require('chai');

const models = require('../models');
const { User, Role, Product } = models;
const userFactory = require('./helpers/users');
const accountsFactory = require('./helpers/accounts');
const productFactory = require('./helpers/products');

describe('Products', function(){
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

  it("Product succesfully created by admin", function(done){
    accountsFactory.login(admin)
      .end((err, response) => {       
        if(err) done(err);

        request(app)
          .post('/products')
          .send(product)
          .set('Accept', 'application/json')
          .set('Authorization', "JWT " + response.body.token )
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, response) => {
            if(err) done(err);
            
            Product.count().then((count)=>{            
              expect(response.body).to.have.all.keys(['id', 'name', 'description', 'stock', 'price', 'likes', 'createdAt', 'updatedAt']);
              expect(count).to.equal(1)
              done();
            })
          });
      });
  });

  it("User is not allowed to create a product", function(done){
    accountsFactory.login(user)
      .end((err, response) => {       
        if(err) done(err);

        request(app)
          .post('/products')
          .send(product)
          .set('Accept', 'application/json')
          .set('Authorization', "JWT " + response.body.token )
          .expect('Content-Type', /json/)
          .expect(403, done)
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