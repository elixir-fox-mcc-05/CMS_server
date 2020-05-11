const app = require('../app')
const request = require('supertest')

const { queryInterface } = require('../models/index.js').sequelize;

let dummyuser = {
    name: 'Dummy User',
    email: 'dummyuser@contoh.com',
    password: '123456',
    role: 'Administrator'
}

describe('Product Router', () => {
    beforeAll((done) => {
        queryInterface.bulkDelete('Products')
            // .then(() => {
            //     return queryInterface.bulkInsert('Users', [
            //         {
                        
            //         }
            //     ])
            // })
            .then(() => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    afterAll((done) => {
        queryInterface.bulkDelete('Products')
            .then(() => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    describe('Create product', () => {
        describe('Success', () => {
            test('Return status code 200 with keys data and notif', (done) => {
                let newProduct = {
                    name: 'Sepeda Ontel',
                    description: 'Sepeda ontel antik yang sudah dirawat selama 3 generasi',
                    image_url: 'http://www.contoh.com/img.jpg',
                    price: 1000000,
                    stock: 3,
                    category: 'Bicycle'
                }
                request(app)
                    .post('/product/')
                    .send(newProduct)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(201)
                            expect(response.body.data).toHaveProperty('id', expect.any(Number))
                            expect(response.body.data).toHaveProperty('name', newProduct.name)
                            expect(response.body.data).toHaveProperty('description', newProduct.description)
                            expect(response.body.data).toHaveProperty('image_url', newProduct.image_url)
                            expect(response.body.data).toHaveProperty('price', newProduct.price)
                            expect(response.body.data).toHaveProperty('stock', newProduct.stock)
                            expect(response.body.data).toHaveProperty('category', newProduct.category)
                            expect(response.body).toHaveProperty('notif', `Product successfully created!`)
                            return done()
                        }
                    })
            })
        })

        // describe('Failed', () => {

        // })
    })

    
})