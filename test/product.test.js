const app = require('../app');
const request = require('supertest');

const { queryInterface } = require('../models').sequelize;
const { generateToken } = require('../helpers/jsonwebtoken');
const { generateHash } = require('../helpers/bcryptjs');

const dummyUser = require('./dummyUser.json');

describe('Product create, read, update, delete', () => {
  dummyUser.map((user) => {
    user.password = generateHash(user.password);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return user;
  });

  beforeAll(() => {
    queryInterface.bulkDelete('Products');
    queryInterface.bulkDelete('Users');
    queryInterface.bulkInsert('Users', dummyUser);
  });

  // ============================================
  // Dummy access_token admin
  // ============================================
  const payloadAdmin = {
    id: 1,
    email: 'admin@admin.admin',
    role: 'admin',
  };
  let access_token_admin = generateToken(payloadAdmin);

  // ============================================
  // Dummy access_token customer
  // ============================================
  const payloadCustomer = {
    id: 2,
    email: 'customer@customer.customer',
    role: 'customer',
  };
  const access_token_customer = generateToken(payloadCustomer);

  // ============================================
  // Test cases
  // ============================================
  const inputProduct = {
    name: 'Gorengan',
    image_url: 'https://imageurl.test',
    price: 2000,
    stock: 100,
  };

  const inputProductNameEmpty = {
    name: '',
    image_url: 'https://imageurl.test',
    price: 2000,
    stock: 100,
  };

  const inputProductImageEmpty = {
    name: 'Gorengan',
    image_url: '',
    price: 2000,
    stock: 100,
  };

  const inputProductPriceEmpty = {
    name: 'Gorengan',
    image_url: 'https://imageurl.test',
    price: '',
    stock: 100,
  };

  const inputProductStockEmpty = {
    name: 'Gorengan',
    image_url: 'https://imageurl.test',
    price: 2000,
    stock: '',
  };

  const inputProductEmptyAndFalse = {
    name: '',
    image_url: '',
    price: -1,
    stock: -1,
  };

  const inputProductAllNull = {
    name: null,
    image_url: null,
    price: null,
    stock: null,
  };

  describe('=> Add a new product success', () => {
    describe('> Add new product success!', () => {
      test('Should return CreatedProduct', (done) => {
        request(app)
          .post('/products')
          .send(inputProduct)
          .set('access_token', access_token_admin)
          .expect((data) => {
            const status = data.status;
            const CreatedProduct = data.body.CreatedProduct;
            expect(status).toEqual(201);
            expect(CreatedProduct).toHaveProperty('id');
            expect(CreatedProduct).toHaveProperty('name', inputProduct.name);
            expect(CreatedProduct).toHaveProperty(
              'image_url',
              inputProduct.image_url
            );
            expect(CreatedProduct).toHaveProperty('price', inputProduct.price);
            expect(CreatedProduct).toHaveProperty('stock', inputProduct.stock);
          })
          .end((err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });
  });

  describe('=> Add a new product failed', () => {
    describe('> Add new product failed input empty and false', () => {
      test('Should return bad request. All error messages (400).', (done) => {
        request(app)
          .post('/products')
          .send(inputProductEmptyAndFalse)
          .set('access_token', access_token_admin)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            const expected = [
              {
                message: 'Please insert name',
              },
              {
                message: 'Please insert image url',
              },
              {
                message: 'Please insert valid url ex:(foo@bar.com)',
              },
              {
                message: 'Inputted price should greater or equal 0',
              },
              {
                message: 'Inputted stock should greater or equal 0',
              },
            ];
            expect(status).toEqual(400);
            expect(error).toHaveProperty('code', 400);
            expect(error).toHaveProperty('type', 'BAD REQUEST');
            expect(error).toHaveProperty('message', expected);
          })
          .end((err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('> Add new product failed input name empty', () => {
      test('Should return bad request. Name empty error messages (400).', (done) => {
        request(app)
          .post('/products')
          .send(inputProductNameEmpty)
          .set('access_token', access_token_admin)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            const expected = [
              {
                message: 'Please insert name',
              },
            ];
            expect(status).toEqual(400);
            expect(error).toHaveProperty('code', 400);
            expect(error).toHaveProperty('type', 'BAD REQUEST');
            expect(error).toHaveProperty('message', expected);
          })
          .end((err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('> Add new product failed input image empty', () => {
      test('Should return bad request. Image empty error messages (400).', (done) => {
        request(app)
          .post('/products')
          .send(inputProductImageEmpty)
          .set('access_token', access_token_admin)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            const expected = [
              { message: 'Please insert image url' },
              { message: 'Please insert valid url ex:(foo@bar.com)' },
            ];
            expect(status).toEqual(400);
            expect(error).toHaveProperty('code', 400);
            expect(error).toHaveProperty('type', 'BAD REQUEST');
            expect(error).toHaveProperty('message', expected);
          })
          .end((err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('> Add new product failed input price empty', () => {
      test('Should return bad request. Price empty error messages (400).', (done) => {
        request(app)
          .post('/products')
          .send(inputProductPriceEmpty)
          .set('access_token', access_token_admin)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            const expected = [
              { message: 'Please insert price' },
            ];
            expect(status).toEqual(400);
            expect(error).toHaveProperty('code', 400);
            expect(error).toHaveProperty('type', 'BAD REQUEST');
            expect(error).toHaveProperty('message', expected);
          })
          .end((err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('> Add new product failed input stock empty', () => {
      test('Should return bad request. Stock empty error messages (400).', (done) => {
        request(app)
          .post('/products')
          .send(inputProductStockEmpty)
          .set('access_token', access_token_admin)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            const expected = [
              { message: 'Please insert stock' },
            ];
            expect(status).toEqual(400);
            expect(error).toHaveProperty('code', 400);
            expect(error).toHaveProperty('type', 'BAD REQUEST');
            expect(error).toHaveProperty('message', expected);
          })
          .end((err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('> Add new product failed input null', () => {
      test('Should return bad request. All error messages (400).', (done) => {
        request(app)
          .post('/products')
          .send(inputProductAllNull)
          .set('access_token', access_token_admin)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            const expected = [
              {
                message: 'Please insert name',
              },
              {
                message: 'Please insert image url',
              },
              {
                message: 'Please insert price',
              },
              {
                message: 'Please insert stock',
              },
            ];
            expect(status).toEqual(400);
            expect(error).toHaveProperty('code', 400);
            expect(error).toHaveProperty('type', 'BAD REQUEST');
            expect(error).toHaveProperty('message', expected);
          })
          .end((err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('> Add new product failed NOT an Admin', () => {
      test('Should return unauthorized. Unauthorized error messages (401).', (done) => {
        request(app)
          .post('/products')
          .send(inputProduct)
          .set('access_token', access_token_customer)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            expect(status).toEqual(401);
            expect(error).toHaveProperty('code', 401);
            expect(error).toHaveProperty('type', 'UNAUTHORIZED');
            expect(error).toHaveProperty(
              'message',
              'Sorry, not authorized, you are not an admin'
            );
          })
          .end((err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('> Add new product failed NOT signed in', () => {
      test('Should return unauthorized. Unauthorized error messages (401).', (done) => {
        request(app)
          .post('/products')
          .send(inputProduct)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            expect(status).toEqual(401);
            expect(error).toHaveProperty('code', 401);
            expect(error).toHaveProperty('type', 'UNAUTHORIZED');
            expect(error).toHaveProperty('message', 'Please signin first!');
          })
          .end((err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });
  });

  afterAll(() => {
    queryInterface.bulkDelete('Products');
    queryInterface.bulkDelete('Users');
  });
});
