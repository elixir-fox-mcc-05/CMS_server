const app = require('../app')
const request = require('supertest')

const { queryInterface } = require('../models/index.js').sequelize;
const { encryptPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

let dummyuser = {
    name: 'Dummy User',
    email: 'dummyuser@contoh.com',
    password: '123456',
    role: 'Administrator'
}

let token = generateToken({
    id: 1,
    name: dummyuser.name,
    email: dummyuser.email
})

describe('Product Router', () => {
    beforeAll((done) => {
        queryInterface.bulkInsert('Users', [
                {
                    id: 1,
                    name: dummyuser.name,
                    role: dummyuser.role,
                    email: dummyuser.email,
                    password: encryptPassword(dummyuser.password),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ])
        
            .then(() => {
                return queryInterface.bulkDelete('Products')
            })
            .then(() => {
                return queryInterface.bulkInsert('Products', [
                    {
                        id: 1,
                        name: 'ROG Zephyrus',
                        description: 'Leading gaming laptop with highend specs',
                        image_url: 'http://www.contoh.com/img.jpeg',
                        stock: 20,
                        price: 20000000,
                        category: 'Laptop',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        id: 2,
                        name: 'Macbook Pro 2019',
                        description: 'Leading macOs laptop',
                        image_url: 'http://www.apple.com/img.jpeg',
                        stock: 20,
                        price: 25000,
                        category: 'Laptop',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                ])
            })
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
                return queryInterface.bulkDelete('Users')
            })
            .then(() => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    describe('Create product', () => {
        describe('Success create product', () => {
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
                    .set('token', token)
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

        describe('Fail create product', () => {
            describe('token are empty', () => {
                test('Return status code 401 with keys err', (done) => {
                    let newProduct = {
                        name: 'Sepeda Ontel',
                        description: 'Sepeda ontel antik yang sudah dirawat selama 3 generasi',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 1000000,
                        stock: 3,
                        category: 'Bicycle'
                    }
                    customErr = 'Please login first'
                    request(app)
                        .post('/product/')
                        .send(newProduct)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(401)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
            describe('attributes are empty', () => {
                test('Return status code 400 with keys err', (done) => {
                    customErr = [
                        { "message": "Name is required" },
                        { "message": "Price is required" },
                        { "message": "Stock is required" },
                        { "message": "Category is required" }
                    ]
                    request(app)
                        .post('/product/')
                        .set('token', token)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
            describe('attribute name has less than 3 characters', () => {
                test('Return status code 400 with keys err', (done) => {
                    let newProduct = {
                        name: 'Se',
                        description: 'Sepeda ontel antik yang sudah dirawat selama 3 generasi',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 1000000,
                        stock: 3,
                        category: 'Bicycle'
                    }
                    customErr = [
                        { "message": "Name must include minimum 3 characters" }
                    ]
                    request(app)
                        .post('/product/')
                        .set('token', token)
                        .send(newProduct)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
            describe('attribute image_url has wrong url format', () => {
                test('Return status code 400 with keys err', (done) => {
                    let newProduct = {
                        name: 'Sepeda Ontel',
                        description: 'Sepeda ontel antik yang sudah dirawat selama 3 generasi',
                        image_url: 'httpwwwcontohcomimgjpg',
                        price: 1000000,
                        stock: 3,
                        category: 'Bicycle'
                    }
                    customErr = [
                        {
                        "message": "Please input correct url format for Image URL"
                        }
                    ]
                    request(app)
                        .post('/product/')
                        .set('token', token)
                        .send(newProduct)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
            describe('attribute price and stock has negative value', () => {
                test('Return status code 400 with keys err', (done) => {
                    let newProduct = {
                        name: 'Sepeda Ontel',
                        description: 'Sepeda ontel antik yang sudah dirawat selama 3 generasi',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: -5000000,
                        stock: -2,
                        category: 'Bicycle'
                    }
                    customErr = [
                        {
                        "message": "Price can not have value below zero"
                        },
                        {
                        "message": "Stock can not have value below zero"
                        }
                    ]
                    request(app)
                        .post('/product/')
                        .set('token', token)
                        .send(newProduct)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
        })
    })

    describe('Update product', () => {
        describe('success update product', () => {
            test('Return status code 200 with keys data and notif', (done) => {
                let updatedProduct = {
                    name: 'Sepeda Ontel Biru',
                    description: 'Sepeda ontel biru antik yang sudah dirawat selama 3 generasi',
                    image_url: 'http://www.contoh.com/img.jpg',
                    price: 1000000,
                    stock: 3,
                    category: 'Bicycle'
                }
                request(app)
                    .put(`/product/1`)
                    .set('token', token)
                    .send(updatedProduct)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('notif', `Product successfully updated!`)
                            return done()
                        }
                    })
            })
        })
        describe('fail update product', () => {
            describe('token are empty', () => {
                test('Return status code 401 with keys err', (done) => {
                    let updatedProduct = {
                        name: 'Sepeda Ontel Biru',
                        description: 'Sepeda ontel biru antik yang sudah dirawat selama 3 generasi',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 1000000,
                        stock: 3,
                        category: 'Bicycle'
                    }
                    customErr = 'Please login first'
                    request(app)
                        .put(`/product/1`)
                        .send(updatedProduct)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(401)
                                expect(response.body).toHaveProperty('err', 'Please login first')
                                return done()
                            }
                        })
                })
            })
            describe('attributes are empty', () => {
                test('Return status code 400 with keys err', (done) => {
                    let updatedProduct = {
                        name: '',
                        description: '',
                        image_url: '',
                        price: '',
                        stock: '',
                        category: ''
                    }
                    customErr = [
                        { "message": "Name is required" },
                        { "message": "Name must include minimum 3 characters" },
                        { "message": "Please input correct url format for Image URL" },
                        { "message": "Price is required" },
                        { "message": "Stock is required" },
                        { "message": "Category is required" }
                    ]
                    request(app)
                        .put(`/product/1`)
                        .set('token', token)
                        .send(updatedProduct)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
            describe('attribute name has less than 3 characters', () => {
                test('Return status code 400 with keys err', (done) => {
                    let updatedProduct = {
                        name: 'Se',
                        description: 'Sepeda ontel biru antik yang sudah dirawat selama 3 generasi',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 1000000,
                        stock: 3,
                        category: 'Bicycle'
                    }
                    customErr = [
                        { "message": "Name must include minimum 3 characters" }
                    ]
                    request(app)
                        .put(`/product/1`)
                        .set('token', token)
                        .send(updatedProduct)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
            describe('attribute image_url has wrong url format', () => {
                test('Return status code 400 with keys err', (done) => {
                    let updatedProduct = {
                        name: 'Sepeda Ontel Biru',
                        description: 'Sepeda ontel biru antik yang sudah dirawat selama 3 generasi',
                        image_url: 'httpwwwcontohcomjpg',
                        price: 1000000,
                        stock: 3,
                        category: 'Bicycle'
                    }
                    customErr = [
                        { "message": "Please input correct url format for Image URL" },
                    ]
                    request(app)
                        .put(`/product/1`)
                        .set('token', token)
                        .send(updatedProduct)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
            describe('attribute price and stock has negative value', () => {
                test('Return status code 400 with keys err', (done) => {
                    let updatedProduct = {
                        name: 'Sepeda Ontel Biru',
                        description: 'Sepeda ontel biru antik yang sudah dirawat selama 3 generasi',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: -1000000,
                        stock: -3,
                        category: 'Bicycle'
                    }
                    customErr = [
                        { "message": "Price can not have value below zero" },
                        { "message": "Stock can not have value below zero" }
                    ]
                    request(app)
                        .put(`/product/1`)
                        .set('token', token)
                        .send(updatedProduct)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
            describe('product id is not in database', () => {
                test('Return status code 404 with keys err', (done) => {
                    let updatedProduct = {
                        name: 'Sepeda Ontel Biru',
                        description: 'Sepeda ontel biru antik yang sudah dirawat selama 3 generasi',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 1000000,
                        stock: 3,
                        category: 'Bicycle'
                    }
                    customErr = 'Product not found'
                    request(app)
                    .put(`/product/100`)
                    .set('token', token)
                    .send(updatedProduct)
                    .end((err, response) => {
                        console.log('ini errornya', response)
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(404)
                            expect(response.body).toHaveProperty('err', customErr)
                            return done()
                        }
                    })
                })
            })
        })
    })

    
    describe('Get all product', () => {
        describe('success get all product', () => {
            test('Return status code 200 with keys data', (done) => {
                request(app)
                    .get(`/product`)
                    .set('token', token)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('data', expect.any(Array))
                            return done()
                        }
                    })
            })
        })
        describe('fail get all product', () => {
        })
    })
        
    describe('Delete product', () => {
        describe('success delete product', () => {
            test('Return status code 200 with keys notif', (done) => {
                request(app)
                    .delete(`/product/2`)
                    .set('token', token)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('notif', 'Product successfully removed!')
                            return done()
                        }
                    })
            })
        })
        describe('fail delete product', () => {
            describe('token are empty', () => {
                test('Return status code 401 with keys err', (done) => {
                    customErr = 'Please login first'
                    request(app)
                    .delete(`/product/1`)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(401)
                            expect(response.body).toHaveProperty('err', customErr)
                            return done()
                        }
                    })
                })
            })

            describe('product id is not in database', () => {
                test('Return status code 404 with keys err', (done) => {
                    customErr = 'Product not found'
                    request(app)
                    .delete(`/product/100`)
                    .set('token', token)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(404)
                            expect(response.body).toHaveProperty('err', customErr)
                            return done()
                        }
                    })
                })
            })
        })
    })

    describe('Find product by id', () => {
        describe('success find product', () => {
            test('Return status code 200 with keys data', (done) => {
                request(app)
                    .get(`/product/1`)
                    .set('token', token)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('data', expect.any(Object))
                            return done()
                        }
                    })
            })
        })
        describe('fail to find product', () => {
            describe('product id is not in database', () => {
                test('Return status code 404 with keys err', (done) => {
                    customErr = 'Product not found'
                    request(app)
                    .get(`/product/100`)
                    .set('token', token)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(404)
                            expect(response.body).toHaveProperty('err', customErr)
                            return done()
                        }
                    })
                })
            })
        })
    })

        
})