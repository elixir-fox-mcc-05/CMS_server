let app = require('../app')
let request = require('supertest')
let {sequelize} = require('../models/index')
let {User, Product} = require('../models/index')
let {bcryptPass} = require('../helpers/bycrypt')
let {queryInterface} = sequelize
let {jwtToken} = require('../helpers/jwt')
var access_token

const dataUser = {
  email: 'top@gmail.com',
  password: 'test'
};

afterAll(done => {
  queryInterface
    .bulkDelete('Users')
    .then(() => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

beforeAll((done) => {
  User.create({
    email: 'admin@gmail.com',
    password: 'digituin'
  })
  .then((result) => {
    access_token = jwtToken(
      {
        id: result.id,
        email: result.email
      })
    done()
  }).catch(err => {
    done(err)
  })
})

// afterAll((done) => {
//   queryInterface.bulkDelete('Products')
//     .then(() => {
//       done()
//     })
//     .catch(()=> {
//       done(err)
//     })
// })

describe('Tis On Product', ()=> {
  describe('Success Add Product', ()=> {
    describe('POST /product', ()=> {
      test('should return object with id and email and status 201', done => {
        let data = {
          name: 'ikan',
          price: 8000,
          stock: 5,
          image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/15/10/2d/28/fist-meat.jpg',
          tags: 'food',
        }
      request(app)
        .post('/product')
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
            expect(res.body).toHaveProperty('tags',expect.any(String))
            return done()
          }
        })
      })
    })
  })
  describe('Fail Add Product', ()=> {
    describe('POST /product', ()=> {
      test('Please Insert Correct Number code 400', (done) => {
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
        .post('/product')
        .set('access_token', access_token)
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
    })

    describe('POST /product', ()=> {
      test('Not Login access token code 500', (done) => {
        let errors = [
          {
            msg:'Please Login First'
          }
        ]
        let data = {
          name: 'ikan',
          price: 22,
          stock: 5,
          image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/15/10/2d/28/fist-meat.jpg',
          tags: 'food',
        }
      request(app)
        .post('/product')
        .send(data)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
              expect(res.status).toBe(500)
              expect(res.body).toHaveProperty('errors',errors)
            return done()
          }
        })
      })
    })

    describe('POST /product', ()=> {
      test('Negativ Number For Stock status 400', (done) => {
        let errors = [
          {
            msg:'Incorect Stock Number'
          }
        ]
        let data = {
          name: 'ikan',
          price: 22,
          stock: -221,
          image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/15/10/2d/28/fist-meat.jpg',
          tags: 'food',
        }
      request(app)
        .post('/product')
        .set('access_token', access_token)
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
    })

    describe('POST /product', ()=> {
      test('Name is Null status 400', (done) => {
        let errors = [
          {
            msg:'Incorect Product Name'
          }
        ]
        let data = {
          name: '',
          price: 22,
          stock: -221,
          image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/15/10/2d/28/fist-meat.jpg',
          tags: 'food',
        }
      request(app)
        .post('/product')
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
              expect(res.status).toBe(400)
            return done()
          }
        })
      })
    })

    describe('POST /product', ()=> {
      test('Tags Is status 400', (done) => {
        let errors = [
          {
            msg:'Incorect Product Tags'
          }
        ]
        let data = {
          name: 'ikan',
          price: 22,
          stock: -221,
          image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/15/10/2d/28/fist-meat.jpg',
          tags: '',
        }
      request(app)
        .post('/product')
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
              expect(res.status).toBe(400)
            return done()
          }
        })
      })
    })

    describe('DELETE /product', ()=> {
      test('Delete Succes Statsus 200', (done) => {
      request(app)
        .delete('/product/1')
        .set('access_token', access_token)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
              expect(res.status).toBe(200)
            return done()
          }
        })
      })
    })

    describe('DELETE /product', ()=> {
      test('Delete Fail Param ID wrong Statsus 500', (done) => {
      request(app)
        .delete('/product/wqeq324')
        .set('access_token', access_token)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
              expect(res.status).toBe(500)
            return done()
          }
        })
      })
    })

    describe('PUT /product', ()=> {
      test('Success Edit Statsus 200', (done) => {
      let data = {
        name: 'diedityaaa',
        price: 22,
        stock: 21,
        image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/15/10/2d/28/fist-meat.jpg',
        tags: 'food',
      }
      request(app)
        .put('/product/1')
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
              expect(res.status).toBe(200)
            return done()
          }
        })
      })
    })

    describe('PUT /product', ()=> {
      test('Fail Edit stock cannot be less than 0 Statsus 400', (done) => {
      let data = {
        name: 'diedityaaa',
        price: 22,
        stock: -21,
        image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/15/10/2d/28/fist-meat.jpg',
        tags: 'food',
      }
      request(app)
        .put('/product/1')
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
              expect(res.status).toBe(400)
            return done()
          }
        })
      })
    })

    describe('PUT /product', ()=> {
      test('Fail Edit Stock cannot be String than 0 Statsus 500', (done) => {
      let data = {
        name: 'diedityaaa',
        price: -22,
        stock: 'asdasjdajskdkjsajdksad',
        image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/15/10/2d/28/fist-meat.jpg',
        tags: 'food',
      }
      request(app)
        .put('/product/1')
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
              expect(res.status).toBe(500)
            return done()
          }
        })
      })
    })

    describe('PUT /product', ()=> {
      test('Edit Fail Param ID wrong Statsus 500', (done) => {
      request(app)
        .put('/product/wqe1q324')
        .set('access_token', access_token)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
              expect(res.status).toBe(500)
            return done()
          }
        })
      })
    })

    describe('PUT /product', ()=> {
      test('Fail Invalid Data Statsu 500', (done) => {
      let data = {
        namasdasde: 'diedityaaa',
        prsadadice: -22,
        stoasdasdck: 23,
        imaasdge_url: 'https://media-cdn.tripadvisor.com/media/photo-s/15/10/2d/28/fist-meat.jpg',
        asdasd: '',
      }
      request(app)
        .put('/product/1')
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
              expect(res.status).toBe(500)
            return done()
          }
        })
      })
    })

    describe('PUT /product', ()=> {
      test('Fail Edit Didnt Login 500', (done) => {
      request(app)
        .put('/product/1')
        .end((err, res) => {
          if(err) {
            return done(err)
          } else {
              expect(res.status).toBe(500)
            return done()
          }
        })
      })
    })
  })
})

// afterAll((done) => {
//   queryInterface.bulkDelete('Users')
//     .then(() => {
//       done()
//     })
//     .catch(()=> {
//       done(err)
//     })
// })


