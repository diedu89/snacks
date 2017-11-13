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
    Product.destroy({where:{}, truncate:true}).then(() => done());
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

  it("Product to delete not found", function(done){
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

  it("List products with pagination", function(done){
    var products = []
    for (var i = 0; i < 20; i++) products.push(productFactory.create());
    
    Product.bulkCreate(products, {}).then(function(result){
      products = products.sort(sortProducts('name', 1))

      request(app)
        .get('/products?page=3&perPage=5')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) =>{
          if(err) done(err);
          var paginatedProduct = products[10];

          expect(response.body).to.have.all.keys(['count','rows']);
          expect(response.body.count).to.equal(20);
          expect(response.body.rows[0]).to.include({
            name: paginatedProduct.name,
            description: paginatedProduct.description,
            price: parseFloat(paginatedProduct.price),
            stock: paginatedProduct.stock
          })

          done(null);
        })
    })
  });

  it("Sort by likes in desc order", function(done){
    var products = []
    for (var i = 0; i < 20; i++) products.push(productFactory.create());
    
    Product.bulkCreate(products, {}).then(function(result){
      products = products.sort((a,b) => b.likes - a.likes);

      request(app)
        .get('/products?sortBy=likes&sortOrder=desc')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) =>{
          if(err) done(err);

          expect(response.body).to.have.all.keys(['count','rows']);
          expect(response.body.count).to.equal(20);
          expect(response.body.rows[0]).to.include({
            likes: products[0].likes,
            name: products[0].name,
            description: products[0].description,
            price: parseFloat(products[0].price),
            stock: products[0].stock
          })

          done(null);
        })
    })
  });

  it("Product succesfully updated by admin", function(done){
    var product = null;
    Product.create(productFactory.create())
      .then(initialProduct => {
        accountsFactory.login(admin)
          .end((err, response) => {       
            if(err) done(err);

            request(app)
              .patch('/products/' + initialProduct.id)
              .send({price: 4, stock: 30})
              .set('Accept', 'application/json')
              .set('Authorization', "JWT " + response.body.token )
              .expect(200)
              .end((err, response) => {
                if(err) done(err);
                
                Product.findOne({where: {id: initialProduct.id}}).then((product)=>{         
                  expect(product).to.include({
                    price: 4, stock: 30
                  })
                  expect(response.body).to.equal(product);
                  done();
                })
              });
          });
      })
  });

  it("Can edit only price or stock", function(done){
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
              .patch('/products/' + product.id)
              .send({name: "new name", price: 30})
              .set('Accept', 'application/json')
              .set('Authorization', "JWT " + response.body.token )
              .expect(400)
              .end((err, response) => {
                if(err) done(err);
                
                expect(response.body.message).to.equal("Only price and stock can be edited")
                done();
              });
          });
      })
  });

  it("Product to update not found", function(done){
    accountsFactory.login(admin)
      .end((err, response) => {       
        if(err) done(err);

        request(app)
          .patch('/products/9999')
          .set('Accept', 'application/json')
          .set('Authorization', "JWT " + response.body.token )
          .expect('Content-Type', /json/)
          .expect(404, done)
      });
  });

  it("User is not allowed to update a product", function(done){
    accountsFactory.login(user)
      .end((err, response) => {       
        if(err) done(err);

        request(app)
          .patch('/products/1')
          .send({})
          .set('Accept', 'application/json')
          .set('Authorization', "JWT " + response.body.token )
          .expect('Content-Type', /json/)
          .expect(403, done)
      });
  });

  var sortProducts = (sortBy, sortOrder) => {
    return (a,b) => {
      var nameA = a[sortBy].toUpperCase(); // ignore upper and lowercase
      var nameB = b[sortBy].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) 
        return -1 * sortOrder;
      if (nameA > nameB)
        return 1 * sortOrder;

      return 0;
    }
  }

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