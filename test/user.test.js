const app = require('../app.js');
const request = require('supertest');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { encrypt } = require('../helpers/bcrypt.js');

const dummyUser = {
  email: 'krispi@mail.com',
  password: 'krispi'
};

afterAll(done => {
  queryInterface
    .bulkDelete('Users')
    .then(() => {
      console.log('Db clean up');
      done();
    })
    .catch(err => {
      done(err);
    });
});

beforeAll(done => {
  queryInterface
    .bulkInsert('Users', [
      {
        email: dummyUser.email,
        password: encrypt(dummyUser.password),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    .then(() => {
      console.log(`User Created: ${dummyUser.email}`);
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe('User Test', () => {
  describe('Register', () => {
    describe('Success', () => {
      test('return created user info with id, email, and role with status code 201', done => {
        const usertest = {
          email: 'angelina@mail.com',
          password: 'krispi',
          role: 'admin'
        };
        request(app)
          .post('/register')
          .send(usertest)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('id', expect.any(Number));
              expect(response.body).toHaveProperty('email', usertest.email);
              expect(response.body).not.toHaveProperty('password');
              return done();
            }
          });
      });
    });
    describe('Error', () => {
      test(`Missing required email and password`, done => {
        const errors = [
          {
            message: `Email is required`
          },
          {
            message: `Password is required`
          }
        ];
        request(app)
          .post('/register')
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
      test(`Email and Password is empty`, done => {
        const usertest = {
          email: '',
          password: '',
          role: 'admin'
        };
        const errors = [
          {
            message: `Must Be an email`
          },
          {
            message: `Email cannot empty`
          },
          {
            message: `Password cannot empty`
          },

          {
            message: `Password at least 6 characters`
          }
        ];
        request(app)
          .post('/register')
          .send(usertest)
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
      test(`Input is not email and password < 6`, done => {
        const usertest = {
          email: 'bukan email',
          password: 'asd',
          role: 'admin'
        };
        const errors = [
          {
            message: `Must Be an email`
          },
          {
            message: `Password at least 6 characters`
          }
        ];
        request(app)
          .post('/register')
          .send(usertest)
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
      test(`Email already exist`, done => {
        const errors = [
          {
            message: `Email Already Exists`
          }
        ];
        request(app)
          .post('/register')
          .send(dummyUser)
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
  describe('Login', () => {
    describe('Success', () => {
      test('return created user info with id, email, and role with status code 201', done => {
        const usertest = {
          email: 'angelina@mail.com',
          password: 'krispi',
          role: 'admin'
        };
        request(app)
          .post('/register')
          .send(usertest)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('id', expect.any(Number));
              expect(response.body).toHaveProperty('email', usertest.email);
              expect(response.body).not.toHaveProperty('password');
              return done();
            }
          });
      });
    });
  });
});
