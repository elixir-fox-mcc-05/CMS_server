const app  = require('../app.js')
const request = require('supertest')

const { Product, User, sequelize } = require('../models')
const { queryInterface } = sequelize

const {createToken} = require("../helpers/jwt.js")

let signingUserToken, dummyUserToken, dummyUserProduct

const signingUser = {
    email: "archie@gmail.com",
    password: "archie888",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date() 
}

const dummyUser = {
    email: "oreo@gmail.com",
    password: "oreo888",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date() 
}

beforeAll(done =>{
    User.create(signingUser)
      .then(result =>{
        // console.log(result)
        signingUserToken = createToken({ 
            id: result.id,
            email: result.email 
        })
        return User.create(dummyUser)
      })
      .then(result2 => {
        dummyUserToken = createToken({
            id:result2.id,
            email: result2.email
        })
        return Product.create({
            name : 'One Dummy Product',
            image_url: 'http://AnotherDummyProduct.com/dam-dim-dum.jpg',
            price: 50000,
            stock: 100,
            category: 'Dummy Category',
            UserId: result2.id
        })
      })
      .then(newProduct =>{
        dummyUserProduct = newProduct
        done()
      })
      .catch(error => {
        done(error)
      })
})

afterAll(done => {
    queryInterface.bulkDelete('Users', {})
      .then(_ => {
        return queryInterface.bulkDelete('Products', {})
      })
      .then(_ => {
        done()
      })
      .catch( error => {
        done(error)
      })

})

describe('Product Routes Test', () => {

    // CRUD | ADD NEW PRODUCT - SUCCESSFULLY ADDED NEW PRODUCT
    // CRUD | ADD NEW PRODUCT - VALIDATION ERROR MISSING PRODUCT NAME
    // CRUD | ADD NEW PRODUCT - VALIDATION ERROR MISSING IMAGE URL
    // CRUD | ADD NEW PRODUCT - VALIDATION ERROR MISSING PRODUCT PRICE
    // CRUD | ADD NEW PRODUCT - VALIDATION ERROR MISSING TOKEN
    // CRUD | ADD NEW PRODUCT - VALIDATION ERROR MISSING ACCESS TOKEN
    // CRUD | ADD NEW PRODUCT - FAIL TO ADD DUE TO MISSING ACCESS TOKEN

    describe('POST /products - Add a new product', () => {
        test('Code 201 Successfully added a new product - Returning id and email', (done) =>{
            // supertest here
            let newProduct = {
                name : 'Another Dummy Product',
                image_url: 'http://AnotherDummyProduct.com/dum-dum-dum.jpg',
                price: 55000,
                stock: 150,
                category: 'Dummy Category 2'
            }
            request(app)
                .post('/products')
                .send(newProduct)
                .set('access_token', signingUserToken)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('message', "Successfully added a new product")
                        expect(response.body).toHaveProperty('newProduct', expect.any(Object))
                        return done()
                    }
                })
        })
    })

    describe('POST /products - Add a new product', () => {
        test('Code 400 Fail to add new product -- missing product name', (done) =>{
            // supertest here
            let newProduct = {
                name : null,
                image_url: 'http://AnotherDummyProduct.com/dum-dum-dum.jpg',
                price: 55000,
                stock: 150,
                category: 'Dummy Category 2'
            }
            request(app)
                .post('/products')
                .send(newProduct)
                .set('access_token', signingUserToken)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(400)
                        expect(response.body.errors).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({message: "Product name must not be empty"})
                            ])  
                        )
                        return done()
                    }
                })
        })
    })

    describe('POST /products - Add a new product', () => {
        test('Code 400 Fail to add new product -- missing imageUrl name', (done) =>{
            // supertest here
            let newProduct = {
                name : 'Another Dummy Product',
                image_url: null,
                price: 55000,
                stock: 150,
                category: 'Dummy Category 2'
            }
            request(app)
                .post('/products')
                .send(newProduct)
                .set('access_token', signingUserToken)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(400)
                        expect(response.body.errors).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({message: "Link to product image must not be empty"})
                            ])  
                        )
                        return done()
                    }
                })
        })
    })

    describe('POST /products - Add a new product', () => {
        test('Code 400 Fail to add new product -- missing price', (done) =>{
            // supertest here
            let newProduct = {
                name : 'Another Dummy Product',
                image_url: 'http://AnotherDummyProduct.com/dum-dum-dum.jpg',
                price: null,
                stock: 150,
                category: 'Dummy Category 2'
            }
            request(app)
                .post('/products')
                .send(newProduct)
                .set('access_token', signingUserToken)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(400)
                        expect(response.body.errors).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({message: "Product price must not be empty"})
                            ])  
                        )
                        return done()
                    }
                })
        })
    })

    describe('POST /products - Add a new product', () => {
        test('Code 400 Fail to add new product -- missing amount of stock', (done) =>{
            // supertest here
            let newProduct = {
                name : 'Another Dummy Product',
                image_url: 'http://AnotherDummyProduct.com/dum-dum-dum.jpg',
                price: 55000,
                stock: null,
                category: 'Dummy Category 2'
            }
            request(app)
                .post('/products')
                .send(newProduct)
                .set('access_token', signingUserToken)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(400)
                        expect(response.body.errors).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({message: "Product stock must not be empty"})
                            ])  
                        )
                        return done()
                    }
                })
        })
    })

    describe('POST /products - Add a new product', () => {
        test('Code 400 Fail to add new product -- missing category', (done) =>{
            // supertest here
            let newProduct = {
                name : 'Another Dummy Product',
                image_url: 'http://AnotherDummyProduct.com/dum-dum-dum.jpg',
                price: 55000,
                stock: 150,
                category: null
            }
            request(app)
                .post('/products')
                .send(newProduct)
                .set('access_token', signingUserToken)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(400)
                        expect(response.body.errors).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({message: "Product category must not be empty"})
                            ])  
                        )
                        return done()
                    }
                })
        })
    })

    describe('POST /products - Add a new product', () => {
        test('Code 500 Fail to add new product -- User lacks access_token', (done) =>{
            // supertest here
            let newProduct = {
                name : 'Another Dummy Product',
                image_url: 'http://AnotherDummyProduct.com/dum-dum-dum.jpg',
                price: 55000,
                stock: 150,
                category: 'Dummy Category 2'
            }
            request(app)
                .post('/products')
                .send(newProduct)
                .set('access_token', null)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(500)
                        expect(response.body).toHaveProperty('message', 'InternalServerError')
                        expect(response.body).toHaveProperty('error', 'JWT Token malformed/does not exist. Please sign in first')
                        return done()
                    }
                })
        })
    })

    // CRUD | GET ALL PRODUCTS

    describe('GET /products - Read all products', () => {
        test('Code 200 Successfully read all products -- returning an object containing success message and all products', (done) =>{
            // supertest here
            request(app)
                .get('/products')
                .set('access_token', signingUserToken)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('message', 'All products successfully read')
                        expect(response.body).toHaveProperty('allProducts', expect.any(Array))
                        return done()
                    }
                })
        })
    })

    // GET FAIL | AUTHENTICATION FAILURE -- JWT MALFORMED
    // GET FAIL | AUTHENTICATION FAILURE -- USER NOT FOUND

    describe('GET /products - Read all products', () => {
        test('Code 500 Fail to read all products -- JsonWebTokenError -- JWT not provided ', (done) =>{
            // supertest here
            request(app)
                .get('/products')
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(500)
                        expect(response.body).toHaveProperty('message', "InternalServerError")
                        expect(response.body).toHaveProperty('error', 'JWT Token malformed/does not exist. Please sign in first')
                        return done()
                    }
                })
        })
    })

    describe('GET /products - Read all products', () => {
        test('Code 404 Fail to read all products -- User not found on database ', (done) =>{
            // supertest here
            request(app)
                .get('/products')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJkdW1teUBnbWFpbC5jb20ifQ.uz28MRS2LEJXLYvPwlXpKBhVZR6BXwl42Hz-4_XtAio')
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty('message', 'Internal Server Error')
                        expect(response.body).toHaveProperty('error', 'User Not Found')
                        return done()
                    }
                })
        })
    })

    // CRUD | GET ONE PRODUCT
    // CRUD | GET ONE PRODUCT | SUCCESS - SUCCESSFULLY READ ONE PRODUCT
    // CRUD | GET ONE PRODUCT | FAIL - FAIL TO READ ONE PRODUCT -- PRODUCT WITH ID DOES NOT EXIST

    describe('GET /products/:id - Read one products', () => {
        test('Code 200 Successfully read one products -- missing access token', (done) =>{
            // supertest here
            request(app)
                .get(`/products/${dummyUserProduct.id}`)
                .set('access_token', signingUserToken)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('message', 'selected product successfully read')
                        expect(response.body).toHaveProperty('selectedProduct', expect.any(Object))
                        return done()
                    }
                })
        })
    })

    describe('GET /products/:id - Read one products', () => {
        test('Code 500 Successfully get one product -- But product with specified id does not exist', (done) =>{
            // supertest here
            request(app)
                .get(`/products/99`)
                .set('access_token', signingUserToken)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        console.log(' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(500)
                        expect(response.body).toHaveProperty('message', 'InternalServerError')
                        expect(response.body.error).toEqual({message: "Selected product does not exist"})
                        return done()
                    }
                })
        })
    })

    // CRUD | UPDATE PRODUCT | SUCCESSFULLY UPDATE ONE PRODUCT
    
    describe('PUT /products/:id - Update one product', () => {
        test('Code 200 Successfully update one product -- returning success message and updated product', (done) =>{
            // supertest here
            let productUpdate = {
                name : 'A different Dummy Product',
                image_url: 'http://DifferentDummyProduct.com/dum-dum-dum.jpg',
                price: 20000,
                stock: 5,
                category: 'Dummy Category 3'
            }
            request(app)
                .put(`/products/${dummyUserProduct.id}`)
                .send(productUpdate)
                .set('access_token', signingUserToken)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('message', 'Product successfully updated')
                        expect(response.body).toHaveProperty('updatedProduct', expect.any(Object))
                        return done()
                    }
                })
        })
    })
    
    // CRUD | DELETE PRODUCT -- SUCCESSFULLY DELETE ONE PRODUCT
    // CRUD | DELETE PRODUCT -- FAIL TO LOCATE PRODUCT WITH SPECIFIED ID

    describe('DELETE /products/:id - Delete one product', () => {
        test('Code 200 Successfully delete one product -- returning success message', (done) =>{
            // supertest here
            request(app)
                .delete(`/products/${dummyUserProduct.id}`)
                .set('access_token', signingUserToken)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('message', 'Selected task successfully deleted')
                        return done()
                    }
                })
        })
    })

})