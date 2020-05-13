const app = require('../app.js');
const request = require('supertest');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { generateToken } = require('../helpers/jwt.js');

const users = require('../data/users.json').map(user => {
  user.createdAt = new Date();
  user.updatedAt = new Date();
  return user;
});
const categories = require('../data/categories.json').map(category => {
  category.createdAt = new Date();
  category.updatedAt = new Date();
  return category;
});

let token;
let token_err;
let invalid_token;
let productid;
let productsearch;
let userid;

beforeAll(done => {
  queryInterface
    .bulkInsert('Users', users, { returning: true })
    .then(results => {
      token = generateToken({
        id: results[0].id,
        email: results[0].email
      });
      userid = results[1].id;
      token_err = generateToken({
        id: results[1].id,
        email: results[1].email
      });
      
      console.log(`Users Created: ${users}`);
      return queryInterface.bulkInsert("Categories", categories, {
        returning: true
      })
    })
    .then(result => {
      const products = require('../data/products.json').map(product => {
        product.createdAt = new Date();
        product.updatedAt = new Date();
        product.UserId = userid;
        product.CategoryId = result[0].id;
        return product;
      });
      return queryInterface.bulkInsert('Products', products, { returning: true });
    })
    .then(result => {
      productid = result[0].id;
      productsearch = result[0];
      done();
    })
    .catch(err => {
      done(err);
    });
});

afterAll(done => {
  queryInterface
    .bulkDelete('Products')
    .then(() => {
      console.log('Db Product clean up');
      return queryInterface.bulkDelete('Users');
    })
    .then(() => {
      console.log(`Db User Clean up`);
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe('Product Test', () => {
  describe('Get All Product', () => {
    test('Should return all products from database', done => {
      request(app)
        .get('/products')
        .end((err, response) => {
          if (err) {
            return done(err);
          } else {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('Products');
            return done();
          }
        });
    });
  });
  describe('Get Product By Id', () => {
    describe('Success', () => {
      test('Should return a product from database', done => {
        request(app)
          .get(`/products/${productid}`)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body.Product;
              expect(response.status).toBe(200);
              expect(data).toHaveProperty('name', productsearch.name);
              expect(data).toHaveProperty('image_url', productsearch.image_url);
              expect(data).toHaveProperty('price', productsearch.price);
              expect(data).toHaveProperty('stock', productsearch.stock);

              return done();
            }
          });
      });
    });
    describe('Failure', () => {
      test('should return 404 Not found', done => {
        const errors = {
          code: 404,
          message: `Product Not Found`
        };
        request(app)
          .get(`/products/09709870`)
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body;
              expect(response.status).toBe(404);
              expect(data).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
    });
  });
  describe('Create Product', () => {
    describe('Success', () => {
      test('Should return new Product added', done => {
        const newProduct = {
          name: 'Bimoli',
          image_url:
            'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png',
          price: 25000,
          stock: 10
        };
        request(app)
          .post('/products')
          .send(newProduct)
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body.Product;
              expect(response.status).toBe(201);
              expect(data).toHaveProperty('name', newProduct.name);
              expect(data).toHaveProperty('image_url', newProduct.image_url);
              expect(data).toHaveProperty('price', newProduct.price);
              expect(data).toHaveProperty('stock', newProduct.stock);
              return done();
            }
          });
      });
    });
    describe('Failure', () => {
      test('Should return fail with status 400 and error message', done => {
        const errors = [
          {
            message: `Product name cannot be empty`
          },
          {
            message: `Price must be integer`
          },
          {
            message: `Stock must be integer`
          }
        ];
        const newProduct = {
          name: '',
          image_url:
            'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png',
          price: 'bukan integer nih',
          stock: 'string'
        };
        request(app)
          .post('/products')
          .send(newProduct)
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
      test('Should return fail with status 401 and error message', done => {
        const newProduct = {
          name: '',
          image_url:
            'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png',
          price: 'bukan integer nih',
          stock: 'string'
        };
        request(app)
          .post('/products')
          .send(newProduct)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(401);
              expect(response.body).toHaveProperty('message', 'Please Login First!');
              return done();
            }
          });
      });
    });
  });
  describe('Update Product', () => {
    describe('Success', () => {
      test('should return the updated product', done => {
        const newProduct = {
          name: 'Bimoli',
          image_url:
            'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png',
          price: 25000,
          stock: 10
        };
        request(app)
          .put(`/products/${productid}`)
          .send(newProduct)
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body.Product;
              expect(response.status).toBe(200);
              expect(data).toHaveProperty('name', newProduct.name);
              expect(data).toHaveProperty('image_url', newProduct.image_url);
              expect(data).toHaveProperty('price', newProduct.price);
              expect(data).toHaveProperty('stock', newProduct.stock);
              return done();
            }
          });
      });
    });
    describe('Failure', () => {
      test('should return 404 Not found', done => {
        const newProduct = {
          name: 'Bimoli',
          image_url:
            'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png',
          price: 25000,
          stock: 10
        };
        const errors = {
          code: 404,
          message: `Product Not Found`
        };
        request(app)
          .put(`/products/09709870`)
          .send(newProduct)
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body;
              expect(response.status).toBe(404);
              expect(data).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
      test('should return 401 unauthorized', done => {
        const newProduct = {
          name: 'Bimoli',
          image_url:
            'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png',
          price: 25000,
          stock: 10
        };
        const errors = {
          code: 401,
          message: `You cannot access this service`
        };
        request(app)
          .put(`/products/${productid}`)
          .send(newProduct)
          .set('token', token_err)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body;
              expect(response.status).toBe(401);
              expect(data).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
      test('should return 401 unauthorized invalid access token', done => {
        const newProduct = {
          name: 'Bimoli',
          image_url:
            'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png',
          price: 25000,
          stock: 10
        };
        invalid_token = generateToken({
          id: 4848,
          email: `emailsalah@mail.com`
        });
        const errors = {
          code: 401,
          name: "NotAuthenticatedError",
          message: `Invalid Access Token`
        };
        request(app)
          .put(`/products/${productid}`)
          .send(newProduct)
          .set('token', invalid_token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body;
              expect(response.status).toBe(401);
              expect(data).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
    });
  });
  describe('Delete Product', () => {
    describe('Success', () => {
      test('should return the deleted product', done => {
        const deletedProduct = {
          name: 'Bimoli',
          image_url:
            'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png',
          price: 25000,
          stock: 10
        };
        request(app)
          .delete(`/products/${productid}`)
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body.Product;
              expect(response.status).toBe(200);
              expect(data).toHaveProperty('name', deletedProduct.name);
              expect(data).toHaveProperty('image_url', deletedProduct.image_url);
              expect(data).toHaveProperty('price', deletedProduct.price);
              expect(data).toHaveProperty('stock', deletedProduct.stock);
              return done();
            }
          });
      });
    });
    describe('Failure', () => {
      test('should return 404 Not found', done => {
        const errors = {
          code: 404,
          message: `Product Not Found`
        };
        request(app)
          .delete(`/products/09709870`)
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body;
              expect(response.status).toBe(404);
              expect(data).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
    });
  });
});
