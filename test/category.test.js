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

let token;
let token_err;
let categoryid;
let categorysearch;

beforeAll(done => {
  queryInterface
    .bulkInsert('Users', users, { returning: true })
    .then(results => {
      token = generateToken({
        id: results[0].id,
        email: results[0].email
      });

      token_err = generateToken({
        id: results[1].id,
        email: results[1].email
      });
      
      console.log(`Users Created: ${users}`);
      const categories = require('../data/categories.json').map(category => {
        category.createdAt = new Date();
        category.updatedAt = new Date();
        return category;
      });
      return queryInterface.bulkInsert('Categories', categories, { returning: true });
    })
    .then(result => {
      categoryid = result[0].id;
      categorysearch = result[0];
      done();
    })
    .catch(err => {
      done(err);
    });
});

afterAll(done => {
  queryInterface
    .bulkDelete('Categories')
    .then(() => {
      console.log('Db Category clean up');
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

describe("Category Test", () => {
  describe("Get All Category", () => {
    describe("Success", () => {
      test(`Should return all categories with status 200`, done => {
        request(app)
          .get('/categories')
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty('Categories');
              return done();
            }
          });
      });
    })
    describe('Failure', () => {
      test(`Should return 401 unauthorized`, done => {
        const errors = {
          code: 401,
          message: `You cannot access this service`
        };
        request(app)
          .get('/categories')
          .set('token', token_err)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(401);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
    });
  });
  describe("Create Category", () => {
    describe("Success", () => {
      test('Should return new Category', done => {
        const newCat = {
          name: "Kategori Baru"
        };
        request(app)
          .post('/categories')
          .send(newCat)
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body.Category;
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('Category');
              expect(data).toHaveProperty('name', newCat.name);
              return done();
            }
          });
      });
    });
    describe("Failure", () => {
      test('Should return status 400 and error message Name cannot empty', done=> {
        const errors = [{
          message: `Name cannot empty`
        }];
        const newCat = {
          name: ''
        };
        request(app)
          .post('/categories')
          .send(newCat)
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
      test('Should return status 401 Unauthorized', done => {
        const errors = {
          code: 401,
          message: `You cannot access this service`
        };
        const newCat = {
          name: 'Kategori Baru'
        };
        request(app)
          .post('/categories')
          .send(newCat)
          .set('token', token_err)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(401);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
      test('Should return status 400 Name is required', done => {
        const errors = [
          {
            message: 'Name is required'
          }
        ];
        const newCat = {};
        request(app)
          .post('/categories')
          .send(newCat)
          .set('token', token)
          .end((err, response) => {
            console.log(response.body.errors)
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
  describe("Update Category", () => {
    describe("Success", () => {
      test('Should return updated value', done => {
        let update = {
          name: "Change Name"
        }
        request(app)
          .put(`/categories/${categoryid}`)
          .send(update)
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body.Category;
              expect(response.status).toBe(200);
              expect(data).toHaveProperty('name', update.name);
              return done();
            }
          });
      });
    });
    describe("Failure", () => {
      test("Should return 404 Not Found", done => {
        let errors = {
          code: 404,
          message: `Category Not Found`
        };
        let update = {
          name: "Change Name"
        }
        request(app)
          .put(`/categories/1293872`)
          .send(update)
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(404);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      })
    });
  });
  describe("Delete Category", () => {
    describe("Success", () => {
      test('Should return deleted value', done => {
        let deleted = {
          name: "Change Name"
        }
        request(app)
          .delete(`/categories/${categoryid}`)
          .set('token', token)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body.Category;
              expect(response.status).toBe(200);
              expect(data).toHaveProperty('name', deleted.name);
              return done();
            }
          });
      });
    });
  });
});