const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize


afterAll(done => {
    queryInterface.bulkDelete('Products')
        .then(() => {
            console.log('cleaned db')
        })
        .catch(err => {
            done(err)
        })
        queryInterface.bulkDelete('Categories')
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
        CategoryId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }])

        queryInterface.bulkInsert('Categories', [{
            name: 'buah',
            createdAt: new Date(),
            updatedAt: new Date()
        }])
        .then((data) => {
            console.log(data)
            console.log('beforeAll process complete')
            done()
        })
})
let categorynum
let id;
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtYWlsQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDQkZC9Lb0tVUTU3Z2lpUzhjR1dVQ0hYTzFrRU1pVjRKdElKbVlLaUZ5ZHVwRWpIOHZUa2VWbWkiLCJpYXQiOjE1ODkzNjcxNjd9.He_neKlcZ-q7uv_6ikyqlVxlc8-06P5CwY0Vd7tVTw4'
describe('POST /register then POST /login', () => {
    test('should return object with id, name,and email. status 201', (done) => {
        const userInput = {
            first_name: 'yusak',
            email: 'mail@mail.com',
            password: 'asdasd'
        }
        request(app)
            .post('/register')
            .send(userInput)
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    console.log(response.body)
                    return done()
                }
            })
    })
    test('should return object with token. status 200', (done) => {
        const userInput = {
            first_name: 'yusak',
            email: 'mail@mail.com',
            password: 'asdasd'
        }
        request(app)
            .post('/login')
            .send(userInput)
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    token = response.body.token
                    console.log(response.body)
                    return done()
                }
            })
            
    })
})

describe('test success /products', () => {
    
    describe('POST /category/add', () => {
        test('return object with id and name, status 201', (done) => {
            let newCategory = {
                name: 'test'
            }

            request(app)
                .post(`/category/add`)
                .set('token', token)
                // .query({'id':id})
                .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        categorynum = response.body.id
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('id', expect.any(Number))
                        expect(response.body).toHaveProperty('name', newCategory.name)
                        return done()
                    }
                })
        })
    })

    describe('POST /add', () => {
        test('should return objects with id,name,image_url,price and stock status 201', (done) => {
            let newProduct = {
                name : 'buah',
                image_url : 'pp.jpg',
                price : '8000',
                stock : '12',
                CategoryId : categorynum
            }
            request(app)
                .post('/products/add')
                .set('token',token)
                .send(newProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log("xxxxxxx", response.body)
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('name', expect.any(String))
                        expect(response.body).toHaveProperty('image_url', expect.any(String))
                        expect(response.body).toHaveProperty('price', expect.any(Number))
                        expect(response.body).toHaveProperty('stock', expect.any(Number))
                        expect(response.body).toHaveProperty('CategoryId', expect.any(Number))
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
                CategoryId : categorynum
            }
            console.log(id)
            request(app)
            .put(`/products/edit/${id}`)
            .set('token',token)
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
            const error = ["image_url is required field", "image url must in URL format"]
            let newProduct = {
                name : 'babydoll',
                image_url : '',
                price : '8000',
                stock : '12',
                CategoryId : categorynum
            }
            request(app)
            .put(`/products/edit/${id}`)
            .set('token',token)
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
                CategoryId : categorynum
            }
            request(app)
            .put(`/products/edit/${id}`)
            .set('token',token)
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
                CategoryId : categorynum
            }
            request(app)
            .put(`/products/edit/${id}`)
            .set('token',token)
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
                CategoryId : ''
            }
            request(app)
            .put(`/products/edit/${id}`)
            .set('token',token)
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
                CategoryId : null
            }
            request(app)
            .put(`/products/edit/${id}`)
            .set('token',token)
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
            const error =["category is required field","Name is required field","Name must more than 3 letters", "image_url is required field",  "image url must in URL format","Price is required field", "Stock is required field"]
            let newProduct = {
                name : '',
                image_url : '',
                price : '',
                stock : '',
                CategoryId : ''
            }
            request(app)
                .put(`/products/edit/${id}`)
                .set('token',token)
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
            const error =  ["price can't below 0. are you nuts?","category is required field","Name must more than 3 letters", "image_url is required field","image url must in URL format"]
            let newProduct = {
                name : 'as',
                image_url : '',
                price : -2,
                stock : 2,
                CategoryId : ''
            }
            request(app)
            .put(`/products/edit/${id}`)
            .set('token',token)
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