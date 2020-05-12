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
    // const salt = bcrypt.genSaltSync(10)
    // const hashPassword = bcrypt.hashSync(dummyUser.password, salt)
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

describe('test success /products', () => {
    let id;
    describe('GET /list', () => {
        test('should return objects status 200', (done) => {
            request(app)
                .get('/products/list')
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

    describe('GET /:id', () => {
        test('should return objects with id,name,image_url,price and stock status 200',(done) => {
            
            request(app)
                
                .get(`/products/${id}`)
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
                        expect(response.body).toHaveProperty('category', expect.any(String))
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
                        expect(response.body).toHaveProperty('category', expect.any(String))
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
                category : 'buah'
            }
           
            request(app)
                
                .put(`/products/edit/${id}`)
                .query({'id':id})
                .send(updateProduct)
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
                        expect(response.body).toHaveProperty('category', expect.any(String))
                        return done()
                    }
                })
        })
    })


    describe('DELETE /delete/:id', () => {
        test('should return objects with id,name,image_url,price and stock status 200',(done) => {
           
            request(app)
                
                .delete(`/products/delete/${id}`)
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
                        expect(response.body).toHaveProperty('category', expect.any(String))
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
                category : 'buah'
            }
            request(app)
                .post('/products/add')
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
                .post('/products/add')
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
                .post('/products/add')
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
                .post('/products/add')
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
                .post('/products/add')
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
            request(app)
                .post('/products/add')
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
            const error = ["Name is required field","Name must more than 3 letters", "image_url is required field", "category is required field", "Price is required field", "Stock is required field"]
            let newProduct = {
                name : '',
                image_url : '',
                price : '',
                stock : '',
                category : ''
            }
            request(app)
                .post('/products/add')
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
            const error = ["price can't below 0. are you nuts?","Name must more than 3 letters", "image_url is required field","category is required field"]
            let newProduct = {
                name : 'as',
                image_url : '',
                price : -2,
                stock : 2,
                category : ''
            }
            request(app)
                .post('/products/add')
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