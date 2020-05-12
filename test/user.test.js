const app = require('../app');
const request = require('supertest');

const { queryInterface } = require('../models').sequelize;

describe('User Sign In and Sign Up', function () {
  beforeAll(function (done) {
    queryInterface
      .bulkDelete('Users')
      .then((_) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  const inputSignup = {
    name: 'Yudha',
    email: 'yudha@mail.com',
    password: '123',
  };

  const inputSignupEmpty = {};

  describe('Sign Up Success', function () {
    test('Should create a new user and return CreatedUser. (201)', function (done) {
      request(app)
        .post('/signup')
        .send(inputSignup)
        .expect(function (data) {
          const status = data.status;
          const CreatedUser = data.body.CreatedUser;
          expect(status).toEqual(201);
          expect(CreatedUser).toHaveProperty('name', inputSignup.name);
          expect(CreatedUser).toHaveProperty('email', inputSignup.email);
          expect(CreatedUser).toHaveProperty('role', 'customer');
          done();
        })
        .end((err) => {
          if (err) {
            return done(err);
          } else {
            done();
          }
        });
    });
  });

  describe('Sign Up failed email already exist', function () {
    test('Should return bad request. Email already exists (400)', function (done) {
      request(app)
        .post('/signup')
        .send(inputSignup)
        .expect(function (data) {
          const status = data.status;
          const error = data.body;
          expect(status).toEqual(400);
          expect(error).toHaveProperty('code', 400);
          expect(error).toHaveProperty('type', 'BAD REQUEST');
          expect(error).toHaveProperty('message', 'Email already in use');
        })
        .end((err) => {
          if (err) {
            return done(err);
          } else {
            done();
          }
        });
    });
  });

  describe('Sign Up failed input empty', function () {
    test('Should return bad request. All error messages. (400)', function (done) {
      request(app)
        .post('/signup')
        .send(inputSignupEmpty)
        .expect(function (data) {
          const status = data.status;
          expect(status).toEqual(400);
        })
        .end((err) => {
          if (err) {
            return done(err);
          } else {
            done();
          }
        });
    });
  });
});
