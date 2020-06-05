let app = require('../app')
let request = require('supertest')
let {sequelize} = require('../models/index')
let {User} = require('../models/index')
let {bcryptPass} = require('../helpers/bycrypt')
let {queryInterface} = sequelize

beforeAll(() => { queryInterface.bulkDelete('Users'); })

beforeAll((done) => {
  User.create({
    email: 'ottod12@gmail.com',
    password: 'digituin'
  })
  .then((result) => {
    // console.log(result)
    done()
  }).catch(err => {
    done(err)
  })
})

describe('Tis On User', ()=> {
  describe('Success Register', ()=> {
    describe('POST /register', ()=> {
      test('should return object with id and email and status 201', done => {
        let data = {
          email: 'ottoyd@gmail.com',
          password: 'ottoyd'
        }
      request(app)
        .post('/register')
        .send(data)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('email', data.email)
            expect(res.body).not.toHaveProperty('password')
            return done()
          }
        })
      })
    })
  })
  describe('Fail Register', () => {
    describe('POST /register', ()=> {
      test('Email Or Password Wrong code 400', done => {
        let data = {
          email: 'ottoayd@gmail.com',
        }
        let errors = [
          {msg: 'Please Input Your Data Correctly'}
        ]
        request(app)
        .post('/register')
        .send(data)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors',errors)
            return done()
          }
        })
      })
      test('Fail Email is Unique code 400', done => {
        let errors = [
          {msg: 'Email Already Used'}
        ]
      request(app)
        .post('/register')
        .send({
          email: 'ottod12@gmail.com',
          password: 'digituin'
        })
        .end((err, res) => {
          if(err) {
            console.log(err);
            return done(err)
          } else {
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors',errors)
            return done()
          }
        })
      })
      test('Password is too Weak code 400', done => {
        let errors = [
          {msg: 'Password is too Weak'}
        ]
      request(app)
        .post('/register')
        .send({
          email: 'ottod112@gmail.com',
          password: 'itu'
        })
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors',errors)
            return done()
          }
        })
      })
    })
  })
  describe('POST /login' , () => {
    describe('Success Login' , () => {
      test('should return access_token with status 200', done => {
        request(app)
        .post('/login')
        .send({
          email: 'ottod12@gmail.com',
          password: 'digituin'
        })
        .end((err, res) => {
          if(err) {
            console.log(err);
            return done(err)
          } else {
            // console.log(res.body);
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('access_token',expect.any(String))
            return done()
          }
        })
      })
    })
    describe('Fail Login' , () => {
      test('Wrong Pass Or Email Code 404', done => {
        let errors = [
          {msg: 'Wrong Password Or Email'}
        ]
        request(app)
        .post('/login')
        .send({
          email: 'disalahin@gmail.com',
          password: 'digituin'
        })
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
            // console.log(res.body);
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('errors',errors)
            return done()
          }
        })
      })
    })
  })
})

