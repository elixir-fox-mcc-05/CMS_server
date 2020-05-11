const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const bcrypt = require('bcrypt');
// const { Product, User } = require('../models')
const userTest = {
  email: 'test@mail.com',
  password: 'test',
  image: 'tset'
};

afterAll(function() {
  queryInterface.bulkDelete('Users')
})

beforeAll(done => {
  const salt = bcrypt.genSaltSync(10);
  const userTestHashPassword = bcrypt.hashSync(userTest.password, salt);
  queryInterface
    .bulkInsert('Users', [{
      email: userTest.email,
      password: userTestHashPassword,
      image: userTest.image,
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    .then(() => {
      console.log('User created: ' + userTest.email);
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe('User', () => {
  describe('POST /register', () => {
    describe('success register user', () => {
      test('should send status 201 and object', done => {
        let userInput = {
          email: 'tester1@mail.com',
          password: 'tester',
          image: 'hghgh'
        };
        request(app)
          .post('/register')
          .send(userInput)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('id', expect.any(Number));
              expect(response.body).toHaveProperty('email', userInput.email);
              expect(response.body).toHaveProperty('access_token', expect.any(String));
              expect(response.body).not.toHaveProperty('password');
              return done();
            }
          });
      });
    });
    describe('error register user', () => {
      test('should send error status 400 missing email', done => {
        const errors = [{
          message: 'Email required.'
        }];
        request(app)
          .post('/register')
          .send({ password: 'asdasd', image: 'asdasds' })
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });

      test('should send error status 400 must be email', done => {
        const errors = [{
          message: 'Must be an email'
        }];
        request(app)
          .post('/register')
          .send({ email: 'email', password: 'asdasd', image: 'asdasds' })
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });

      test('should send error status 400 missing password', done => {
        const errors = [{
          message: 'Password Required.'
        }];
        request(app)
          .post('/register')
          .send({ email: 'test123@mail.com', image: 'asdasds' })
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
      test('should send error status 400 password length must be 4 or 18 char', done => {
        const errors = [{
          message: 'Password length must between 4 or 18 Characters.'
        }];
        request(app)
          .post('/register')
          .send({ email: 'test123@mail.com', password: 'asd', image: 'asdasds' })
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
      test('should send error status 400 missing email and password', done => {
        const errors = [{
          message: 'Email required.',
        }, {
          message: 'Password Required.'
        }];
        request(app)
          .post('/register')
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
      test('should send error status 400 because email already in use.', done => {
        const errors = [{
          message: 'email must be unique'
        }];
        request(app)
          .post('/register')
          .send(userTest)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              console.log(response.body);
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
    });
  });
  describe('POST /login', () => {
    describe('success login', () => {
      test('should send access_token and status 200', done => {
        request(app)
          .post('/login')
          .send(userTest)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty('access_token');
              return done();
            }
          });
      });
    });
    describe('Failed Login', () => {
      test('should send error status 400 because Invalid Email.', done => {
        const errors = [{
          message: 'Invalid Email/Password'
        }];
        request(app)
          .post('/login')
          .send({
            email: 'tssest@mail.com',
            password: 'test'
          })
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              console.log(response.body);
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
      test('should send error status 400 because Invalid Password.', done => {
        const errors = [{
          message: 'Invalid Email/Password'
        }];
        request(app)
          .post('/login')
          .send({
            email: 'test@mail.com',
            password: 'aaaaa'
          })
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              console.log(response.body);
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
    })
  });
});