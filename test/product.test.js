const app = require('../app')
const request = require('supertest')
// var request = require('dupertest');
const { sequelize } = require('../models')
const { queryInterface } = sequelize
// const { mockRequest, mockResponse } = require('util/interceptor')
const ProductController = require('../controllers/productController')

// const mockRequest = (sessionData) => ({
//     session: { data: sessionData }
//   });
  
//   const mockResponse = () => {
//     const res = {};
//     res.status = jest.fn().mockReturnValue(res);
//     res.json = jest.fn().mockReturnValue(res);
//     return res;
//   };

// const { mockRequest, mockResponse } = require('mock-req-res')
// const proxyquire = require('proxyquire')


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
        CategoryId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }])
        // .then(() => {
        //     console.log('user created bolu!')
        //     done()
        // })
        // .catch(err => {
        //     done(err)
        // })

        queryInterface.bulkInsert('Categories', [{
            name: 'buah',
            createdAt: new Date(),
            updatedAt: new Date()
        }])
        .then(() => {
            console.log('beforeAll process complete')
            done()
        })
})

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
                    console.log(response.body)
                    return done()
                }
            })
            
    })
})

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtYWlsQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDQkZC9Lb0tVUTU3Z2lpUzhjR1dVQ0hYTzFrRU1pVjRKdElKbVlLaUZ5ZHVwRWpIOHZUa2VWbWkiLCJpYXQiOjE1ODkzNjcxNjd9.He_neKlcZ-q7uv_6ikyqlVxlc8-06P5CwY0Vd7tVTw4'

describe('test success /products', () => {
    let id;
    describe('GET /list', () => {
        test('should return objects status 200', (done) => {
            request(app)
                .get('/products/list')
                .set('token',token)
                // .send(userInput)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        // console.log(response.body)
                        expect(response.status).toBe(200)
                        // expect(response.body).toHaveProperty('first_name', expect.any(String))
                        // expect(response.body).toHaveProperty('last_name', expect.any(String))
                        // expect(response.body).toHaveProperty('id', expect.any(Number))
                        // expect(response.body).toHaveProperty('email', userInput.email)
                        // expect(response.body).not.toHaveProperty('password')
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
                CategoryId : 1,
            }
            request(app)
                .post('/products/add')
                .set('token',token)
                .send(newProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
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

    describe('GET /:id', () => {
        test('should return objects with id,name,image_url,price and stock status 200',(done) => {
            
            request(app)
                
                .get(`/products/${id}`)
                .set('token',token)
                .query({'id':id})
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        // console.log(response.body)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('name', expect.any(String))
                        expect(response.body).toHaveProperty('image_url', expect.any(String))
                        expect(response.body).toHaveProperty('price', expect.any(Number))
                        expect(response.body).toHaveProperty('stock', expect.any(Number))
                        expect(response.body).toHaveProperty('CategoryId', expect.any(Number))
                        return done()
                    }
                })
        })
    })

    describe('GET /search', () => {
        test('should return objects with id,name,image_url,price and stock status 200',(done) => {
            let test ='balll'
            request(app)
                
                .post(`/products/search`)
                .set('token',token)
                .send({'name' : test})
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        // console.log(response.body)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('name', expect.any(String))
                        expect(response.body).toHaveProperty('image_url', expect.any(String))
                        expect(response.body).toHaveProperty('price', expect.any(Number))
                        expect(response.body).toHaveProperty('stock', expect.any(Number))
                        expect(response.body).toHaveProperty('CategoryId', expect.any(Number))
                        return done()
                    }
                })
        })
    })


    describe('PUT /edit', () => {
        test('should return objects with id,name,image_url,price and stock status 200',(done) => {
            let updateProduct = {
                name : 'buah1',
                image_url : 'pp.jpg',
                price : '8000',
                stock : '12',
                CategoryId : 1,
            }
           
            request(app)
                
                .put(`/products/edit/${id}`)
                .set('token',token)
                .query({'id':id})
                .send(updateProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('name', expect.any(String))
                        expect(response.body).toHaveProperty('image_url', expect.any(String))
                        expect(response.body).toHaveProperty('price', expect.any(Number))
                        expect(response.body).toHaveProperty('stock', expect.any(Number))
                        expect(response.body).toHaveProperty('CategoryId', expect.any(Number))
                        return done()
                    }
                })
        })
    })


    describe('DELETE /delete/:id', () => {
        test('should return objects with id,name,image_url,price and stock status 200',(done) => {
           
            request(app)
                
                .delete(`/products/delete/${id}`)
                .set('token',token)
                .query({'id':id})
                // .send(updateProduct)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        // console.log(response.body)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('name', expect.any(String))
                        expect(response.body).toHaveProperty('image_url', expect.any(String))
                        expect(response.body).toHaveProperty('price', expect.any(Number))
                        expect(response.body).toHaveProperty('stock', expect.any(Number))
                        expect(response.body).toHaveProperty('CategoryId', expect.any(Number))
                        return done()
                    }
                })
        })
    })
})


describe('Test fail /products', () => {

    describe('GET /:id', () => {
        test('should return error with status 404',(done) => {
        const error = "not found"
        
        request(app)
            .get(`/products/${9999999}`)
            .set('token',token)
            // .send(newProduct)
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    console.log(response.body)
                    expect(response.status).toBe(404)
                    expect(response.body).toHaveProperty('error', error)
                    return done()
                }
            })
        })
    })

    describe('DELETE /delete/:id', () => {
        test('should return error with status 404',(done) => {
        const error = "not found"

        request(app)
            .delete(`/products/delete/${1}`)
            .set('token',token)
            .query({'id':1})
            // .send(newProduct)
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    console.log(response.body)
                    expect(response.status).toBe(404)
                    expect(response.body).toHaveProperty('error', error)
                    return done()
                }
            })
        })
    })

    describe('POST /add', () => {
        test('should return name error with status 400', (done) => {
            const error = ["Name is required field", "Name must more than 3 letters"]
            let newProduct = {
                name : '',
                image_url : 'pp.jpg',
                price : '8000',
                stock : '12',
                CategoryId : 1
            }
            request(app)
                .post('/products/add')
                .set('token',token)
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
                CategoryId : 1
            }
            request(app)
                .post('/products/add')
                .set('token',token)
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
                CategoryId : 1
            }
            request(app)
                .post('/products/add')
                .set('token',token)
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
                CategoryId : 1
            }
            request(app)
                .post('/products/add')
                .set('token',token)
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
                .post('/products/add')
                .set('token',token)
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
            const error = ["Name is required field", "image_url is required field", "Price is required field", "Stock is required field","category is required field"]
            request(app)
                .post('/products/add')
                .set('token',token)
                // .send(newProduct)
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
            const error = ["category is required field","Name is required field","Name must more than 3 letters", "image_url is required field",  "Price is required field", "Stock is required field"]
            let newProduct = {
                name : '',
                image_url : '',
                price : '',
                stock : '',
                CategoryId : ''
            }
            request(app)
                .post('/products/add')
                .set('token',token)
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
            const error = ["price can't below 0. are you nuts?","category is required field","Name must more than 3 letters", "image_url is required field"]
            let newProduct = {
                name : 'as',
                image_url : '',
                price : -2,
                stock : 2,
                CategoryId : ''
            }
            request(app)
                .post('/products/add')
                .set('token',token)
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
