const request = require('supertest')
const app = require('../app')

describe('Products', () => {
  describe('GET /products', () => {
    describe('Success GET', () => {
      test('Should send status 200 with array of object', (done) => {
        request(app)
          .get('/products')
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toContainEqual(
                expect.objectContaining({
                  id: expect.any(Number),
                  name: expect.any(String),
                  image_url: expect.any(String),
                  description: expect.any(String),
                  price: expect.any(Number),
                  stock: expect.any(Number),
                })
              )
              return done();
            }
          })
      })
    })
    describe('Success GET /:id', () => {
      test('Should return status 200 with object', (done) => {
        request(app)
          .get('/products/1')
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(200)
              console.log(response.body);
              expect(response.body).toHaveProperty('name', expect.any(String))
              expect(response.body).toHaveProperty('image_url', expect.any(String))
              expect(response.body).toHaveProperty('description', expect.any(String))
              expect(response.body).toHaveProperty('price', expect.any(Number))
              expect(response.body).toHaveProperty('stock', expect.any(Number))
              return done()
            }
          })
      })
    })
  })
  describe('POST /products', () => {
    describe('Success POST', () => {
      test('Should send status 201 with object', (done) => {
        request(app)
          .post('/products')
          .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU4OTIzODMxMH0.Yp3dvNUbFctSuUUi1ISq4WLA0Nrsi_ASv01Vm6BZzDI')
          .send({
            name: 'Team Buddies',
            image_url: 'belom nemu',
            description: 'Team Buddies adventure',
            price: 2000000,
            stock: 1,
            genre: 'RPG'
          })
          .end((err, response) => {
            if (err) {
              console.log(err);
              return done(err)
            } else {
              expect(response.status).toBe(201)
              expect(response.body).toHaveProperty('id', expect.any(Number))
              expect(response.body).toHaveProperty('name', expect.any(String))
              expect(response.body).toHaveProperty('image_url', expect.any(String))
              expect(response.body).toHaveProperty('description', expect.any(String))
              expect(response.body).toHaveProperty('price', expect.any(Number))
              expect(response.body).toHaveProperty('stock', expect.any(Number))
              return done()
            }
          })
      })
    })
  })
  describe('PUT /products', () => {
    describe('Success PUT', () => {
      test('Should send status 201 with object', (done) => {
        request(app)
          .put('/products/edit/4')
          .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU4OTIzODMxMH0.Yp3dvNUbFctSuUUi1ISq4WLA0Nrsi_ASv01Vm6BZzDI')
          .send({
            name: 'Team Buddies',
            image_url: 'Udah nemu',
            description: 'Team Buddies adventure',
            price: 7000000,
            stock: 1
          })
          .end((err, response) => {
            if (err) {
              console.log(err);
              return done(err)
            } else {
              expect(response.status).toBe(201)
              expect(response.body).toHaveProperty('id', expect.any(Number))
              expect(response.body).toHaveProperty('name', expect.any(String))
              expect(response.body).toHaveProperty('image_url', expect.any(String))
              expect(response.body).toHaveProperty('description', expect.any(String))
              expect(response.body).toHaveProperty('price', expect.any(Number))
              expect(response.body).toHaveProperty('stock', expect.any(Number))
              return done()
            }
          })
      })
    })
  })
})