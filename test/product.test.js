const request = require('supertest')
const app = require('../app.js')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Product, Admin } = require('../models')
const salt = bcrypt.genSaltSync(10)

const user = {
  email: 'usertest@mail.com',
  password: bcrypt.hashSync('user', salt),
  isAdmin: true
}
let access_token

beforeAll(done => {
  Admin.create(user)
    .then((result) => {
      access_token = jwt.sign({ id: result.id, email: result.email }, 'lalalisa')
      done()
    })
    .catch(err => {
      done(err)
    })
})

afterAll(done => {
  queryInterface.bulkDelete('Admins', {})
    .then(_ => {
      return queryInterface.bulkDelete('Products', {})
    })
    .then(_ => {
      done()
    })
    .catch(err => {
      done(err)
    })
});

const productTest = {
  name: 'Dell Alienware M17',
  image_url: 'ini gambar',
  price: 15000000,
  stock: 1
}

describe('Product', () => {
  describe('POST Product', () => {
    test('Should return status 201 with object', (done) => {
      request(app)
        .post('/products')
        .set({ 'access_token': access_token })
        .send(productTest)
        .end((err, res) => {
          if (err) {
            console.log('error : ', err)
            return done(err)
          } else {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('id', expect.any(Number))
            expect(res.body).toHaveProperty('name', productTest.name)
            expect(res.body).toHaveProperty('image_url', productTest.image_url)
            expect(res.body).toHaveProperty('price', productTest.price)
            expect(res.body).toHaveProperty('stock', productTest.stock)
            return done()
          }
        })
    })
  })
})