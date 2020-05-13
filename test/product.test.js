const app = require('../app.js');
const request = require('supertest');
const {User,sequelize} = require('../models');
const {queryInterface} = sequelize;
const {userToken} = require('../helpers/jwt.js');
const {encrypt} = require('../helpers/bcrypt.js');

const Products = require('../data/product.json').map(product => {
    product.createdAt = new Date ();
    product.updatedAt = new Date ();
    return product;
})

const Users = require('../data/admin.json').map(user => {
    user.createdAt = new Date ();
    user.updatedAt = new Date ();
    user.password = encrypt(user.password);
    return user;
})

let productId;
let token;
    
describe('Product Route', function() {
    beforeAll(function(done) {
        queryInterface.bulkInsert('Products', Products, {
            returning : true 
        })
            .then(response => {
                // console.log(response)
                productId = response[0].id
                // console.log(productId)
                return queryInterface.bulkInsert('Users', Users, {
                    returning : true 
                })
            }) 
            .then(result => {
                // console.log(result[0].id)
                token = userToken({
                    id : result[0].id,
                    email : result[0].email
                })
                done()
            })
            .catch(err => {
                done(err)
        })
    
    })

    test('Should return product by id', done => {
        request(app)
            .get('/product/' + productId)
            .set({
                Accept: 'application/json',
                token: token
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(result) {
                console.log(result.body)
                let data = result.body
                expect(data).toHaveProperty('Product')
            })
            .end(function(err) {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }
            })
    })

    describe('Create Product', function() {
        describe('Success', function() {
            test('Should return status code 201 with result of JSON of name, img_url, price, and stock', function(done) {
                const productTest = {
                    name: 'Ketan',
                    img_url: 'https://medanheadlines.com/wp-content/uploads/2018/07/Beras-Tak-teregistrasi.png',
                    price: 4500,
                    stock: 10
                }
                request(app)
                    .post('/product')
                    .send(productTest)
                    .set({
                        Accept: 'application/json',
                        token: token
                    })
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .expect(function(result) {
                        // console.log(result.body)
                        let data = result.body
                        // {
                        //     Product: {
                        //         name:'Beras',
                        //         img_url: 'test',
                        //         price: 10000,
                        //         stock: 5
                        //     }
                        // }
                        expect(data).toHaveProperty('Product')
                        expect(data.Product).toHaveProperty('name')
                        expect(data.Product).toHaveProperty('price')
                        expect(data.Product).toHaveProperty('stock')
                        expect(data.Product).toHaveProperty('UserId')
                        expect(data.Product).toHaveProperty('updatedAt')
                        expect(data.Product).toHaveProperty('createdAt')
                    })
                    .end(function(err) {
                        if (err) {
                            done(err)
                        }
                        else {
                            done()
                        }
                    })
            })
        })

        describe('Failed', function() {
            test('Should return status code 201 with a error message of product name cannot be empty', function(done) {
                const productTest = {
                    name: '',
                    img_url: 'https://medanheadlines.com/wp-content/uploads/2018/07/Beras-Tak-teregistrasi.png',
                    price: 10000,
                    stock: 5
                }
                request(app)
                    .post('/product/')
                    .send(productTest)
                    .set({
                        Accept: 'application/json',
                        token: token
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(function(result) {
                        // console.log(result)
                        let data = result.body
                        expect(data.error).toContain('Validation error: Product name cannot be empty')
                    })
                    .end(function(err) {
                        if (err) {
                            done(err)
                        }
                        else {
                            done()
                        }
                    })
            })

            test('Should return status code 400 with a error message of not url format', function(done) {
                const productTest = {
                    name: 'Beras',
                    img_url: 'test',
                    price: 10000,
                    stock: 5
                }
                request(app)
                    .post('/product/')
                    .send(productTest)
                    .set({
                        Accept: 'application/json',
                        token: token
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(function(result) {
                        // console.log(result)
                        let data = result.body
                        expect(data.error).toContain('Validation error: Not URL format')
                    })
                    .end(function(err) {
                        if (err) {
                            done(err)
                        }
                        else {
                            done()
                        }
                    })
            })

            test('Should return status code 400 with a error message of product image cannot be empty', function(done) {
                const productTest = {
                    name: 'Beras',
                    img_url: '',
                    price: 10000,
                    stock: 5
                }
                request(app)
                    .post('/product/')
                    .send(productTest)
                    .set({
                        Accept: 'application/json',
                        token: token
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(function(result) {
                        // console.log(result)
                        let data = result.body
                        expect(data.error).toContain('Validation error: Product image cannot be empty')
                    })
                    .end(function(err) {
                        if (err) {
                            done(err)
                        }
                        else {
                            done()
                        }
                    })
            })

            test('Should return status code 400 with a error message of please input using number format', function(done) {
                const productTest = {
                    name: 'Beras',
                    img_url: 'https://medanheadlines.com/wp-content/uploads/2018/07/Beras-Tak-teregistrasi.png',
                    price: 'lima ribu',
                    stock: 5
                }
                request(app)
                    .post('/product/')
                    .send(productTest)
                    .set({
                        Accept: 'application/json',
                        token: token
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(function(result) {
                        // console.log(result)
                        let data = result.body
                        expect(data.error).toContain('Validation error: Please input using number format')
                    })
                    .end(function(err) {
                        if (err) {
                            done(err)
                        }
                        else {
                            done()
                        }
                    })
            })

            test('Should return status code 400 with a error message of product price cannot be empty', function(done) {
                const productTest = {
                    name: 'Beras',
                    img_url: 'https://medanheadlines.com/wp-content/uploads/2018/07/Beras-Tak-teregistrasi.png',
                    price: '',
                    stock: 5
                }
                request(app)
                    .post('/product/')
                    .send(productTest)
                    .set({
                        Accept: 'application/json',
                        token: token
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(function(result) {
                        // console.log(result)
                        let data = result.body
                        expect(data.error).toContain('Validation error: Product price cannot be empty')
                    })
                    .end(function(err) {
                        if (err) {
                            done(err)
                        }
                        else {
                            done()
                        }
                    })
            })

            test('Should return status code 400 with a error message of product stock cannot be empty', function(done) {
                const productTest = {
                    name: 'Beras',
                    img_url: 'https://medanheadlines.com/wp-content/uploads/2018/07/Beras-Tak-teregistrasi.png',
                    price: 10000,
                    stock: ''
                }
                request(app)
                    .post('/product/')
                    .send(productTest)
                    .set({
                        Accept: 'application/json',
                        token: token
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(function(result) {
                        // console.log(result)
                        let data = result.body
                        expect(data.error).toContain('Validation error: Product stock cannot be empty')
                    })
                    .end(function(err) {
                        if (err) {
                            done(err)
                        }
                        else {
                            done()
                        }
                    })
            })

            test('Should return status code 400 with a error message of please input using number format', function(done) {
                const productTest = {
                    name: 'Beras',
                    img_url: 'https://medanheadlines.com/wp-content/uploads/2018/07/Beras-Tak-teregistrasi.png',
                    price: 10000,
                    stock: 'dua'
                }
                request(app)
                    .post('/product/')
                    .send(productTest)
                    .set({
                        Accept: 'application/json',
                        token: token
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(function(result) {
                        // console.log(result)
                        let data = result.body
                        expect(data.error).toContain('Validation error: Please input using number format')
                    })
                    .end(function(err) {
                        if (err) {
                            done(err)
                        }
                        else {
                            done()
                        }
                    })
            })

            test('Should return status code 400 with a error message of please login', function(done) {
                const productTest = {
                    name: 'Beras',
                    img_url: 'https://medanheadlines.com/wp-content/uploads/2018/07/Beras-Tak-teregistrasi.png',
                    price: 10000,
                    stock: 5
                }
                request(app)
                    .post('/product/')
                    .send(productTest)
                    .set({
                        Accept: 'application/json'
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(function(result) {
                        // console.log(result)
                        let data = result.body
                        expect(data.error).toContain('Please login!')
                    })
                    .end(function(err) {
                        if (err) {
                            done(err)
                        }
                        else {
                            done()
                        }
                    })
            })
        })
    })

    describe('Read Product', function() {
        describe('Succes', function() {
            test('Should return status code 200 with a result of JSON of product detail', function(done) {
                request(app)
                    .get('/product/')
                    .set({
                        Accept: 'application/json',
                        token: token
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function(result) {
                        // console.log(result.body)
                        let data = result.body
                        expect(data).toHaveProperty('Products')
                    })
                    .end(function(err) {
                        if (err) {
                            done(err)
                        }
                        else {
                            done()
                        }
                    })
            })
        })

        describe('Failed', function() {
            test('Should return status code 401 with a result of JSON of error', function(done) {
                request(app)
                    .get('/product/')
                    .set({
                        Accept: 'application/json'
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(function(result) {
                        // console.log(result.body)
                        let data = result.body
                        expect(data.error).toContain('Please login!')
                    })
                    .end(function(err) {
                        if (err) {
                            done(err)
                        }
                        else {
                            done()
                        }
                    })
            })
        })
    })

    describe('Product ID', function() {
        describe('Find by ID', function() {
            describe('Succes', function() {
                test('Should return status code 200 with a result of JSON of product detail', function(done) {
                    request(app)
                    // console.log(productId)
                        .get('/product/' + productId)
                        .set({
                            Accept: 'application/json',
                            token: token
                        })
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(function(result) {
                            let data = result.body
                            console.log(data)
                            // expect(data).toHaveProperty('Products')
                        })
                        .end(function(err) {
                            if (err) {
                                done(err)
                            }
                            else {
                                done()
                            }
                        })
                })
            })

            describe('Failed', function() {
                test('Should return status code 200 with a result of JSON of status of success deleting product', function(done) {
                    request(app)
                        .delete('/product/' + (productId + 10))
                        .set({
                            Accept: 'application/json',
                            token: token
                        })
                        .expect('Content-Type', /json/)
                        .expect(404)
                        .expect(function(result) {
                            // console.log(result.body)
                            let data = result.body
                            expect(data.error)
                        })
                        .end(function(err) {
                            if (err) {
                                done(err)
                            }
                            else {
                                done()
                            }
                        })
                })
            })
        })

        describe('Update product', function() {
            describe('Succes', function() {
                test('Should return status code 200 with a result of JSON of product detail after updating', function(done) {
                    const productTest = {
                        name: 'Beras',
                        img_url: 'https://medanheadlines.com/wp-content/uploads/2018/07/Beras-Tak-teregistrasi.png',
                        price: 6000,
                        stock: 5
                    }
                    request(app)
                        .put('/product/' + productId)
                        .send(productTest)
                        .set({
                            Accept: 'application/json',
                            token: token
                        })
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(function(result) {
                            // console.log(result.body)
                            let data = result.body
                            expect(data).toHaveProperty('Product')
                        })
                        .end(function(err) {
                            if (err) {
                                done(err)
                            }
                            else {
                                done()
                            }
                        })
                })
            })

            describe('Failed', function() {
                test('Should return status code 200 with a result of JSON of status of success deleting product', function(done) {
                    request(app)
                        .delete('/product/' + (productId + 10))
                        .set({
                            Accept: 'application/json',
                            token: token
                        })
                        .expect('Content-Type', /json/)
                        .expect(404)
                        .expect(function(result) {
                            // console.log(result.body)
                            let data = result.body
                            expect(data.error)
                        })
                        .end(function(err) {
                            if (err) {
                                done(err)
                            }
                            else {
                                done()
                            }
                        })
                })
            })
        })

        describe('Delete product', function() {
            describe('Succes', function() {
                test('Should return status code 200 with a result of JSON of status of success deleting product', function(done) {
                    request(app)
                        .delete('/product/' + productId)
                        .set({
                            Accept: 'application/json',
                            token: token
                        })
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(function(result) {
                            // console.log(result.body)
                            let data = result.body
                            expect(data)
                        })
                        .end(function(err) {
                            if (err) {
                                done(err)
                            }
                            else {
                                done()
                            }
                        })
                })
            })

            describe('Failed', function() {
                test('Should return status code 200 with a result of JSON of status of success deleting product', function(done) {
                    request(app)
                        .delete('/product/' + (productId + 10))
                        .set({
                            Accept: 'application/json',
                            token: token
                        })
                        .expect('Content-Type', /json/)
                        .expect(404)
                        .expect(function(result) {
                            // console.log(result.body)
                            let data = result.body
                            expect(data.error)
                        })
                        .end(function(err) {
                            if (err) {
                                done(err)
                            }
                            else {
                                done()
                            }
                        })
                })
            })
        })
    })

    afterAll(function(done) {
        queryInterface.bulkDelete('Users')
            .then(_ => {
                return queryInterface.bulkDelete('Products')
            })
            .then(() => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})