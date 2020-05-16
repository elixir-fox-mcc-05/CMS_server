const app = require('../app');
const request = require('supertest');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { queryInterface } = require('../models/index.js').sequelize;

let user = {
  name: 'udin',
  email: 'udin@gmail.com',
  password: 'zxcvbn',
  role: 'admin',
};

describe('User Router', () => {
  beforeAll(function () {
    queryInterface.bulkDelete('Users');
  });

  afterAll(function () {
    queryInterface.bulkDelete('Users');
  });

  describe('Register a user', () => {
    describe('success:', () => {
      test('should return status code 201 with result of JSON with keys (data, msg)', (done) => {
        request(app)
          .post('/register')
          .send({
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
          })
          .set('Accept', 'application/json')
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data).toHaveProperty('data.name', user.name);
            expect(data).toHaveProperty('data.email', user.email);
            expect(data).not.toHaveProperty(user.password);
            expect(data).toHaveProperty('data.role', user.role);
            expect(data).toHaveProperty('msg', 'Register success');
          })
          .end(function (err) {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('Attribute name is empty', function () {
      test('Should return status code 400 with return error message : "Name is required"', (done) => {
        request(app)
          .post('/register')
          .send({
            name: '',
            email: user.email,
            password: user.password,
            role: user.role,
          }) //data
          .set('Accept', 'application/json') //headers
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data.errors[0].message).toContain('Name is required');
          })
          .end(function (err) {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('Attribut name is less than 3 character:', function () {
      test('Should return status code 400 with return error message : "Name must include minimum 3 characters"', (done) => {
        request(app)
          .post('/register')
          .send({
            name: 'aa',
            email: user.email,
            password: user.password,
            role: user.role,
          }) //data
          .set('Accept', 'application/json') //headers
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data.errors[0].message).toContain(
              'Name must include minimum 3 characters'
            );
          })
          .end(function (err) {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('Attribut email is empty:', function () {
      test('Should return status code 400 with return error message : "Email is required"', (done) => {
        request(app)
          .post('/register')
          .send({
            name: user.name,
            email: '',
            password: user.password,
            role: user.role,
          }) //data
          .set('Accept', 'application/json') //headers
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data.errors[0].message).toContain('Email is required');
          })
          .end(function (err) {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('Attribut email is not email format:', function () {
      test('Should return status code 400 with return error message : "Incorrect email format"', (done) => {
        request(app)
          .post('/register')
          .send({
            name: user.name,
            email: 'aaaaaaa',
            password: user.password,
            role: user.role,
          }) //data
          .set('Accept', 'application/json') //headers
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data.errors[0].message).toContain('Incorrect email format');
          })
          .end(function (err) {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('Attribut password is empty:', function () {
      test('Should return status code 400 with return error message : "Password is required"', (done) => {
        request(app)
          .post('/register')
          .send({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
          }) //data
          .set('Accept', 'application/json') //headers
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data.errors[0].message).toContain('Password is required');
          })
          .end(function (err) {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('Attribut password is less than 5 character:', function () {
      test('Should return status code 400 with return error message : "Password must include minimum 5 characters"', (done) => {
        request(app)
          .post('/register')
          .send({
            name: user.name,
            email: user.email,
            password: 'zxc',
            role: user.role,
          }) //data
          .set('Accept', 'application/json') //headers
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data.errors[0].message).toContain(
              'Password must include minimum 5 characters'
            );
          })
          .end(function (err) {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('Attribut role is empty:', function () {
      test('Should return status code 400 with return error message : "Role is required"', (done) => {
        request(app)
          .post('/register')
          .send({
            name: user.name,
            email: user.email,
            password: user.password,
            role: '',
          }) //data
          .set('Accept', 'application/json') //headers
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data.errors[0].message).toContain('Role is required');
          })
          .end(function (err) {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });
  });

  describe('Login a user', () => {
    describe('success:', () => {
      // process stub hanya berada di describe Success ini sebelum test berjalan
      sinon.stub(jwt, 'sign').returns('Hash_JWT');
      sinon.stub(jwt, 'verify').returns({ email: 'udin@gmail.com' }); // returns di hardcode

      test('should return status code 200 with result token of JSON with keys (token, object data)', (done) => {
        request(app)
          .post('/login')
          .send({
            email: user.email,
            password: user.password,
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data).toHaveProperty('token', 'Hash_JWT');
            expect(data.data).toHaveProperty('name', 'udin');
            expect(data.data).toHaveProperty('email', 'udin@gmail.com');
            expect(data).toHaveProperty('msg', 'Login success');
          })
          .end(function (err) {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('Attribut email is empty:', function () {
      test('Should return status code 401 with return error message : "Register first"', (done) => {
        request(app)
          .post('/login')
          .send({
            email: '',
            password: user.password,
          }) //data
          .set('Accept', 'application/json') //headers
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data.err.msg).toContain('Register first');
          })
          .end(function (err) {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('Attribut password is empty:', function () {
      test('Should return status code 401 with return error message : "Wrong email/password"', (done) => {
        request(app)
          .post('/login')
          .send({
            email: user.email,
            password: '',
          }) //data
          .set('Accept', 'application/json') //headers
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data.err.msg).toContain('Wrong email/password');
          })
          .end(function (err) {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });
  });

  describe('Get all user', () => {
    describe('success get all user', () => {
      test('Return status code 200 with keys data', (done) => {
        request(app)
          .get('/user-list')
          .set('token', 'token')
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty('users', expect.any(Array));
              return done();
            }
          });
      });
    });
  });

});
