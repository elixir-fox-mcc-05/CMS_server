const app = require('../app.js');
const request = require('supertest');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

const products = require('../data/products.json').map(product => {
  product.createdAt = new Date();
  product.updatedAt = new Date();
  return product;
});

beforeAll(done => {
  queryInterface
    .bulkInsert('Products', products, {})
    .then(() => {
      console.log(`Products Created: ${products}`);
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
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('Product');
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
    });
  });
  describe('Update Product', () => {
    test('should return the updated product', done => {
      const newProduct = {
        name: 'Bimoli',
        image_url:
          'https://img1.ralali.id/mediaflex/500/assets/img/Libraries/257613_Minyak-Goreng-Bimoli-Klasik-Pouch-2L-Minyak-Sayur-Bimoli-2000mL_e0U0AarHllkjKrYO_1549057560.png',
        price: '25000',
        stock: 10
      };
      request(app)
        .put('/products')
        .send(newProduct)
        .end((err, response) => {
          if (err) {
            return done(err);
          } else {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('Product');
            return done();
          }
        });
    });
  });
});
