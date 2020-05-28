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
      return queryInterface.bulkInsert('Carts', [{
        UserId: userid,
        ProductId: productid,
        total: 1,
        notes: 'contoh notes',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    })
    .then(() => {
      done()
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
      return queryInterface.bulkDelete('Categories')
    })
    .then(() => {
      return queryInterface.bulkDelete('Carts')
    })
    .then(() => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe('Cart Test', () => {
  describe('Get All items from carts of current user', () => {
    test(`Should return all categories with status 200`, done => {
      request(app)
        .get('/carts')
        .set('token', token)
        .end((err, response) => {
          if (err) {
            return done(err);
          } else {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('Carts');
            return done();
          }
        });
    });
  });
  describe('Add new item from carts of current user', () => {
    describe('Success', () => {
      test(`Should return updated cart with status 201`, done => {
        let newItem = {
          UserId: userid,
          ProductId: productid,
          total: 1,
          notes: 'biarin aja'
        }
        request(app)
          .post('/carts')
          .send(newItem)
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('Cart');
              return done();
            }
          });
      });
    });
  });
});