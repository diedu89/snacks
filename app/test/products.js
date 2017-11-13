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

  beforeEach(function(done) {
    Product.destroy({where:{}, truncate:true}).then(done);
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

  it("Product succesfully deleted by admin", function(done){
    var product = null;
    Product.create(productFactory.create())
      .then(p => {
        product = p;
        return Product.count();
      })
      .then(initialCount => {
        accountsFactory.login(admin)
          .end((err, response) => {       
            if(err) done(err);

            request(app)
              .delete('/products/' + product.id)
              .set('Accept', 'application/json')
              .set('Authorization', "JWT " + response.body.token )
              .expect(204)
              .end((err, response) => {
                if(err) done(err);
                
                Product.count().then((count)=>{            
                  expect(count).to.equal(initialCount - 1)
                  done();
                })
              });
          });
      })
  });

  it("Product not found", function(done){
    accountsFactory.login(admin)
      .end((err, response) => {       
        if(err) done(err);

        request(app)
          .delete('/products/9999')
          .set('Accept', 'application/json')
          .set('Authorization', "JWT " + response.body.token )
          .expect('Content-Type', /json/)
          .expect(404, done)
      });
  });

  it("User is not allowed to delete a product", function(done){
    accountsFactory.login(user)
      .end((err, response) => {       
        if(err) done(err);

        request(app)
          .delete('/products/1')
          .set('Accept', 'application/json')
          .set('Authorization', "JWT " + response.body.token )
          .expect('Content-Type', /json/)
          .expect(403, done)
      });
  });

  it("List products", function(done){
    var products = []
    for (var i = 0; i < 20; i++) products.push(productFactory.create());
    
    Product.bulkCreate(products, {}).then(function(result){
      console.log(result.length);

      request(app)
        .get('/products')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) =>{
          if(err) done(err);
          
          expect(response.body).to.have.all.keys(['count','rows']);
          expect(response.body.count).to.equal(20);
          expect(response.body.rows[0]).to.include({
            name: products[0].name,
            description: products[0].description,
            price: parseFloat(products[0].price),
            stock: products[0].stock
          })

          done(null);
        })
    })
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