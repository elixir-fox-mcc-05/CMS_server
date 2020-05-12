const app = require('../app.js')
const request = require('supertest')
const { queryInterface } = require('../models/index.js').sequelize

describe('Get All Products', () => {
    test('Response code 200 returning array of products', (done) => {
        request(app)
            .get('/products')
            .end((err, response) => {
                if (err) return done(err)
                else {
                    let { products } = response.body
                    let length = products.length
                    let id = products[length - 1]
                    console.log(response.body);
                    expect(Array.isArray(products)).toBe(true)
                    expect(typeof +id).toBe('number')
                    return done()
                }
            })
    })
})