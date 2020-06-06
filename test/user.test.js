const app = require('../app.js');
const request = require('supertest');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { encrypt } = require('../helpers/bcrypt.js');

const users = require('../data/users.json').map(user => {
  user.password = encrypt(user.password);
  user.createdAt = new Date();
  user.updatedAt = new Date();
  return user;
});

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
    .bulkInsert('Users', users, {})
    .then(() => {
      console.log(`User Created: ${users}`);
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
          email: 'krispi@mail.com',
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
      test(`Send email as boolean`, done => {
        const usertest = {
          email: true,
          password: 12313232,
          role: 'member'
        };
        const errors = [
          {
            message: `Must Be an email`
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
      test(`should return error 400 and message Role must be either member or admin`, done => {
        const usertest = {
          email: 'yosa@mail.com',
          password: 12313232,
          role: 'adasdasd'
        };
        const errors = [
          {
            message: `Role must be either 'member' or 'admin'`
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
        const userexist = {
          email: 'angelina@mail.com',
          password: 'angelina',
          role: 'member'
        };
        request(app)
          .post('/register')
          .send(userexist)
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
      test('Return user token', done => {
        const usertest = {
          email: 'dhea@mail.com',
          password: 'dheaangelia'
        };
        request(app)
          .post('/login')
          .send(usertest)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty('token');
              return done();
            }
          });
      });
    });
    describe('Error', () => {
      test(`if email or password does not match`, done => {
        const usertest = {
          email: 'invaliduser@mail.com',
          password: 'not exist'
        };
        const errors = {
          code: 401,
          message: `Invalid Email or Password`
        };
        request(app)
          .post('/login')
          .send(usertest)
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
});
