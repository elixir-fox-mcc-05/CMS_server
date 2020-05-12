const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize


afterAll(done => {
    queryInterface.bulkDelete('Products')
        .then(() => {
            console.log('cleaned db')
            done()
        })
        .catch(err => {
            done(err)
        })
})

beforeAll((done) => {
    queryInterface.bulkInsert('Products', [{
        name : 'balll',
        image_url: 'bb.jps',
        price : 8000,
        stock : 90,
        category : 'buah',
        createdAt: new Date(),
        updatedAt: new Date()
    }])
        .then(() => {
            console.log('user created bolu!')
            done()
        })
        .catch(err => {
            done(err)
        })
})
let id;
describe('test success /products', () => {
    

    describe('POST /add', () => {
        test('should return objects with id,name,image_url,price and stock status 201', (done) => {
            let newProduct = {
                name : 'buah',
                image_url : 'pp.jpg',
                price : '8000',
                stock : '12',
                category : 'buah'
            }
            request(app)
                .post('/products/add')
                .send(newProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        // console.log(response.body)
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('name', expect.any(String))
                        expect(response.body).toHaveProperty('image_url', expect.any(String))
                        expect(response.body).toHaveProperty('price', expect.any(Number))
                        expect(response.body).toHaveProperty('stock', expect.any(Number))
                        expect(response.body).toHaveProperty('category', expect.any(String))
                        id = response.body.id
                        return done()
                    }
                })
        })
    })

})


describe('Test fail /products', () => {
    describe('PUT /edit/:id', () => {
        test('should return name error with status 400', (done) => {
            const error = ["Name is required field", "Name must more than 3 letters"]
            let newProduct = {
                name : '',
                image_url : 'pp.jpg',
                price : '8000',
                stock : '12',
                category : 'buah'
            }
            request(app)
            .put(`/products/edit/${id}`)
            .query({'id':id})
                .send(newProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })
        test('should return image_url error with status 400', (done) => {
            const error = "image_url is required field"
            let newProduct = {
                name : 'babydoll',
                image_url : '',
                price : '8000',
                stock : '12',
                category : 'buah'
            }
            request(app)
            .put(`/products/edit/${id}`)
            .query({'id':id})
            .send(newProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })
        test('should return price error with status 400', (done) => {
            const error = "price can't below 0. are you nuts?"
            let newProduct = {
                name : 'applejuice',
                image_url : 'pp.jpg',
                price : -1,
                stock : '12',
                category : 'buah'
            }
            request(app)
            .put(`/products/edit/${id}`)
            .query({'id':id})
            .send(newProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })
        test('should return stock error with status 400', (done) => {
            const error = "stock can't below 0. are you nuts!"
            let newProduct = {
                name : 'babydoll',
                image_url : 'pp.jpg',
                price : '8000',
                stock : -1,
                category : 'buah'
            }
            request(app)
            .put(`/products/edit/${id}`)
            .query({'id':id})
            .send(newProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })

        test('should return category error with status 400', (done) => {
            const error = 'category is required field'
            let newProduct = {
                name : 'babydoll',
                image_url : 'pp.jpg',
                price : '8000',
                stock : 2,
                category : ''
            }
            request(app)
            .put(`/products/edit/${id}`)
            .query({'id':id})
            .send(newProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })

        test('should return error with all null ,status 400', (done) => {
            const error = ["Name is required field", "image_url is required field", "Price is required field", "Stock is required field", "category is required field"]
            let newProduct = {
                name : null,
                image_url : null,
                price : null,
                stock : null,
                category : null
            }
            request(app)
            .put(`/products/edit/${id}`)
            .query({'id':id})
                .send(newProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })

        test('should return error with all empty with status 400', (done) => {
            const error =["Name is required field","Name must more than 3 letters", "image_url is required field", "category is required field", "Price is required field", "Stock is required field"]
            let newProduct = {
                name : '',
                image_url : '',
                price : '',
                stock : '',
                category : ''
            }
            request(app)
                .put(`/products/edit/${id}`)
                .query({'id':id})
                .send(newProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })

        test('should return error with mix validation errors with status 400', (done) => {
            const error =  ["price can't below 0. are you nuts?","Name must more than 3 letters", "image_url is required field","category is required field"]
            let newProduct = {
                name : 'as',
                image_url : '',
                price : -2,
                stock : 2,
                category : ''
            }
            request(app)
            .put(`/products/edit/${id}`)
            .query({'id':id})
            .send(newProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })
    })

    
})