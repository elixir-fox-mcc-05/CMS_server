let app = require('../app')
let request = require('supertest')
let {sequelize} = require('../models/index')
let {User, Product} = require('../models/index')
let {bcryptPass} = require('../helpers/bycrypt')
let {queryInterface} = sequelize
let {jwtToken} = require('../helpers/jwt')

var access_token
beforeAll((done) => {
  User.create({
    email: 'admin@gmail.com',
    password: 'digituin'
  })
  .then((result) => {
    access_token = jwtToken(result.id, result.email)
    done()
  }).catch(err => {
    done(err)
  })
})

afterAll((done) => {
  queryInterface.bulkDelete('Products')
    .then(() => {
      done()
    })
    .catch(()=> {
      done(err)
    })
})

describe('Tis On Product', ()=> {
  describe('Success Add Product', ()=> {
    describe('POST /product/add', ()=> {
      test('should return object with id and email and status 201', done => {
        let data = {
          name: 'ikan',
          price: 8000,
          stock: 5,
          image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/15/10/2d/28/fist-meat.jpg',
          tags: 'food',
        }
      request(app)
        .post('/product/add')
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('name',expect.any(String))
            expect(res.body).toHaveProperty('price',expect.any(Number))
            expect(res.body).toHaveProperty('stock',expect.any(Number))
            expect(res.body).toHaveProperty('image_url',expect.any(String))
            expect(res.body).toHaveProperty('tags',expect.any(String))
            return done()
          }
        })
      })
    })
  })
  describe('Fail Add Product', ()=> {
    describe('POST /product/add', ()=> {
      test('Please Insert Correct Number code 400', done => {
        let errors = [
          {
            msg:'Incorect Price Number'
          }
        ]
        let data = {
          name: 'ikan',
          price: -1,
          stock: 5,
          image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/15/10/2d/28/fist-meat.jpg',
          tags: 'food',
        }
      request(app)
        .post('/product/add')
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
            // console.log(res.body);
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors',errors)
            return done()
          }
        })
      })
    })
  })
})

afterAll((done) => {
  queryInterface.bulkDelete('Users')
    .then(() => {
      done()
    })
    .catch(()=> {
      done(err)
    })
})


