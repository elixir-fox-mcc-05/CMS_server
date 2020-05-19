const app = require('../app.js')
const request = require('supertest')

const { queryInterface } = require('../models/index').sequelize;

describe('User Router', function () {
  beforeAll(function () {
    queryInterface.bulkDelete('Users')
  })
  describe('Register a user', function () {
    describe('Success:', function () {
      test('Should return status code 201 with result of JSON with keys (name, email, password, role)', function (done) {
        request(app)
          .post('/users/register')
          .send({
            name: 'Denny',
            email: 'denny@mail.com',
            password: '12345',
            role: 'admin'
          })
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            // console.log(result);
            let data = result.body;
            expect(data).toHaveProperty('name', 'Denny')
            expect(data).toHaveProperty('email', 'denny@mail.com')
            expect(data).not.toHaveProperty('password')
            expect(data).toHaveProperty('role', 'admin')
          })
          .end(function (err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      })
    })
    describe('Error:', function () {
      test('Should return status code 400 bad request because wrong password', function (done) {
        request(app)
          .post('/users/register')
          .send({
            name: 'Denny',
            email: 'denny@mail.com',
            password: '12',
            role: 'admin'
          })
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            // console.log(result);
            let data = result.body;
            expect(data.message).toContain('Password Length should be 3-10 Character')
          })
          .end(function (err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      }),
      test('Should return status code 400 bad request because email alredy exist', function (done) {
        request(app)
          .post('/users/register')
          .send({
            name: 'Denny',
            email: 'denny@mail.com',
            password: '12345',
            role: 'admin'
          })
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            // console.log(result);
            let data = result.body;
            expect(data.message).toContain('Email Alredy Exist')
          })
          .end(function (err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      }),
      test('Should return status code 400 bad request because name is empty', function (done) {
        request(app)
          .post('/users/register')
          .send({
            name: '',
            email: 'denny@mail.com',
            password: '12345',
            role: 'admin'
          })
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            // console.log(result);
            let data = result.body;
            expect(data.message).toContain('Name Cannot be Empty')
          })
          .end(function (err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      }),
      test('Should return status code 400 bad request because invalid email addres', function (done) {
        request(app)
          .post('/users/register')
          .send({
            name: 'Denny',
            email: 'denny@mail',
            password: '12345',
            role: 'admin'
          })
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            // console.log(result);
            let data = result.body;
            expect(data.message).toContain('Invalid Email Addres')
          })
          .end(function (err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      }),
      test('Should return status code 400 bad request because email is empty', function (done) {
        request(app)
          .post('/users/register')
          .send({
            name: 'Denny',
            email: '',
            password: '12345',
            role: 'admin'
          })
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            // console.log(result);
            let data = result.body;
            expect(data.message).toContain('Invalid Email Addres')
            expect(data.message).toContain('Email Cannot be Blank')
          })
          .end(function (err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      }),
      test('Should return status code 400 bad request because password is empty', function (done) {
        request(app)
          .post('/users/register')
          .send({
            name: 'Denny',
            email: 'denny@mail.com',
            password: '',
            role: 'admin'
          })
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            // console.log(result);
            let data = result.body;
            expect(data.message).toContain('Password Length should be 3-10 Character')
            expect(data.message).toContain('Please Insert your password')
          })
          .end(function (err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      }),
      test('Should return status code 400 bad request because role field is null', function (done) {
        request(app)
          .post('/users/register')
          .send({
            name: 'Denny',
            email: 'denny@mail.com',
            password: '',
          })
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            // console.log(result);
            let data = result.body;
            expect(data.message).toContain('Role Cannot Null')
          })
          .end(function (err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      })
    })
  })
  describe('Login Users', function () {
    describe('Success', function () {
      test('Should return status code 200 with result of JSON with keys (access_token)', function (done) {
        request(app)
          .post('/users/login')
          .send({
            email: 'denny@mail.com',
            password: '12345'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            let data = res.body;
            console.log(data);
            expect(data).toHaveProperty('access_token')
          })
          .end(function (err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      })
    }),
    describe('Error:', function () {
      test('Should return status code 500 internal server error because email is empty', function (done) {
        request(app)
          .post('/users/login')
          .send({
            email: '',
            password: '123456'
          })
          .expect(500)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            // console.log(result);
            let data = result.body;
            expect(data.message).toContain('Invalid Email/Password')
          })
          .end(function (err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      }),
      test('Should return status code 500 internal server error because password is empty', function (done) {
        request(app)
          .post('/users/login')
          .send({
            email: 'denny@mail.com',
            password: ''
          })
          .expect(500)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            // console.log(result);
            let data = result.body;
            expect(data.message).toContain('Invalid Email/Password')
          })
          .end(function (err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      })
    })
  })
  afterAll(function () {
    queryInterface.bulkDelete('Users')
  })
})

